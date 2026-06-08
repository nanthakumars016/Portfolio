import { useEffect, useRef, useCallback } from "react";

interface SplashCursorProps {
  SIM_RESOLUTION?: number;
  DYE_RESOLUTION?: number;
  CAPTURE_RESOLUTION?: number;
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  PRESSURE?: number;
  PRESSURE_ITERATIONS?: number;
  CURL?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  SHADING?: boolean;
  COLOR_UPDATE_SPEED?: number;
  BACK_COLOR?: { r: number; g: number; b: number };
  TRANSPARENT?: boolean;
}

function getWebGLContext(canvas: HTMLCanvasElement) {
  const params = {
    alpha: true,
    depth: false,
    stencil: false,
    antialias: false,
    preserveDrawingBuffer: false,
  };

  let gl = canvas.getContext("webgl2", params) as WebGL2RenderingContext | null;
  const isWebGL2 = !!gl;

  if (!isWebGL2) {
    gl = (canvas.getContext("webgl", params) ||
      canvas.getContext("experimental-webgl", params)) as WebGL2RenderingContext | null;
  }

  let halfFloat: OES_texture_half_float | null = null;
  let supportLinearFiltering: OES_texture_half_float_linear | null = null;

  if (gl) {
    if (isWebGL2) {
      gl.getExtension("EXT_color_buffer_float");
      supportLinearFiltering = gl.getExtension("OES_texture_float_linear");
    } else {
      halfFloat = gl.getExtension("OES_texture_half_float");
      supportLinearFiltering = gl.getExtension("OES_texture_half_float_linear");
    }
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
  }

  const halfFloatTexType = isWebGL2
    ? (gl as WebGL2RenderingContext)?.HALF_FLOAT
    : halfFloat?.HALF_FLOAT_OES;

  const formatRGBA = getSupportedFormat(
    gl!,
    isWebGL2 ? (gl as WebGL2RenderingContext)?.RGBA16F : gl!.RGBA,
    gl!.RGBA,
    halfFloatTexType!
  );
  const formatRG = getSupportedFormat(
    gl!,
    isWebGL2 ? (gl as WebGL2RenderingContext)?.RG16F : gl!.RGBA,
    isWebGL2 ? (gl as WebGL2RenderingContext)?.RG : gl!.RGBA,
    halfFloatTexType!
  );
  const formatR = getSupportedFormat(
    gl!,
    isWebGL2 ? (gl as WebGL2RenderingContext)?.R16F : gl!.RGBA,
    isWebGL2 ? (gl as WebGL2RenderingContext)?.RED : gl!.RGBA,
    halfFloatTexType!
  );

  return {
    gl,
    ext: {
      formatRGBA,
      formatRG,
      formatR,
      halfFloatTexType,
      supportLinearFiltering,
    },
  };
}

function getSupportedFormat(
  gl: WebGL2RenderingContext,
  internalFormat: number,
  format: number,
  type: number
) {
  if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
    switch (internalFormat) {
      case gl.R16F:
        return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
      case gl.RG16F:
        return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
      default:
        return null;
    }
  }
  return { internalFormat, format };
}

function supportRenderTextureFormat(
  gl: WebGL2RenderingContext,
  internalFormat: number,
  format: number,
  type: number
) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    texture,
    0
  );

  const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  return status === gl.FRAMEBUFFER_COMPLETE;
}

class Material {
  vertexShader: string;
  fragmentShaderSource: string;
  programs: WebGLProgram[];
  activeProgram: WebGLProgram | null;
  uniforms: Record<string, WebGLUniformLocation>;
  gl: WebGL2RenderingContext;

  constructor(gl: WebGL2RenderingContext, vertexShader: string, fragmentShaderSource: string) {
    this.gl = gl;
    this.vertexShader = vertexShader;
    this.fragmentShaderSource = fragmentShaderSource;
    this.programs = [];
    this.activeProgram = null;
    this.uniforms = {};
  }

