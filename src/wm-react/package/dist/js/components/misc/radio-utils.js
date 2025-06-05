/* @copyright Stadt Wien - Wiener Melange 200 */
/**
 * Radio button utilities for specialized attribute handling
 *
 * This module provides utility functions to properly handle string-boolean conversions
 * for boolean attributes like 'disabled' in radio buttons.
 */

/**
 * Safely processes boolean options for radio buttons and checkboxes
 *
 * @param {Object} config - Options configuration
 * @param {String|Array} config.labels - Labels separated by semicolons or as an array
 * @param {String|Array} config.values - Values separated by semicolons or as an array
 * @param {String|Boolean|Array} config.disabled - Disabled states as string, boolean, or array
 * @param {String} config.type - Component type ('radio' or 'checkbox')
 * @param {String|Array} config.checked - Checked values as string or array
 * @returns {Array} Processed option objects for rendering
 */
function processRadioOptions(config) {
  const { labels, values, disabled, type, checked } = config;

  const _labels = Array.isArray(labels) ? labels : (labels || '').split(';').map(s => s.trim());
  const _values = Array.isArray(values) ? values : (values || '').split(';').map(s => s.trim());
  const _checkedValues = Array.isArray(checked) ? checked : (checked || '').split(';').filter(Boolean);

  let _disabled = [];
  // If no per-option disabled configuration is provided, default to all false
  if (disabled === undefined || disabled === null || disabled === false || disabled === '') {
    _disabled = Array(_values.length).fill(false);
  }
  else if (typeof disabled === 'string' && disabled.includes(';')) {
    _disabled = disabled.split(';').map(val => val.trim().toLowerCase() === 'true');
  }
  else if (typeof disabled === 'string') {
    const isDisabled = disabled.trim().toLowerCase() === 'true';
    _disabled = Array(_values.length).fill(isDisabled);
  }
  else if (Array.isArray(disabled)) {
    _disabled = disabled;
  }

  const minLength = Math.min(_labels.length, _values.length);
  const resultOptions = [];
  for (let i = 0; i < minLength; i++) {
    const isDisabled = i < _disabled.length ? _disabled[i] : false;
    resultOptions.push({
      text: _labels[i] || '',
      value: _values[i] || '',
      disabled: isDisabled,
      checked: type === 'radio'
        ? _values[i] === _checkedValues[0]
        : _checkedValues.includes(_values[i])
    });
  }
  return resultOptions;
}

export { processRadioOptions };
