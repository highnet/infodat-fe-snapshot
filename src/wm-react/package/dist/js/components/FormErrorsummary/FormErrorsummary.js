/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { dispatchCustomEvent } from '../misc/utils.js';
import { errorTracker } from '../misc/error-tracking.js';
import { g as globalCSS } from '../../wiener-melange.bundle.min-0e2d13dc.js';
import '../../unsafe-html-2bcd6aa9.js';
import '../../directive-4c65af6a.js';

const styles = [i`
  * {
    box-sizing: border-box;
  }

  :host {
    display: block;
  }

  ::slotted(li) {
    font-variation-settings: var(--wm-font-weight-bold);
    margin: 0 !important;
  }
`];

const globalStyles = new CSSStyleSheet();
globalStyles.replaceSync(globalCSS);

/**
 * Auflistung von Fehlern in einem Formular, wenn es auf einer Seite mehrere Fehler gibt.
 *
 * Diese Komponente zeigt eine Zusammenfassung aller Validierungsfehler in einem Formular an.
 * Fehler werden als anklickbare Liste dargestellt, die zum entsprechenden Feld navigieren.
 *
 * Die Fehlermeldungen können über das Attribut 'summary-errormessage' an den Formularfeldern
 * angepasst werden. Dies ermöglicht unterschiedliche Fehlermeldungen in der Zusammenfassung
 * im Vergleich zu den Fehlermeldungen am Feld selbst.
 *
 * Beispiel:
 * ```html
 * <wm-select
 *   required
 *   errormessage="Bitte wählen Sie eine Option"
 *   summary-errormessage="Bitte wählen Sie eine Option bei 'Antragsart'"
 * ></wm-select>
 * ```
 *
 * @summary FormBlock/FormBlock, Notification/Notification, List/List
 *
 * @slot default - Text bzw. Fehlereinträge (normalerweise vom Formular automatisch befüllt)
 *
 * @fires jump-to-error - Wird ausgelöst, wenn auf einen Fehlereintrag geklickt wird
 *   Der Event enthält die ID des Feldes als `event.detail.id`
 */

class FormErrorsummary extends s {
	/**
	 * @property {String} heading - Überschrift für die Fehlerliste. [ERRORS] ist ein Platzhalter für die Anzahl der Fehler
	 * @property {Boolean} noFocus - Deaktiviert den automatischen Fokus auf den ersten Fehlereintrag
	 * @property {Number} errors - Anzahl der Fehler (wird automatisch aktualisiert)
	 */
	static properties = {
		heading: { type: String },
		noFocus: { type: Boolean },
		errors: { type: Number },
		_errorItems: { state: true, type: Array }
	};

	/**
	 * Gibt die Liste der Fehlereinträge zurück
	 * @private
	 * @returns {NodeList} - Liste der <li> Elemente mit Fehlereinträgen
	 */
	get _errors() {
		return this.querySelectorAll(`li`) ?? null;
	}

	static styles = [globalStyles, styles];

	constructor() {
		super();

		/**
		 * @type {String} - Überschrift für die Fehlerliste. [ERRORS] ist ein Platzhalter für die Anzahl der Fehler, der automatisch ersetzt wird.
		 */
		this.heading = `Es gibt [ERRORS] Fehler auf der Seite:`;

		/**
		 * @type {Boolean} - Autofocus deaktivieren
		 * Wenn auf 'true' gesetzt, wird der erste Fehlereintrag nicht automatisch fokussiert,
		 * was nützlich sein kann, wenn die Fehlerübersicht in einem Modal oder einer anderen
		 * Komponente verwendet wird, die ihren eigenen Fokus verwaltet.
		 */
		this.noFocus = false;

		/**
		 * @type {Number} - Anzahl der Fehler
		 * Diese Eigenschaft wird automatisch aktualisiert, wenn Fehlereinträge hinzugefügt
		 * oder entfernt werden. Der Wert wird in der Überschrift angezeigt.
		 */
		this.errors = 0;

		/**
		 * @private
		 * @type {Array} - Array of error items to render
		 */
		this._errorItems = [];
	}

	connectedCallback() {
		super.connectedCallback();
	}

	/**
	 * Fokussiert den ersten Fehlereintrag, wenn vorhanden
	 * Dies verbessert die Barrierefreiheit, indem die Tastaturnavigation
	 * automatisch zum ersten Fehler geleitet wird.
	 *
	 * @private
	 */
	_focusFirstError() {
		setTimeout(() => {
			if (this._errors.length && !this.noFocus) {
				this._errors[0].querySelector("a").focus();
			}
		}, 0);
	}

