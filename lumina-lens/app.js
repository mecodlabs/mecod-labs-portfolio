/**
 * LUMINA LENS — STUDIO ENGINE
 * High-End Creative Studio / Analog Film Emulation & Applied AI Engine
 * 
 * Architecture:
 * - LuminaApp (Controller & State Management)
 * - StudioCanvas (Viewport, Pan/Zoom, Overlays & Split Comparison)
 * - ImageProcessor (Tactile Tone Filters & Procedural Silver Grain Generator)
 * - PaletteExtractor (K-Means LAB/RGB Harmonic Palette Clustering)
 * - AIVisionEngine (Algorithmic Scene Comprehension & Semantic Tags)
 * - ExportStudio (Editorial Gallery Card Generator & High-Res PNG Exporter)
 * - SamplePhotoGenerator (Deterministic Procedural Artworks & Unsplash Fetcher)
 */

'use strict';

// ============================================================================
// 1. DATA MODELS & PRESETS
// ============================================================================

const FILM_PRESETS = {
  portra400: {
    id: 'portra400',
    name: 'Kodak Portra 400',
    tag: 'Warm / Soft',
    exposure: 0.25,
    contrast: 8,
    highlights: -15,
    shadows: 14,
    temperature: 15,
    tint: 4,
    saturation: -4,
    vibrance: 16,
    vignette: 15,
    grain: 22,
    grainSize: 24,
    exif: {
      body: 'Leica M11',
      lens: 'Summilux-M 35mm f/1.4 ASPH',
      aperture: 'f/1.4',
      shutter: '1/500s',
      iso: 'ISO 400'
    }
  },
  monochrom: {
    id: 'monochrom',
    name: 'Leica M-Monochrom',
    tag: 'B&W / Silver',
    exposure: 0.05,
    contrast: 34,
    highlights: 10,
    shadows: -18,
    temperature: 0,
    tint: 0,
    saturation: -100,
    vibrance: -100,
    vignette: 28,
    grain: 34,
    grainSize: 26,
    exif: {
      body: 'Leica M11 Monochrom',
      lens: 'APO-Summicron-M 50mm f/2 ASPH',
      aperture: 'f/2.0',
      shutter: '1/1000s',
      iso: 'ISO 200'
    }
  },
  cinestill800t: {
    id: 'cinestill800t',
    name: 'CineStill 800T',
    tag: 'Tungsten / Halation',
    exposure: 0.15,
    contrast: 18,
    highlights: 22,
    shadows: -8,
    temperature: -22,
    tint: 12,
    saturation: 18,
    vibrance: 24,
    vignette: 32,
    grain: 38,
    grainSize: 32,
    exif: {
      body: 'Leica MP Analog',
      lens: 'Noctilux-M 50mm f/0.95 ASPH',
      aperture: 'f/0.95',
      shutter: '1/250s',
      iso: 'ISO 800'
    }
  },
  velvia50: {
    id: 'velvia50',
    name: 'Fuji Velvia 50',
    tag: 'Vivid Chromatic',
    exposure: -0.10,
    contrast: 26,
    highlights: -10,
    shadows: -14,
    temperature: 8,
    tint: -14,
    saturation: 42,
    vibrance: 36,
    vignette: 20,
    grain: 14,
    grainSize: 18,
    exif: {
      body: 'Hasselblad 907X 50C',
      lens: 'XCD 38mm f/2.5 V',
      aperture: 'f/4.0',
      shutter: '1/125s',
      iso: 'ISO 50'
    }
  },
  neutral: {
    id: 'neutral',
    name: 'Natural Studio',
    tag: 'Linear Clean',
    exposure: 0.0,
    contrast: 0,
    highlights: 0,
    shadows: 0,
    temperature: 0,
    tint: 0,
    saturation: 0,
    vibrance: 0,
    vignette: 0,
    grain: 0,
    grainSize: 20,
    exif: {
      body: 'Leica SL3',
      lens: 'Vario-Elmarit-SL 24-70mm f/2.8',
      aperture: 'f/2.8',
      shutter: '1/500s',
      iso: 'ISO 100'
    }
  }
};

// ============================================================================
// 2. PROCEDURAL & CURATED SAMPLE PHOTO GENERATOR
// ============================================================================
class SamplePhotoGenerator {
  /**
   * Generates high-definition photographic canvas completely offline,
   * guaranteeing instantaneous zero-CORS operation across all environments.
   */
  static createArchitecturalGeometry() {
    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1280;
    const ctx = canvas.getContext('2d');

    // Sky backdrop gradient
    const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
    sky.addColorStop(0, '#0F2B48');
    sky.addColorStop(0.5, '#386B94');
    sky.addColorStop(1, '#8BAEC8');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Monolithic skyscraper towers
    ctx.save();
    // Tower 1 (Left angular glass structure)
    ctx.beginPath();
    ctx.moveTo(120, canvas.height);
    ctx.lineTo(380, 240);
    ctx.lineTo(760, 320);
    ctx.lineTo(820, canvas.height);
    ctx.closePath();
    const towerGrad1 = ctx.createLinearGradient(200, 240, 800, canvas.height);
    towerGrad1.addColorStop(0, '#1E293B');
    towerGrad1.addColorStop(0.5, '#0F172A');
    towerGrad1.addColorStop(1, '#020617');
    ctx.fillStyle = towerGrad1;
    ctx.fill();

    // Tower 1 Glass Facade reflections & structural mullions
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.lineWidth = 2;
    for (let y = 300; y < canvas.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(180 + (y - 300) * 0.25, y);
      ctx.lineTo(780 + (y - 300) * 0.05, y + 20);
      ctx.stroke();
    }
    for (let x = 240; x < 760; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 260 + (x - 240) * 0.15);
      ctx.lineTo(x + 50, canvas.height);
      ctx.stroke();
    }

    // Tower 2 (Center-Right Hero High-Rise with golden sun reflection)
    ctx.beginPath();
    ctx.moveTo(680, canvas.height);
    ctx.lineTo(840, 140);
    ctx.lineTo(1420, 200);
    ctx.lineTo(1580, canvas.height);
    ctx.closePath();
    const towerGrad2 = ctx.createLinearGradient(840, 140, 1500, canvas.height);
    towerGrad2.addColorStop(0, '#475569');
    towerGrad2.addColorStop(0.3, '#334155');
    towerGrad2.addColorStop(0.8, '#1E2430');
    ctx.fillStyle = towerGrad2;
    ctx.fill();

    // Specular golden reflection streak
    const sunGlow = ctx.createLinearGradient(960, 140, 1200, 600);
    sunGlow.addColorStop(0, 'rgba(251, 191, 36, 0.7)');
    sunGlow.addColorStop(0.4, 'rgba(245, 158, 11, 0.3)');
    sunGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = sunGlow;
    ctx.beginPath();
    ctx.moveTo(980, 160);
    ctx.lineTo(1180, 180);
    ctx.lineTo(1320, 700);
    ctx.lineTo(1040, 680);
    ctx.closePath();
    ctx.fill();

