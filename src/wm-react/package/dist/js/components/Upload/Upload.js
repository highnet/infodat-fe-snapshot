/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { e } from '../../class-map-68392fb3.js';
import { FormWrapper } from '../misc/form-wrapper.js';
import { dispatchCustomEvent } from '../misc/utils.js';
import { ErrorStateController } from '../misc/error-state-controller.js';
import { FormStateManager } from '../misc/form-state-manager.js';
import { g as globalCSS } from '../../wiener-melange.bundle.min-0e2d13dc.js';
import '../../directive-4c65af6a.js';
import '../../when-55b3d1d8.js';
import '../misc/slot.js';
import '../../unsafe-html-2bcd6aa9.js';
import '../misc/error-tracking.js';

const styles = [i`
  :host {
    --_border-color: var(--upload-border-color);

    display: block;
    /*text-align: center;*/
    width: 100%;
  }

  :host([multiple]) {
    background-color: var(--upload-background-color);
  }

  :host([multiple]) .upload {
    border: 2px dashed var(--_border-color);
  }
  
  .upload:has(.droparea:hover, [type="file"]:focus),
  .dragging {
    --_border-color: var(--upload-border-color--active);
  }

  :host([multiple]) .droparea {
    cursor: pointer;
    padding: var(--upload-padding);
  }

  :host([multiple]) .files-selected {
    padding: var(--upload-padding);
  }

  :host([multiple]) .files-selected .droparea {
    padding: 0;
  }


  .selected-files {
    background-color: var(--upload-background-color);
    text-align: start;
  }

  .selected-files li {
    white-space: break-word;
  }

  .selected-files li:last-child {
    padding-bottom: 0 !important;
  }

  .selected-files wm-button {
    margin-inline-start: auto;
  }

  :host(:not([multiple])) .selected-files {
    padding: 1rem;
  }

  :host(:not([multiple])) .droparea:hover {
    cursor: pointer;
  }

  :host(:not([multiple])) .files-selected .droparea:hover{
    cursor: not-allowed;
    
  }

  :host(:not([multiple]):focus-within) .btn-upload, 
  :host(:not([multiple])) :not(.files-selected) .droparea:hover .btn-upload {
    --button-background: var(--button-background-hover);
    --_button-color: var(--button-color-hover);

    outline-offset: var(--wm-theme-site-focus-outline-offset);
    outline: var(--wm-theme-site-focus-outline);
  }

  ::slotted(:last-child) {
    margin-bottom: 0;
  }

  .has-error {
    --_border-color: var(--wm-color-ui-error,  var(--wm-base-color-ui-error));

    color: var(--wm-color-ui-error,  var(--wm-base-color-ui-error));
  }
`];

const globalStyles = new CSSStyleSheet();
globalStyles.replaceSync(globalCSS);
/**
 * @summary Button/Button, List/List, Stack/Stack
 *
 * @slot default - Text oder HTML-Content über dem Button
 * @slot postcontent - Text oder HTML-Content unter dem Button
 */

/**
 * @cssprop --upload-background-color - Hintergrundfarbe
 * @cssprop --upload-border-color - Farbe des Rahmens
 * @cssprop --upload-border-color--dark - Farbe des Rahmens (Dunkel)
 * @cssprop --upload-border-color--active - Farbe des Rahmens bei Hover und Focus
 * @cssprop --upload-padding - Innenabstand
 */

class Upload extends FormStateManager(FormWrapper(s)) {
	/** @private */
	get _input() {
		return this.shadowRoot?.querySelector("input") ?? null;
	}

	/** @private */
	get _droparea() {
		return this.shadowRoot?.querySelector(".droparea") ?? null;
	}

	/** @private */
	get _output() {
		return this.shadowRoot?.querySelector('[role="status"]') ?? null;
	}

	/** @private */
	get _removeButtons() {
		return this.shadowRoot?.querySelectorAll(".removeButton") ?? null;
	}

	static properties = {
		_files: { type: Array, reactive: true },
		_formData: { type: Object },
		hasError: { type: Boolean, reflect: true },
		label: { type: String },
		labelDelete: { type: String },
		labelSelection: { type: String },
		labelDeleted: { type: String },
		multiple: { type: Boolean },
		hideSelectedFiles: { type: Boolean },
		disabled: { type: Boolean, reflect: true },
		errormessage: { type: String, attribute: 'errormessage' },
		summaryErrormessage: { type: String, attribute: 'summary-errormessage' },
		validator: { type: Function },
		validate: { type: Boolean, reflect: true },
		showErrors: { type: Boolean, reflect: true },
		_hasInteracted: { state: true }
	};