  setKeywords(keywords: string[]) {
    let hash = 0;
    for (let i = 0; i < keywords.length; i++) hash += hashCode(keywords[i]);

    let program = this.programs[hash];
    if (program == null) {
      const fragmentShader = compileShader(
        this.gl,
        this.gl.FRAGMENT_SHADER,
        this.fragmentShaderSource,
        keywords
      );
      program = createProgram(
        this.gl,
        compileShader(this.gl, this.gl.VERTEX_SHADER, this.vertexShader, []),
        fragmentShader
      );
      this.programs[hash] = program;
    }

    if (program === this.activeProgram) return;

    this.uniforms = getUniforms(this.gl, program);
    this.activeProgram = program;
  }

  bind() {
    if (this.activeProgram) {
      this.gl.useProgram(this.activeProgram);
    }
  }
}

class Program {
  uniforms: Record<string, WebGLUniformLocation>;
  program: WebGLProgram;
  gl: WebGL2RenderingContext;

  constructor(gl: WebGL2RenderingContext, vertexShader: string, fragmentShader: string) {
    this.gl = gl;
    this.uniforms = {};
    this.program = createProgram(
      gl,
      compileShader(gl, gl.VERTEX_SHADER, vertexShader, []),
      compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader, [])
    );
    this.uniforms = getUniforms(gl, this.program);
  }

  bind() {
    this.gl.useProgram(this.program);
  }
}

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
  keywords: string[]
) {
  source = addKeywords(source, keywords);

  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.trace(gl.getShaderInfoLog(shader));
  }

  return shader;
}

function addKeywords(source: string, keywords: string[]) {
  if (keywords == null) return source;
  let keywordsString = "";
  keywords.forEach((keyword) => {
    keywordsString += "#define " + keyword + "\n";
  });
  return keywordsString + source;
}

function createProgram(
  gl: WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
) {
  const program = gl.createProgram()!;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.trace(gl.getProgramInfoLog(program));
  }

  return program;
}

function getUniforms(gl: WebGL2RenderingContext, program: WebGLProgram) {
  const uniforms: Record<string, WebGLUniformLocation> = {};
  const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < uniformCount; i++) {
    const uniformName = gl.getActiveUniform(program, i)?.name;
    if (uniformName) {
      uniforms[uniformName] = gl.getUniformLocation(program, uniformName)!;
    }
  }
  return uniforms;
}