    // Geometric diagonal trusses
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.lineWidth = 3;
    for (let y = 180; y < canvas.height; y += 70) {
      ctx.beginPath();
      ctx.moveTo(820, y);
      ctx.lineTo(1460, y + 50);
      ctx.stroke();
    }
    for (let x = 860; x < 1440; x += 90) {
      ctx.beginPath();
      ctx.moveTo(x, 160);
      ctx.lineTo(x + 120, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + 120, 160);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // Concrete Foreground cantilever
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 180);
    ctx.lineTo(600, canvas.height - 320);
    ctx.lineTo(canvas.width, canvas.height - 120);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fillStyle = '#0B0F19';
    ctx.fill();
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.restore();
    return canvas;
  }

  static createGoldenHourPortrait() {
    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1280;
    const ctx = canvas.getContext('2d');

    // Rich warm sunset gradient background
    const bg = ctx.createRadialGradient(
      canvas.width * 0.72, canvas.height * 0.35, 80,
      canvas.width * 0.5, canvas.height * 0.5, 1200
    );
    bg.addColorStop(0, '#FFFBEB');
    bg.addColorStop(0.15, '#FDE68A');
    bg.addColorStop(0.35, '#F59E0B');
    bg.addColorStop(0.65, '#B45309');
    bg.addColorStop(0.85, '#451A03');
    bg.addColorStop(1, '#1A0C06');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Creamy Bokeh Circles
    const bokehList = [
      { x: 340, y: 380, r: 85, a: 0.25, c: '#FEF08A' },
      { x: 520, y: 240, r: 120, a: 0.30, c: '#FBBF24' },
      { x: 220, y: 640, r: 160, a: 0.18, c: '#EA580C' },
      { x: 800, y: 180, r: 90, a: 0.35, c: '#FDE047' },
      { x: 1420, y: 320, r: 110, a: 0.28, c: '#F59E0B' },
      { x: 1640, y: 520, r: 180, a: 0.22, c: '#DC2626' },
      { x: 1250, y: 780, r: 140, a: 0.15, c: '#D97706' },
      { x: 420, y: 880, r: 210, a: 0.12, c: '#9A3412' }
    ];

    bokehList.forEach(b => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = b.c;
      ctx.globalAlpha = b.a;
      ctx.shadowColor = b.c;
      ctx.shadowBlur = 40;
      ctx.fill();
      ctx.restore();
    });

    // Silhouette & Warm Rim-lit Street Portrait Figure
    ctx.save();
    const cx = canvas.width * 0.44;
    const cy = canvas.height * 0.62;

    // Body silhouette
    ctx.beginPath();
    ctx.moveTo(cx - 240, canvas.height);
    ctx.bezierCurveTo(cx - 220, cy + 180, cx - 180, cy + 90, cx - 120, cy + 60);
    // Neck & Head
    ctx.bezierCurveTo(cx - 70, cy + 40, cx - 60, cy - 20, cx - 60, cy - 100);
    ctx.bezierCurveTo(cx - 60, cy - 220, cx + 80, cy - 220, cx + 110, cy - 120);
    // Face profile & Nose/Lips
    ctx.bezierCurveTo(cx + 120, cy - 80, cx + 140, cy - 40, cx + 110, cy - 20);
    ctx.bezierCurveTo(cx + 80, cy + 10, cx + 90, cy + 60, cx + 160, cy + 110);
    ctx.bezierCurveTo(cx + 220, cy + 160, cx + 280, cy + 280, cx + 320, canvas.height);
    ctx.closePath();

    const silhouetteGrad = ctx.createLinearGradient(cx - 100, cy - 200, cx + 200, cy + 300);
    silhouetteGrad.addColorStop(0, '#26140A');
    silhouetteGrad.addColorStop(0.5, '#190B04');
    silhouetteGrad.addColorStop(1, '#0B0502');
    ctx.fillStyle = silhouetteGrad;
    ctx.fill();

    // Intense Golden Rim Light / Backlight Halo on Profile
    ctx.strokeStyle = 'rgba(254, 240, 138, 0.95)';
    ctx.lineWidth = 14;
    ctx.shadowColor = '#F59E0B';
    ctx.shadowBlur = 35;
    ctx.beginPath();
    ctx.moveTo(cx - 40, cy - 200);
    ctx.bezierCurveTo(cx + 60, cy - 220, cx + 105, cy - 130, cx + 105, cy - 100);
    ctx.bezierCurveTo(cx + 115, cy - 70, cx + 135, cy - 40, cx + 105, cy - 20);
    ctx.stroke();

    // Hair luminous strands
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.6)';
    ctx.lineWidth = 4;
    for (let i = 0; i < 24; i++) {
      ctx.beginPath();
      const ox = cx + 80 + Math.random() * 40;
      const oy = cy - 180 + Math.random() * 120;
      ctx.moveTo(ox, oy);
      ctx.quadraticCurveTo(ox + 40, oy + 30, ox + 60 + Math.random() * 40, oy + 80);
      ctx.stroke();
    }

    // Cinematic Anamorphic Golden Lens Flare
    const flareGrad = ctx.createLinearGradient(0, cy - 60, canvas.width, cy - 60);
    flareGrad.addColorStop(0, 'rgba(245, 158, 11, 0)');
    flareGrad.addColorStop(0.4, 'rgba(253, 230, 138, 0.25)');
    flareGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.75)');
    flareGrad.addColorStop(0.8, 'rgba(245, 158, 11, 0.3)');
    flareGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
    ctx.fillStyle = flareGrad;
    ctx.fillRect(0, cy - 80, canvas.width, 36);

    ctx.restore();
    return canvas;
  }

  static createTokyoRainStreet() {
    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1280;
    const ctx = canvas.getContext('2d');

    // Deep obsidian rain-soaked night sky
    const night = ctx.createLinearGradient(0, 0, 0, canvas.height);
    night.addColorStop(0, '#04070D');
    night.addColorStop(0.4, '#090E17');
    night.addColorStop(0.65, '#0E1726');
    night.addColorStop(1, '#030508');
    ctx.fillStyle = night;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Neon Vertical Alley Signs (Shinjuku aesthetic)
    const signs = [
      { x: 260, y: 160, w: 90, h: 320, color: '#EC4899', glow: '#F43F5E', text: '東京' },
      { x: 380, y: 220, w: 75, h: 260, color: '#06B6D4', glow: '#0EA5E9', text: 'BAR' },
      { x: 1360, y: 140, w: 100, h: 360, color: '#F59E0B', glow: '#EAB308', text: '新宿' },
      { x: 1510, y: 200, w: 85, h: 280, color: '#10B981', glow: '#059669', text: 'RAMEN' },
      { x: 1640, y: 280, w: 70, h: 240, color: '#8B5CF6', glow: '#A855F7', text: '夜' }
    ];

    signs.forEach(s => {
      ctx.save();
      // Outer neon glow box
      ctx.shadowColor = s.glow;
      ctx.shadowBlur = 35;
      ctx.fillStyle = s.color;
      ctx.fillRect(s.x, s.y, s.w, s.h);

      // Inner glass core
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillRect(s.x + 8, s.y + 8, s.w - 16, s.h - 16);

      // Sign typography
      ctx.fillStyle = s.color;
      ctx.font = 'bold 36px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(s.text, s.x + s.w / 2, s.y + s.h / 2);
      ctx.restore();
    });

    // Alleyway Perspective Buildings
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(520, canvas.height * 0.62);
    ctx.lineTo(0, canvas.height * 0.62);
    ctx.closePath();
    ctx.fillStyle = '#080C14';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(canvas.width, 0);
    ctx.lineTo(canvas.width - 520, canvas.height * 0.62);
    ctx.lineTo(canvas.width, canvas.height * 0.62);
    ctx.closePath();
    ctx.fillStyle = '#080C14';
    ctx.fill();

    // Rain-soaked wet asphalt ground with neon mirror reflections
    const groundY = canvas.height * 0.62;
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(canvas.width, groundY);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fillStyle = '#05070B';
    ctx.fill();

    // Stretched neon reflections on puddle-slick street
    signs.forEach(s => {
      ctx.save();
      const rx = s.x;
      const rw = s.w;
      const refGrad = ctx.createLinearGradient(rx, groundY, rx, canvas.height);
      refGrad.addColorStop(0, s.glow);
      refGrad.addColorStop(0.3, s.color);
      refGrad.addColorStop(0.8, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = refGrad;
      ctx.globalAlpha = 0.45;
      ctx.fillRect(rx - 15, groundY, rw + 30, canvas.height - groundY);

      // Ripple lines across reflection
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1.5;
      for (let y = groundY + 20; y < canvas.height; y += 18) {
        ctx.beginPath();
        ctx.moveTo(rx - 25, y);
        ctx.lineTo(rx + rw + 25, y);
        ctx.stroke();
      }
      ctx.restore();
    });

    // Diagonal rain streaks across frame
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 400; i++) {
      const rx = Math.random() * canvas.width;
      const ry = Math.random() * canvas.height;
      const len = 25 + Math.random() * 35;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx - 12, ry + len);
      ctx.stroke();
    }
    ctx.restore();

    return canvas;
  }
}

// ============================================================================
// 3. IMAGE PROCESSOR (TACTILE FILTERS & PROCEDURAL FILM GRAIN ENGINE)
// ============================================================================
class ImageProcessor {
  constructor() {
    this.masterCanvas = document.createElement('canvas');
    this.masterCtx = this.masterCanvas.getContext('2d', { willReadFrequently: true });
    
    // Fast preview canvas for responsive 60fps adjustments
    this.previewCanvas = document.createElement('canvas');
    this.previewCtx = this.previewCanvas.getContext('2d', { willReadFrequently: true });

    this.originalImage = null;
    this.isProcessing = false;
    this.rafPending = false;

    // Active adjustment parameters
    this.params = {
      exposure: 0.0,
      contrast: 0,
      highlights: 0,
      shadows: 0,
      temperature: 0,
      tint: 0,
      saturation: 0,
      vibrance: 0,
      vignette: 0,
      grain: 18,
      grainSize: 24
    };

    // Precomputed film grain noise cache for 60fps performance
    this.grainCache = this._createGrainTile(256, 256);
  }

  loadSourceImage(img) {
    this.originalImage = img;
    const w = img.naturalWidth || img.width;
    const h = img.naturalHeight || img.height;

    // Setup master resolution
    this.masterCanvas.width = w;
    this.masterCanvas.height = h;
    this.masterCtx.drawImage(img, 0, 0, w, h);

    // Setup display preview resolution (capped to 1920px max dimension for buttery 60fps)
    const maxDim = 1920;
    let pw = w;
    let ph = h;
    if (pw > maxDim || ph > maxDim) {
      if (pw > ph) {
        ph = Math.round((ph * maxDim) / pw);
        pw = maxDim;
      } else {
        pw = Math.round((pw * maxDim) / ph);
        ph = maxDim;
      }
    }
    this.previewCanvas.width = pw;
    this.previewCanvas.height = ph;
    this.previewCtx.drawImage(img, 0, 0, pw, ph);

    // Cache unedited original pixel data
    this.originalData = this.previewCtx.getImageData(0, 0, pw, ph);
  }

