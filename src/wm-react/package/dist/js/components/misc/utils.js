/* @copyright Stadt Wien - Wiener Melange 200 */
import '../../unsafe-html-2bcd6aa9.js';
import '../../lit-html-0378a13e.js';
import '../../directive-4c65af6a.js';

const getNodeIndex = (elements, child) => {
  const index = Array.prototype.indexOf.call(elements, child);
  return index
};

const randomHash = (length = 5) => {
  const hash = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, length);
  return hash
};

const slug = string => {
  return string
    .toLowerCase()
    .replaceAll('ü', 'ue')
    .replaceAll('ä', 'ae')
    .replaceAll('ö', 'oe')
    .replaceAll('ß', 'sz')
    .replaceAll(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '') // eslint-disable-line
    .replaceAll(' ', '-')
};

const _stringToObject = (string, object) => {
  return string.split('.').reduce((o, i) => o[i], object)
};

const throttle = function (fn, delay) {
  let timer = null;
  return function () {
    const context = this; const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
};

let tappedTwice;
const isDoubleTap = function () {
  if (!tappedTwice) {
    tappedTwice = true;

    window.setTimeout(function () {
      tappedTwice = false;
    }, 300);
    return false
  }
  return true
};

// Function to toggle scroll prevention on the main content
const toggleScrollPrevention = function () {
  document.documentElement.style.overflow  = document.documentElement.style.overflow  === 'auto' ? 'hidden' : 'auto';
};

// Get focusable children
const getFocusableChildren = function(parent) {
  return parent.querySelectorAll('input, wm-input, button, textarea, wm-textarea, select, wm-select, [contenteditable], a, [tabindex="0"], details')
};

const removeEmptyFieldsFromObject = function(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
};

const debounce = (fn, delay = 1000) => {
  let timerId = null;
  return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => fn(...args), delay);
  };
};

const removeDuplicateObjectByField = (array, field) => {
  return array.reduce((unique, o) => {
    if(!unique.some(obj => obj[field] === o[field])) {
      unique.push(o);
    }
    return unique;
  },[]);
};

/**
 * Dispatch a standardized custom event along with the native event
 * @param {HTMLElement} element - The element to dispatch the event from
 * @param {string} eventName - The name of the event
 * @param {Object} detail - The detail object for the event
 */
// Updated dispatchCustomEvent with bridging for react-hook-form
const dispatchCustomEvent = (element, eventName, detail = {}) => {
  // List of events expected by React/react-hook-form
  const nativeEvents = ['input', 'change', 'blur', 'focus', 'keydown', 'keyup', 'click', 'defined'];
  if (nativeEvents.includes(eventName)) {
    // Dispatch native event that React can capture
    element.dispatchEvent(new Event(eventName, { bubbles: true, composed: true }));
  }
  // Dispatch custom event with a "wm-" prefix
  element.dispatchEvent(new CustomEvent(`wm-${eventName}`, {
    detail,
    bubbles: true,
    composed: true
  }));
};

const validateField = (value, { pattern, required, errorMsg }) => {
  if (required && (!value || value.trim() === '')) {
    return errorMsg || "This field is required";
  }
  if (pattern) {
    const regex = new RegExp(pattern);
    if (!regex.test(value)) {
      return errorMsg || "Invalid format";
    }
  }
  return "";
};

export { _stringToObject, debounce, dispatchCustomEvent, getFocusableChildren, getNodeIndex, isDoubleTap, randomHash, removeDuplicateObjectByField, removeEmptyFieldsFromObject, slug, throttle, toggleScrollPrevention, validateField };
