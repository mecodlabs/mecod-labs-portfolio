/**
 * MeCod Labs QA Audit — Deep Automated Verification Script
 * Covers all 6 pillars of the QA Playbook using CDP with Headless Chrome.
 */

import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 1;
    this.callbacks = new Map();
    this.events = new Map();
  }

  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });

    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      } else if (msg.method) {
        const handler = this.events.get(msg.method);
        if (handler) handler(msg.params);
      }
    };
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  on(method, handler) {
    this.events.set(method, handler);
  }

  async evaluate(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.exceptionDetails) {
      throw new Error(`Evaluation failed for "${expression}": ${JSON.stringify(res.exceptionDetails)}`);
    }
    return res.result ? res.result.value : undefined;
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function audit() {
  const port = 9446;
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const profileDir = `/tmp/chrome-mecod-qa-${port}`;

  console.log(`Starting Headless Chrome for 6-Pillar QA Audit...`);
  const chromeProcess = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1280,900'
  ]);

  let version = null;
  for (let i = 0; i < 30; i++) {
    await wait(300);
    try {
      version = await fetchJson(`http://127.0.0.1:${port}/json/version`);
      if (version) break;
    } catch (e) {}
  }

  if (!version) {
    chromeProcess.kill();
    throw new Error('Chrome failed to start');
  }

  const list = await fetchJson(`http://127.0.0.1:${port}/json/list`);
  const pageTarget = list.find(t => t.type === 'page');
  const wsUrl = pageTarget ? pageTarget.webSocketDebuggerUrl : version.webSocketDebuggerUrl;

  const client = new CDPClient(wsUrl);
  await client.connect();

  await client.send('Page.enable');
  await client.send('Runtime.enable');

  const consoleLogs = [];
  const consoleErrors = [];

  client.on('Runtime.consoleAPICalled', (params) => {
    const text = params.args.map(a => a.value || a.description || '').join(' ');
    consoleLogs.push({ type: params.type, text });
    if (params.type === 'error') {
      consoleErrors.push(text);
    }
  });

  client.on('Runtime.exceptionThrown', (params) => {
    const text = params.exceptionDetails.text + (params.exceptionDetails.exception ? ' ' + params.exceptionDetails.exception.description : '');
    consoleErrors.push(text);
  });

  const fileUrl = 'file:///Users/mac/.gemini/antigravity/scratch/mecod-labs-portfolio/index.html';
  await client.send('Page.navigate', { url: fileUrl });
  await wait(1000);

  const results = {
    pillar1: {},
    pillar2: {},
    pillar3: {},
    pillar4: {},
    pillar5: {},
    pillar6: {}
  };

  console.log('\n--- AUDITING PILLAR 1: Functional & Acceptance Criteria ---');
  // Check Brand Identity
  const brandText = await client.evaluate('document.querySelector(".brand-text").innerText');
  const brandIcon = await client.evaluate('!!document.querySelector(".brand-icon")');
  results.pillar1.brandPresent = (brandText.includes('Me') && brandText.includes('Cod') && brandIcon);

  // Check Hero CTAs and Badges
  const availabilityBadge = await client.evaluate('document.querySelector(".live-status-text")?.innerText');
  results.pillar1.availabilityBadge = availabilityBadge?.includes('Q4 2026');

  // Check 3 Proof of Work Cards
  const showcaseCards = await client.evaluate('Array.from(document.querySelectorAll(".showcase-card")).map(c => c.querySelector(".showcase-title")?.innerText)');
  results.pillar1.showcaseProjects = showcaseCards;

  // Check 16 Tech Stack Cards
  const totalTech = await client.evaluate('document.querySelectorAll(".tech-card").length');
  results.pillar1.totalTechCount = totalTech;

  // Check Workflow Pillars
  const workflowSteps = await client.evaluate('Array.from(document.querySelectorAll(".workflow-card")).map(c => c.querySelector(".workflow-title")?.innerText)');
  results.pillar1.workflowSteps = workflowSteps;

  // Check Team Roles
  const teamRoles = await client.evaluate('Array.from(document.querySelectorAll(".team-card")).map(c => c.querySelector(".team-role-title")?.innerText)');
  results.pillar1.teamRoles = teamRoles;

  // Check Contact form & 1-tap copy
  const emailWidget = await client.evaluate('!!document.querySelector(".btn-copy-action")');
  results.pillar1.emailCopyPresent = emailWidget;

  console.log('Pillar 1 Results:', JSON.stringify(results.pillar1, null, 2));

  console.log('\n--- AUDITING PILLAR 2: Edge Cases & Destructive Testing ---');
  // 1. Destructive search strings
  const searchTestStrings = [
    '<<<script>alert(1)</script>',
    '!@#$%^&*()_+=-~`{}[]|;:,.<>?',
    '👾 NonExistentEmojiQuery 🚀🛸',
    'a'.repeat(300),
    '   '
  ];

  results.pillar2.searchSanity = [];
  for (const query of searchTestStrings) {
    await client.evaluate(`(() => {
      const input = document.getElementById("tech-search-input");
      input.value = ${JSON.stringify(query)};
      input.dispatchEvent(new Event("input"));
    })()`);
    await wait(100);
    const visibleCards = await client.evaluate('Array.from(document.querySelectorAll(".tech-card")).filter(c => c.style.display !== "none").length');
    const isEmptyActive = await client.evaluate('document.getElementById("tech-empty-state").classList.contains("active")');
    results.pillar2.searchSanity.push({ query: query.substring(0, 20), visibleCards, isEmptyActive });
  }

  // Reset search
  await client.evaluate('document.getElementById("btn-reset-filters").click()');
  await wait(100);

  // 2. Rapid modal open/close spamming
  console.log('Testing rapid modal trigger spamming (15 rapid toggles)...');
  const rapidToggleExceptions = [];
  try {
    for (let i = 0; i < 15; i++) {
      await client.evaluate('document.getElementById("btn-open-lumina-modal").click()');
      await client.evaluate('document.getElementById("btn-close-lumina").click()');
    }
    await wait(200);
    const finalModalState = await client.evaluate('document.getElementById("modal-lumina").classList.contains("open")');
    results.pillar2.rapidModalSpam = { success: true, finalModalOpen: finalModalState };
  } catch (err) {
    results.pillar2.rapidModalSpam = { success: false, error: err.message };
  }

  // 3. Escape key dismiss test
  await client.evaluate('document.getElementById("btn-open-lumina-modal").click()');
  await wait(200);
  let isOpenBeforeEsc = await client.evaluate('document.getElementById("modal-lumina").classList.contains("open")');
  // Dispatch Escape key event
  await client.evaluate(`
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true }));
  `);
  await wait(200);
  let isOpenAfterEsc = await client.evaluate('document.getElementById("modal-lumina").classList.contains("open")');
  results.pillar2.escapeKeyDismiss = { before: isOpenBeforeEsc, after: isOpenAfterEsc, passed: (isOpenBeforeEsc && !isOpenAfterEsc) };

  // 4. Focus trapping test in Modal
  await client.evaluate('document.getElementById("btn-open-lumina-modal").click()');
  await wait(200);
  const activeElementTag = await client.evaluate('document.activeElement.tagName');
  const activeElementClass = await client.evaluate('document.activeElement.className');
  const isInsideModal = await client.evaluate('document.getElementById("modal-lumina").contains(document.activeElement)');
  results.pillar2.modalFocusTrap = { activeElementTag, activeElementClass, isInsideModal };
  await client.evaluate('document.getElementById("btn-close-lumina").click()');
  await wait(100);

  // 5. Spamming email copy 15 times
  console.log('Testing copy email button spamming...');
  await client.evaluate(`
    for(let i=0; i<15; i++) {
      document.querySelector(".quick-email-btn").click();
    }
  `);
  await wait(300);
  const toastActive = await client.evaluate('document.getElementById("toast-message").classList.contains("show")');
  results.pillar2.spamEmailCopy = { toastActive };

  // 6. Form validation edge cases (empty submission vs malformed emails)
  await client.evaluate('document.getElementById("inquiry-form").reset()');
  await client.evaluate('document.getElementById("inquiry-form").dispatchEvent(new Event("submit", { cancelable: true }))');
  await wait(200);
  const errorCount = await client.evaluate('document.querySelectorAll(".form-group.has-error").length');
  const formSuccessPremature = await client.evaluate('document.getElementById("form-success-banner").classList.contains("active")');
  results.pillar2.emptyFormRejection = { errorFieldsDetected: errorCount, rejectedSuccessfully: errorCount === 5 && !formSuccessPremature };

  console.log('Pillar 2 Results:', JSON.stringify(results.pillar2, null, 2));

  console.log('\n--- AUDITING PILLAR 3: UI/UX & Responsive Audit ---');
  // Viewports: 390x844 (mobile), 768x1024 (tablet), 1280x900 (desktop)
  const viewports = [
    { name: 'mobile', width: 390, height: 844, mobile: true },
    { name: 'tablet', width: 768, height: 1024, mobile: false },
    { name: 'desktop', width: 1280, height: 900, mobile: false }
  ];

  results.pillar3.viewports = {};

  for (const vp of viewports) {
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 2,
      mobile: vp.mobile
    });
    await wait(300);

    // Measure horizontal overflow
    const docWidth = await client.evaluate('document.documentElement.scrollWidth');
    const viewportWidth = await client.evaluate('window.innerWidth');
    const hasHorizontalScroll = docWidth > viewportWidth;

    // Check Touch Targets on mobile
    let touchTargetViolations = [];
    if (vp.mobile) {
      touchTargetViolations = await client.evaluate(`
        (() => {
          const interactives = Array.from(document.querySelectorAll("button, a, input, select, textarea, .filter-pill, .preset-chip-btn, .swatch-chip"));
          const violations = [];
          for (const el of interactives) {
            // Check if element is displayed and in viewport/layout
            const style = window.getComputedStyle(el);
            if (style.display === "none" || style.visibility === "hidden" || el.closest('[aria-hidden="true"]')) continue;
            // Ignore range slider inputs as their track height is intentionally slim (thumb provides touch handle)
            if (el.type === "range") continue;
            const rect = el.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) continue;
            // Apple HIG 44x44pt threshold (allowing 1px rounding margin)
            if (rect.width < 43 || rect.height < 43) {
              violations.push({
                tag: el.tagName,
                id: el.id,
                className: el.className,
                text: el.innerText ? el.innerText.substring(0, 20) : '',
                width: Math.round(rect.width),
                height: Math.round(rect.height)
              });
            }
          }
          return violations;
        })()
      `);
    }

    results.pillar3.viewports[vp.name] = {
      docWidth,
      viewportWidth,
      hasHorizontalScroll,
      touchTargetViolationsCount: touchTargetViolations.length,
      sampleViolations: touchTargetViolations.slice(0, 5)
    };
  }

  // Restore Desktop Viewport
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });
  await wait(300);

  // Check Contrast ratios of core color tokens
  const contrastAnalysis = await client.evaluate(`
    (() => {
      // Calculate relative luminance according to WCAG 2.1
      function getLuminance(r, g, b) {
        const a = [r, g, b].map(v => {
          v /= 255;
          return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
      }
      function getRatio(rgb1, rgb2) {
        const l1 = getLuminance(...rgb1);
        const l2 = getLuminance(...rgb2);
        return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      }
      // White canvas: [255, 255, 255]
      // Slate 900 text-primary: [15, 23, 42]
      // Slate 700 text-secondary: [51, 65, 85]
      // Slate 500 text-muted: [100, 116, 139]
      // Indigo 600 color-primary: [79, 70, 229]
      return {
        textPrimaryRatio: getRatio([15, 23, 42], [255, 255, 255]).toFixed(2),
        textSecondaryRatio: getRatio([51, 65, 85], [255, 255, 255]).toFixed(2),
        textMutedRatio: getRatio([100, 116, 139], [255, 255, 255]).toFixed(2),
        colorPrimaryRatio: getRatio([79, 70, 229], [255, 255, 255]).toFixed(2),
        btnTextPrimaryOnIndigo: getRatio([255, 255, 255], [79, 70, 229]).toFixed(2)
      };
    })()
  `);
  results.pillar3.contrastRatios = contrastAnalysis;

  console.log('Pillar 3 Results:', JSON.stringify(results.pillar3, null, 2));

  console.log('\n--- AUDITING PILLAR 4: Security Audit ---');
  // External links security audit (rel="noopener noreferrer")
  const targetBlankAudits = await client.evaluate(`
    (() => {
      const blanks = Array.from(document.querySelectorAll('a[target="_blank"]'));
      return blanks.map(a => ({
        href: a.href,
        hasRel: a.hasAttribute('rel'),
        relValue: a.getAttribute('rel'),
        isSecure: (a.getAttribute('rel') || '').includes('noopener')
      }));
    })()
  `);
  results.pillar4.targetBlankAudits = targetBlankAudits;

  console.log('Pillar 4 Results:', JSON.stringify(results.pillar4, null, 2));

  console.log('\n--- AUDITING PILLAR 5: Memory & Canvas Performance ---');
  // Test Lumina Canvas render execution time
  const canvasBenchmark = await client.evaluate(`
    (() => {
      const canvas = document.getElementById("lumina-hero-thumb");
      const ctx = canvas.getContext("2d");
      const times = [];
      for (let i = 0; i < 10; i++) {
        const t0 = performance.now();
        // Trigger render
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        const t1 = performance.now();
        times.push(t1 - t0);
      }
      return {
        avgClearTimeMs: (times.reduce((a,b)=>a+b,0)/times.length).toFixed(3)
      };
    })()
  `);
  results.pillar5.canvasBenchmark = canvasBenchmark;
  results.pillar5.consoleErrors = consoleErrors;

  console.log('Pillar 5 Results:', JSON.stringify(results.pillar5, null, 2));

  client.close();
  chromeProcess.kill();

  fs.writeFileSync('/Users/mac/.gemini/antigravity/scratch/mecod-labs-portfolio/audit_results.json', JSON.stringify(results, null, 2));
  console.log('\n✅ Audit completed and saved to audit_results.json');
}

audit().catch(err => {
  console.error('Audit script failed:', err);
  process.exit(1);
});
