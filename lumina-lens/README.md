# Lumina Lens — Heritage Darkroom & Applied AI Studio

> **Where Mechanical Rangefinder Tactility Meets Contemporary Spatial Fluidity.**

Lumina Lens is a creative studio application and applied AI vision engine designed for photographers, art directors, and creative technologists. Inspired by the industrial elegance of heritage German rangefinder cameras (**Leica**, **Hasselblad**) and the fluid glass-and-light physics of contemporary operating systems (**Apple HIG**, **macOS Sonoma**), Lumina Lens delivers real-time analog film emulation, mathematical composition analysis, and computer-vision color intelligence directly in the browser.

---

## ✦ Key Features

### 1. The 4 Product States
- **The Empty Darkroom:** Welcoming ambient dropzone with radial amber radiance, dashed focal boundary, curated sample quick-load trays, and keyboard hints.
- **Progressive Hydration:** Step-by-step breadcrumb indicators during pixel buffer decoding and AI clustering.
- **Graceful Self-Healing:** Non-blocking glass alerts for unsupported file formats with instantaneous recovery options.
- **The Precision Studio:** Full dual-pane creative workspace with 60fps canvas compositing.

### 2. Studio Canvas Viewport
- **High-Performance Canvas Compositing:** 60fps WebGL/Canvas2D engine supporting fluid panning (`Space + Drag`), non-linear zoom (10% to 500%), and one-click `Fit` or `1:1` viewing modes.
- **Rule-of-Thirds Composition Grid:** Sky-blue hairline grid with glowing amber focal intersection nodes (`⌘G` / `Ctrl+G`).
- **Golden Ratio Logarithmic Spiral:** Mathematically fitted Fibonacci logarithmic spiral overlay (`⌘S` / `Ctrl+S`).
- **Horizon Level Indicator:** Dynamic artificial horizon crosshair.
- **Interactive Before / After Split Comparison:** Live draggable vertical divider and hold-to-compare key (`\`) to instantly inspect original vs. graded film stock.
- **Real-Time Pointer Telemetry HUD:** Live RGB pixel inspection, hex readout, image dimensions, and pointer coordinates.

### 3. Tactile Film & Color Controls
- **Zero-Center Detent Magnetic Snapping:** Sliders with bidirectional values (`Exposure -2.0 EV to +2.0 EV`, `Tint -50 to +50`, `Contrast`, `Temperature`) feature mechanical center ticks and soft magnetic snaps (`±2%` threshold).
- **Double-Click Reset:** Double-clicking any slider label or knob smoothly resets the parameter to its factory baseline.
- **Tabular-Nums Telemetry:** Real-time monospace readouts formatted without layout shift.
- **Procedural Analog Film Grain Generator:** High-fidelity stochastic silver-halide particle synthesis simulating organic film grain at customizable particle size (`10µm` to `50µm`) and roughness.

### 4. Curated Analog Film Stock Emulations
1. **Kodak Portra 400:** Warm natural skin tones, gentle highlight rolloff, fine golden grain, and soft amber bias.
2. **Leica M-Monochrom:** Deep obsidian black point, punchy silver-gelatin contrast curve, sharp micro-contrast, zero chroma.
3. **CineStill 800T:** Tungsten-balanced cool cyan/teal shadows with dramatic specular neon halation.
4. **Fuji Velvia 50:** Saturated chromatic primaries, crisp emerald greens, deep skies, and vivid landscape impact.
5. **Natural Studio:** Linear uncorrected baseline for technical accuracy.

### 5. Applied AI Vision & Palette Extraction
- **Harmonic K-Means Palette Clustering:** Dynamically computes top 5 dominant color swatches across luminance and chromatic spectrums.
- **One-Tap Clipboard Copy:** Click any swatch chip to copy its hexadecimal code with animated toast confirmation and mobile haptic tick (`navigator.vibrate`).
- **Semantic Scene Understanding:** Algorithmic scene classification generating contextual pill badges for Scene Type (`Architecture`, `Street`, `Night`), Lighting (`Golden Hour`, `Low-Key`), and Atmosphere (`Moody Contrast`, `Silver Gelatin`).
- **One-Click CSS Palette Export:** Exports `:root { --lumina-color-1: ...; }` variable sets for design systems.

### 6. Editorial Export Studio
- **Archival Presentation Matte Card Generator:** Produces high-resolution editorial cards ready for Dribbble, Behance, and portfolio showcases.
- **Customizable Frame Themes:** Switch between **Leica Gallery White** and **Obsidian Darkroom Black** matte finishes.
- **Adjustable Border Width:** 16px, 28px, or 44px gallery margins.
- **Watermark Telemetry Bar:** Embedded camera body, lens model (`LEICA M11-P · SUMMILUX-M 35mm f/1.4 ASPH`), exposure metrics (`f/1.4 · 1/500s · ISO 200`), active film stock, and bottom 5-swatch palette circles.
- **Lossless Export:** Direct PNG download via HTML5 Canvas Blob API.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `⌘O` / `Ctrl+O` | Open Image File Picker |
| `⌘G` / `Ctrl+G` | Toggle Rule-of-Thirds Grid & Focal Nodes |
| `⌘S` / `Ctrl+S` | Toggle Golden Ratio Fibonacci Spiral |
| `\` | Toggle / Hold Before & After Split Compare |
| `⌘E` / `Ctrl+E` | Open Editorial Export Studio |
| `0` | Fit Canvas to Viewport |
| `1` | Zoom to 100% (1:1 Actual Pixels) |
| `+` / `=` | Zoom In |
| `-` | Zoom Out |
| `Space + Drag` | Pan Studio Viewport |
| `Esc` | Close Export Modal |

---

## 🚀 Getting Started & Local Setup

### Option 1: Direct Browser Launch (No Server Required)
Because Lumina Lens includes deterministic, zero-dependency offline sample generators, you can run it directly by opening `index.html` in any modern web browser:
```bash
open index.html
```

### Option 2: Local HTTP Server
To serve locally with Python 3:
```bash
python3 -m http.server 8000
```
Then navigate to `http://localhost:8000` in your browser.

---

## 🏗️ Architecture & File Structure

```
lumina-lens/
├── index.html         # Semantic HTML5 studio layout with SVG iconography
├── styles.css         # 60-30-10 color tokens, 8pt spatial grid, tactile sliders & glassmorphism
├── app.js             # Modular ES6 studio engine (Processor, Canvas, AI Vision, Export)
├── DESIGN_SPEC.md     # Canonical design specification reference
└── README.md          # Technical documentation and user guide
```

### Performance & 60fps Mandate
- **Sub-16ms Frame Latency:** Live slider movements interact exclusively with an optimized display preview buffer using `requestAnimationFrame`, preventing main-thread blocking.
- **Zero Layout Thrashing:** All animated properties use hardware-accelerated `transform` and `opacity`.
- **Full-Resolution Export:** The master high-resolution buffer is maintained in the background, ensuring maximum fidelity when generating the final editorial export card.

---

## 📱 Responsive Layout
- **Desktop Studio (>1024px):** Dual-pane workspace with left film emulation tray (270px), center interactive viewport, and right inspector panel (330px).
- **Tablet (768px - 1024px):** Single-sidebar studio layout prioritizing canvas area.
- **Mobile Portrait (<768px):** Single-column viewport with collapsible bottom sheet drawer, compact HUD, and touch-optimized controls adhering to Apple's 44pt touch bounding standard.

---

*Lumina Lens — Precision craftsmanship for the digital darkroom.*
