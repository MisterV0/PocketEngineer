/**
 * PocketEngineer - Common Application Utilities
 * Shared functionality across all calculator apps
 * Version 1.0.0
 */

// ============================================
// BACK BUTTON NAVIGATION
// ============================================

/**
 * Handles back button click to return to index page
 * Can be called from any app
 */
function goBackHome() {
  window.location.href = 'index.html';
}

/**
 * Setup back button event listeners
 * Call this in DOMContentLoaded if using class-based approach
 */
function initBackButtons() {
  const backButtons = document.querySelectorAll('.back-button');
  backButtons.forEach(btn => {
    if (!btn.hasListener) {
      btn.addEventListener('click', (e) => {
        if (!btn.href) {
          e.preventDefault();
          goBackHome();
        }
      });
      btn.hasListener = true;
    }
  });
}

// ============================================
// INPUT SANITIZATION & VALIDATION
// ============================================

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

// ============================================
// CONVERSION UTILITIES
// ============================================

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
// INITIALIZATION
// ============================================

// Auto-initialize back buttons on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initBackButtons();
});

