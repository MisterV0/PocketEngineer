/**
 * Handles back button click to return to index page
 * Can be called from any app
 */
function goBackHome() {
  // Navigate to root index — works from any subdirectory
  const depth = window.location.pathname.split('/').filter(Boolean).length - 1;
  const prefix = depth > 0 ? '../'.repeat(depth) : './';
  window.location.href = prefix;
}

/**
 * Setup back button event listeners
 * Call this in DOMContentLoaded if using class-based approach
 */
function initBackButtons() {
  const backButtons = document.querySelectorAll('.back-button');
  backButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (!btn.href) {
        e.preventDefault();
        goBackHome();
      }
    });
  });
}

/**
 * Validate positive number
 * @param {string} value - The input value
 * @returns {boolean}
 */
function isValidPositiveNumber(value) {
  const num = parseFloat(value);
  return !isNaN(num) && num > 0;
}

/**
 * Validate non-negative number
 * @param {string} value - The input value
 * @returns {boolean}
 */
function isValidNonNegativeNumber(value) {
  const num = parseFloat(value);
  return !isNaN(num) && num >= 0;
}

// ============================================
// NUMBER FORMATTING
// ============================================

/**
 * Format number to fixed decimal places
 * @param {number} value - The number to format
 * @param {number} decimals - Number of decimal places
 * @returns {string}
 */
function formatDecimal(value, decimals = 2) {
  return parseFloat(value).toFixed(decimals);
}

/**
 * Format number with thousand separators
 * @param {number} value - The number to format
 * @param {number} decimals - Number of decimal places
 * @returns {string}
 */
function formatWithSeparators(value, decimals = 2) {
  return parseFloat(value).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

/**
 * Format a number to N significant figures, without exponent notation
 * and without trailing zeros. Use this instead of toFixed() for results,
 * so small values never collapse to 0.
 *   formatSig(0.0000295735, 4) -> "0.00002957"
 *   formatSig(5026.548, 5)     -> "5026.5"
 * @param {number} value
 * @param {number} sigFigs
 * @returns {string}
 */
function formatSig(value, sigFigs = 6) {
  if (value === null || value === undefined || !isFinite(value)) return '';
  if (value === 0) return '0';
  const rounded = Number(value.toPrecision(sigFigs));
  const abs = Math.abs(rounded);
  if (abs >= 1e21 || abs < 1e-15) return rounded.toExponential(sigFigs - 1).replace(/\.?0+e/, 'e');
  const decimals = Math.max(0, sigFigs - 1 - Math.floor(Math.log10(abs)));
  const text = rounded.toFixed(Math.min(decimals, 20));
  return text.includes('.') ? text.replace(/\.?0+$/, '') : text;
}

const SI_PREFIXES = [
  [1e12, 'T'], [1e9, 'G'], [1e6, 'M'], [1e3, 'k'], [1, ''],
  [1e-3, 'm'], [1e-6, 'µ'], [1e-9, 'n'], [1e-12, 'p']
];

/**
 * Split a value into a significant-figure mantissa and an SI prefix.
 *   engParts(0.000702128) -> { number: "702.1", prefix: "µ" }
 * @param {number} value
 * @param {number} sigFigs
 * @returns {{number: string, prefix: string}}
 */
function engParts(value, sigFigs = 4) {
  if (value === null || value === undefined || !isFinite(value)) return { number: '—', prefix: '' };
  if (value === 0) return { number: '0', prefix: '' };
  const abs = Math.abs(value);
  let i = SI_PREFIXES.findIndex(([scale]) => abs >= scale);
  if (i === -1) i = SI_PREFIXES.length - 1;
  let [scale, prefix] = SI_PREFIXES[i];
  // Rounding can carry 999.96 up to 1000: step up one prefix when it does
  if (Math.abs(Number((value / scale).toPrecision(sigFigs))) >= 1000 && i > 0) {
    [scale, prefix] = SI_PREFIXES[i - 1];
  }
  return { number: formatSig(value / scale, sigFigs), prefix };
}

/**
 * Engineering format with SI prefix and unit.
 *   formatEng(0.000702128, 'A') -> "702.1 µA"
 *   formatEng(4700, 'Ω')        -> "4.7 kΩ"
 * @param {number} value
 * @param {string} unit
 * @param {number} sigFigs
 * @returns {string}
 */
function formatEng(value, unit = '', sigFigs = 4) {
  const { number, prefix } = engParts(value, sigFigs);
  if (number === '—') return '—';
  return `${number} ${prefix}${unit}`.trim();
}

/**
 * Escape user-provided text before putting it into innerHTML.
 * @param {string} text
 * @returns {string}
 */
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;'); // not &#39;: code highlighters treat # as a comment
}

