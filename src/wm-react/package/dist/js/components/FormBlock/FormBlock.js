/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { n } from '../../when-55b3d1d8.js';
import { f as formStyles } from '../../form.styles-a2bd9acf.js';
import { getFocusableChildren } from '../misc/utils.js';
import '../../unsafe-html-2bcd6aa9.js';
import '../../directive-4c65af6a.js';

const styles = [i`
  * {
    box-sizing: border-box;
  }



  .wrapper {
    max-width: var(--formblock-max-inline-size);
  }

  ::slotted(div:not(:first-child)) {
    margin-top: var(--formblock-gap) !important;
  }

  ::slotted(h2) {
    margin-top: 0 !important;
  }



  .controls {
    margin-top: 1em;
  }

  button:focus-visible {
    outline-offset: var(--wm-theme-site-focus-outline-offset) !important;
    outline: var(--_button-focus-outline, var(--wm-theme-site-focus-outline)) !important;
  }

  [hidden] {
    display: none;
  }
`];

/**
 * Blöcke in Formularen
 * @summary Button/Button
 *
 * @slot default - Text
 */

/**
 * @cssprop --formblock-color - Hintergrundfarbe für Formularblöcke
 * @cssprop --formblock-padding--mobil - Innenabstand (Mobilansicht unter 64em)
 * @cssprop --formblock-max-inline-size - Maximalbreite für den Content
 * @cssprop --formblock-padding--desktop - Innenabstand (Desktopansicht ab 64em)
 * @cssprop --formblock-input-background - Hintergrundfarbe für Formularelemente auf nicht-weißem Hintergrund
 * @cssprop --formblock-gap - Abstand zwischen Blöcken
 */

class FormBlock extends s {
	static properties = {
		duplicate: { type: String, reflect: true },
		deleteLabel: { type: String },
		duplicateLabel: { type: String },
		cloneHeadingLabel: { type: String },
		highlight: { type: String, reflect: true },
		min: { type: Number },
		max: { type: Number },
		type: { type: String, reflect: true },
		_clone: { type: Node },
		_cloned: { type: String, reflect: true },
		_last: { type: Boolean },
	};

	/** @private */
	get _deleteButton() {
		return this.renderRoot.querySelector(`#delete-button`) ?? null;
	}

	/** @private */
	get _clones() {
		return this.querySelectorAll(`[data-clone]`) ?? null;
	}

	/** @private */
	get _formChildComponents() {
		return (
			this.querySelectorAll(
				`wm-input, wm-textarea, wm-select, wm-radio, wm-checkbox, wm-upload`
			) ?? null
		);
	}

	static styles = [formStyles, styles];

	constructor() {
		super();

		/**
		 * @type {String} - Benutzerdefinierte Überschrift
		 */
		this.cloneHeadingLabel = undefined;

		/** @type {'nebelgrau'} Section mit oder ohne Hintergrund. */
		this.highlight = undefined;

		/**
		 * @type {'text'} - Art des Blocks
		 */
		this.type = undefined;

		/**
		 * @type {String} - Label des "Duplizieren"-Buttons
		 */
		this.duplicateLabel = "Weitere hinzufügen";

		/**
		 * @type {String} - Label des Löschen-Buttons
		 */
		this.deleteLabel = "Löschen";

		/**
		 * @type {String} - 'true' für das gesamte Element oder ID für das Element, das dupliziert werden soll
		 */
		this.duplicate = undefined;

		/**
		 * @type {Number} - Mindestanzahl von Blöcken
		 */
		this.min = 1;

		/**
		 * @type {Number} - Maximalanzahl von Blöcken
		 */
		this.max = undefined;

		/**
		 * @type {Node} - the clone
		 * @private
		 */
		this._clone = undefined;

		/**
		 * @type {String} - id of the clones element
		 * @private
		 */
		this._cloned = undefined;

		/**
		 * @type {Boolean} - Is this the last block?
		 * @private
		 */
		this._last = true;

		/**
		 * @private
		 */
	}