	/**
	 * Aktualisiert die Anzahl der Fehler und setzt den Fokus
	 * Diese Methode wird aufgerufen, wenn sich der Inhalt des Slots ändert,
	 * z.B. wenn neue Fehlereinträge hinzugefügt oder entfernt werden.
	 *
	 * @private
	 */
	_handleSlotChange() {
		// Update total error count - note that _errors are the li items now
		this.errors = this._errors ? this._errors.length : 0;

		// Ensure first error gets focus for accessibility
		this._focusFirstError();
	}

	/**
	 * Fokussiert das fehlerhafte Feld, wenn auf einen Fehlereintrag geklickt wird
	 *
	 * Diese Methode ermöglicht die Navigation zu fehlerhaften Feldern durch Klick
	 * auf die entsprechenden Einträge in der Fehlerübersicht.
	 *
	 * @private
	 * @param {Event} e - Das Klick-Event
	 */
	_jumpToError(e) {
		e.preventDefault();

		if (e.target.nodeName === "A") {
			const id = e.target.getAttribute("href").replace("#", "");
			const targetElement = document.querySelector(`#${id}`);

			if (targetElement) {
				targetElement.focus();
			}
			// Use the dispatchCustomEvent utility consistently
			dispatchCustomEvent(this, 'jump-to-error', { id });
		}
	}

	/**
	 * Setzt eine benutzerdefinierte Fehlermeldung für einen bestimmten Fehlereintrag
	 *
	 * Diese Methode kann verwendet werden, um die Fehlermeldung in der Zusammenfassung
	 * programmatisch zu ändern, nachdem die Fehler bereits angezeigt wurden.
	 *
	 * Beispiel:
	 * ```javascript
	 * const errorSummary = document.querySelector('wm-formerrorsummary');
	 * errorSummary.setSummaryMessage('inputField', 'Bitte geben Sie einen gültigen Namen ein');
	 * ```
	 *
	 * @public
	 * @param {string} errorId - Die ID des fehlerhaften Feldes
	 * @param {string} message - Die anzuzeigende Fehlermeldung in der Zusammenfassung
	 */
	setSummaryMessage(errorId, message) {
		if (!errorId || !message) return;

		// Find the error item by its href attribute
		const errorItem = this.querySelector(`li a[href="#${errorId}"]`);
		if (errorItem) {
			errorItem.textContent = message;
		}
	}

	/**
	 * Clear all processed error IDs - should be called when form is reset
	 * or when a new validation cycle begins
	 * @public
	 */
	clearErrorTracking() {
		// Use the central error tracker
		errorTracker.reset();
	}

	/**
	 * Continue to the next set of errors while preserving error history
	 * This is useful for multi-step validation where you want to handle
	 * errors one at a time or in batches
	 *
	 * @public
	 * @returns {boolean} - True if there are more errors to process in previous iterations
	 */
	continueToNextError() {
		// Continue to next iteration using the error tracker
		errorTracker.continueIteration();

		// Clear the visible error items from the DOM
		while (this.querySelector('li')) {
			this.removeChild(this.querySelector('li'));
		}

		// Reset our internal error items array
		this._errorItems = [];

		// Update error count
		this.errors = 0;

		// Return whether there are errors in previous iterations
		return errorTracker.hasErrors(true);
	}

	/**
	 * Check if there are more errors in previous iterations
	 *
	 * @public
	 * @returns {boolean} - True if there are more errors to process
	 */
	hasMoreErrors() {
		// Check if there are errors in any iteration
		return errorTracker.hasErrors(true);
	}

	/**
	 * Check if an error with the given ID already exists to prevent duplicates
	 * @param {string} id - The error ID to check
	 * @returns {boolean} - True if the error already exists
	 * @private
	 */
	_isErrorDuplicate(id) {
		if (!id) return false;
		return errorTracker.isErrorProcessed(id);
	}

	/**
	 * Track an error ID to prevent duplicates
	 * @param {string} id - The error ID to track
	 * @private
	 */
	_trackError(id) {
		if (id) {
			errorTracker.trackError(id);
		}
	}