  setParam(name, value) {
    this.params[name] = value;
  }

  applyPreset(preset) {
    Object.keys(this.params).forEach(key => {
      if (preset[key] !== undefined) {
        this.params[key] = preset[key];
      }
    });
  }

  /**
   * Generates a 2D tile of stochastic silver-halide organic grain noise.
   */
  _createGrainTile(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      // Gaussian noise simulation via Box-Muller transform
      const u1 = Math.random() || 0.0001;
      const u2 = Math.random() || 0.0001;
      const randStdNormal = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
      const val = Math.min(255, Math.max(0, 128 + randStdNormal * 42));

      data[i] = val;     // R
      data[i + 1] = val; // G
      data[i + 2] = val; // B
      data[i + 3] = 255; // A
    }

    ctx.putImageData(imgData, 0, 0);
    return canvas;
  }

  /**
   * High-performance pixel processing pipeline running at 60fps.
   * Modifies targetCanvas in place.
   */
  renderToCanvas(targetCanvas, useHighRes = false) {
    if (!this.originalImage) return;

    const src = useHighRes ? this.masterCanvas : this.previewCanvas;
    const srcCtx = useHighRes ? this.masterCtx : this.previewCtx;
    const w = src.width;
    const h = src.height;

    if (targetCanvas.width !== w || targetCanvas.height !== h) {
      targetCanvas.width = w;
      targetCanvas.height = h;
    }

    const tCtx = targetCanvas.getContext('2d', { willReadFrequently: true });
    tCtx.drawImage(src, 0, 0, w, h);

    const imgData = tCtx.getImageData(0, 0, w, h);
    const d = imgData.data;
    const len = d.length;

    // Calculate parameter factors
    const exposureMul = Math.pow(2, this.params.exposure);
    const contrastFactor = (259 * (this.params.contrast + 255)) / (255 * (259 - this.params.contrast));
    const hlNorm = this.params.highlights / 100;
    const shNorm = this.params.shadows / 100;
    const tempK = this.params.temperature;
    const tintK = this.params.tint;
    const satMul = 1 + this.params.saturation / 100;
    const vibMul = this.params.vibrance / 100;

    // Fast Color Temperature & Tint offsets
    const rTemp = tempK > 0 ? tempK * 1.2 : tempK * 0.6;
    const bTemp = tempK > 0 ? -tempK * 1.1 : -tempK * 1.4;
    const gTint = -tintK * 0.9;
    const rTint = tintK * 0.6;
    const bTint = tintK * 0.6;

    // Pixel Processing Loop
    for (let i = 0; i < len; i += 4) {
      let r = d[i];
      let g = d[i + 1];
      let b = d[i + 2];

      // 1. Exposure adjustment
      r *= exposureMul;
      g *= exposureMul;
      b *= exposureMul;

      // 2. White Balance & Temperature/Tint
      r += rTemp + rTint;
      g += gTint;
      b += bTemp + bTint;

      // 3. Contrast adjustment
      r = contrastFactor * (r - 128) + 128;
      g = contrastFactor * (g - 128) + 128;
      b = contrastFactor * (b - 128) + 128;

      // 4. Highlights & Shadows curve
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      if (hlNorm !== 0 && lum > 128) {
        const hlFactor = (lum - 128) / 127;
        const hlDelta = hlNorm * hlFactor * 40;
        r += hlDelta;
        g += hlDelta;
        b += hlDelta;
      }
      if (shNorm !== 0 && lum < 128) {
        const shFactor = (128 - lum) / 128;
        const shDelta = shNorm * shFactor * 40;
        r += shDelta;
        g += shDelta;
        b += shDelta;
      }

      // 5. Saturation & Vibrance (Skin-tone preserving)
      if (this.params.saturation !== 0 || this.params.vibrance !== 0) {
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        // Standard Saturation
        r = gray + (r - gray) * satMul;
        g = gray + (g - gray) * satMul;
        b = gray + (b - gray) * satMul;

        // Vibrance: boosts low-saturation pixels more than high-saturation
        if (vibMul !== 0) {
          const maxChannel = Math.max(r, g, b);
          const minChannel = Math.min(r, g, b);
          const currentSat = (maxChannel - minChannel) / (maxChannel + 0.001);
          const vibBoost = (1 - currentSat) * vibMul * 0.8;
          r += (r - gray) * vibBoost;
          g += (g - gray) * vibBoost;
          b += (b - gray) * vibBoost;
        }
      }

      // Clamp RGB values
      d[i] = r < 0 ? 0 : r > 255 ? 255 : r;
      d[i + 1] = g < 0 ? 0 : g > 255 ? 255 : g;
      d[i + 2] = b < 0 ? 0 : b > 255 ? 255 : b;
    }

    tCtx.putImageData(imgData, 0, 0);

    // 6. Analog Lens Vignette (Radial Gradient)
    if (this.params.vignette > 0) {
      tCtx.save();
      const radius = Math.sqrt(Math.pow(w / 2, 2) + Math.pow(h / 2, 2));
      const vigGrad = tCtx.createRadialGradient(
        w / 2, h / 2, radius * 0.35,
        w / 2, h / 2, radius
      );
      const vigAlpha = (this.params.vignette / 100) * 0.75;
      vigGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vigGrad.addColorStop(0.7, 'rgba(0, 0, 0, ' + (vigAlpha * 0.4) + ')');
      vigGrad.addColorStop(1, 'rgba(0, 0, 0, ' + vigAlpha + ')');

      tCtx.fillStyle = vigGrad;
      tCtx.fillRect(0, 0, w, h);
      tCtx.restore();
    }

    // 7. Procedural Analog Film Grain Generator
    if (this.params.grain > 0) {
      tCtx.save();
      tCtx.globalCompositeOperation = 'overlay';
      tCtx.globalAlpha = (this.params.grain / 100) * 0.65;

      const scale = Math.max(1, (this.params.grainSize / 24));
      const pattern = tCtx.createPattern(this.grainCache, 'repeat');
      tCtx.fillStyle = pattern;
      tCtx.scale(scale, scale);
      tCtx.fillRect(0, 0, w / scale, h / scale);
      tCtx.restore();
    }
  }
}

// ============================================================================
// 4. STUDIO CANVAS CONTROLLER (PAN, ZOOM, OVERLAYS & BEFORE/AFTER SPLIT)
// ============================================================================
class StudioCanvas {
  constructor(canvasEl, overlayEl, splitHandleEl) {
    this.canvas = canvasEl;
    this.ctx = canvasEl.getContext('2d');
    this.overlay = overlayEl;
    this.overlayCtx = overlayEl.getContext('2d');
    this.splitHandle = splitHandleEl;
    this.stage = document.getElementById('canvas-stage');
    this.container = document.getElementById('studio-viewport-container');

    // Pan & Zoom transform state
    this.scale = 1.0;
    this.panX = 0;
    this.panY = 0;
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;

    // Overlays toggles
    this.showThirds = false;
    this.showSpiral = false;
    this.showHorizon = false;
    this.showSplit = false;
    this.splitRatio = 0.5; // Split divider position (0.0 to 1.0)
    this.isDraggingSplit = false;
    this.isComparing = false; // Hold \ to compare original

    // Offscreen buffer for unedited original image (for split comparison)
    this.unfilteredCanvas = document.createElement('canvas');
    this.unfilteredCtx = this.unfilteredCanvas.getContext('2d');

    this._bindEvents();
  }

