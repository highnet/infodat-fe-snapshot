/* @copyright Stadt Wien - Wiener Melange 200 */
/**
 * Framework-agnostic validation function
 *
 * This function validates form input values and returns appropriate error messages.
 * It works in conjunction with the broader error handling system:
 *
 * 1. This function handles field-level validation and returns field error messages
 * 2. Form.js collects these errors and looks for summary-specific messages via 'summary-errormessage' attributes
 * 3. FormErrorsummary.js displays the errors, using summary-specific messages when available
 *
 * For summary-specific error messages:
 * - Add a 'summary-errormessage' attribute to the form field
 * - The Field will show the regular 'errormessage'
 * - The Error Summary will show the 'summary-errormessage' instead
 *
 * @param {HTMLElement} inputElement - The input element to validate
 * @param {Object} options - Validation options
 * @param {string} options.value - The value to validate
 * @param {boolean} [options.required] - Whether the field is required
 * @param {string} [options.pattern] - RegExp pattern for validation
 * @param {Function} [options.validator] - Custom validator function
 * @param {string} [options.errormessage] - Custom error message to use
 * @returns {string} Empty string if valid, error message if invalid
 */

function validateInput(inputElement, { value, required, pattern, validator, errormessage }) {
  // Early return for empty optional fields
  if (!required && (!value || value.trim() === '')) {
    return '';
  }

  // Required check
  if (required && (!value || value.trim() === '')) {
    return errormessage || 'This field is required';
  }

  // Pattern validation
  if (pattern && value) {
    try {
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        return errormessage || 'Invalid format';
      }
    } catch (e) {
      console.warn('Invalid RegExp pattern:', pattern);
    }
  }

  // Custom validator
  if (validator && typeof validator === 'function') {
    const customError = validator(value);
    if (customError) {
      return errormessage || customError;
    }
  }

  // Native HTML validation if available
  if (inputElement?.validity && !inputElement.validity.valid) {
    return errormessage || inputElement.validationMessage;
  }

  return '';
}

export { validateInput };
