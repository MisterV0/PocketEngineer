/**
 * Handles back button click to return to index page
 * Can be called from any app
 */
function goBackHome() {
  // Navigate to root index — works from any subdirectory
  const depth = window.location.pathname.split('/').filter(Boolean).length - 1;
  const prefix = depth > 0 ? '../'.repeat(depth) : '';
  window.location.href = prefix + 'index.html';
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

    // Add close logic
    document.getElementById('sharedMobileWarningBtn').addEventListener('click', () => {
      document.getElementById('sharedMobileWarningModal').classList.remove('active');
      sessionStorage.setItem(modalShownKey, 'true');
    });
  }
}
