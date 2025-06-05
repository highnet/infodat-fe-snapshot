/* @copyright Stadt Wien - Wiener Melange 200 */
/**
 * ErrorTrackingService - A service for tracking and deduplicating form validation errors
 *
 * This service provides centralized error tracking to prevent duplicate error messages
 * in form validation scenarios, particularly when multiple validation methods might
 * report the same error.
 *
 * The service now supports tracking errors across multiple iterations or form steps,
 * allowing for continuous validation while maintaining error history.
 */
class ErrorTrackingService {
  constructor() {
    // Using Set for efficient unique ID tracking
    this._processedErrorIds = new Set();
    // Using Map to associate errors with their respective fields
    this._errorsByFieldId = new Map();
    // NEW: Track suppressed error IDs
    this._suppressedErrorIds = new Set();
    // Flag to track if the service has been reset
    this._isReset = true;
    // Track iterations for multi-step form validation
    this._currentIteration = 0;
    // Store errors by iteration for multi-step forms
    this._errorsByIteration = new Map();
  }

  /**
   * Reset the error tracking state
   * Typically called at the beginning of a new validation cycle
   * @param {boolean} preserveHistory - Whether to keep previous iteration errors
   */
  reset(preserveHistory = false) {
    if (!preserveHistory) {
      this._processedErrorIds.clear();
      this._errorsByFieldId.clear();
      this._suppressedErrorIds.clear();  // Also reset suppressed errors
      this._errorsByIteration.clear();
      this._currentIteration = 0;
    } else {
      // Only clear current iteration errors while preserving history
      // Store current errors in the iteration map before clearing
      if (this._errorsByFieldId.size > 0) {
        this._errorsByIteration.set(this._currentIteration, new Map(this._errorsByFieldId));
        this._currentIteration++;
      }
      // Clear current tracking but keep processed IDs for deduplication
      this._errorsByFieldId.clear();
    }
    this._isReset = true;
  }

  /**
   * Start a new iteration while maintaining previous error history
   * This is useful for multi-step forms where we want to track errors across steps
   * @returns {number} - The new current iteration number
   */
  continueIteration() {
    this.reset(true);
    return this._currentIteration;
  }

  /**
   * Gets the current iteration number
   * @returns {number} - The current iteration number
   */
  getCurrentIteration() {
    return this._currentIteration;
  }

  /**
   * Check if an error with the given ID has already been processed
   * @param {string} id - The ID to check
   * @param {boolean} currentIterationOnly - Whether to check only the current iteration
   * @returns {boolean} - Whether the ID has been processed or suppressed
   */
  isErrorProcessed(id, currentIterationOnly = false) {
    if (!id) return false;

    // Check if suppressed first
    if (this._suppressedErrorIds.has(id)) return true;

    // If checking only current iteration
    if (currentIterationOnly) {
      return this._errorsByFieldId.has(id);
    }

    // Otherwise check all processed errors
    return this._processedErrorIds.has(id);
  }

  /**
   * Track an error ID to prevent duplicates
   * @param {string} id - The error ID to track
   * @param {Object} errorInfo - Additional error information
   */
  trackError(id, errorInfo = {}) {
    if (!id) return;

    this._isReset = false;
    this._processedErrorIds.add(id);
    this._errorsByFieldId.set(id, {
      ...errorInfo,
      timestamp: Date.now(),
      iteration: this._currentIteration
    });
  }

  /**
   * Mark an error as suppressed - it won't appear in error summaries
   * @param {string} id - The error ID to suppress
   */
  suppressError(id) {
    if (!id) return;
    this._suppressedErrorIds.add(id);
  }

  /**
   * Check if an error is explicitly suppressed
   * @param {string} id - The error ID to check
   * @returns {boolean} - Whether the error is suppressed
   */
  isErrorSuppressed(id) {
    if (!id) return false;
    return this._suppressedErrorIds.has(id);
  }