/**
 * Remove disallowed characters from a text input without jumping the caret
 * to the end (assigning .value normally moves it there).
 *   stripInvalidChars(input, /[^01]/g)
 *   stripInvalidChars(input, /[^0-9a-f]/gi, s => s.toUpperCase())
 * @param {HTMLInputElement} input
 * @param {RegExp} disallowed - Must use the g flag
 * @param {Function} [transform] - Length-preserving transform, e.g. toUpperCase
 * @returns {string} The cleaned value
 */
function stripInvalidChars(input, disallowed, transform = s => s) {
  const value = input.value;
  const clean = transform(value.replace(disallowed, ''));
  if (clean === value) return clean;
  const caret = input.selectionStart ?? value.length;
  const beforeCaret = value.slice(0, caret);
  const removed = beforeCaret.length - beforeCaret.replace(disallowed, '').length;
  input.value = clean;
  const pos = Math.max(0, caret - removed);
  try { input.setSelectionRange(pos, pos); } catch (e) { /* not a text input */ }
  return clean;
}

/**
 * True when the user asked the OS to reduce motion.
 * Canvas loops check this and draw a single static frame instead.
 */
const prefersReducedMotion = window.matchMedia
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false;

/**
 * Convert decimal to binary
 * @param {number} decimal - Decimal number
 * @returns {string} - Binary string
 */
function decimalToBinary(decimal) {
  return Math.floor(decimal).toString(2);
}

/**
 * Convert binary to decimal
 * @param {string} binary - Binary string
 * @returns {number} - Decimal number
 */
function binaryToDecimal(binary) {
  return parseInt(binary, 2);
}

/**
 * Convert decimal to hexadecimal
 * @param {number} decimal - Decimal number
 * @returns {string} - Hexadecimal string
 */
function decimalToHex(decimal) {
  return Math.floor(decimal).toString(16).toUpperCase();
}

/**
 * Convert hexadecimal to decimal
 * @param {string} hex - Hexadecimal string
 * @returns {number} - Decimal number
 */
function hexToDecimal(hex) {
  return parseInt(hex, 16);
}

/**
 * Convert decimal to octal
 * @param {number} decimal - Decimal number
 * @returns {string} - Octal string
 */
function decimalToOctal(decimal) {
  return Math.floor(decimal).toString(8);
}

/**
 * Convert octal to decimal
 * @param {string} octal - Octal string
 * @returns {number} - Decimal number
 */
function octalToDecimal(octal) {
  return parseInt(octal, 8);
}

// ============================================
// LOCAL STORAGE HELPERS
// ============================================

/**
 * Save app state to localStorage
 * @param {string} appName - Name of the app
 * @param {Object} state - State object to save
 */
function saveAppState(appName, state) {
  try {
    localStorage.setItem(`pe_${appName}_state`, JSON.stringify(state));
  } catch (e) {
    console.warn('Could not save to localStorage:', e);
  }
}

/**
 * Load app state from localStorage
 * @param {string} appName - Name of the app
 * @returns {Object|null}
 */
function loadAppState(appName) {
  try {
    const saved = localStorage.getItem(`pe_${appName}_state`);
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    console.warn('Could not load from localStorage:', e);
    return null;
  }
}

/**
 * Clear app state from localStorage
 * @param {string} appName - Name of the app
 */
function clearAppState(appName) {
  try {
    localStorage.removeItem(`pe_${appName}_state`);
  } catch (e) {
    console.warn('Could not clear localStorage:', e);
  }
}

// ============================================
// MODALS: Escape to close, focus trap, focus restore
// ============================================

const PE_FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
const peModalStack = [];

function peVisibleFocusables(el) {
  return Array.from(el.querySelectorAll(PE_FOCUSABLE))
    .filter(node => (node.offsetParent !== null || node === document.activeElement)
      && getComputedStyle(node).visibility !== 'hidden');
}