function hashCode(s: string) {
  if (s.length === 0) return 0;
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = (hash << 5) - hash + s.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

export function SplashCursor({
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1440,
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  SHADING = true,
  COLOR_UPDATE_SPEED = 10,
  BACK_COLOR = { r: 0.0, g: 0.0, b: 0.0 },
  TRANSPARENT = true,
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const initializedRef = useRef(false);
  const animationFrameRef = useRef<number>();
  const cleanupRef = useRef<(() => void) | null>(null);
  const retryCountRef = useRef(0);
  const maxRetries = 10;

  const getResolution = useCallback(
    (gl: WebGL2RenderingContext, resolution: number) => {
      let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;

      const min = Math.round(resolution);
      const max = Math.round(resolution * aspectRatio);

      if (gl.drawingBufferWidth > gl.drawingBufferHeight)
        return { width: max, height: min };
      else return { width: min, height: max };
    },
    []
  );

  // Check if canvas has valid dimensions
  const isCanvasReady = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return false;
    
    // Force a reflow to get accurate dimensions
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    
    const hasValidSize = width > 0 && height > 0;
    if (!hasValidSize) {
      console.warn(`Canvas dimensions: ${width}x${height}, waiting... (attempt ${retryCountRef.current + 1}/${maxRetries})`);
      return false;
    }
    
    return true;
  }, [maxRetries]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Function to initialize WebGL
    const initializeWebGL = () => {
      // Check if already initialized
      if (initializedRef.current) return;
      
      // Check retry limit
      if (retryCountRef.current >= maxRetries) {
        console.error('Max retries reached for WebGL initialization. Giving up.');
        return;
      }

      // Validate canvas dimensions
      if (!isCanvasReady()) {
        retryCountRef.current++;
        // Retry with exponential backoff
        const delay = Math.min(200 * Math.pow(1.5, retryCountRef.current), 2000);
        setTimeout(initializeWebGL, delay);
        return;
      }

      // Reset retry count on success
      retryCountRef.current = 0;

      // Set canvas dimensions
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      // Double-check dimensions are valid
      if (canvas.width === 0 || canvas.height === 0) {
        console.error('Canvas dimensions are zero after setting, aborting');
        return;
      }

      const { gl, ext } = getWebGLContext(canvas);
      if (!gl || !ext.formatRGBA || !ext.formatRG || !ext.formatR) {
        console.error('Failed to initialize WebGL context');
        return;
      }

      initializedRef.current = true;

      const config = {
        SIM_RESOLUTION,
        DYE_RESOLUTION,
        DENSITY_DISSIPATION,
        VELOCITY_DISSIPATION,
        PRESSURE,
        PRESSURE_ITERATIONS,
        CURL,
        SPLAT_RADIUS,
        SPLAT_FORCE,
        SHADING,
        COLOR_UPDATE_SPEED,
        BACK_COLOR,
        TRANSPARENT,
      };

      const baseVertexShader = `
        precision highp float;
        attribute vec2 aPosition;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform vec2 texelSize;
        void main () {
          vUv = aPosition * 0.5 + 0.5;
          vL = vUv - vec2(texelSize.x, 0.0);
          vR = vUv + vec2(texelSize.x, 0.0);
          vT = vUv + vec2(0.0, texelSize.y);
          vB = vUv - vec2(0.0, texelSize.y);
          gl_Position = vec4(aPosition, 0.0, 1.0);
        }
      `;

      const copyShader = `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;
        void main () {
          gl_FragColor = texture2D(uTexture, vUv);
        }
      `;

      const clearShader = `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;
        uniform float value;
        void main () {
          gl_FragColor = value * texture2D(uTexture, vUv);
        }
      `;

      const displayShaderSource = `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uTexture;
        #ifdef SHADING
          uniform vec2 texelSize;
        #endif
        void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          #ifdef SHADING
            vec3 lc = texture2D(uTexture, vL).rgb;
            vec3 rc = texture2D(uTexture, vR).rgb;
            vec3 tc = texture2D(uTexture, vT).rgb;
            vec3 bc = texture2D(uTexture, vB).rgb;
            float dx = length(rc) - length(lc);
            float dy = length(tc) - length(bc);
            vec3 n = normalize(vec3(dx, dy, length(texelSize)));
            vec3 l = vec3(0.0, 0.0, 1.0);
            float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
            c *= diffuse;
          #endif
          float a = max(c.r, max(c.g, c.b));
          gl_FragColor = vec4(c, a);
        }
      `;

      const splatShader = `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uTarget;
        uniform float aspectRatio;
        uniform vec3 color;
        uniform vec2 point;
        uniform float radius;
        void main () {
          vec2 p = vUv - point.xy;
          p.x *= aspectRatio;
          vec3 splat = exp(-dot(p, p) / radius) * color;
          vec3 base = texture2D(uTarget, vUv).xyz;
          gl_FragColor = vec4(base + splat, 1.0);
        }
      `;

      const advectionShader = `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uVelocity;
        uniform sampler2D uSource;
        uniform vec2 texelSize;
        uniform vec2 dyeTexelSize;
        uniform float dt;
        uniform float dissipation;
        vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
          vec2 st = uv / tsize - 0.5;
          vec2 iuv = floor(st);
          vec2 fuv = fract(st);
          vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
          vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
          vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
          vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
          return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
        }
        void main () {
          #ifdef MANUAL_FILTERING
            vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
            vec4 result = bilerp(uSource, coord, dyeTexelSize);
          #else
            vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
            vec4 result = texture2D(uSource, coord);
          #endif
          float decay = 1.0 + dissipation * dt;
          gl_FragColor = result / decay;
        }
      `;

      const divergenceShader = `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;
        void main () {
          float L = texture2D(uVelocity, vL).x;
          float R = texture2D(uVelocity, vR).x;
          float T = texture2D(uVelocity, vT).y;
          float B = texture2D(uVelocity, vB).y;
          vec2 C = texture2D(uVelocity, vUv).xy;
          if (vL.x < 0.0) { L = -C.x; }
          if (vR.x > 1.0) { R = -C.x; }
          if (vT.y > 1.0) { T = -C.y; }
          if (vB.y < 0.0) { B = -C.y; }
          float div = 0.5 * (R - L + T - B);
          gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
        }
      `;

      const curlShader = `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;
        void main () {
          float L = texture2D(uVelocity, vL).y;
          float R = texture2D(uVelocity, vR).y;
          float T = texture2D(uVelocity, vT).x;
          float B = texture2D(uVelocity, vB).x;
          float vorticity = R - L - T + B;
          gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
        }
      `;

      const vorticityShader = `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uVelocity;
        uniform sampler2D uCurl;
        uniform float curl;
        uniform float dt;
        void main () {
          float L = texture2D(uCurl, vL).x;
          float R = texture2D(uCurl, vR).x;
          float T = texture2D(uCurl, vT).x;
          float B = texture2D(uCurl, vB).x;
          float C = texture2D(uCurl, vUv).x;
          vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
          force /= length(force) + 0.0001;
          force *= curl * C;
          force.y *= -1.0;
          vec2 velocity = texture2D(uVelocity, vUv).xy;
          velocity += force * dt;
          velocity = min(max(velocity, -1000.0), 1000.0);
          gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `;

      const pressureShader = `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uDivergence;
        void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          float C = texture2D(uPressure, vUv).x;
          float divergence = texture2D(uDivergence, vUv).x;
          float pressure = (L + R + B + T - divergence) * 0.25;
          gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
        }
      `;

      const gradientSubtractShader = `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uVelocity;
        void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          vec2 velocity = texture2D(uVelocity, vUv).xy;
          velocity.xy -= vec2(R - L, T - B);
          gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `;

      const copyProgram = new Program(gl, baseVertexShader, copyShader);
      const clearProgram = new Program(gl, baseVertexShader, clearShader);
      const splatProgram = new Program(gl, baseVertexShader, splatShader);
      const advectionProgram = new Program(gl, baseVertexShader, advectionShader);
      const divergenceProgram = new Program(gl, baseVertexShader, divergenceShader);
      const curlProgram = new Program(gl, baseVertexShader, curlShader);
      const vorticityProgram = new Program(gl, baseVertexShader, vorticityShader);
      const pressureProgram = new Program(gl, baseVertexShader, pressureShader);
      const gradientSubtractProgram = new Program(gl, baseVertexShader, gradientSubtractShader);
      const displayMaterial = new Material(gl, baseVertexShader, displayShaderSource);

      function createFBO(
        gl: WebGL2RenderingContext,
        w: number,
        h: number,
        internalFormat: number,
        format: number,
        type: number,
        filtering: number
      ) {
        // Ensure dimensions are positive
        if (w === 0 || h === 0) {
          console.error('Cannot create FBO with zero dimensions');
          return null as any;
        }

        gl.activeTexture(gl.TEXTURE0);
        const texture = gl.createTexture()!;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filtering);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filtering);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

        const fbo = gl.createFramebuffer()!;
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        gl.viewport(0, 0, w, h);
        gl.clear(gl.COLOR_BUFFER_BIT);

        const texelSizeX = 1.0 / w;
        const texelSizeY = 1.0 / h;

        return {
          texture,
          fbo,
          width: w,
          height: h,
          texelSizeX,
          texelSizeY,
          attach(id: number) {
            gl.activeTexture(gl.TEXTURE0 + id);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            return id;
          },
        };
      }

      function createDoubleFBO(
        gl: WebGL2RenderingContext,
        w: number,
        h: number,
        internalFormat: number,
        format: number,
        type: number,
        filtering: number
      ) {
        let fbo1 = createFBO(gl, w, h, internalFormat, format, type, filtering);
        let fbo2 = createFBO(gl, w, h, internalFormat, format, type, filtering);

        return {
          width: w,
          height: h,
          texelSizeX: fbo1?.texelSizeX || 0,
          texelSizeY: fbo1?.texelSizeY || 0,
          get read() {
            return fbo1;
          },
          set read(value) {
            fbo1 = value;
          },
          get write() {
            return fbo2;
          },
          set write(value) {
            fbo2 = value;
          },
          swap() {
            const temp = fbo1;
            fbo1 = fbo2;
            fbo2 = temp;
          },
        };
      }

      const blit = (() => {
        const quadVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, quadVertexBuffer);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
          gl.STATIC_DRAW
        );

        const quadElementBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, quadElementBuffer);
        gl.bufferData(
          gl.ELEMENT_ARRAY_BUFFER,
          new Uint16Array([0, 1, 2, 0, 2, 3]),
          gl.STATIC_DRAW
        );

        return (target: { fbo: WebGLFramebuffer; width: number; height: number } | null, clear = false) => {
          if (target == null) {
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
          } else {
            gl.viewport(0, 0, target.width, target.height);
            gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
          }
          if (clear) {
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
          }
          gl.bindBuffer(gl.ARRAY_BUFFER, quadVertexBuffer);
          gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
          gl.enableVertexAttribArray(0);
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, quadElementBuffer);
          gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
        };
      })();

      const simRes = getResolution(gl, config.SIM_RESOLUTION);
      const dyeRes = getResolution(gl, config.DYE_RESOLUTION);

      const texType = ext.halfFloatTexType!;
      const rgba = ext.formatRGBA!;
      const rg = ext.formatRG!;
      const r = ext.formatR!;
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

      let dye = createDoubleFBO(
        gl,
        dyeRes.width,
        dyeRes.height,
        rgba.internalFormat,
        rgba.format,
        texType,
        filtering
      );
      let velocity = createDoubleFBO(
        gl,
        simRes.width,
        simRes.height,
        rg.internalFormat,
        rg.format,
        texType,
        filtering
      );
      let divergence = createFBO(
        gl,
        simRes.width,
        simRes.height,
        r.internalFormat,
        r.format,
        texType,
        gl.NEAREST
      );
      let curl = createFBO(
        gl,
        simRes.width,
        simRes.height,
        r.internalFormat,
        r.format,
        texType,
        gl.NEAREST
      );
      let pressure = createDoubleFBO(
        gl,
        simRes.width,
        simRes.height,
        r.internalFormat,
        r.format,
        texType,
        gl.NEAREST
      );

      const pointers: {
        id: number;
        texcoordX: number;
        texcoordY: number;
        prevTexcoordX: number;
        prevTexcoordY: number;
        deltaX: number;
        deltaY: number;
        down: boolean;
        moved: boolean;
        color: { r: number; g: number; b: number };
      }[] = [];

      pointers.push({
        id: -1,
        texcoordX: 0,
        texcoordY: 0,
        prevTexcoordX: 0,
        prevTexcoordY: 0,
        deltaX: 0,
        deltaY: 0,
        down: false,
        moved: false,
        color: { r: 0.3, g: 0, b: 0.5 },
      });

      function HSVtoRGB(h: number, s: number, v: number) {
        let r = 0, g = 0, b = 0;
        const i = Math.floor(h * 6);
        const f = h * 6 - i;
        const p = v * (1 - s);
        const q = v * (1 - f * s);
        const t = v * (1 - (1 - f) * s);
        switch (i % 6) {
          case 0: r = v; g = t; b = p; break;
          case 1: r = q; g = v; b = p; break;
          case 2: r = p; g = v; b = t; break;
          case 3: r = p; g = q; b = v; break;
          case 4: r = t; g = p; b = v; break;
          case 5: r = v; g = p; b = q; break;
        }
        return { r, g, b };
      }

      function generateColor() {
        const c = HSVtoRGB(Math.random(), 1.0, 1.0);
        c.r *= 0.15;
        c.g *= 0.15;
        c.b *= 0.15;
        return c;
      }

      function correctDeltaX(delta: number) {
        const aspectRatio = canvas.width / canvas.height;
        if (aspectRatio < 1) delta *= aspectRatio;
        return delta;
      }

      function correctDeltaY(delta: number) {
        const aspectRatio = canvas.width / canvas.height;
        if (aspectRatio > 1) delta /= aspectRatio;
        return delta;
      }

      function updatePointerMoveData(
        pointer: (typeof pointers)[0],
        posX: number,
        posY: number
      ) {
        pointer.prevTexcoordX = pointer.texcoordX;
        pointer.prevTexcoordY = pointer.texcoordY;
        pointer.texcoordX = posX / canvas.width;
        pointer.texcoordY = 1.0 - posY / canvas.height;
        pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
        pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
        pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
      }

      function splatPointer(pointer: (typeof pointers)[0]) {
        const dx = pointer.deltaX * config.SPLAT_FORCE;
        const dy = pointer.deltaY * config.SPLAT_FORCE;
        splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
      }

      function splat(x: number, y: number, dx: number, dy: number, color: { r: number; g: number; b: number }) {
        splatProgram.bind();
        gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
        gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
        gl.uniform2f(splatProgram.uniforms.point, x, y);
        gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
        gl.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100.0));
        blit(velocity.write);
        velocity.swap();

        gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
        gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
        blit(dye.write);
        dye.swap();
      }

      function correctRadius(radius: number) {
        const aspectRatio = canvas.width / canvas.height;
        if (aspectRatio > 1) radius *= aspectRatio;
        return radius;
      }

      function step(dt: number) {
        gl.disable(gl.BLEND);

        curlProgram.bind();
        gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
        blit(curl);

        vorticityProgram.bind();
        gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
        gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
        gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
        gl.uniform1f(vorticityProgram.uniforms.dt, dt);
        blit(velocity.write);
        velocity.swap();

        divergenceProgram.bind();
        gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
        blit(divergence);

        clearProgram.bind();
        gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
        gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
        blit(pressure.write);
        pressure.swap();

        pressureProgram.bind();
        gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
        for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
          gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
          blit(pressure.write);
          pressure.swap();
        }

        gradientSubtractProgram.bind();
        gl.uniform2f(
          gradientSubtractProgram.uniforms.texelSize,
          velocity.texelSizeX,
          velocity.texelSizeY
        );
        gl.uniform1i(gradientSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
        gl.uniform1i(gradientSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
        blit(velocity.write);
        velocity.swap();

        advectionProgram.bind();
        gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        if (!ext.supportLinearFiltering)
          gl.uniform2f(
            advectionProgram.uniforms.dyeTexelSize,
            velocity.texelSizeX,
            velocity.texelSizeY
          );
        const velocityId = velocity.read.attach(0);
        gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
        gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
        gl.uniform1f(advectionProgram.uniforms.dt, dt);
        gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
        blit(velocity.write);
        velocity.swap();

        if (!ext.supportLinearFiltering)
          gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
        gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
        gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
        gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
        blit(dye.write);
        dye.swap();
      }

      function render() {
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);

        const keywords = config.SHADING ? ["SHADING"] : [];
        displayMaterial.setKeywords(keywords);
        displayMaterial.bind();
        if (config.SHADING)
          gl.uniform2f(displayMaterial.uniforms.texelSize, 1.0 / gl.drawingBufferWidth, 1.0 / gl.drawingBufferHeight);
        gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
        blit(null);
      }

      let colorUpdateTimer = 0;
      let lastUpdateTime = Date.now();

      function update() {
        if (!initializedRef.current) return;
        
        const now = Date.now();
        let dt = (now - lastUpdateTime) / 1000;
        dt = Math.min(dt, 0.016666);
        lastUpdateTime = now;

        // Update canvas dimensions if changed
        if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
          const newWidth = canvas.clientWidth;
          const newHeight = canvas.clientHeight;
          
          if (newWidth > 0 && newHeight > 0) {
            canvas.width = newWidth;
            canvas.height = newHeight;
            
            // Recreate framebuffers with new dimensions
            const newSimRes = getResolution(gl, config.SIM_RESOLUTION);
            const newDyeRes = getResolution(gl, config.DYE_RESOLUTION);
            
            // Recreate the framebuffers with new dimensions
            dye = createDoubleFBO(
              gl,
              newDyeRes.width,
              newDyeRes.height,
              rgba.internalFormat,
              rgba.format,
              texType,
              filtering
            );
            velocity = createDoubleFBO(
              gl,
              newSimRes.width,
              newSimRes.height,
              rg.internalFormat,
              rg.format,
              texType,
              filtering
            );
            divergence = createFBO(
              gl,
              newSimRes.width,
              newSimRes.height,
              r.internalFormat,
              r.format,
              texType,
              gl.NEAREST
            );
            curl = createFBO(
              gl,
              newSimRes.width,
              newSimRes.height,
              r.internalFormat,
              r.format,
              texType,
              gl.NEAREST
            );
            pressure = createDoubleFBO(
              gl,
              newSimRes.width,
              newSimRes.height,
              r.internalFormat,
              r.format,
              texType,
              gl.NEAREST
            );
          }
        }

        colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
        if (colorUpdateTimer >= 1) {
          colorUpdateTimer = 0;
          pointers.forEach((p) => {
            p.color = generateColor();
          });
        }

        pointers.forEach((p) => {
          if (p.moved) {
            p.moved = false;
            splatPointer(p);
          }
        });

        step(dt);
        render();
        animationFrameRef.current = requestAnimationFrame(update);
      }

      const onMouseMove = (e: MouseEvent) => {
        const pointer = pointers[0];
        updatePointerMoveData(pointer, e.offsetX, e.offsetY);
      };

      const onMouseDown = () => {
        pointers[0].down = true;
        pointers[0].color = generateColor();
      };

      const onMouseUp = () => {
        pointers[0].down = false;
      };

      const onTouchMove = (e: TouchEvent) => {
        e.preventDefault();
        const touches = e.targetTouches;
        const touch = touches[0];
        const rect = canvas.getBoundingClientRect();
        updatePointerMoveData(
          pointers[0],
          touch.pageX - rect.left,
          touch.pageY - rect.top
        );
      };

      canvas.addEventListener("mousemove", onMouseMove);
      canvas.addEventListener("mousedown", onMouseDown);
      canvas.addEventListener("mouseup", onMouseUp);
      canvas.addEventListener("touchmove", onTouchMove, { passive: false });

      update();

      // Store cleanup function
      cleanupRef.current = () => {
        canvas.removeEventListener("mousemove", onMouseMove);
        canvas.removeEventListener("mousedown", onMouseDown);
        canvas.removeEventListener("mouseup", onMouseUp);
        canvas.removeEventListener("touchmove", onTouchMove);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    };

    // Start initialization with a delay
    const timeoutId = setTimeout(initializeWebGL, 500);

    return () => {
      clearTimeout(timeoutId);
      if (cleanupRef.current) {
        cleanupRef.current();
      }
      initializedRef.current = false;
      retryCountRef.current = 0;
    };
  }, [getResolution, SIM_RESOLUTION, DYE_RESOLUTION, DENSITY_DISSIPATION, VELOCITY_DISSIPATION, PRESSURE, PRESSURE_ITERATIONS, CURL, SPLAT_RADIUS, SPLAT_FORCE, SHADING, COLOR_UPDATE_SPEED, BACK_COLOR, TRANSPARENT, isCanvasReady]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-auto z-0"
      style={{ 
        touchAction: "none",
        minWidth: "100px",
        minHeight: "100px",
        opacity: initializedRef.current ? 1 : 0
      }}
    />
  );
}

export default SplashCursor;