	static styles = [globalStyles, styles];

	constructor() {
		super();

		/**
		 * @type {String} - Bezeichnung des Eingabefeldes
		 */
		this.label = "Datei hochladen";

		/**
		 * @type {String} - Bezeichnung des Löschen-Buttons (Lösche [Dateiname])
		 */
		this.labelDelete = "Lösche";
		/**
		 * @type {String} - Bezeichnung für das Liveregion-Update nachdem eine Datei gelöscht wurde. ([Dateiname] gelöscht)
		 */
		this.labelDeleted = "gelöscht";

		/**
		 * @type {String} - Bezeichnung für Titel der ausgewählten Dateien
		 */
		this.labelSelection = "Datei(en) ausgewählt";

		/**
		 * Holds all uploaded files
		 * @private
		 */
		this._files = new DataTransfer();

		/**
		 * An array of the selected files for the output
		 * @private
		 */
		this._fileList = [];

		/**
		 * Auswahl von mehreren Dateien erlauben
		 */
		this.multiple = false;

		/**
		 * Auflistung der ausgewählten Dateien verbergen
		 */
		this.hideSelectedFiles = false;

		/**
		 * Needed to submit files
		 */
		this._formData = new FormData();

		/**
		 * @type {Boolean} - Indicates whether the upload is disabled
		 */
		this.disabled = false;

		/**
		 * @type {String} - Fehlermeldung bei ungültiger Eingabe
		 * Diese Meldung wird direkt am Upload-Element angezeigt, wenn es validiert wird und ungültig ist,
		 * z.B. wenn ein Pflichtfeld keine Datei enthält.
		 */
		this.errormessage = ""; // Can be overridden by attribute

		/**
		 * @type {String} - Spezifische Fehlermeldung für die Fehlerübersicht
		 * Diese Meldung wird in der Fehlerübersicht (wm-formerrorsummary) anstelle der normalen
		 * Fehlermeldung angezeigt. Dies ist nützlich, um in der Übersicht kontextspezifischere
		 * Fehlermeldungen anzuzeigen, z.B. "Bitte laden Sie einen Nachweis bei 'Einkommensnachweis' hoch"
		 * statt nur "Bitte wählen Sie eine Datei aus".
		 */
		this.summaryErrormessage = "";

		/**
		 * @type {Boolean} - Default error state
		 */
		this.hasError = false;

		/**
		 * @type {Boolean} - Whether the component has been interacted with
		 */
		this._hasInteracted = false;

		/**
		 * @type {Boolean} - Aktiviert die Validierung bei Eingabe
		 */
		this.validate = false;

		/**
		 * @type {Boolean} - Steuert die Anzeige von Fehlermeldungen
		 */
		this.showErrors = false;

		// Initialize the ErrorStateController
		this._errorController = new ErrorStateController(this);
	}

	connectedCallback() {
		super.connectedCallback();

		this._setupFileUpload();
	}

	/**
	 * DragOver event on the whole component
	 * Adds a border to the component
	 * @private
	 * @param {*} e Event
	 */
	_dragOver = (e) => {
		// Skip if component is disabled
		if (this.disabled) return;

		e.preventDefault();
		this._droparea.classList.add("dragging");
	};

	/**
	 * DragLeave event on the whole component
	 * Removes a border to the component
	 * @private
	 * @param {*} e Event
	 */
	_dragLeave = (e) => {
		// Skip if component is disabled
		if (this.disabled) return;

		e.preventDefault();
		this._droparea.classList.remove("dragging");
	};

	/**
	 * Wrapper for prevent default
	 * @private
	 * @param {*} e Event
	 */
	_preventDefault = (e) => {
		e.preventDefault();
	};

	/**
	 * Drop event on the whole component
	 * @private
	 * @param {*} e Event
	 */
	_drop = (e) => {
		// Skip if component is disabled
		if (this.disabled) return;

		e.preventDefault();
		this.classList.remove("dragging");
		this._addFiles(null, e.dataTransfer.files);
	};