	/**
	 * Update with error objects, preventing duplicates based on ID
	 * @param {Array} errors - Array of error objects
	 * @param {HTMLTemplateElement} itemTemplate - Template for error items
	 * @public
	 */
	updateWithErrors(errors, itemTemplate) {
		if (!errors || !itemTemplate) {
			console.warn("Missing required parameters for updateWithErrors");
			return;
		}

		try {
			// Clear existing error items first
			while (this.querySelector('li')) {
				this.removeChild(this.querySelector('li'));
			}

			 // Get all errors from the errorTracker service instead of managing them here
			const trackedErrors = errorTracker.getAllErrors();
			const mergedErrors = this._mergeErrorLists(errors, trackedErrors);

			this._errorItems = [];

			// Track group errors to avoid showing both group and child errors
			const groupErrors = new Map(); // Map of group IDs to their errors

			// First pass: identify all group errors
			mergedErrors.forEach(error => {
				if (error.isGroupError && error.originId) {
					groupErrors.set(error.originId, error);
				}
			});

			// Second pass: process errors, prioritizing group errors and avoiding duplicates
			mergedErrors.forEach(error => {
				if (!error.id) return;

				// Skip if this error has already been processed for the summary
				if (this._errorItems.some(item => item.id === error.id)) return;

				// If this is a field inside a form group that already has an error, skip it
				if (!error.isGroupError) {
					// Check if this field belongs to a group with error
					const parentGroup = document.getElementById(error.id)?.closest('wm-form-group');
					if (parentGroup && parentGroup.id && groupErrors.has(parentGroup.id)) {
						// Skip this individual field error since the group error will be shown
						errorTracker.trackError(error.id); // Still track it to prevent duplicates
						return;
					}
				}

				// Track this error using the central tracker if it's not already tracked
				if (!errorTracker.isErrorProcessed(error.id)) {
					errorTracker.trackError(error.id, {
						isGroupError: !!error.isGroupError,
						originId: error.originId || error.id,
						summaryMsg: error.summaryMsg || error.msg
					});
				}

				// Add to our internal list for rendering
				this._errorItems.push(error);

				// Create error item and add to DOM
				const template = itemTemplate.content.cloneNode(true);
				const li = template.querySelector("li");
				const a = li.querySelector("a");

				if (a) {
					a.href = `#${error.id}`;
					a.textContent = error.summaryMsg || error.msg;

					// Add data attributes for ARIA improvements
					if (error.isGroupError && error.originId && error.originId !== error.id) {
						a.setAttribute('data-group-id', error.originId);
					}
				}

				// Add to light DOM
				this.appendChild(template);
			});

			// Update error count
			this.errors = this._errors?.length || 0;

			// Focus first error if appropriate
			this._focusFirstError();
		} catch (error) {
			console.error("Error updating error summary:", error);
		}
	}

	/**
	 * Merges the passed error list with errors from the central tracker
	 * @param {Array} passedErrors - Errors passed to updateWithErrors
	 * @param {Array} trackedErrors - Errors from the central tracker
	 * @returns {Array} - Deduplicated merged error list
	 * @private
	 */
	_mergeErrorLists(passedErrors, trackedErrors) {
		const errorMap = new Map();

		// First add all passed errors to the map
		passedErrors.forEach(error => {
			if (error.id) {
				errorMap.set(error.id, error);
			}
		});

		// Then add tracked errors that aren't already in the map
		trackedErrors.forEach(error => {
			if (error.id && !errorMap.has(error.id) && !errorTracker.isErrorSuppressed(error.id)) {
				errorMap.set(error.id, error);
			}
		});

		return Array.from(errorMap.values());
	}

	/**
	 * Adds a single error to the summary
	 * @param {Object} error - Error object with id, msg, and optional summaryMsg
	 * @param {HTMLTemplateElement} itemTemplate - Template for error item
	 * @public
	 */
	addError(error, itemTemplate) {
		if (!error || !error.id || !itemTemplate) return;

		// Skip if already processed or suppressed
		if (errorTracker.isErrorSuppressed(error.id) ||
			this._errorItems.some(item => item.id === error.id)) {
			return;
		}

		// Track the error
		errorTracker.trackError(error.id, {
			isGroupError: !!error.isGroupError,
			originId: error.originId || error.id,
			summaryMsg: error.summaryMsg || error.msg
		});

		// Add to internal list
		this._errorItems.push(error);

		// Create and add the DOM element
		const template = itemTemplate.content.cloneNode(true);
		const li = template.querySelector("li");
		const a = li.querySelector("a");

		if (a) {
			a.href = `#${error.id}`;
			a.textContent = error.summaryMsg || error.msg;

			if (error.isGroupError && error.originId && error.originId !== error.id) {
				a.setAttribute('data-group-id', error.originId);
			}
		}

		this.appendChild(template);
		this.errors = this._errors?.length || 0;
	}

	render() {
		return x`
			<wm-formblock role="region" aria-labelledby="heading">
				<h2 id="heading" class="wm-e-h3">
					${this.heading.replace("[ERRORS]", this.errors)}
				</h2>

				<wm-notification type="error" iconSize="32">
					<wm-list gap="xs">
						<ol @click="${this._jumpToError}">
							<slot @slotchange="${this._handleSlotChange}"></slot>
						</ol>
					</wm-list>
				</wm-notification>
			</wm-formblock>
		`;
	}
}

customElements.define("wm-formerrorsummary", FormErrorsummary);

const tagName = "wm-formerrorsummary";

export { FormErrorsummary, tagName };