	connectedCallback() {
		super.connectedCallback();
	}

	/**
	 * Delete the block
	 * @private
	 */
	_deleteBlock(e) {
		// Delete block
		const id = e.target.closest("[data-clone]").id;
		e.target.closest("[data-clone]").remove();
		this.requestUpdate();

		// Focus previous block
		const previousBlock = this._clones.length
			? this._clones[this._clones.length - 1]
			: this;
		this._focusFormBlockItem(previousBlock);

		// Reset counter in headings if necessary
		this._rewriteHeadings();

		this._clones.forEach((clone, idx) => {
			this._rewriteUniqueAttributeValues(clone, idx + 1);
		});

		// Rewrite index in blocks

		// Native first
			this.dispatchEvent(
				new Event("delete", {
						bubbles: true,
						composed: true
				})
		);
		// Dispatch event
		const options = {
			bubbles: true,
			composed: true,
			detail: {
				totalBlocks: this._clones.length + 1,
				totalClones: this._clones.length,
				deletedBlock: id,
			},
		};

		/**
		 * @type {CustomEvent} Block wurde gelöscht.
		 * @summary { totalBlocks, totalClones, deletedBlock }
		 * */
		this.dispatchEvent(new CustomEvent("wm-block-deleted", options));
	}

	/**
	 * Focus the first focusable element
	 * @private
	 */
	_focusFormBlockItem(block) {
		setTimeout(() => {
			const firstFocusableItem = getFocusableChildren(block)[0];
			firstFocusableItem.focus();
		}, 0);
	}

	/**
	 * @private
	 * Make IDs of form fields unqiue after cloning
	 */
	_rewriteUniqueAttributeValues(clone, count, clean = false) {
		const elementsWithIDorName = clone.querySelectorAll(
			":is(wm-input, input, wm-textarea, textarea, wm-select, select, wm-upload, wm-switch, wm-radio, wm-checkbox, label):is([id],[name],[for])"
		);

		// Generate and set id on wrapper div
		clone.setAttribute("id", `${this.duplicate}-${count}`);
		clone.dataset.clone = "true";

		for (let i = 0; i < elementsWithIDorName.length; i++) {
			const element = elementsWithIDorName[i];

			this._rewriteUniqueAttributeValue(element, "for", count);
			this._rewriteUniqueAttributeValue(element, "name", count);
			this._rewriteUniqueAttributeValue(element, "id", count);

			if (clean) {
				element.value = "";
				element.removeAttribute("setvalue");
			}
		}
	}

	/**
	 * When we clone elements, we need to rewrite attribute values like id, for, name, etc. so that they are unique
	 * @param {Node} element The element you want to edit
	 * @param {String} attribute The affected attribute
	 * @param {Number} count Counter
	 * @private
	 */
	_rewriteUniqueAttributeValue(element, attribute, count) {
		const origin = this.querySelector(`#${this.duplicate}`);

		// Check if the attribute exists
		if (element.hasAttribute(attribute)) {
			if (element.hasAttribute(`data-${attribute}`)) {
				element.setAttribute(
					attribute,
					`${element.getAttribute(`data-${attribute}`).replace('$', count)}`
				);
			} else {
				// Check if the element has a data attribute with a reference to the original value
				// If not, it means it's a new clone
				if (!element.hasAttribute(`data-${attribute}-ref`)) {
					// Create the reference
					element.setAttribute(
						`data-${attribute}-ref`,
						origin
							.querySelector(
								`[${attribute}="${element.getAttribute(attribute)}"]`
							)
							.getAttribute(attribute)
					);
					// Rewrite the attribute
					element.setAttribute(
						attribute,
						`${element.getAttribute(attribute)}-${count}`
					);
				} else {
					// If yes, it's an existing clone
					// Then just take the value and rewrite the attribute
					element.setAttribute(
						attribute,
						`${element.getAttribute(`data-${attribute}-ref`)}-${count}`
					);
				}
			}
		}
	}