	/**
	 * Click event on the droparea
	 * @private
	 * @param {*} e Event
	 */
	_click = (e) => {
		if (!this.disabled) {
			if (
				!["label", "input", "button"].includes(
					e.composedPath()[0].nodeName.toLowerCase()
				)
			) {

				this._input.click();
			}
		}
	};

	/**
	 * Manages all the different events for uploading files
	 * @private */
	_setupFileUpload() {
		setTimeout(() => {
			this.addEventListener("dragover", this._dragOver, false);
			this.addEventListener("dragleave", this._dragLeave, false);
			this.addEventListener("drag", this._preventDefault);
			this.addEventListener("dragstart", this._preventDefault);
			this.addEventListener("dragenter", this._preventDefault);
			this.addEventListener("drop", this._drop, false);
			this._droparea.addEventListener("click", this._click, false);
			this._input.addEventListener("click", this._handleInputClick.bind(this));
			this._input.addEventListener("change", this._addFiles.bind(this));
		}, 0);
	}

	/**
	 * @private
	 */
	_handleInputClick(e) {
		// If it's a single file input and a file is already selected don't allow more files
		if (!this.multiple && this._fileList.length > 0) {
			e.preventDefault();
		}
		return
	}

	/**
	 * Updates the input field and the file list after upload
	 * @private
	 */
	_updateFileList() {
		this._input.files = this._files.files;
		this._fileList = [...this._files.files];
		this.requestUpdate();

		/**
		 * @type {CustomEvent} Dateiliste aktualisiert
		 * @summary Array mit Dateien
		 * */
		this.dispatchEvent(
			new CustomEvent("wm-files-updated", {
				detail: this._fileList,
				bubbles: true,
				composed: true,
			})
		);
	}

	/**
	 * Add files
	 * @private
	 * @param {*} e Change Event
	 * @param {*} files Selected files
	 */
	_addFiles(e, files) {
		if (!this.disabled) {
			Array.prototype.forEach.call(files || this._input.files, (file) => {
				this._files.items.add(file);
			});

			this._updateFileList();

			// Dispatch native change event
			this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));

			// Dispatch custom event
			this.dispatchEvent(
				new CustomEvent("wm-files-added", {
					detail: this._fileList,
					bubbles: true,
					composed: true,
				})
			);

