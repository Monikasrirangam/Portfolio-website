'use client';

import React, { useEffect, useRef } from 'react';

const PIXEL_SCAN_SHADER = `
precision highp float;
uniform sampler2D src;
uniform vec2 resolution;
uniform vec2 offset;
uniform float time;
uniform float enterTime;
uniform float leaveTime;

uniform int mode;
uniform float layers;
uniform float speed;
uniform float delay;
uniform float width;

#define W width

vec4 readTex(vec2 uv) {
  if (uv.x < 0. || uv.x > 1. || uv.y < 0. || uv.y > 1.) {
    return vec4(0);
  }
  return texture2D(src, uv);
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(4859., 3985.))) * 3984.);
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float sdBox(vec2 p, float r) {
  vec2 q = abs(p) - r;
  return min(length(q), max(q.y, q.x));
}

float dir = 1.;

float toRangeT(vec2 p, float scale) {
  float d;
  if (mode == 0) {
    d = p.x / (scale * 2.) + .5; // Left-to-right
  } else if (mode == 1) {
    d = 1. - (p.y / (scale * 2.) + .5); // Top-to-bottom
  } else if (mode == 2) {
    d = length(p) / scale; // Radial
  }
  d = dir > 0. ? d : (1. - d);
  return d;
}

vec4 cell(vec2 p, vec2 pi, float scale, float t, float edge) {
  vec2 pc = pi + .5;
  vec2 uvc = pc / scale;
  uvc.y /= resolution.y / resolution.x;
  uvc = uvc * 0.5 + 0.5;
  if (uvc.x < 0. || uvc.x > 1. || uvc.y < 0. || uvc.y > 1.) {
    return vec4(0);
  }
  float alpha = smoothstep(.0, .1, texture2D(src, uvc, 3.).a);
  vec4 color = vec4(hsv2rgb(vec3((pc.x * 13. / (pc.y != 0. ? pc.y : 1.0) * 17.) * 0.3, 1.0, 1.0)), 1.0);
  float x = toRangeT(pi, scale);
  float n = hash(pi);
  float anim = smoothstep(W * 2., .0, abs(x + n * W - t));
  color *= anim;
  color *= mix(
    1., 
    clamp(.3 / abs(sdBox(p - pc, .5)), 0., 10.),
    edge * pow(anim, 10.)
  ); 
  return color * alpha;
}

vec4 cellsColor(vec2 p, float scale, float t) {
  vec2 pi = floor(p);
  vec2 pf = fract(p);
  vec2 d = vec2(0.0, 1.0);
  vec4 cc = vec4(0.0);
  cc += cell(p, pi, scale, t, .2) * 4.;
  cc += cell(p, pi + d.xy, scale, t, .9);
  cc += cell(p, pi - d.xy, scale, t, .9);
  cc += cell(p, pi + d.yx, scale, t, .9);
  cc += cell(p, pi - d.yx, scale, t, .9);
  return cc / 8.;
}

vec4 draw(vec2 uv, vec2 p, float t, float scale) {
  vec4 c = readTex(uv);
  vec2 pi = floor(p * scale);
  float n = hash(pi);
  t = t * (1. + W * 4.) - W * 2.;
  float x = toRangeT(pi, scale);
  float a1 = smoothstep(t, t - W, x + n * W);    
  c *= a1;
  c += cellsColor(p * scale, scale, t) * 1.5;
  return c;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - offset) / resolution;
  vec2 p = uv * 2. - 1.;
  p.y *= resolution.y / resolution.x;
  float t;
  if (leaveTime > 0.) {
    dir = -1.;
    t = clamp(leaveTime * speed, 0., 1.);
  } else {
    t = clamp((enterTime - delay) * speed, 0., 1.);  
  }      
  t = (fract(t * .99999) - 0.5) * dir + 0.5;      
  
  // Safe loop with compile-time constant limits for WebGL 1.0/2.0 compatibility
  gl_FragColor = vec4(0.0);
  for (int i = 0; i < 8; i++) {
    if (float(i) >= layers) break;
    float s = cos(float(i)) * 7.3 + 10.; 
    gl_FragColor += draw(uv, p, t, abs(s));
  }
  gl_FragColor /= layers;  
  gl_FragColor *= smoothstep(0., 0.01, t);
}
`;

export default function PixelScanEffect({ children, mode = 0, speed = 0.75, delay = 0, width = 0.2, layers = 3 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let vfxInstance = null;
    let element = containerRef.current;
    if (!element) return;

    // Dynamically import @vfx-js/core to bypass SSR issues in Next.js
    import('@vfx-js/core').then(({ VFX }) => {
      vfxInstance = new VFX();
      vfxInstance.add(element, {
        shader: PIXEL_SCAN_SHADER,
        overflow: 30,
        intersection: { threshold: 0.99 },
        uniforms: {
          mode,
          speed,
          delay,
          width,
          layers,
        }
      });
    }).catch(err => console.error("Failed to load VFX-JS:", err));

    return () => {
      if (vfxInstance && element) {
        vfxInstance.remove(element);
        vfxInstance.destroy();
      }
    };
  }, [mode, speed, delay, width, layers]);

  // Clone the child component and attach the ref directly to it
  const child = React.Children.only(children);
  return React.cloneElement(child, { ref: containerRef });
}