  _bindEvents() {
    // Canvas Pan via Mouse Drag
    this.container.addEventListener('mousedown', (e) => {
      if (this.isDraggingSplit || e.target.closest('.split-slider-handle')) return;
      e.preventDefault();
      window.getSelection()?.removeAllRanges();
      this.isDragging = true;
      this.dragStartX = e.clientX - this.panX;
      this.dragStartY = e.clientY - this.panY;
      this.stage.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        e.preventDefault();
        this.panX = e.clientX - this.dragStartX;
        this.panY = e.clientY - this.dragStartY;
        this.updateTransform();
      } else if (this.isDraggingSplit) {
        e.preventDefault();
        window.getSelection()?.removeAllRanges();
        const rect = this.canvas.getBoundingClientRect();
        const clientX = e.clientX;
        const ratio = Math.max(0.01, Math.min(0.99, (clientX - rect.left) / rect.width));
        this.splitRatio = ratio;
        this.renderOverlays();
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
      this.isDraggingSplit = false;
      document.body.classList.remove('is-dragging-split');
      this.stage.style.cursor = 'grab';
    });

    // Zoom via Mouse Wheel (Zooms toward pointer position)
    this.container.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.12 : 0.89;
      this.zoomAtPoint(zoomFactor, e.clientX, e.clientY);
    }, { passive: false });

    // Split Handle Dragging (with strict selection and gesture suppression)
    this.splitHandle.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.getSelection()?.removeAllRanges();
      this.isDraggingSplit = true;
      document.body.classList.add('is-dragging-split');
    });

    this.splitHandle.addEventListener('touchstart', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.isDraggingSplit = true;
      document.body.classList.add('is-dragging-split');
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
      if (this.isDraggingSplit && e.touches.length > 0) {
        e.preventDefault();
        const rect = this.canvas.getBoundingClientRect();
        const clientX = e.touches[0].clientX;
        const ratio = Math.max(0.01, Math.min(0.99, (clientX - rect.left) / rect.width));
        this.splitRatio = ratio;
        this.renderOverlays();
      }
    }, { passive: false });

    window.addEventListener('touchend', () => {
      this.isDraggingSplit = false;
      document.body.classList.remove('is-dragging-split');
    });

    // Mobile Touch Gesture Support
    let lastTouchDist = 0;
    this.container.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.dragStartX = e.touches[0].clientX - this.panX;
        this.dragStartY = e.touches[0].clientY - this.panY;
      } else if (e.touches.length === 2) {
        this.isDragging = false;
        lastTouchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    });

    this.container.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && this.isDragging) {
        this.panX = e.touches[0].clientX - this.dragStartX;
        this.panY = e.touches[0].clientY - this.dragStartY;
        this.updateTransform();
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        if (lastTouchDist > 0) {
          const factor = dist / lastTouchDist;
          const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
          const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
          this.zoomAtPoint(factor, midX, midY);
        }
        lastTouchDist = dist;
      }
    }, { passive: false });

    this.container.addEventListener('touchend', () => {
      this.isDragging = false;
      lastTouchDist = 0;
    });
  }

  zoomAtPoint(factor, clientX, clientY) {
    const newScale = Math.max(0.1, Math.min(5.0, this.scale * factor));
    if (newScale === this.scale) return;

    const rect = this.container.getBoundingClientRect();
    const cx = clientX - rect.left - rect.width / 2;
    const cy = clientY - rect.top - rect.height / 2;

    this.panX = cx - (cx - this.panX) * (newScale / this.scale);
    this.panY = cy - (cy - this.panY) * (newScale / this.scale);
    this.scale = newScale;

    this.updateTransform();
    this.updateZoomLabel();
  }

  zoomIn() {
    this.zoomAtPoint(1.25, window.innerWidth / 2, window.innerHeight / 2);
  }

  zoomOut() {
    this.zoomAtPoint(0.8, window.innerWidth / 2, window.innerHeight / 2);
  }

  zoom100() {
    this.scale = 1.0;
    this.panX = 0;
    this.panY = 0;
    this.updateTransform();
    this.updateZoomLabel();
  }

  fitToScreen() {
    if (!this.canvas.width || !this.canvas.height) return;
    const cw = this.container.clientWidth - 80;
    const ch = this.container.clientHeight - 80;
    if (cw <= 0 || ch <= 0) return;
    const scaleX = cw / this.canvas.width;
    const scaleY = ch / this.canvas.height;
    this.scale = Math.min(scaleX, scaleY);
    this.panX = 0;
    this.panY = 0;
    this.updateTransform();
    this.updateZoomLabel();
  }

  updateTransform() {
    this.stage.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.scale})`;
  }

  updateZoomLabel() {
    const el = document.getElementById('hud-zoom-value');
    if (el) el.textContent = `${Math.round(this.scale * 100)}%`;
  }

  setOriginalBuffer(img) {
    const w = img.naturalWidth || img.width;
    const h = img.naturalHeight || img.height;
    this.unfilteredCanvas.width = w;
    this.unfilteredCanvas.height = h;
    this.unfilteredCtx.drawImage(img, 0, 0, w, h);
  }

  /**
   * Renders the dynamic composition overlays (Rule-of-Thirds, Golden Spiral, Horizon, Split)
   */
  renderOverlays() {
    const w = this.canvas.width;
    const h = this.canvas.height;

    if (this.overlay.width !== w || this.overlay.height !== h) {
      this.overlay.width = w;
      this.overlay.height = h;
    }

    const ctx = this.overlayCtx;
    ctx.clearRect(0, 0, w, h);

    // 1. Split-View Comparison Masking
    if (this.showSplit && !this.isComparing) {
      this.splitHandle.classList.remove('hidden');
      const splitX = Math.round(w * this.splitRatio);

      // Position DOM handle line
      this.splitHandle.style.left = `${this.splitRatio * 100}%`;

      // Clip left side and draw unedited original image
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, splitX, h);
      ctx.clip();
      ctx.drawImage(this.unfilteredCanvas, 0, 0, w, h);
      ctx.restore();

      // Divider vertical line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(splitX, 0);
      ctx.lineTo(splitX, h);
      ctx.stroke();
    } else {
      this.splitHandle.classList.add('hidden');
      if (this.isComparing) {
        // Render 100% original image when holding comparison key
        ctx.drawImage(this.unfilteredCanvas, 0, 0, w, h);
      }
    }

    // 2. Rule-of-Thirds Grid (3x3) & Glowing Intersection Nodes
    if (this.showThirds) {
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.65)'; // Sky blue
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 6]);

      const x1 = w / 3;
      const x2 = (w / 3) * 2;
      const y1 = h / 3;
      const y2 = (h / 3) * 2;

      // Vertical thirds
      ctx.beginPath();
      ctx.moveTo(x1, 0); ctx.lineTo(x1, h);
      ctx.moveTo(x2, 0); ctx.lineTo(x2, h);
      // Horizontal thirds
      ctx.moveTo(0, y1); ctx.lineTo(w, y1);
      ctx.moveTo(0, y2); ctx.lineTo(w, y2);
      ctx.stroke();

      // Glowing Intersection Nodes (4 key focal points)
      ctx.setLineDash([]);
      const nodes = [
        { x: x1, y: y1 },
        { x: x2, y: y1 },
        { x: x1, y: y2 },
        { x: x2, y: y2 }
      ];

      nodes.forEach(n => {
        // Outer halo
        ctx.beginPath();
        ctx.arc(n.x, n.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.fill();

        // Inner solid node
        ctx.beginPath();
        ctx.arc(n.x, n.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#F59E0B'; // Amber center dot
        ctx.shadowColor = '#F59E0B';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.restore();
    }

    // 3. Golden Ratio Fibonacci Logarithmic Spiral
    if (this.showSpiral) {
      ctx.save();
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.75)'; // Amber gold
      ctx.lineWidth = 2;

      // Draw logarithmic golden spiral bounded by canvas aspect ratio
      ctx.beginPath();
      let cx = w * 0.618;
      let cy = h * 0.382;
      const maxR = Math.min(w, h) * 0.9;
      const a = 1.5;
      const b = 0.3063489; // Golden ratio growth constant

      for (let theta = 0; theta < Math.PI * 6; theta += 0.05) {
        const r = a * Math.exp(b * theta);
        if (r > maxR) break;
        const x = cx + r * Math.cos(theta);
        const y = cy + r * Math.sin(theta);
        if (theta === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Bounding phi rectangles
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(0, 0, w * 0.618, h);
      ctx.strokeRect(w * 0.618, 0, w * 0.382, h * 0.618);
      ctx.restore();
    }

    // 4. Horizon Level Indicator
    if (this.showHorizon) {
      ctx.save();
      const midY = h / 2;
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.85)';
      ctx.lineWidth = 2;

      // Center crosshair
      const midX = w / 2;
      ctx.beginPath();
      ctx.moveTo(midX - 80, midY);
      ctx.lineTo(midX - 20, midY);
      ctx.moveTo(midX + 20, midY);
      ctx.lineTo(midX + 80, midY);
      ctx.moveTo(midX, midY - 20);
      ctx.lineTo(midX, midY + 20);
      ctx.stroke();

      // Horizon line
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(w, midY);
      ctx.stroke();
      ctx.restore();
    }
  }
}

// ============================================================================
// 5. APPLIED AI PALETTE & SCENE VISION ENGINE
// ============================================================================
class PaletteExtractor {
  /**
   * Fast K-Means color clustering to extract 5 dominant harmonic swatches.
   */
  static extractDominantPalette(canvas, k = 5, maxSamples = 1200) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const imgData = ctx.getImageData(0, 0, w, h).data;

    // Collect representative pixel samples
    const samples = [];
    const step = Math.max(1, Math.floor((w * h) / maxSamples));

    for (let i = 0; i < imgData.length; i += step * 4) {
      const a = imgData[i + 3];
      if (a < 128) continue;
      samples.push([imgData[i], imgData[i + 1], imgData[i + 2]]);
    }

    if (samples.length === 0) {
      return ['#0B0D11', '#1E2430', '#F59E0B', '#38BDF8', '#F1F5F9'];
    }

    // Initialize k centroids using k-means++ distribution
    const centroids = [samples[Math.floor(Math.random() * samples.length)]];
    while (centroids.length < k) {
      let maxDist = -1;
      let bestSample = samples[0];
      for (let s of samples) {
        let minDist = Infinity;
        for (let c of centroids) {
          const dist = Math.hypot(s[0] - c[0], s[1] - c[1], s[2] - c[2]);
          if (dist < minDist) minDist = dist;
        }
        if (minDist > maxDist) {
          maxDist = minDist;
          bestSample = s;
        }
      }
      centroids.push([...bestSample]);
    }

    // Run K-Means iterations (5 passes is plenty for harmonious clustering)
    for (let iter = 0; iter < 5; iter++) {
      const clusters = Array.from({ length: k }, () => []);

      for (let s of samples) {
        let bestIdx = 0;
        let bestDist = Infinity;
        for (let i = 0; i < k; i++) {
          const c = centroids[i];
          const dist = Math.hypot(s[0] - c[0], s[1] - c[1], s[2] - c[2]);
          if (dist < bestDist) {
            bestDist = dist;
            bestIdx = i;
          }
        }
        clusters[bestIdx].push(s);
      }

      // Recompute centroids
      for (let i = 0; i < k; i++) {
        if (clusters[i].length === 0) continue;
        let sumR = 0, sumG = 0, sumB = 0;
        for (let p of clusters[i]) {
          sumR += p[0];
          sumG += p[1];
          sumB += p[2];
        }
        centroids[i] = [
          Math.round(sumR / clusters[i].length),
          Math.round(sumG / clusters[i].length),
          Math.round(sumB / clusters[i].length)
        ];
      }
    }

    // Sort swatches by luminance for visual harmony
    centroids.sort((a, b) => {
      const lumA = 0.299 * a[0] + 0.587 * a[1] + 0.114 * a[2];
      const lumB = 0.299 * b[0] + 0.587 * b[1] + 0.114 * b[2];
      return lumA - lumB;
    });

    return centroids.map(c => PaletteExtractor.rgbToHex(c[0], c[1], c[2]));
  }

  static rgbToHex(r, g, b) {
    const toHex = (n) => {
      const hex = Math.max(0, Math.min(255, n)).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  }
}

class AIVisionEngine {
  /**
   * Evaluates image statistical features to produce semantic scene comprehension tags.
   */
  static analyzeScene(canvas, palette) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const data = ctx.getImageData(0, 0, w, h).data;

    let totalR = 0, totalG = 0, totalB = 0;
    let totalLum = 0;
    let satSum = 0;
    const sampleCount = Math.floor(data.length / 16);

    for (let i = 0; i < data.length; i += 16) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      totalR += r;
      totalG += g;
      totalB += b;

      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      totalLum += lum;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const sat = max === 0 ? 0 : (max - min) / max;
      satSum += sat;
    }

    const avgLum = totalLum / sampleCount;
    const avgSat = satSum / sampleCount;
    const rRatio = totalR / (totalB + 1);

    const tags = [];

    // Scene Classification
    if (avgLum < 75) {
      tags.push({ text: 'Low-Key Night Scene', type: 'lighting' });
      tags.push({ text: 'Moody Contrast', type: 'atmosphere' });
    } else if (rRatio > 1.3 && avgLum > 90) {
      tags.push({ text: 'Golden Hour', type: 'lighting' });
      tags.push({ text: 'Warm Amber Rim Light', type: 'atmosphere' });
    } else if (avgSat > 0.45) {
      tags.push({ text: 'Vivid Chromatic Primary', type: 'atmosphere' });
      tags.push({ text: 'Direct Sunlight', type: 'lighting' });
    } else {
      tags.push({ text: 'Soft Diffused Daylight', type: 'lighting' });
      tags.push({ text: 'Architectural Geometry', type: 'scene' });
    }

    // Color Temperature / Tone Tags
    if (avgSat < 0.12) {
      tags.push({ text: 'Monochrome Silver Gelatin', type: 'scene' });
    } else if (rRatio < 0.9) {
      tags.push({ text: 'Cool Tungsten Balanced', type: 'lighting' });
    } else {
      tags.push({ text: 'Street Documentary', type: 'scene' });
    }

    tags.push({ text: 'Rule-of-Thirds Focal Nodes', type: 'composition' });
    return tags;
  }
}

// ============================================================================
// 6. EDITORIAL EXPORT STUDIO (LEICA MATTE CARD & HIGH-RES PNG GENERATOR)
// ============================================================================
class ExportStudio {
  constructor(app) {
    this.app = app;
    this.canvas = document.getElementById('export-card-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.modal = document.getElementById('export-modal');

    this.options = {
      theme: 'white', // 'white' or 'dark'
      borderWidth: 28,
      includeTelemetry: true,
      includePalette: true
    };

    this._bindEvents();
  }

  _bindEvents() {
    // Theme toggle
    const themeGroup = document.getElementById('theme-matte-toggle');
    if (themeGroup) {
      themeGroup.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-toggle');
        if (!btn) return;
        themeGroup.querySelectorAll('.btn-toggle').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.options.theme = btn.dataset.theme;
        this.renderCard();
      });
    }

    // Border width toggle
    const borderGroup = document.getElementById('border-width-toggle');
    if (borderGroup) {
      borderGroup.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-toggle');
        if (!btn) return;
        borderGroup.querySelectorAll('.btn-toggle').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.options.borderWidth = parseInt(btn.dataset.border, 10);
        this.renderCard();
      });
    }

    // Checkbox toggles
    const chkTelemetry = document.getElementById('chk-include-telemetry');
    if (chkTelemetry) {
      chkTelemetry.addEventListener('change', (e) => {
        this.options.includeTelemetry = e.target.checked;
        this.renderCard();
      });
    }

    const chkPalette = document.getElementById('chk-include-palette');
    if (chkPalette) {
      chkPalette.addEventListener('change', (e) => {
        this.options.includePalette = e.target.checked;
        this.renderCard();
      });
    }

    // Modal Close
    document.getElementById('btn-close-modal').addEventListener('click', () => this.hide());
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.hide();
    });

    // Action: Download High-Res Card
    document.getElementById('btn-download-card').addEventListener('click', () => {
      this.downloadCardPNG();
    });

    // Action: Download Photo Only
    document.getElementById('btn-download-image-only').addEventListener('click', () => {
      this.downloadPhotoOnly();
    });

    // Action: Copy CSS Palette
    document.getElementById('btn-copy-css-vars').addEventListener('click', () => {
      this.copyPaletteCSS();
    });
  }

  show() {
    if (!this.app.imageProcessor.originalImage) {
      this.app.showToast('Please select or load a photograph first before opening Export Studio.', 'info');
      return;
    }
    this.modal.classList.remove('hidden');
    this.renderCard();
  }

  hide() {
    this.modal.classList.add('hidden');
  }

  /**
   * Renders the full Leica-style presentation card onto the high-resolution canvas.
   */
  renderCard() {
    const photoCanvas = document.createElement('canvas');
    this.app.imageProcessor.renderToCanvas(photoCanvas, true);

    const pw = photoCanvas.width;
    const ph = photoCanvas.height;
    
    // Scale factor relative to 1400px baseline
    const scaleFactor = Math.max(1, pw / 1400);
    const pad = Math.round(this.options.borderWidth * scaleFactor);
    const bottomBarHeight = (this.options.includeTelemetry || this.options.includePalette) ? Math.round(135 * scaleFactor) : pad;

    const totalW = pw + pad * 2;
    const totalH = ph + pad + bottomBarHeight;

    this.canvas.width = totalW;
    this.canvas.height = totalH;
    const ctx = this.ctx;

    // Background Matte
    const isDark = this.options.theme === 'dark';
    ctx.fillStyle = isDark ? '#0C0E12' : '#F8FAFC';
    ctx.fillRect(0, 0, totalW, totalH);

    // Gallery frame hairline
    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
    ctx.lineWidth = Math.max(1, Math.round(scaleFactor));
    ctx.strokeRect(pad - 1, pad - 1, pw + 2, ph + 2);

    // Draw the graded photograph with darkroom shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = Math.round(28 * scaleFactor);
    ctx.shadowOffsetY = Math.round(8 * scaleFactor);
    ctx.drawImage(photoCanvas, pad, pad, pw, ph);
    ctx.restore();

    // Bottom Telemetry & Swatch Bar
    const barY = pad + ph + Math.round(28 * scaleFactor);
    const textColor = isDark ? '#F1F5F9' : '#0F172A';
    const mutedColor = isDark ? '#94A3B8' : '#64748B';

    // Left: Camera Body & Lens
    if (this.options.includeTelemetry) {
      const activePreset = FILM_PRESETS[this.app.currentPresetId] || FILM_PRESETS.portra400;
      const exif = activePreset.exif;

      ctx.save();
      // Rangefinder Red Dot
      const dotRadius = Math.round(5 * scaleFactor);
      ctx.beginPath();
      ctx.arc(pad + dotRadius, barY + Math.round(16 * scaleFactor), dotRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#EF4444';
      ctx.fill();

      // Brand & Optics
      const titleFontSize = Math.round(17 * scaleFactor);
      ctx.font = `600 ${titleFontSize}px "Inter", sans-serif`;
      ctx.fillStyle = textColor;
      ctx.fillText(`${exif.body.toUpperCase()} · ${exif.lens.toUpperCase()}`, pad + dotRadius * 2 + Math.round(10 * scaleFactor), barY + Math.round(22 * scaleFactor));

      // Micro Telemetry values
      const metaFontSize = Math.round(12 * scaleFactor);
      ctx.font = `500 ${metaFontSize}px "JetBrains Mono", monospace`;
      ctx.fillStyle = mutedColor;
      ctx.fillText(`${exif.shutter}  ·  ${exif.aperture}  ·  ${exif.iso}  ·  STOCK: ${activePreset.name.toUpperCase()}`, pad + dotRadius * 2 + Math.round(10 * scaleFactor), barY + Math.round(48 * scaleFactor));
      ctx.restore();
    }

    // Right: 5-Swatch Harmonic Color Chips
    if (this.options.includePalette && this.app.currentPalette.length > 0) {
      ctx.save();
      const chipRadius = Math.round(14 * scaleFactor);
      const colWidth = Math.round(68 * scaleFactor);
      const totalPaletteWidth = this.app.currentPalette.length * colWidth;
      const startX = totalW - pad - totalPaletteWidth;
      const chipCenterY = barY + Math.round(18 * scaleFactor);

      this.app.currentPalette.forEach((hex, idx) => {
        const cx = startX + idx * colWidth + colWidth / 2;
        // Circle chip
        ctx.beginPath();
        ctx.arc(cx, chipCenterY, chipRadius, 0, Math.PI * 2);
        ctx.fillStyle = hex;
        ctx.fill();
        ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.15)';
        ctx.lineWidth = Math.max(1, Math.round(1.5 * scaleFactor));
        ctx.stroke();

        // Hex caption
        const hexFontSize = Math.round(10 * scaleFactor);
        ctx.font = `600 ${hexFontSize}px "JetBrains Mono", monospace`;
        ctx.fillStyle = mutedColor;
        ctx.textAlign = 'center';
        ctx.fillText(hex, cx, chipCenterY + chipRadius + Math.round(16 * scaleFactor));
      });
      ctx.restore();
    }

    // Update target resolution readout label
    const resLabel = document.getElementById('export-resolution-label');
    if (resLabel) {
      resLabel.textContent = `${totalW} × ${totalH} px (High-Resolution)`;
    }
  }

  downloadCardPNG() {
    if (!this.app.imageProcessor.originalImage) {
      this.app.showToast('No photograph loaded to export.', 'error');
      return;
    }
    this.canvas.toBlob((blob) => {
      if (!blob) {
        this.app.showToast('Failed to generate export file.', 'error');
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lumina-lens-editorial-${Date.now()}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      this.app.showToast('Editorial card downloaded successfully', 'success');
    }, 'image/png');
  }

  downloadPhotoOnly() {
    if (!this.app.imageProcessor.originalImage) {
      this.app.showToast('No photograph loaded to export.', 'error');
      return;
    }
    const photoCanvas = document.createElement('canvas');
    this.app.imageProcessor.renderToCanvas(photoCanvas, true);
    photoCanvas.toBlob((blob) => {
      if (!blob) {
        this.app.showToast('Failed to generate photo export.', 'error');
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lumina-photo-${Date.now()}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      this.app.showToast('High-resolution photo exported', 'success');
    }, 'image/png');
  }

  copyPaletteCSS() {
    if (!this.app.currentPalette.length) return;
    const cssVars = this.app.currentPalette.map((hex, i) => `  --lumina-color-${i + 1}: ${hex};`).join('\n');
    const fullSnippet = `:root {\n${cssVars}\n}`;
    navigator.clipboard.writeText(fullSnippet).then(() => {
      this.app.showToast('CSS variables copied to clipboard!', 'success');
    });
  }
}

// ============================================================================
// 7. REAL-TIME HISTOGRAM CONTROLLER
// ============================================================================
class HistogramController {
  constructor(canvasEl) {
    this.canvas = canvasEl;
    this.ctx = canvasEl.getContext('2d');
  }

  update(sourceCanvas) {
    if (!sourceCanvas || !sourceCanvas.width || !sourceCanvas.height) return;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const ctx = this.ctx;

    const srcCtx = sourceCanvas.getContext('2d', { willReadFrequently: true });
    const imgData = srcCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height).data;

    // 256 Bins for R, G, B, and Luminance
    const rBins = new Uint32Array(256);
    const gBins = new Uint32Array(256);
    const bBins = new Uint32Array(256);
    const lBins = new Uint32Array(256);

    const step = Math.max(1, Math.floor(imgData.length / (4 * 10000))); // Sample up to 10k points for instant 60fps
    let maxCount = 0;

    for (let i = 0; i < imgData.length; i += step * 4) {
      const r = imgData[i];
      const g = imgData[i + 1];
      const b = imgData[i + 2];
      const lum = Math.round(0.299 * r + 0.587 * g + 0.114 * b);

      rBins[r]++;
      gBins[g]++;
      bBins[b]++;
      lBins[lum]++;

      maxCount = Math.max(maxCount, rBins[r], gBins[g], bBins[b], lBins[lum]);
    }

    ctx.clearRect(0, 0, w, h);
    if (maxCount === 0) return;

    // Draw channels
    this._drawChannel(rBins, maxCount, 'rgba(239, 68, 68, 0.45)');
    this._drawChannel(gBins, maxCount, 'rgba(16, 185, 129, 0.45)');
    this._drawChannel(bBins, maxCount, 'rgba(56, 189, 248, 0.45)');
    this._drawChannel(lBins, maxCount, 'rgba(255, 255, 255, 0.65)');
  }

  _drawChannel(bins, maxCount, color) {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, h);

    for (let i = 0; i < 256; i++) {
      const x = (i / 255) * w;
      const y = h - (bins[i] / maxCount) * (h - 4);
      ctx.lineTo(x, y);
    }

    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}

// ============================================================================
// 8. LUMINA APP MAIN CONTROLLER
// ============================================================================
class LuminaApp {
  constructor() {
    this.body = document.getElementById('app-body');
    this.currentPresetId = 'portra400';
    this.currentPalette = [];

    // Core sub-engines
    this.imageProcessor = new ImageProcessor();
    this.studioCanvas = new StudioCanvas(
      document.getElementById('studio-canvas'),
      document.getElementById('overlay-canvas'),
      document.getElementById('split-slider-handle')
    );
    this.histogram = new HistogramController(document.getElementById('histogram-canvas'));
    this.exportStudio = new ExportStudio(this);

    this._bindDOM();
    this._bindKeyboard();
    this._bindPixelInspector();
  }

  init() {
    // Check if initial sample requested or start in pristine Empty State
    console.log('Lumina Lens Studio Engine initialized.');
  }

  _bindDOM() {
    // 1. File Uploads (Browse & Dropzone)
    const fileInput = document.getElementById('file-input');
    const openBtn = document.getElementById('btn-open-file');
    const browseEmptyBtn = document.getElementById('btn-empty-browse');
    const dropzone = document.getElementById('empty-dropzone');

    const triggerBrowse = () => fileInput.click();
    openBtn.addEventListener('click', triggerBrowse);
    if (browseEmptyBtn) browseEmptyBtn.addEventListener('click', triggerBrowse);

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) this.loadFile(file);
    });

    // Drag-and-drop on entire window / dropzone
    ['dragenter', 'dragover'].forEach(eventName => {
      window.addEventListener(eventName, (e) => {
        e.preventDefault();
        if (dropzone) dropzone.classList.add('drag-active');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      window.addEventListener(eventName, (e) => {
        e.preventDefault();
        if (dropzone) dropzone.classList.remove('drag-active');
      });
    });

    window.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        this.loadFile(files[0]);
      }
    });

    // 2. Curated Sample Buttons
    document.querySelectorAll('[data-sample]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sampleKey = e.currentTarget.dataset.sample;
        this.loadCuratedSample(sampleKey);
      });
    });

    // 3. Film Stock Presets
    document.querySelectorAll('.preset-card').forEach(card => {
      card.addEventListener('click', () => {
        const presetId = card.dataset.preset;
        this.applyFilmPreset(presetId);
      });
    });

    document.getElementById('btn-reset-presets').addEventListener('click', () => {
      this.applyFilmPreset('neutral');
    });

    // 4. Overlays & HUD View Controls
    const btnThirds = document.getElementById('btn-toggle-thirds');
    btnThirds.addEventListener('click', () => {
      this.studioCanvas.showThirds = !this.studioCanvas.showThirds;
      btnThirds.classList.toggle('active', this.studioCanvas.showThirds);
      this.studioCanvas.renderOverlays();
      this.showToast(this.studioCanvas.showThirds ? 'Rule-of-Thirds Grid Active' : 'Thirds Grid Hidden');
    });

    const btnSpiral = document.getElementById('btn-toggle-spiral');
    btnSpiral.addEventListener('click', () => {
      this.studioCanvas.showSpiral = !this.studioCanvas.showSpiral;
      btnSpiral.classList.toggle('active', this.studioCanvas.showSpiral);
      this.studioCanvas.renderOverlays();
      this.showToast(this.studioCanvas.showSpiral ? 'Golden Ratio Spiral Active' : 'Spiral Hidden');
    });

    const btnSplit = document.getElementById('btn-toggle-split');
    btnSplit.addEventListener('click', () => {
      this.studioCanvas.showSplit = !this.studioCanvas.showSplit;
      btnSplit.classList.toggle('active', this.studioCanvas.showSplit);
      this.studioCanvas.renderOverlays();
      this.showToast(this.studioCanvas.showSplit ? 'Split Comparison Active' : 'Standard View');
    });

    const btnHorizon = document.getElementById('btn-toggle-horizon');
    btnHorizon.addEventListener('click', () => {
      this.studioCanvas.showHorizon = !this.studioCanvas.showHorizon;
      btnHorizon.classList.toggle('active', this.studioCanvas.showHorizon);
      this.studioCanvas.renderOverlays();
    });

    // Canvas Zoom HUD
    document.getElementById('btn-zoom-fit').addEventListener('click', () => this.studioCanvas.fitToScreen());
    document.getElementById('btn-zoom-100').addEventListener('click', () => this.studioCanvas.zoom100());
    document.getElementById('btn-zoom-in').addEventListener('click', () => this.studioCanvas.zoomIn());
    document.getElementById('btn-zoom-out').addEventListener('click', () => this.studioCanvas.zoomOut());

    // 5. Tactile Sliders & Mechanical Snap Detents
    this._setupTactileSliders();

    // 6. Section Reset Buttons
    document.getElementById('btn-reset-tone').addEventListener('click', () => {
      this.resetSliderGroup(['exposure', 'contrast', 'highlights', 'shadows']);
    });
    document.getElementById('btn-reset-color').addEventListener('click', () => {
      this.resetSliderGroup(['temperature', 'tint', 'saturation', 'vibrance']);
    });
    document.getElementById('btn-reset-optics').addEventListener('click', () => {
      this.resetSliderGroup(['vignette', 'grain', 'grain-size']);
    });

    // 7. Palette & AI Vision Interactions
    document.getElementById('btn-copy-all-palette').addEventListener('click', () => {
      if (!this.currentPalette.length) return;
      navigator.clipboard.writeText(this.currentPalette.join(', ')).then(() => {
        this.showToast('All 5 hex codes copied to clipboard', 'success');
      });
    });

    document.getElementById('btn-reextract-ai').addEventListener('click', () => {
      this.extractPaletteAndVision();
      this.showToast('AI scene rescan complete', 'success');
    });

    // 8. Editorial Export Trigger
    document.getElementById('btn-export-studio').addEventListener('click', () => {
      this.exportStudio.show();
    });

    // 9. Mobile Sheet Toggle
    const mobileBtn = document.getElementById('btn-mobile-sheet');
    const sidebarRight = document.getElementById('sidebar-inspector');
    if (mobileBtn && sidebarRight) {
      mobileBtn.addEventListener('click', () => {
        sidebarRight.classList.toggle('mobile-open');
      });
    }
  }

  _setupTactileSliders() {
    const sliderConfigs = [
      { id: 'slider-exposure', param: 'exposure', readout: 'val-exposure', unit: ' EV', format: (v) => (v >= 0 ? `+${v.toFixed(2)}` : v.toFixed(2)), snapCenter: true },
      { id: 'slider-contrast', param: 'contrast', readout: 'val-contrast', unit: '', format: (v) => (v >= 0 ? `+${v}` : `${v}`), snapCenter: true },
      { id: 'slider-highlights', param: 'highlights', readout: 'val-highlights', unit: '', format: (v) => (v >= 0 ? `+${v}` : `${v}`), snapCenter: true },
      { id: 'slider-shadows', param: 'shadows', readout: 'val-shadows', unit: '', format: (v) => (v >= 0 ? `+${v}` : `${v}`), snapCenter: true },
      { id: 'slider-temperature', param: 'temperature', readout: 'val-temperature', unit: ' K', format: (v) => `${5400 + v * 40}`, snapCenter: true },
      { id: 'slider-tint', param: 'tint', readout: 'val-tint', unit: '', format: (v) => (v >= 0 ? `+${v}` : `${v}`), snapCenter: true },
      { id: 'slider-saturation', param: 'saturation', readout: 'val-saturation', unit: '', format: (v) => (v >= 0 ? `+${v}` : `${v}`), snapCenter: true },
      { id: 'slider-vibrance', param: 'vibrance', readout: 'val-vibrance', unit: '', format: (v) => (v >= 0 ? `+${v}` : `${v}`), snapCenter: true },
      { id: 'slider-vignette', param: 'vignette', readout: 'val-vignette', unit: '%', format: (v) => `${v}%`, snapCenter: false },
      { id: 'slider-grain', param: 'grain', readout: 'val-grain', unit: '%', format: (v) => `${v}%`, snapCenter: false },
      { id: 'slider-grain-size', param: 'grainSize', readout: 'val-grain-size', unit: ' µm', format: (v) => `${v} µm`, snapCenter: false }
    ];

    sliderConfigs.forEach(cfg => {
      const slider = document.getElementById(cfg.id);
      const readout = document.getElementById(cfg.readout);
      if (!slider || !readout) return;

      slider.addEventListener('input', (e) => {
        let val = parseFloat(e.target.value);

        // Tactile zero-center magnetic detent snap
        if (cfg.snapCenter && Math.abs(val) < (cfg.param === 'exposure' ? 0.08 : 3)) {
          val = 0;
          slider.value = 0;
        }

        readout.textContent = `${cfg.format(val)}${cfg.unit}`;
        this.imageProcessor.setParam(cfg.param, val);
        this.requestRender();
      });

      // Double-click to instantly reset to factory default
      const group = slider.closest('.tactile-slider-group');
      if (group) {
        group.addEventListener('dblclick', () => {
          const defaultVal = cfg.param === 'grain' ? 18 : cfg.param === 'grainSize' ? 24 : 0;
          slider.value = defaultVal;
          readout.textContent = `${cfg.format(defaultVal)}${cfg.unit}`;
          this.imageProcessor.setParam(cfg.param, defaultVal);
          this.requestRender();
        });
      }
    });
  }

  _bindKeyboard() {
    window.addEventListener('keydown', (e) => {
      // Ignore if typing in text input
      if (e.target.tagName === 'INPUT' && e.target.type === 'text') return;

      const isCmdOrCtrl = e.metaKey || e.ctrlKey;

      if (isCmdOrCtrl && e.key.toLowerCase() === 'o') {
        e.preventDefault();
        document.getElementById('file-input').click();
      } else if (isCmdOrCtrl && e.key.toLowerCase() === 'g') {
        e.preventDefault();
        document.getElementById('btn-toggle-thirds').click();
      } else if (isCmdOrCtrl && e.key.toLowerCase() === 's') {
        e.preventDefault();
        document.getElementById('btn-toggle-spiral').click();
      } else if (isCmdOrCtrl && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        this.exportStudio.show();
      } else if (e.key === '\\') {
        e.preventDefault();
        this.studioCanvas.isComparing = true;
        this.studioCanvas.renderOverlays();
      } else if (e.key === '0') {
        this.studioCanvas.fitToScreen();
      } else if (e.key === '1') {
        this.studioCanvas.zoom100();
      } else if (e.key === '+' || e.key === '=') {
        this.studioCanvas.zoomIn();
      } else if (e.key === '-') {
        this.studioCanvas.zoomOut();
      } else if (e.key === 'Escape') {
        this.exportStudio.hide();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.key === '\\') {
        this.studioCanvas.isComparing = false;
        this.studioCanvas.renderOverlays();
      }
    });
  }

  _bindPixelInspector() {
    const canvas = this.studioCanvas.canvas;
    const chip = document.getElementById('hud-pixel-chip');
    const rgbEl = document.getElementById('hud-pixel-rgb');
    const hexEl = document.getElementById('hud-pixel-hex');
    const coordsEl = document.getElementById('hud-coords');

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const x = Math.floor((e.clientX - rect.left) * scaleX);
      const y = Math.floor((e.clientY - rect.top) * scaleY);

      if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
        coordsEl.textContent = `X: ${x} Y: ${y}`;
        const pixel = this.studioCanvas.ctx.getImageData(x, y, 1, 1).data;
        const hex = PaletteExtractor.rgbToHex(pixel[0], pixel[1], pixel[2]);

        chip.style.backgroundColor = hex;
        rgbEl.textContent = `RGB(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
        hexEl.textContent = hex;
      }
    });
  }

  resetSliderGroup(paramNames) {
    paramNames.forEach(param => {
      const slider = document.getElementById(`slider-${param}`);
      if (slider) {
        const defaultVal = param === 'grain' ? 0 : param === 'grainSize' ? 24 : 0;
        slider.value = defaultVal;
        slider.dispatchEvent(new Event('input'));
      }
    });
  }

  requestRender() {
    if (this.renderPending) return;
    this.renderPending = true;

    requestAnimationFrame(() => {
      this.imageProcessor.renderToCanvas(this.studioCanvas.canvas);
      this.studioCanvas.renderOverlays();
      this.histogram.update(this.studioCanvas.canvas);
      this.renderPending = false;
    });
  }

  /**
   * Loads image from user file with robust corruption & format error resilience.
   */
  loadFile(file) {
    if (!file.type.startsWith('image/')) {
      this.showToast(`Unsupported format: "${file.name}". Supported formats: JPG, PNG, WEBP, AVIF, TIFF.`, 'error');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      this.showToast(`Large file detected (${(file.size / (1024 * 1024)).toFixed(1)} MB). Studio performance may vary.`, 'info');
    }

    this.showLoading('Decoding pixel buffer...', 25);
    const reader = new FileReader();

    reader.onerror = () => {
      this.hideLoading();
      this.showToast(`Could not read "${file.name}". File permission denied or read error.`, 'error');
    };

    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => {
        this.hideLoading();
        this.showToast(`Failed to parse "${file.name}". File appears corrupt or an unsupported image variant.`, 'error');
      };
      img.onload = () => {
        this.stepLoading('Analyzing color matrix & histogram...', 50);
        setTimeout(() => {
          this.stepLoading('Extracting harmonic palette & scene semantics...', 75);
          this.initializeWorkspace(img, file.name);
        }, 150);
      };
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  /**
   * Loads curated sample image with guaranteed instant offline fallback.
   */
  loadCuratedSample(sampleKey) {
    this.showLoading(`Loading ${sampleKey.toUpperCase()} studio sample...`, 30);

    let sampleCanvas;
    let title = 'Studio Sample';

    if (sampleKey === 'architecture') {
      sampleCanvas = SamplePhotoGenerator.createArchitecturalGeometry();
      title = 'Architectural Geometry (35mm)';
    } else if (sampleKey === 'portrait') {
      sampleCanvas = SamplePhotoGenerator.createGoldenHourPortrait();
      title = 'Golden Hour Portrait (50mm)';
    } else if (sampleKey === 'tokyo') {
      sampleCanvas = SamplePhotoGenerator.createTokyoRainStreet();
      title = 'Tokyo Rain Street Scene (28mm)';
    }

    setTimeout(() => {
      this.stepLoading('Synthesizing film grain geometry...', 80);
      const img = new Image();
      img.onload = () => {
        this.initializeWorkspace(img, title);
      };
      img.src = sampleCanvas.toDataURL('image/png');
    }, 180);
  }

  initializeWorkspace(img, title) {
    // 1. Transition app state from empty to populated
    this.body.classList.remove('state-empty');
    this.body.classList.add('state-populated');

    // 2. Setup processors
    this.imageProcessor.loadSourceImage(img);
    this.studioCanvas.setOriginalBuffer(img);

    // 3. Set display canvas dimensions immediately
    const pw = this.imageProcessor.previewCanvas.width;
    const ph = this.imageProcessor.previewCanvas.height;
    this.studioCanvas.canvas.width = pw;
    this.studioCanvas.canvas.height = ph;
    this.studioCanvas.overlay.width = pw;
    this.studioCanvas.overlay.height = ph;

    // 4. Update HUD dimensions
    const w = img.naturalWidth || img.width;
    const h = img.naturalHeight || img.height;
    document.getElementById('hud-dimensions').textContent = `${w} × ${h} px`;

    // 5. Apply default film stock emulation (Kodak Portra 400)
    this.applyFilmPreset(this.currentPresetId);

    // 6. Render synchronously to populate pixel buffer
    this.imageProcessor.renderToCanvas(this.studioCanvas.canvas);

    // 7. Extract Palette & Scene Semantics from populated canvas
    this.extractPaletteAndVision();

    // 8. Fit to screen and render overlays
    this.studioCanvas.fitToScreen();
    this.studioCanvas.renderOverlays();
    this.histogram.update(this.studioCanvas.canvas);

    // Hide loading
    this.hideLoading();
    this.showToast(`Loaded: ${title}`, 'success');
  }

  extractPaletteAndVision() {
    const palette = PaletteExtractor.extractDominantPalette(this.studioCanvas.canvas, 5);
    this.currentPalette = palette;

    // Render palette swatch chips in inspector
    const strip = document.getElementById('palette-swatches');
    strip.innerHTML = '';

    palette.forEach(hex => {
      const chip = document.createElement('div');
      chip.className = 'swatch-chip';
      chip.style.backgroundColor = hex;
      chip.dataset.hex = hex;
      chip.title = `Click to copy ${hex}`;

      const label = document.createElement('span');
      label.className = 'swatch-hex';
      label.textContent = hex;
      chip.appendChild(label);

      chip.addEventListener('click', () => {
        navigator.clipboard.writeText(hex).then(() => {
          this.showToast(`Copied ${hex} to clipboard!`, 'success');
          if (navigator.vibrate) navigator.vibrate(12);
        });
      });

      strip.appendChild(chip);
    });

    // Extract AI Vision Scene Understanding Tags
    const tags = AIVisionEngine.analyzeScene(this.studioCanvas.canvas, palette);
    const tagsCluster = document.getElementById('vision-tags-cluster');
    tagsCluster.innerHTML = '';

    tags.forEach(t => {
      const pill = document.createElement('span');
      pill.className = 'tag-pill';
      pill.dataset.type = t.type;
      pill.textContent = t.text;
      pill.addEventListener('click', () => {
        this.showToast(`Tagged: ${t.text}`);
      });
      tagsCluster.appendChild(pill);
    });
  }

  applyFilmPreset(presetId) {
    const preset = FILM_PRESETS[presetId];
    if (!preset) return;

    this.currentPresetId = presetId;

    // Update preset active card in left sidebar
    document.querySelectorAll('.preset-card').forEach(c => {
      c.classList.toggle('active', c.dataset.preset === presetId);
    });

    // Apply adjustments to image processor
    this.imageProcessor.applyPreset(preset);

    // Synchronize UI Sliders with preset values
    this._syncSlider('exposure', preset.exposure);
    this._syncSlider('contrast', preset.contrast);
    this._syncSlider('highlights', preset.highlights);
    this._syncSlider('shadows', preset.shadows);
    this._syncSlider('temperature', preset.temperature);
    this._syncSlider('tint', preset.tint);
    this._syncSlider('saturation', preset.saturation);
    this._syncSlider('vibrance', preset.vibrance);
    this._syncSlider('vignette', preset.vignette);
    this._syncSlider('grain', preset.grain);
    this._syncSlider('grain-size', preset.grainSize);

    // Update EXIF readouts
    const exif = preset.exif;
    if (exif) {
      document.getElementById('exif-body').textContent = exif.body;
      document.getElementById('exif-lens').textContent = exif.lens;
      document.getElementById('exif-aperture').textContent = exif.aperture;
      document.getElementById('exif-shutter').textContent = exif.shutter;
      document.getElementById('exif-iso').textContent = exif.iso;
    }

    this.requestRender();
    this.showToast(`Applied Stock: ${preset.name}`);
  }

  _syncSlider(param, val) {
    const slider = document.getElementById(`slider-${param}`);
    if (slider) {
      slider.value = val;
      slider.dispatchEvent(new Event('input'));
    }
  }

  showLoading(stepText, progressPct) {
    const overlay = document.getElementById('loading-overlay');
    const textEl = document.getElementById('loading-step-text');
    const barEl = document.getElementById('loading-progress');

    overlay.classList.remove('hidden');
    textEl.textContent = stepText;
    barEl.style.width = `${progressPct}%`;
  }

  stepLoading(stepText, progressPct) {
    const textEl = document.getElementById('loading-step-text');
    const barEl = document.getElementById('loading-progress');
    textEl.textContent = stepText;
    barEl.style.width = `${progressPct}%`;
  }

  hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    overlay.classList.add('hidden');
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const dot = document.createElement('span');
    dot.className = 'toast-dot';

    const text = document.createElement('span');
    text.textContent = message;

    toast.appendChild(dot);
    toast.appendChild(text);
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  }
}

// Instantiate and initialize Lumina Lens Studio on DOM readiness
window.addEventListener('DOMContentLoaded', () => {
  window.lumina = new LuminaApp();
  window.lumina.init();
});