	/**
	 * Clone and append delete button
	 * @private
	 */
	_addDeleteButton(clone) {
		// Clone button
		const button = this._deleteButton.cloneNode(true);
		// Add click event
		button
			.querySelector("button")
			.addEventListener("click", this._deleteBlock.bind(this));
		button.removeAttribute("id");
		button.removeAttribute("hidden");
		// Append
		clone.append(button);
	}

	/**
	 * Reset counter in headings if necessary
	 * @private
	 */
	_rewriteHeadings() {
		if (this.cloneHeadingLabel && this.cloneHeadingLabel.endsWith("$")) {
			for (let i = 0; i < this._clones.length; i++) {
				const clone = this._clones[i];
				clone.querySelectorAll("h2, h3, h4")[0].textContent =
					this.cloneHeadingLabel.replace("$", i + 1);
			}
		}
	}

	/**
	 * Duplicate a block
	 * @private
	 */
	_duplicateBlock() {
		/* Duplicate whole block */
		if (this.duplicate) {
			this._clone = this.querySelector(`#${this.duplicate}`).cloneNode(true);

			this._setupClone(this._clone, this._clones.length, true);

			// Append clone
			this.append(this._clone);
			// Focus first focusable item
			this._focusFormBlockItem(this._clone);

			// Dispatch event
			const options = {
				bubbles: true,
				composed: true,
				detail: "id",
			};

			this._clone.dataset.cloneReady = "true";

			/**
			 * @type {CustomEvent} Block wurde dupliziert.
			 * @summary Boolean
			 * */
			this.dispatchEvent(new CustomEvent("wm-block-duplicated", options));
		}
	}

	/**
	 * @private
	 * @param {Node} clone
	 */
	_setupClone(clone, index, clean = false) {
		// Rewrite ids of child form items after cloning to avoid duplicates
		this._rewriteUniqueAttributeValues(clone, index, clean);

		// clone the delete button and append it to every clone
		this._addDeleteButton(clone);

		// If there's a custom label, set it
		if (this.cloneHeadingLabel) {
			clone.querySelectorAll("h2, h3, h4")[0].textContent =
				this.cloneHeadingLabel.replace("$", index + 1);
		}
		clone.dataset.cloneReady = "true";
	}

	async getUpdateComplete() {
		await super.getUpdateComplete();
		if (this._formChildComponents.length) {
			const children = [];
			for (let i = 0; i < this._formChildComponents.length; i++) {
				children.push(this._formChildComponents[i].updateComplete);
			}
			await Promise.all(children);
		}
	}

	/**
	 * Clones can be created manually
	 * This function accounts for manually created clones
	 * @private
	 */
	_checkForClones() {
		setTimeout(async () => {
			// Check if there are manually created clones
			await this.updateComplete;
			for (let i = 0; i < this._clones.length; i++) {
				const clone = this._clones[i];
				if (!clone.dataset.cloneReady) {
					this._setupClone(clone, i);
				}
			}
		}, 0);
	}

	render() {
		return x`
			<div class="wrapper" part="wrapper">
				<slot
					@slotchange=${{
						handleEvent: () => this._checkForClones(),
						once: false,
					}}
				></slot>
			</div>

			<wm-button
				size="xs"
				part="delete"
				id="delete-button"
				hidden
				kind="secondary"
			>
				<button>
					<wm-icon iconid="trash"></wm-icon>
					${this.deleteLabel}
				</button>
			</wm-button>
			${n(
				(this.duplicate && !this.max) ||
					(this.max && this._clones.length < this.max),
				() => x`
					<wm-button part="duplicate" size="s" ?hidden="${!this._last}">
						<button @click="${this._duplicateBlock}" class="add">
							<span aria-hidden="true">+</span> ${this.duplicateLabel}
						</button>
					</wm-button>
				`
			)}
		`;
	}
}

customElements.define("wm-formblock", FormBlock);

const tagName = "wm-formblock";

export { FormBlock, tagName };
