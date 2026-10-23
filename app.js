/**
 * MeCod Labs Portfolio — Core Application Script
 * Version: 1.0.0
 * Architecture: Vanilla ES2026, Zero-Dependency, 60fps Native Performance
 */

(function () {
  'use strict';

  /* ==========================================================================
     DOM Elements Cache
     ========================================================================== */
  const header = document.getElementById('header');
  const btnMobileMenu = document.getElementById('btn-mobile-menu');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const btnDrawerClose = document.getElementById('btn-drawer-close');
  const toastContainer = document.getElementById('toast-container');
  const toastMessage = document.getElementById('toast-message');
  const toastText = document.getElementById('toast-text');
  const btnBackToTop = document.getElementById('btn-back-to-top');

  // Modals
  const modalLumina = document.getElementById('modal-lumina');
  const btnOpenLuminaModal = document.getElementById('btn-open-lumina-modal');
  const btnCloseLumina = document.getElementById('btn-close-lumina');
  const btnModalCloseFooter = document.getElementById('btn-modal-close-footer');

  const modalPulseflow = document.getElementById('modal-pulseflow');
  const btnOpenPulseflowModal = document.getElementById('btn-open-pulseflow-modal');
  const btnClosePulseflow = document.getElementById('btn-close-pulseflow');
  const btnPulseflowCloseFooter = document.getElementById('btn-pulseflow-close-footer');

  const modalVividaura = document.getElementById('modal-vividaura');
  const btnOpenVividauraModal = document.getElementById('btn-open-vividaura-modal');
  const btnCloseVividaura = document.getElementById('btn-close-vividaura');
  const btnVividauraCloseFooter = document.getElementById('btn-vividaura-close-footer');

  // Lumina Canvas & Telemetry Controls
  const luminaHeroCanvas = document.getElementById('lumina-hero-thumb');
  const luminaModalCanvas = document.getElementById('lumina-modal-canvas');
  const luminaIntensitySlider = document.getElementById('input-filter-intensity');
  const luminaIntensityVal = document.getElementById('slider-intensity-val');
  const luminaSwatchesGrid = document.getElementById('lumina-swatches-grid');
  const telemetryFps = document.getElementById('telemetry-fps');
  const presetButtons = document.querySelectorAll('.preset-chip-btn');

  // Tech Matrix Filters & Search
  const filterPills = document.querySelectorAll('.filter-pill');
  const searchInput = document.getElementById('tech-search-input');
  const clearSearchBtn = document.getElementById('btn-clear-search');
  const techCards = document.querySelectorAll('.tech-card');
  const techGrid = document.getElementById('tech-grid');
  const techEmptyState = document.getElementById('tech-empty-state');
  const btnResetFilters = document.getElementById('btn-reset-filters');

  // Contact Form
  const inquiryForm = document.getElementById('inquiry-form');
  const formSuccessBanner = document.getElementById('form-success-banner');
  const btnResetInquiry = document.getElementById('btn-reset-inquiry');

  let toastTimeout = null;
  let activePreset = 'portra';
  let activeIntensity = 0.85;

  /* ==========================================================================
     Toast Notification System (Section 4.8 & 8.4)
     ========================================================================== */
  function showToast(message, isError = false) {
    if (!toastMessage || !toastText) return;

    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    toastText.textContent = message;
    if (isError) {
      toastMessage.style.borderColor = 'rgba(239, 68, 68, 0.5)';
      toastMessage.style.background = '#450a0a';
    } else {
      toastMessage.style.borderColor = 'rgba(255, 255, 255, 0.15)';
      toastMessage.style.background = 'var(--text-primary)';
    }

    toastMessage.classList.add('show');

    toastTimeout = setTimeout(() => {
      toastMessage.classList.remove('show');
    }, 3200);
  }

  /* ==========================================================================
     1-Tap Email Copy Handler (Section 4.8)
     ========================================================================== */
  async function copyTextToClipboard(text, successMessage) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        showToast(successMessage || `✓ Copied to clipboard: ${text}`);
        return true;
      }
      throw new Error('Clipboard API unavailable');
    } catch (err) {
      // Fallback via temporary textarea
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (successful) {
          showToast(successMessage || `✓ Copied to clipboard: ${text}`);
          return true;
        }
      } catch (fallbackErr) {
        // Ignored
      }
      showToast(`Unable to copy automatically. Please copy manually: ${text}`, true);
      return false;
    }
  }

  document.querySelectorAll('.btn-copy-action').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'mecodlabs@gmail.com';
      copyTextToClipboard(email, `✓ Email copied to clipboard (${email})`);
    });
  });

  /* ==========================================================================
     Header Sticky Shadow & Active Navigation
     ========================================================================== */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
      if (header) header.style.boxShadow = '0 4px 20px rgba(15, 23, 42, 0.06)';
    } else {
      header?.classList.remove('scrolled');
      if (header) header.style.boxShadow = 'none';
    }
  }, { passive: true });

  // Mobile Drawer Toggle
  function openMobileDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    btnMobileMenu?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    btnMobileMenu?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  btnMobileMenu?.addEventListener('click', openMobileDrawer);
  btnDrawerClose?.addEventListener('click', closeMobileDrawer);
  mobileDrawer?.addEventListener('click', (e) => {
    if (e.target === mobileDrawer) {
      closeMobileDrawer();
    }
  });

  document.querySelectorAll('.drawer-link, #btn-drawer-hire').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileDrawer();
    });
  });

  // Back to Top Button
  btnBackToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ==========================================================================
     Modal System (Lumina Lens, PulseFlow, VividAura)
     ========================================================================== */
  let previousActiveElement = null;

  function openModal(modalEl) {
    if (!modalEl) return;
    previousActiveElement = document.activeElement;
    modalEl.classList.add('open');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Trap focus inside modal
    const focusable = modalEl.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
    if (focusable.length > 0) {
      focusable[0].focus();
    }
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('open');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Memory hygiene: Clear lumina canvas buffer and swatches when closed
    if (modalEl === modalLumina && luminaModalCanvas) {
      const ctx = luminaModalCanvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, luminaModalCanvas.width, luminaModalCanvas.height);
      if (luminaSwatchesGrid) luminaSwatchesGrid.innerHTML = '';
    }

    // Restore focus to caller button
    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
      previousActiveElement.focus();
      previousActiveElement = null;
    }
  }

  // Lumina Modal triggers
  btnOpenLuminaModal?.addEventListener('click', () => {
    openModal(modalLumina);
    renderLuminaScene(luminaModalCanvas, activePreset, activeIntensity);
  });
  btnCloseLumina?.addEventListener('click', () => closeModal(modalLumina));
  btnModalCloseFooter?.addEventListener('click', () => closeModal(modalLumina));

  // PulseFlow Modal triggers
  btnOpenPulseflowModal?.addEventListener('click', () => openModal(modalPulseflow));
  btnClosePulseflow?.addEventListener('click', () => closeModal(modalPulseflow));
  btnPulseflowCloseFooter?.addEventListener('click', () => closeModal(modalPulseflow));
  document.getElementById('btn-pulseflow-hire')?.addEventListener('click', () => closeModal(modalPulseflow));

  // VividAura Modal triggers
  btnOpenVividauraModal?.addEventListener('click', () => openModal(modalVividaura));
  btnCloseVividaura?.addEventListener('click', () => closeModal(modalVividaura));
  btnVividauraCloseFooter?.addEventListener('click', () => closeModal(modalVividaura));
  document.getElementById('btn-vividaura-hire')?.addEventListener('click', () => closeModal(modalVividaura));

  // Close modals on backdrop click
  [modalLumina, modalPulseflow, modalVividaura].forEach(modal => {
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Global Escape key & Accessible Tab focus trapping
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [modalLumina, modalPulseflow, modalVividaura].forEach(modal => {
        if (modal?.classList.contains('open')) {
          closeModal(modal);
        }
      });
      if (mobileDrawer?.classList.contains('open')) {
        closeMobileDrawer();
      }
    } else if (e.key === 'Tab') {
      const activeModal = [modalLumina, modalPulseflow, modalVividaura].find(m => m?.classList.contains('open'));
      if (activeModal) {
        const focusables = Array.from(activeModal.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(el => el.offsetParent !== null);
        if (focusables.length > 0) {
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }
  });

  /* ==========================================================================
     Lumina Lens Procedural Canvas & Color Emulation Engine
     ========================================================================== */
  const FILM_PALETTES = {
    portra: [
      { r: 242, g: 198, b: 153, hex: '#F2C699', label: 'Gold Tone' },
      { r: 219, g: 133, b: 92,  hex: '#DB855C', label: 'Amber' },
      { r: 168, g: 82,  b: 62,  hex: '#A8523E', label: 'Terracotta' },
      { r: 84,  g: 48,  b: 40,  hex: '#543028', label: 'Warm Shadow' },
      { r: 42,  g: 28,  b: 36,  hex: '#2A1C24', label: 'Deep Plum' }
    ],
    velvia: [
      { r: 16,  g: 185, b: 129, hex: '#10B981', label: 'Velvia Mint' },
      { r: 14,  g: 165, b: 233, hex: '#0EA5E9', label: 'Cyan Sky' },
      { r: 99,  g: 102, b: 241, hex: '#6366F1', label: 'Indigo Wave' },
      { r: 236, g: 72,  b: 153, hex: '#EC4899', label: 'Neon Rose' },
      { r: 15,  g: 23,  b: 42,  hex: '#0F172A', label: 'Obsidian' }
    ],
    mono: [
      { r: 248, g: 250, b: 252, hex: '#F8FAFC', label: 'Leica White' },
      { r: 148, g: 163, b: 184, hex: '#94A3B8', label: 'Silver Gray' },
      { r: 71,  g: 85,  b: 105, hex: '#475569', label: 'Medium Slate' },
      { r: 30,  g: 41,  b: 59,  hex: '#1E293B', label: 'Deep Charcoal' },
      { r: 2,   g: 6,   b: 23,  hex: '#020617', label: 'Jet Carbon' }
    ],
    bleach: [
      { r: 226, g: 232, b: 240, hex: '#E2E8F0', label: 'Bleach Highlight' },
      { r: 161, g: 172, b: 186, hex: '#A1ACBA', label: 'Muted Zinc' },
      { r: 100, g: 116, b: 139, hex: '#64748B', label: 'Bleached Steel' },
      { r: 51,  g: 65,  b: 85,  hex: '#334155', label: 'Industrial Dark' },
      { r: 15,  g: 23,  b: 42,  hex: '#0F172A', label: 'Matrix Shadow' }
    ]
  };

  function renderLuminaScene(canvas, preset = 'portra', intensity = 0.85) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const t0 = performance.now();
    const w = canvas.width;
    const h = canvas.height;

    // Clear
    ctx.clearRect(0, 0, w, h);

    // Draw Sky Background Gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.75);
    if (preset === 'portra') {
      skyGrad.addColorStop(0, `rgba(254, 215, 170, ${0.4 + 0.6 * intensity})`);
      skyGrad.addColorStop(0.5, `rgba(251, 146, 60, ${0.3 + 0.5 * intensity})`);
      skyGrad.addColorStop(1, '#1E1B4B');
    } else if (preset === 'velvia') {
      skyGrad.addColorStop(0, `rgba(56, 189, 248, ${0.4 + 0.6 * intensity})`);
      skyGrad.addColorStop(0.5, `rgba(168, 85, 247, ${0.3 + 0.5 * intensity})`);
      skyGrad.addColorStop(1, '#0F172A');
    } else if (preset === 'mono') {
      skyGrad.addColorStop(0, '#CBD5E1');
      skyGrad.addColorStop(0.5, '#64748B');
      skyGrad.addColorStop(1, '#0F172A');
    } else { // bleach
      skyGrad.addColorStop(0, '#E2E8F0');
      skyGrad.addColorStop(0.5, '#94A3B8');
      skyGrad.addColorStop(1, '#1E293B');
    }

    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);

    // Glowing Sun / Focal Light Orb
    const sunGrad = ctx.createRadialGradient(w * 0.7, h * 0.35, 10, w * 0.7, h * 0.35, 160);
    if (preset === 'mono') {
      sunGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      sunGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    } else if (preset === 'velvia') {
      sunGrad.addColorStop(0, 'rgba(244, 114, 182, 0.9)');
      sunGrad.addColorStop(1, 'rgba(244, 114, 182, 0)');
    } else {
      sunGrad.addColorStop(0, 'rgba(253, 224, 71, 0.9)');
      sunGrad.addColorStop(1, 'rgba(251, 146, 60, 0)');
    }
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(w * 0.7, h * 0.35, 160, 0, Math.PI * 2);
    ctx.fill();

    // Architectural Mountain Silhouettes (Layer 1 - Far)
    ctx.fillStyle = preset === 'mono' ? 'rgba(30, 41, 59, 0.7)' : 'rgba(49, 46, 129, 0.6)';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.65);
    ctx.lineTo(w * 0.25, h * 0.45);
    ctx.lineTo(w * 0.45, h * 0.58);
    ctx.lineTo(w * 0.75, h * 0.38);
    ctx.lineTo(w, h * 0.52);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    // Architectural Skyline / Buildings (Layer 2 - Near Foreground)
    ctx.fillStyle = preset === 'mono' ? '#090D16' : '#0B1120';
    const buildingWidths = [45, 55, 35, 65, 50, 40, 70, 48, 52, 60, 45, 65];
    let curX = 0;
    let bIdx = 0;
    while (curX < w) {
      const bW = buildingWidths[bIdx % buildingWidths.length];
      const bH = 80 + ((bIdx * 37) % 140);
      ctx.fillRect(curX, h - bH, bW, bH);

      // Window grid simulation
      ctx.fillStyle = (preset === 'mono') ? 'rgba(255, 255, 255, 0.3)' : 'rgba(251, 191, 36, 0.45)';
      for (let wy = h - bH + 10; wy < h - 15; wy += 14) {
        for (let wx = curX + 6; wx < curX + bW - 8; wx += 10) {
          if ((wx + wy) % 3 === 0) {
            ctx.fillRect(wx, wy, 4, 6);
          }
        }
      }
      ctx.fillStyle = preset === 'mono' ? '#090D16' : '#0B1120';
      curX += bW + 4;
      bIdx++;
    }

    // Photographic Grain Matrix
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;
    const grainFactor = 12 * intensity;

    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * grainFactor;
      data[i] = Math.min(255, Math.max(0, data[i] + noise));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));

      if (preset === 'mono') {
        const avg = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    const elapsed = (performance.now() - t0).toFixed(1);
    if (telemetryFps) {
      telemetryFps.textContent = `${elapsed} ms / 60 FPS`;
    }

    updateSwatches(preset);
  }

  function updateSwatches(preset) {
    if (!luminaSwatchesGrid) return;
    const colors = FILM_PALETTES[preset] || FILM_PALETTES.portra;
    luminaSwatchesGrid.innerHTML = '';

    colors.forEach(item => {
      const swatch = document.createElement('div');
      swatch.className = 'swatch-chip';
      swatch.style.backgroundColor = item.hex;
      swatch.setAttribute('data-hex', item.hex);
      swatch.title = `Click to copy ${item.hex} (${item.label})`;

      const label = document.createElement('span');
      label.className = 'swatch-hex-label';
      label.textContent = item.hex;

      swatch.appendChild(label);
      swatch.addEventListener('click', () => {
        copyTextToClipboard(item.hex, `✓ Copied swatch: ${item.hex}`);
      });

      luminaSwatchesGrid.appendChild(swatch);
    });
  }

  // Lumina Preset Buttons handler
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      presetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activePreset = btn.getAttribute('data-preset') || 'portra';
      renderLuminaScene(luminaModalCanvas, activePreset, activeIntensity);
    });
  });

  // Intensity slider handler
  luminaIntensitySlider?.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    activeIntensity = val / 100;
    if (luminaIntensityVal) luminaIntensityVal.textContent = `${val}%`;
    renderLuminaScene(luminaModalCanvas, activePreset, activeIntensity);
  });

  // Render initial mini hero canvas thumbnail
  if (luminaHeroCanvas) {
    renderLuminaScene(luminaHeroCanvas, 'velvia', 0.9);
  }

  /* ==========================================================================
     Filterable Technology Matrix (Section 4.5 & 5.1 Empty State)
     ========================================================================== */
  let currentCategory = 'all';
  let currentSearch = '';

  function updateFilterCounts() {
    const total = techCards.length;
    filterPills.forEach(pill => {
      const filter = pill.getAttribute('data-filter');
      const countEl = pill.querySelector('.pill-count');
      if (!countEl) return;
      if (filter === 'all') {
        countEl.textContent = `(${total})`;
      } else {
        const count = Array.from(techCards).filter(c => c.getAttribute('data-category') === filter).length;
        countEl.textContent = `(${count})`;
      }
    });
  }

  updateFilterCounts();

  function applyTechFilters() {
    let visibleCount = 0;

    techCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardKeywords = (card.getAttribute('data-keywords') || '') + ' ' + (card.querySelector('.tech-name')?.textContent || '');
      const matchesCategory = (currentCategory === 'all' || cardCategory === currentCategory);
      const matchesSearch = (!currentSearch || cardKeywords.toLowerCase().includes(currentSearch.toLowerCase()));

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (visibleCount === 0) {
      if (techGrid) techGrid.style.display = 'none';
      if (techEmptyState) techEmptyState.classList.add('active');
    } else {
      if (techGrid) techGrid.style.display = 'grid';
      if (techEmptyState) techEmptyState.classList.remove('active');
    }
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');
      currentCategory = pill.getAttribute('data-filter') || 'all';
      applyTechFilters();
    });
  });

  searchInput?.addEventListener('input', (e) => {
    currentSearch = e.target.value.trim();
    if (currentSearch.length > 0) {
      clearSearchBtn?.classList.add('visible');
    } else {
      clearSearchBtn?.classList.remove('visible');
    }
    applyTechFilters();
  });

  clearSearchBtn?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    currentSearch = '';
    clearSearchBtn.classList.remove('visible');
    applyTechFilters();
    searchInput?.focus();
  });

  btnResetFilters?.addEventListener('click', () => {
    currentCategory = 'all';
    currentSearch = '';
    if (searchInput) searchInput.value = '';
    clearSearchBtn?.classList.remove('visible');

    filterPills.forEach(p => {
      const isAll = p.getAttribute('data-filter') === 'all';
      p.classList.toggle('active', isAll);
      p.setAttribute('aria-selected', isAll ? 'true' : 'false');
    });

    applyTechFilters();
  });

  /* ==========================================================================
     Inquiry Form Validation & Transmission
     ========================================================================== */
  function validateField(inputEl, groupId) {
    const group = document.getElementById(groupId);
    if (!inputEl || !group) return true;

    let isValid = true;
    if (inputEl.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(inputEl.value.trim());
    } else {
      isValid = inputEl.value.trim().length > 0;
    }

    if (!isValid) {
      group.classList.add('has-error');
    } else {
      group.classList.remove('has-error');
    }
    return isValid;
  }

  ['input-name', 'input-email', 'select-scope', 'select-budget', 'textarea-message'].forEach(id => {
    const el = document.getElementById(id);
    const groupId = id.replace('input-', 'group-').replace('select-', 'group-').replace('textarea-', 'group-');
    el?.addEventListener('blur', () => validateField(el, groupId));
    el?.addEventListener('input', () => {
      const group = document.getElementById(groupId);
      group?.classList.remove('has-error');
    });
  });

  /* ==========================================================================
     Inquiry Form & Generic Mailto Template System
     ========================================================================== */
  function buildProjectEmailTemplate(data = {}) {
    const name = data.name || '[Your Name / Company]';
    const email = data.email || '[Your Work Email]';
    const scope = data.scopeText || '[e.g. Cross-Platform Mobile / Web Platform / UI-UX Design / Full MVP]';
    const budget = data.budgetText || '[e.g. $5,000 – $10,000 / $10,000 – $25,000 / $25,000+]';
    const message = data.message || '[Briefly describe your product vision, timeline, target platforms, or attach links/wireframes...]';

    const subject = `[Project Inquiry] New Project Discussion — ${data.name ? data.name : '[Your Project / Company Name]'}`;
    const body = `Hi MeCod Labs Team,

I would like to explore a potential project engagement with MeCod Labs.

--- 1. GENERAL INFORMATION ---
• Client / Company: ${name}
• Contact Email: ${email}
• Project Name: [Your Project Name]

--- 2. SCOPE & TIMELINE ---
• Primary Scope: ${scope}
• Estimated Timeline: [e.g. 1–2 Months / Q4 2026 / Flexible]
• Estimated Budget Range: ${budget}

--- 3. PROJECT OBJECTIVES & REQUIREMENTS ---
${message}

---
Looking forward to discussing further.`;

    return `mailto:mecodlabs@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  // Pre-fill direct inquiries mailto channel link
  const directEmailChannel = document.querySelector('a[href^="mailto:mecodlabs@gmail.com"]');
  if (directEmailChannel) {
    directEmailChannel.href = buildProjectEmailTemplate();
  }

  inquiryForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameEl = document.getElementById('input-name');
    const emailEl = document.getElementById('input-email');
    const scopeEl = document.getElementById('select-scope');
    const budgetEl = document.getElementById('select-budget');
    const messageEl = document.getElementById('textarea-message');
    const submitBtn = document.getElementById('btn-submit-form');

    // Extract any provided data or leave as general placeholders for client to fill
    const name = nameEl?.value.trim() || '';
    const email = emailEl?.value.trim() || '';
    const scopeText = (scopeEl && scopeEl.selectedIndex > 0) ? scopeEl.options[scopeEl.selectedIndex].text : '';
    const budgetText = (budgetEl && budgetEl.selectedIndex > 0) ? budgetEl.options[budgetEl.selectedIndex].text : '';
    const message = messageEl?.value.trim() || '';

    // Simulate submission loading state & prepare mailto link
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Launching Mail App...</span>';
    }

    const mailtoUrl = buildProjectEmailTemplate({
      name,
      email,
      scopeText,
      budgetText,
      message
    });

    setTimeout(() => {
      // Trigger OS default email client with structured generic template
      const tempLink = document.createElement('a');
      tempLink.href = mailtoUrl;
      tempLink.style.display = 'none';
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);

      if (inquiryForm) inquiryForm.style.display = 'none';
      if (formSuccessBanner) formSuccessBanner.classList.add('active');
      showToast('✓ Opening your mail app with pre-composed draft!');
    }, 400);
  });

  btnResetInquiry?.addEventListener('click', () => {
    if (inquiryForm) {
      inquiryForm.reset();
      inquiryForm.style.display = 'flex';
      const submitBtn = document.getElementById('btn-submit-form');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Send Project Inquiry →</span>';
      }
    }
    if (formSuccessBanner) {
      formSuccessBanner.classList.remove('active');
    }
  });

  /* ==========================================================================
     Multi-Language (EN/VI) & Geo-IP Auto Detection (ML-08)
     ========================================================================== */
  const TRANSLATIONS = {
    en: {
      nav_work: "Work",
      nav_philosophy: "Philosophy",
      nav_stack: "Stack",
      nav_team: "Team",
      nav_contact: "Contact",
      nav_hire: "Hire Studio",
      lang_label: "Language:",
      hero_status: "Available for Q4 2026 Contract Engagements",
      hero_title: "A lean engineering team supercharged by AI to build <span class=\"text-gradient\">faster, cost-optimized, and zero-defect software.</span>",
      hero_desc: "We pair senior software development with autonomous AI workflows and a rigorous quality process. Get enterprise-grade Flutter, Native Android, and Next.js applications delivered at startup speed with optimized budgets — zero agency overhead.",
      hero_explore: "Explore Work ↓",
      hero_call: "Book a 15-min Call ↗",
      metric_1_val: "3x Faster",
      metric_1_lbl: "AI-Augmented Velocity",
      metric_1_desc: "Accelerated sprint cycles & rapid time-to-market",
      metric_2_val: "40–60%",
      metric_2_lbl: "Cost-Optimized Delivery",
      metric_2_desc: "Lean micro-team agility with zero agency bloat",
      metric_3_val: "100%",
      metric_3_lbl: "Strict QA & Typesafe",
      metric_3_desc: "Zero-defect releases with automated E2E testing",
      toast_lang_switched: "✓ Switched to English",
nav_pricing: "Pricing",
      pricing_eyebrow: "Transparent Launch Sprints",
      pricing_title: "Affordable, Fast, AI-Accelerated Engineering",
      pricing_subtitle: "Straightforward sprint packages with zero agency markup. High-velocity development for early-stage founders and lean teams backed by 100% milestone-based escrow safety.",
      tier_1_duration: "3 – 5 Days Turnaround",
      tier_1_title: "Rapid Prototype Sprint",
      tier_1_fixed: "/ fixed",
      tier_1_desc: "Ideal for pitch deck demos, interactive canvas features, or rapid validation of high-risk ideas.",
      tier_1_f1: "1 Interactive Canvas, WebGL, or AI Feature",
      tier_1_f2: "Silky 60fps micro-interactions & mobile responsive",
      tier_1_f3: "Automated Puppeteer E2E tests (Zero errors)",
      tier_1_f4: "Clean Git repo & 100% code ownership",
      tier_1_btn: "Book Prototype Sprint →",
      tier_2_badge: "★ Most Popular for Startups",
      tier_2_duration: "7 – 10 Days Turnaround",
      tier_2_title: "Full MVP Launch Sprint",
      tier_2_fixed: "/ fixed",
      tier_2_desc: "Transform your PRD into a complete, cross-platform product shipped to staging with zero defects.",
      tier_2_f1: "Full Flutter Mobile (iOS/Android) OR Next.js 15 Web",
      tier_2_f2: "Figma Design Tokens & Apple HIG ergonomics",
      tier_2_f3: "Supabase BaaS (Auth, Realtime DB, Edge Functions)",
      tier_2_f4: "5 – 7 core user journeys & database schema",
      tier_2_f5: "6-Pillar QA Audit sign-off (Zero console errors)",
      tier_2_btn: "Book Full MVP Sprint →",
      tier_3_duration: "Flexible Weekly Bandwidth",
      tier_3_title: "Dedicated Agile Pod",
      tier_3_rate: "/ hr",
      tier_3_alt: "or ,800/mo retainer",
      tier_3_desc: "On-demand senior engineering pod that ships weekly iterations directly to your staging environment.",
      tier_3_f1: "20–30 hours/week dedicated design-dev bandwidth",
      tier_3_f2: "Daily async video & Telegram/Slack updates",
      tier_3_f3: "Direct engineer access (Zero account manager bloat)",
      tier_3_f4: "Weekly production releases & continuous test suite",
      tier_3_btn: "Discuss Dedicated Pod →",
      guarantee_title: "The Early-Adopter Trust Guarantee",
      guarantee_sub: "We are a hungry, high-velocity engineering pod building our public track record. Your investment is 100% de-risked.",
      g1_title: "100% Milestone Escrow",
      g1_desc: "Funds are held safely in escrow. You release milestones only after verifying working software with 0 errors.",
      g2_title: "3x Velocity via AI",
      g2_desc: "We leverage agentic AI coding workflows to eliminate boilerplate, delivering in days what agencies do in months.",
      g3_title: "14-Day Free Bug Warranty",
      g3_desc: "Any defect or edge-case bug discovered within 14 days of launch is patched immediately at zero cost.",
      g4_title: "Full IP & Clean Git",
      g4_desc: "You own 100% of the intellectual property, clean Git history, CI/CD scripts, and architecture documentation.",
      comp_title: "How MeCod Labs Compares",
      comp_th_metric: "Metric / Dimension",
      comp_th_agency: "Traditional Agency",
      comp_th_solo: "Solo Freelancer Bidders",
      comp_th_mecod: "MeCod Labs Pod",
      comp_r1_lbl: "Turnaround Speed",
      comp_r1_agency: "2 – 3 Months (Slow)",
      comp_r1_solo: "Unpredictable (High ghosting risk)",
      comp_r1_mecod: "3 – 10 Days (AI-Augmented)",
      comp_r2_lbl: "Typical MVP Cost",
      comp_r2_agency: ",000 – ,000+",
      comp_r2_solo: ",000 – ,000",
      comp_r2_mecod: ",450 – ,650 (Introductory)",
      comp_r3_lbl: "Communication",
      comp_r3_agency: "4 layers of sales reps & PMs",
      comp_r3_solo: "Hit or miss, timezone friction",
      comp_r3_mecod: "Direct to Senior Design-Engineer",
      comp_r4_lbl: "Quality & Testing",
      comp_r4_agency: "Manual checks, extra QA billing",
      comp_r4_solo: "Rarely any automated testing",
      comp_r4_mecod: "6-Pillar QA + E2E Suites (0 Errors)",
      comp_r5_lbl: "Modern Tech Stack",
      comp_r5_agency: "Legacy bloated frameworks",
      comp_r5_solo: "Basic PHP / WordPress / Templates",
      comp_r5_mecod: "Flutter 3, Next.js, Supabase, AI",
      form_budget_label: "Budget Range (USD) *",
      opt_budget_default: "Select Budget Allocation",
      opt_tier_micro: " –  (Prototype / Feature Sprint)",
      opt_tier_mvp: ",450 – ,650 (Full MVP Launch Sprint)",
      opt_tier_pod: " – /hr or ,800/mo (Dedicated Agile Pod)",
      opt_tier_custom: ",000+ (Custom Scope / Multi-Platform)",
      form_budget_feedback: "Please select your estimated budget.",
      toast_sprint_selected: "✓ Selected Sprint package! Complete your details below.",
    },
    vi: {
      nav_work: "Dự án",
      nav_philosophy: "Triết lý",
      nav_stack: "Công nghệ",
      nav_team: "Đội ngũ",
      nav_contact: "Liên hệ",
      nav_hire: "Thuê Studio",
      lang_label: "Ngôn ngữ:",
      hero_status: "Sẵn sàng nhận dự án Q4 2026",
      hero_title: "Đội ngũ kỹ thuật tinh gọn tăng tốc bởi AI để xây dựng <span class=\"text-gradient\">phần mềm nhanh hơn, tối ưu chi phí và không lỗi.</span>",
      hero_desc: "Chúng tôi kết hợp năng lực kỹ thuật cao cấp với quy trình AI tự hành và kiểm định nghiêm ngặt. Phát triển ứng dụng Flutter, Native Android và Next.js chuẩn doanh nghiệp với tốc độ startup và chi phí tối ưu.",
      hero_explore: "Xem Dự án ↓",
      hero_call: "Đặt lịch 15p ↗",
      metric_1_val: "Nhanh hơn 3x",
      metric_1_lbl: "Tốc độ Tăng tốc bởi AI",
      metric_1_desc: "Chu kỳ sprint siêu tốc & đưa sản phẩm ra thị trường sớm",
      metric_2_val: "40–60%",
      metric_2_lbl: "Tối ưu hóa Chi phí",
      metric_2_desc: "Đội ngũ vi mô tinh gọn, loại bỏ chi phí trung gian agency",
      metric_3_val: "100%",
      metric_3_lbl: "Kiểm định QA Nghiêm ngặt",
      metric_3_desc: "Bàn giao không lỗi với kiểm thử tự động E2E",
      toast_lang_switched: "✓ Đã chuyển sang Tiếng Việt",
nav_pricing: "Bảng giá",
      pricing_eyebrow: "Gói Sprint Chào Sân Minh Bạch",
      pricing_title: "Chi Phí Tối Ưu, Thần Tốc, Tăng Tốc Bởi AI",
      pricing_subtitle: "Các gói sprint rõ ràng, không phụ phí agency. Tốc độ vượt trội cho nhà sáng lập khởi nghiệp và các đội ngũ tinh gọn, bảo chứng an toàn 100% theo Milestone Escrow.",
      tier_1_duration: "Bàn giao trong 3 – 5 ngày",
      tier_1_title: "Sprint Tạo Bản Mẫu Thần Tốc",
      tier_1_fixed: "/ trọn gói",
      tier_1_desc: "Lý tưởng cho demo gọi vốn, tính năng canvas tương tác hoặc kiểm chứng nhanh ý tưởng.",
      tier_1_f1: "1 Tính năng AI, Canvas tương tác hoặc WebGL",
      tier_1_f2: "Micro-interactions 60fps & tương thích di động",
      tier_1_f3: "Kiểm thử tự động Puppeteer E2E (0 lỗi)",
      tier_1_f4: "Mã nguồn Git sạch & 100% sở hữu trí tuệ",
      tier_1_btn: "Đặt Gói Bản Mẫu →",
      tier_2_badge: "★ Lựa chọn phổ biến cho Startup",
      tier_2_duration: "Bàn giao trong 7 – 10 ngày",
      tier_2_title: "Sprint Ra Mắt Full MVP",
      tier_2_fixed: "/ trọn gói",
      tier_2_desc: "Biến bản PRD thành sản phẩm đa nền tảng hoàn chỉnh, bàn giao staging không lỗi.",
      tier_2_f1: "Full Flutter Mobile (iOS/Android) HOẶC Next.js 15 Web",
      tier_2_f2: "Design Tokens Figma & công thái học Apple HIG",
      tier_2_f3: "Backend Supabase (Auth, Realtime DB, Edge Functions)",
      tier_2_f4: "5 – 7 luồng người dùng cốt lõi & cơ sở dữ liệu",
      tier_2_f5: "Ký duyệt nghiệm thu 6-Pillar QA (0 lỗi console)",
      tier_2_btn: "Đặt Gói Full MVP →",
      tier_3_duration: "Thời gian linh hoạt theo tuần",
      tier_3_title: "Nhóm Kỹ Thuật Chuyên Trách",
      tier_3_rate: "/ giờ",
      tier_3_alt: "hoặc ,800/tháng trọn gói",
      tier_3_desc: "Đội ngũ senior theo yêu cầu, liên tục bàn giao các bản cập nhật hàng tuần lên môi trường staging.",
      tier_3_f1: "20–30 giờ/tuần chuyên trách thiết kế & lập trình",
      tier_3_f2: "Cập nhật video async & trao đổi Telegram/Slack hàng ngày",
      tier_3_f3: "Làm việc trực tiếp với kỹ sư chính (Không qua trung gian)",
      tier_3_f4: "Phát hành bản build hàng tuần & bộ test liên tục",
      tier_3_btn: "Thảo luận Gói Chuyên Trách →",
      guarantee_title: "Cam Kết Bảo Chứng Cho Khách Hàng Đầu Tiên",
      guarantee_sub: "Chúng tôi là đội ngũ kỹ thuật tốc độ cao đang xây dựng uy tín công khai. Mọi rủi ro của bạn đều được triệt tiêu 100%.",
      g1_title: "Ký quỹ Escrow 100%",
      g1_desc: "Chi phí được giữ an toàn trong Escrow. Chỉ giải ngân khi bạn đã kiểm tra phần mềm hoạt động 0 lỗi.",
      g2_title: "Tốc độ x3 Nhờ AI",
      g2_desc: "Tận dụng quy trình AI agentic để loại bỏ boilerplate, hoàn thành trong vài ngày việc mà agency mất nhiều tháng.",
      g3_title: "Bảo Hành Miễn Phí 14 Ngày",
      g3_desc: "Mọi lỗi phát sinh trong vòng 14 ngày sau bàn giao đều được khắc phục ngay lập tức hoàn toàn miễn phí.",
      g4_title: "100% Sở Hữu & Git Sạch",
      g4_desc: "Bạn sở hữu 100% tài sản trí tuệ, lịch sử Git sạch, script CI/CD và tài liệu kiến trúc.",
      comp_title: "So Sánh MeCod Labs Với Các Lựa Chọn Khác",
      comp_th_metric: "Tiêu chí / Khía cạnh",
      comp_th_agency: "Agency Truyền Thống",
      comp_th_solo: "Freelancer Đơn Lẻ Đấu Thầu",
      comp_th_mecod: "MeCod Labs Pod",
      comp_r1_lbl: "Tốc độ hoàn thành",
      comp_r1_agency: "2 – 3 Tháng (Chậm)",
      comp_r1_solo: "Không đoán trước (Dễ bùng kèo)",
      comp_r1_mecod: "3 – 10 Ngày (Tăng tốc bởi AI)",
      comp_r2_lbl: "Chi phí MVP tiêu chuẩn",
      comp_r2_agency: ",000 – ,000+",
      comp_r2_solo: ",000 – ,000",
      comp_r2_mecod: ",450 – ,650 (Giá chào sân)",
      comp_r3_lbl: "Giao tiếp làm việc",
      comp_r3_agency: "4 tầng nấc sales & quản lý",
      comp_r3_solo: "Hên xui, lệch múi giờ",
      comp_r3_mecod: "Trực tiếp với Kỹ sư Thiết kế chính",
      comp_r4_lbl: "Chất lượng & Kiểm thử",
      comp_r4_agency: "Test thủ công, tính thêm phí QA",
      comp_r4_solo: "Hầu như không test tự động",
      comp_r4_mecod: "6-Pillar QA + Test E2E tự động (0 Lỗi)",
      comp_r5_lbl: "Công nghệ sử dụng",
      comp_r5_agency: "Framework cồng kềnh cũ kỹ",
      comp_r5_solo: "PHP cơ bản / WordPress / Theme dựng sẵn",
      comp_r5_mecod: "Flutter 3, Next.js, Supabase, AI",
      form_budget_label: "Mức Ngân Sách Dự Kiến (USD) *",
      opt_budget_default: "Chọn Mức Ngân Sách",
      opt_tier_micro: " –  (Sprint Tạo Bản Mẫu)",
      opt_tier_mvp: ",450 – ,650 (Sprint Ra Mắt Full MVP)",
      opt_tier_pod: " – /giờ hoặc ,800/tháng (Pod Chuyên Trách)",
      opt_tier_custom: ",000+ (Yêu cầu Tùy biến / Đa nền tảng)",
      form_budget_feedback: "Vui lòng chọn mức ngân sách ước tính.",
      toast_sprint_selected: "✓ Đã chọn gói Sprint! Hãy điền thông tin chi tiết bên dưới.",
    }
  };

  let currentLang = 'en';

  function applyLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    currentLang = lang;
    document.documentElement.lang = lang;
    const dict = TRANSLATIONS[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        if (dict[key].includes('<')) {
          el.innerHTML = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // Update active button state
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });
  }

  async function initLanguageAndGeoIP() {
    // 1. Check if user already manually selected a language
    const saved = localStorage.getItem('mecod_preferred_lang');
    if (saved === 'vi' || saved === 'en') {
      applyLanguage(saved);
      return;
    }

    // 2. Auto-detect via Geo-IP check (Timeout 2s)
    let detected = 'en';
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        if (data.country_code === 'VN' || (data.country_name && data.country_name.toLowerCase().includes('vietnam'))) {
          detected = 'vi';
          console.log('[MeCod i18n] Geo-IP detected Vietnam IP -> Auto-switching to VI');
        }
      }
    } catch (e) {
      // Offline or blocked, fallback to browser language
      if (navigator.language && navigator.language.toLowerCase().startsWith('vi')) {
        detected = 'vi';
      }
    }

    applyLanguage(detected);
  }

  // Setup click listeners for language switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLang = btn.getAttribute('data-lang');
      if (targetLang && targetLang !== currentLang) {
        localStorage.setItem('mecod_preferred_lang', targetLang);
        applyLanguage(targetLang);
        showToast(TRANSLATIONS[targetLang].toast_lang_switched);
      }
    });
  });


  // Setup click listeners for pricing action buttons
  document.querySelectorAll('.btn-pricing-action').forEach(btn => {
    btn.addEventListener('click', () => {
      const tier = btn.getAttribute('data-tier');
      const selectBudget = document.getElementById('select-budget');
      const inputName = document.getElementById('input-name');
      const contactSection = document.getElementById('contact');

      if (selectBudget && tier) {
        selectBudget.value = tier;
      }

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          if (inputName) inputName.focus();
        }, 600);
      }

      const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
      showToast(dict.toast_sprint_selected || '✓ Sprint selected! Please complete your inquiry below.');
    });
  });

  // Run initialization
  initLanguageAndGeoIP();

  console.log('MeCod Labs Portfolio Engine initialized successfully (60fps, Zero Errors).');
})();
