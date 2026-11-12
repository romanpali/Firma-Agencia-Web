// The hero's blue/violet silk (WebGL), reusable: renders small, ~40 fps, only while `visible()` is true.
const VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
const FS = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 res;
uniform float t;
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main(){
  vec2 uv = gl_FragCoord.xy / res.y;
  vec2 p = uv * 1.7;
  float a = t * .3;
  for (int i = 1; i < 5; i++) {
    float k = float(i);
    p += .42 / (k * k) * vec2(sin(k * 1.7 * p.y + a + k), sin(k * 1.5 * p.x - a * .8 + k * 1.7)) * 2.1;
  }
  float f = .5 + .5 * sin(p.x * 2.4 + p.y * 1.3 + a * .4);
  vec3 purple = vec3(.43, .35, .66);
  vec3 deep   = vec3(.10, .28, .70);
  vec3 light  = vec3(.23, .39, .79);
  vec3 blue = mix(light, deep, smoothstep(.5, .85, f));
  vec3 col = mix(purple, blue, smoothstep(.26, .56, f));
  col += vec3(.04, .06, .13) * exp(-pow((f - .46) * 9., 2.));
  col += (hash(gl_FragCoord.xy + t) - .5) / 128.;
  gl_FragColor = vec4(col, 1.);
}`;

export function mountSilk(canvas: HTMLCanvasElement, visible: () => boolean, reduced = false) {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance' });
  if (!gl) return null;
  const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const uRes = gl.getUniformLocation(prog, 'res');
  const uT = gl.getUniformLocation(prog, 't');
  const draw = (t: number) => { gl.uniform1f(uT, t); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); };
  const fit = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    const k = Math.min(1, Math.sqrt(0.6e6 / Math.max(1, w * h)));
    canvas.width = Math.max(1, Math.round(w * k)); canvas.height = Math.max(1, Math.round(h * k));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    draw(7);
  };
  fit();
  addEventListener('resize', fit);
  let last = -1e9;
  return (t: number) => { if (reduced || !visible() || t - last < 24) return; last = t; draw(t / 1000 + 7); };
}