			this._updateLiveRegion(`${this._fileList.length} ${this.labelSelection}`);
		}
	}

	/**
	 * Bestimmte Datei entfernen
	 * @param {Number} index Index der ausgewählten Datei
	 * @param {Event} e Click-Event
	 */
	removeFile(index, e) {
		if (!this.disabled) {
			e.preventDefault();

			// Get the file to remove
			const fileToRemove = this._files.files[index];

			// Remove the file form the file list
			this._files.items.remove(index);

			this._unsetFileValues();
			this._setFileValues();

			// Update the rendered list of files
			this._updateFileList();

			// Focus next or previous delete button
			this._manageFocusAfterDeletion(index);

			// Dispatch native change event
			this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));

			// Dispatch custom event
			this.dispatchEvent(
				new CustomEvent("wm-files-removed", {
					detail: {
						remaining: this._fileList,
						removed: fileToRemove,
					},
					bubbles: true,
					composed: true,
				})
			);

			this._updateLiveRegion(
				`${fileToRemove.name} ${this.labelDeleted} (Noch ${this._fileList.length} ${this.labelSelection})`
			);
		}
	}

	/**
	 * @private
	 * Focus next or previous delete button
	 * If there's no button, focus the component
	 */
	_manageFocusAfterDeletion(index) {
		setTimeout(() => {
			let next = index;
			// If there are still files
			if (this._removeButtons.length) {
				// Focus the previous element if there is no next element
				if (!this._removeButtons[next]) {
					next = index - 1;
				}
				// Focus
				this._removeButtons[next].focus();
			} else {
				this._input.focus();
			}
		}, 0);
	}

	/**
	 * Returns the file size in a readable format
	 * @private
	 * @param {*} number
	 * @returns String
	 */
	_returnFileSize(number) {
		if (number < 1024) {
			return `${number} bytes`;
		} else if (number >= 1024 && number < 1048576) {
			return `${(number / 1024).toFixed(1)} KB`;
		} else if (number >= 1048576) {
			return `${(number / 1048576).toFixed(1)} MB`;
		}
	}

	/**
	 * Check whether the file is an image
	 * @private
	 * @param {*} file
	 * @returns Boolean
	 */
	_isImage(file) {
		const fileTypes = [
			"image/apng",
			"image/bmp",
			"image/gif",
			"image/jpeg",
			"image/pjpeg",
			"image/png",
			"image/svg+xml",
			"image/tiff",
			"image/webp",
			"image/x-icon",
		];

		return fileTypes.includes(file.type);
	}

	/**
	 * @private
	 */
	_updateLiveRegion(message) {
		this._output.textContent = message;

		// Clear region after 5 seconds
		setTimeout(() => {
			this._output.textContent = "";
		}, 5000);
	}

	/**
	 * @private
	 */
	_changed() {
		setTimeout(() => {
			this._setFileValues();
			/**
			 * @private
			 */
			this.dispatchEvent(
				new CustomEvent("change", { detail: this._files.files })
			);

			this._defineErrorMessages();

			this._internals.setValidity(
				this._item.validity,
				this._item.validationMessage,
				this._item
			);

			if (this.validate) {
				// Call checkValidity for file upload errors
				this.checkValidity();
			}
		}, 100);
	}

	/**
	 * Checks validity for file upload and applies custom error handling.
	 * @returns {String} The error message (empty if valid)
	 */
	checkValidity() {
		// Skip validation if the component is disabled
		if (this.disabled === true) {
			// Clear any errors when disabled
			this._errorController.clearError();
			return "";
		}

		const inputElement = this._input;
		let errorMsg = "";
		if (this.required && (!this._fileList || this._fileList.length === 0)) {
			errorMsg = this.errormessage || "Bitte wählen Sie eine Datei aus.";
			inputElement.setCustomValidity(errorMsg);
		} else {
			inputElement.setCustomValidity("");
			this._errorController.clearError();
		}

		// Always use the ErrorStateController for consistent error handling
		if (errorMsg) {
			this._errorController.setError(errorMsg);
		} else {
			this._errorController.clearError();
		}

		return errorMsg;
	}

	/**
	 * Shows an error message for this upload component
	 * @param {string} message - The error message to display
	 */
	showError(message) {
		// Don't show errors on disabled components
		if (this.disabled) return;

		this._errorController.setError(message);
	}

	/**
	 * Clears any error state from this upload component
	 */
	clearError() {
		this._errorController.clearError();
	}

	/**
	 * Override _performValidation from FormStateManager
	 * @protected
	 * @returns {String} Error message or empty string if valid
	 */
	_performValidation() {
		// Skip validation entirely if the component is disabled
		if (this.disabled === true) return "";

		// Skip validation if the user hasn't interacted with the component
		// and showErrors isn't enabled
		if (!this._hasInteracted && !this.showErrors) return "";

		// Perform validation using standard rules
		const errorMsg = this.required && (!this._fileList || this._fileList.length === 0)
			? (this.errormessage || "Bitte wählen Sie eine Datei aus.")
			: "";

		if (errorMsg) {
			this._errorController.setError(errorMsg);
		} else {
			this._errorController.clearError();
		}

		return errorMsg;
	}

	/**
	 * Set the disabled state of the component and properly handle UI updates
	 * @param {boolean} isDisabled - Whether the component should be disabled
	 * @public
	 */
	setDisabled(isDisabled) {
		this.disabled = !!isDisabled;

		// When disabling, clear any error state
		if (this.disabled) {
			this._errorController.clearError();
		}

		// Update native input's disabled state
		if (this._input) {
			this._input.disabled = this.disabled;
		}

		// Update remove buttons' disabled state
		if (this._removeButtons) {
			this._removeButtons.forEach(button => {
				button.disabled = this.disabled;
			});
		}

		// Update class list for styling
		this.requestUpdate();
	}

	/**
	 * Validation method that doesn't use the controller to avoid circular references
	 * @private
	 * @returns {string} Error message or empty string if valid
	 */
	_validateWithoutController() {
		// Skip validation if disabled
		if (this.disabled) return "";

		const inputElement = this._input;
		if (!inputElement) return "";

		// Clear any existing custom validity message
		inputElement.setCustomValidity("");

		// Perform validation using standard rules
		if (this.required && (!this._fileList || this._fileList.length === 0)) {
			return this.errormessage || "Bitte wählen Sie eine Datei aus.";
		}

		return "";
	}

	/**
	 * Remove all files
	 */
	_unsetFileValues() {
		this._formData.delete(this.name);
	}

	/**
	 * Fill formdata submitted to the server
	 */
	_setFileValues() {
		let value = "";

		if (this._files.files.length) {
			value = `C:\\fakepath\\${this._files.files[0].name}`;
		}
		this.value = value;

		for (let i = 0; i < this._files.files.length; i++) {
			this._formData.append(this.name, this._files.files[i]);
		}

		this._internals.setFormValue(this._formData);
	}

	_handleChange(e) {
		// Skip if disabled
		if (this.disabled) return;

		this._hasInteracted = true;

		dispatchCustomEvent(this, 'change', {
			value: this.value,
			target: e.target
		});
	}

	_handleEvent(e) {
		if (!this.disabled) {
			dispatchCustomEvent(this, e.type, {
				value: this.value,
				target: e.target
			});
			switch(e.type) {
							}
		}
	}

	_handleUpload(e) {
		if (!this.disabled) {
			try {
				this._hasInteracted = true;

				if (this.validate || this.showErrors) {
					this._errorController.validate();
				}
			} catch (error) {
				console.error("Error handling upload:", error);
			}
		}
	}

	formResetCallback() {
		super.formResetCallback?.();
		this._unsetFileValues();
		this._hasInteracted = false;
		this._errorController.clearError();
	}

	/**
	 * Reset the component to its initial state
	 * @public
	 */
	reset() {
		// Clear all files
		this._files = new DataTransfer();
		this._fileList = [];

		// Reset form state
		this._unsetFileValues();
		this._formData = new FormData();
		this._hasInteracted = false;

		// Update UI
		if (this._input) {
			this._input.value = '';
		}

		// Clear errors
		this._errorController.clearError();

		// Update internal state and UI
		this._internals?.setFormValue('');
		this.requestUpdate();

		// Dispatch change event
		dispatchCustomEvent(this, 'change', {
			value: '',
			isReset: true
		});
	}

	render() {
		const uploadClass = {
			"files-selected": this._fileList.length,
			"has-error": this.hasError,
			"disabled": this.disabled
		};

		return this._renderWrapper(x`
			<wm-stack
				justify="center"
				grow
				equal
				gap="l"
				?vertical="${!this.multiple}"
				class="upload ${e(uploadClass)}"
			>
				<wm-stack
					vertical
					alignment="${this.multiple ? "center" : "start"}"
					class="droparea"
					gap="${this.multiple ? "s" : "xs"}"
				>
					<div>
						<slot></slot>
					</div>

					<p>
						<wm-button kind="secondary" inert>
							<button
								aria-disabled="${this._fileList.length && !this.multiple
									? "true"
									: "false"}"
								?disabled=${this.disabled}
								class="btn-upload"
							>
								${this.label}
							</button>
						</wm-button>
					</p>

					<input
						aria-label="${this.label}"
						class="wm-h-vh"
						type="file"
						?multiple="${this.multiple}"
						?required=${this.required}
						@change="${this.disabled ? undefined : this._changed}"
						@blur="${this.disabled ? undefined : this._handleBlur}"
						@focus="${this.disabled ? undefined : this._handleFocus}"
						?disabled=${this.disabled}
					/>

					<div>
						<slot name="postcontent"></slot>
					</div>
				</wm-stack>

				<div
					?hidden="${!this._fileList.length || this.hideSelectedFiles}"
					class="selected-files"
				>
					<p ?hidden="${!this.multiple}">
						<strong>${this._fileList.length} ${this.labelSelection}</strong>
					</p>
					<wm-list type="row" gap="xs">
						<ul>
							${this._fileList.map(
								(file, i) => x`
									<li>
										<img
											src="${URL.createObjectURL(file)}"
											width="48"
											?hidden="${!this._isImage(file)}"
											alt="0"
										/>
										${file.name} (${this._returnFileSize(file.size)})

										<wm-button kind="secondary" color="morgenrot" size="xs">
											<button
												@click="${this.disabled ? undefined : this.removeFile.bind(this, i)}"
												type="button"
												aria-label="${this.labelDelete} ${file.name}"
												class="removeButton"
												?disabled=${this.disabled}
											>
												<wm-icon iconid="trash"></wm-icon>
											</button>
										</wm-button>
									</li>
								`
							)}
						</ul>
					</wm-list>
				</div>
			</wm-stack>
			<div role="status" class="wm-h-vh"></div>
		`);
	}
}
customElements.define("wm-upload", Upload);

const tagName = "wm-upload";

export { Upload, tagName };