/**
 * Register a modal that the page has just shown. The page keeps its own
 * show/hide styling; this adds dialog semantics, moves focus inside,
 * traps Tab, and makes Escape call `onClose`.
 * @param {HTMLElement} el - The modal root (overlay) element
 * @param {Function} onClose - The page's own close function
 * @param {HTMLElement} [initialFocus] - Element to focus first
 */
function openModal(el, onClose, initialFocus) {
  if (!el) return;
  if (peModalStack.some(entry => entry.el === el)) return;

  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  if (!el.hasAttribute('aria-labelledby') && !el.hasAttribute('aria-label')) {
    const heading = el.querySelector('h1, h2, h3');
    if (heading) {
      if (!heading.id) heading.id = (el.id || 'pe-modal') + '-title';
      el.setAttribute('aria-labelledby', heading.id);
    }
  }

  peModalStack.push({ el, onClose, opener: document.activeElement });

  // Focus right away; if the modal is still fading in, try once more shortly after
  const moveFocus = () => {
    const target = initialFocus || peVisibleFocusables(el)[0];
    if (target) {
      target.focus({ preventScroll: true });
    } else {
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    }
    return el.contains(document.activeElement);
  };
  if (!moveFocus()) setTimeout(moveFocus, 60);
}

/**
 * Unregister a modal the page has just hidden and give focus back to
 * whatever opened it.
 * @param {HTMLElement} el - The modal root element
 */
function closeModal(el) {
  const index = peModalStack.findIndex(entry => entry.el === el);
  if (index === -1) return;
  const [entry] = peModalStack.splice(index, 1);
  const opener = entry.opener;
  if (opener && document.contains(opener) && typeof opener.focus === 'function') {
    opener.focus({ preventScroll: true });
  }
}

document.addEventListener('keydown', (e) => {
  if (!peModalStack.length) return;
  const top = peModalStack[peModalStack.length - 1];

  if (e.key === 'Escape') {
    e.preventDefault();
    e.stopPropagation();
    if (typeof top.onClose === 'function') top.onClose();
    else closeModal(top.el);
    return;
  }

  if (e.key === 'Tab') {
    const items = peVisibleFocusables(top.el);
    if (!items.length) {
      e.preventDefault();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    if (!top.el.contains(document.activeElement)) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

// Auto-initialize back buttons on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initBackButtons();
});

// ============================================
// SHARED MOBILE WARNING MODAL
// ============================================

/**
 * Checks if the user is on mobile and displays a shared warning modal
 * if they haven't seen it yet during this session.
 */
function checkMobileWarning() {
  const isMobile = window.innerWidth <= 1024 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const modalShownKey = 'pe_mobile_warning_accepted';

  if (isMobile && !sessionStorage.getItem(modalShownKey)) {
    // Create the modal container
    const modalContainer = document.createElement('div');
    modalContainer.id = 'sharedMobileWarningModal';
    modalContainer.className = 'mobile-warning-modal active';

    // Build the beautiful, simplified text HTML
    modalContainer.innerHTML = `
      <div class="modal-content">
        <p>This tool is reliant on a visual canvas and is not built for small screens.</p>

        <div class="device-icons-container">
          <div class="device-icon desktop">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>
          <div class="device-icon tablet">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12" y2="18"></line>
            </svg>
          </div>
          <div class="device-icon phone">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="19" x2="12" y2="19"></line>
            </svg>
          </div>
        </div>

        <p>You can experience a degraded layout. Apologies for the inconvenience, recommend switching to a tablet or PC.</p>
        
        <button id="sharedMobileWarningBtn" class="w-full mt-5 bg-[#18181b] text-white font-medium py-3 rounded-xl hover:bg-[#27272a] transition-colors shadow-md">
          I Understand, Continue
        </button>
      </div>
    `;

    document.body.appendChild(modalContainer);

    // Add close logic (button, or Escape via the shared modal helper)
    const dismiss = () => {
      modalContainer.classList.remove('active');
      sessionStorage.setItem(modalShownKey, 'true');
      closeModal(modalContainer);
    };
    document.getElementById('sharedMobileWarningBtn').addEventListener('click', dismiss);
    modalContainer.setAttribute('aria-label', 'Small screen notice');
    openModal(modalContainer, dismiss);
  }
}