  /**
   * Get all currently tracked errors
   * @param {boolean} includeAllIterations - Whether to include errors from all iterations
   * @returns {Array} - Array of error objects with IDs and associated info
   */
  getErrors(includeAllIterations = false) {
    const errors = [];

    // Add current iteration errors
    this._errorsByFieldId.forEach((info, id) => {
      errors.push({
        id,
        ...info
      });
    });

    // Add previous iterations if requested
    if (includeAllIterations) {
      this._errorsByIteration.forEach((errorMap, iteration) => {
        errorMap.forEach((info, id) => {
          // Only add if not already included (from current iteration)
          if (!errors.some(e => e.id === id)) {
            errors.push({
              id,
              ...info,
              iteration
            });
          }
        });
      });
    }

    return errors;
  }

  /**
   * Get errors from a specific iteration
   * @param {number} iteration - The iteration number to get errors from
   * @returns {Array} - Array of error objects from the specified iteration
   */
  getErrorsForIteration(iteration) {
    const errors = [];

    // If looking for current iteration
    if (iteration === this._currentIteration) {
      this._errorsByFieldId.forEach((info, id) => {
        errors.push({
          id,
          ...info
        });
      });
      return errors;
    }

    // Otherwise look in the iteration map
    const errorMap = this._errorsByIteration.get(iteration);
    if (errorMap) {
      errorMap.forEach((info, id) => {
        errors.push({
          id,
          ...info,
          iteration
        });
      });
    }

    return errors;
  }

  /**
   * Check if there are any tracked errors
   * @param {boolean} includeAllIterations - Whether to include errors from all iterations
   * @returns {boolean} - Whether there are any errors
   */
  hasErrors(includeAllIterations = false) {
    if (this._errorsByFieldId.size > 0) {
      return true;
    }

    if (includeAllIterations && this._errorsByIteration.size > 0) {
      return true;
    }

    return false;
  }

  /**
   * Check if a particular iteration has errors
   * @param {number} iteration - The iteration to check
   * @returns {boolean} - Whether the specified iteration has errors
   */
  hasErrorsInIteration(iteration) {
    if (iteration === this._currentIteration) {
      return this._errorsByFieldId.size > 0;
    }

    const iterationErrors = this._errorsByIteration.get(iteration);
    return iterationErrors && iterationErrors.size > 0;
  }

  /**
   * Get the total count of unique errors across all iterations
   * @param {boolean} includeAllIterations - Whether to include errors from all iterations
   * @returns {number} - The count of unique errors
   */
  getErrorCount(includeAllIterations = false) {
    if (!includeAllIterations) {
      return this._errorsByFieldId.size;
    }

    // Create a set of all unique error IDs across iterations
    const allErrorIds = new Set([...this._errorsByFieldId.keys()]);

    this._errorsByIteration.forEach(errorMap => {
      errorMap.forEach((_, id) => {
        allErrorIds.add(id);
      });
    });

    return allErrorIds.size;
  }
}

// Create a singleton instance for the application
const errorTracker = new ErrorTrackingService();

/**
 * Mixin for components that need error tracking capabilities
 * @param {Class} BaseClass - The base class to extend
 * @returns {Class} - The extended class with error tracking
 */
const ErrorTrackingMixin = (BaseClass) => class extends BaseClass {
  constructor() {
    super();
    // Create a component-specific error tracker
    this._errorTracker = new ErrorTrackingService();
  }

  /**
   * Process errors while deduplicating them
   * @param {Array} errors - Array of error objects to process
   * @param {boolean} deduplicateAcrossIterations - Whether to deduplicate across iterations
   * @returns {Array} - Deduplicated array of error objects
   */
  processErrors(errors, deduplicateAcrossIterations = true) {
    return this._errorTracker.processErrors(errors, deduplicateAcrossIterations);
  }

  /**
   * Reset error tracking state
   * @param {boolean} preserveHistory - Whether to keep previous iteration errors
   */
  resetErrorTracking(preserveHistory = false) {
    this._errorTracker.reset(preserveHistory);
  }

  /**
   * Continue to a new validation iteration while preserving error history
   */
  continueErrorIteration() {
    this._errorTracker.continueIteration();
  }
};

export { ErrorTrackingMixin, ErrorTrackingService, errorTracker };
