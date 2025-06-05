/* @copyright Stadt Wien - Wiener Melange 200 */
import { s, i } from '../../lit-element-8bc32369.js';
import '../../lit-html-0378a13e.js';
import { n } from '../../static-bc61a2dc.js';

/** 
 * Accordion Komponente - Ein- und Ausklappbare Panels
 * @slot default - Nimmt Paare von wm-accordion-heading und wm-accordion-content Elementen auf
 */

/**
 * @cssprop --accordion-background-color - Hintergrundfarbe des Buttons
 * @cssprop --accordion-background-color--hover - Hintergrundfarbe des Buttons Hover & Focus
 * @cssprop --accordion-panel-background-color - Hintergrundfarbe des Panels
 * @cssprop --accordion-panel-font-color - Schriftfarbe im Panel
 * @cssprop --accordion-border - Rahmen um den Button
 * @cssprop --accordion-font-color - Schriftfarbe des Buttons
 * @cssprop --accordion-font-color--hover - Schriftfarbe des Buttons Hover & Focus
 * @cssprop --accordion-contrast - Kontrast-Hintergrundfarbe, zum Beispiel für Multimedia-Elemente
 * @cssprop --accordion-font-weight - Schriftstärke im Button
 * @cssprop --accordion-padding-inline - Innenabstand links und rechts
 * @cssprop --accordion-padding-block-start - Innenabstand oben
 * @cssprop --accordion-padding-block-end - Innenabstand unten
 * @cssprop --accordion-gap - Abstand zwischen Panels
 */

class Accordion extends s {
	/** @private */
	get _headings() {
		return this.querySelectorAll("wm-accordion-heading") ?? null;
	}

	/** @private */
	get _openHeadings() {
		return this.querySelectorAll("wm-accordion-heading[expanded]") ?? null;
	}

	static properties = {
		open: { type: Number, reflect: true },
		expanded: { type: Boolean, reflect: true },
		single: { type: Boolean, reflect: true },
	};

	static styles = [
		i`
			* {
				box-sizing: border-box;
			}

			:host {
				display: block;
			}
		`,
	];

	constructor() {
		super();

		/**
		 * @type {Number} - Nummer des zu öffnenden Panels angeben, beginnend bei eins (1). Es kann nur ein Wert übergeben werden.
		 */
		this.open = undefined;

		/**
		 * @type {Boolean} - Attribut angeben, damit immer nur ein Panel gleichzeitig geöffnet wird (übertrumpft expanded).
		 */
		this.single = false;

		/**
		 * @type {Boolean} - Alle geöffnet anzeigen.
		 */
		this.expanded = false;
	}

	firstUpdated() {
		setTimeout(() => {
			/** @type {CustomEvent} Web Component ist bereit*/
				this.dispatchEvent(
					new CustomEvent("wm-defined", {
						detail: {},
						bubbles: true,
						composed: true,
					})
				);
			}, 0);
	}

	updated(changedProperties) {
		/**
		 * Open or close all items when the expanded attribute changes
		 */
		if (changedProperties.has("expanded")) {
			this._openOrCloseAll(this.expanded);
		}

		/**
		 * Open a specific item
		 */
		if (changedProperties.has("open")) {
			this._openOrClose();
		}
	}

	connectedCallback() {
		super.connectedCallback();

		this._updateChildren();
		this._addEvents();
	}

	/**
	 * Add attributes to children
	 * @private
	 */
	_updateChildren() {
		for (let i = 0; i < this._headings.length; i++) {
			const heading = this._headings[i];
			// Set unique ids on headings
			heading.id = `heading-${i}`;
		}
	}

	/**
	 * Add events
	 * @private
	 */
	_addEvents() {
		// When one of the parent elements is opened and `single` is true, close all the other
		this.addEventListener("wm-expanded", (e) => {
			setTimeout(() => {
				if (this.single) {
					this._openOrCloseAll(false, e.detail.index);
				}
			}, 0);
		});
	}

	/**
	 *
	 * @param {Number} idx 0-based index of the element
	 * @param {String} type "open" or "close"
	 * @private
	 */
	_openOrClose(idx = null, type = "open") {
		// Use passed index or use the value from the open attribute
		const open = idx || this.open;

		// If single is true, close all open items
		if (this.single) {
			this._openOrCloseAll(false);
		}

		// Check if the index is a number
		if (!isNaN(parseInt(open))) {
			const index = parseInt(open) - 1;
			// Hide or close the heading
			if (this._headings[index]) {
				if (type === "close") {
						this._headings[index].removeAttribute("expanded");
						this._collapseContent(this._headings[index]);
				} else {
						this._headings[index].setAttribute("expanded", "");
						this._expandContent(this._headings[index]);
				}
			} else {
				console.error("Dieses Element existiert leider nicht.");
			}
		}
	}

	/**
	 * Open or close all items
	 * @private
	 */
	_openOrCloseAll(open, exception = null) {
		for (let i = 0; i < this._headings.length; i++) {
			if (exception !== i) {
				const heading = this._headings[i];
				if (open) {
					heading.setAttribute("expanded", "");
					this._expandContent(heading);
				} else {
					heading.removeAttribute("expanded");
					this._collapseContent(heading);
				}
			}
		}
	}

	/**
	 * @type {CustomEvent} Akkordeon wurde geöffnet
	 * @summary
	 */
	_expandContent(heading) {
    const options = {
        bubbles: true,
        composed: true,
        detail: {
            id: heading.id,
            index: parseInt(heading.id.split("heading-")[1]),
        },
    };

		/**
		 * @type {CustomEvent} Akkordeon wurde geöffnet
		 * @summary Index des ausgewählten Akkordeon Headings wm-accordion-heading
		 */
    heading.nextElementSibling.dispatchEvent(
        new CustomEvent("wm-expanded", options)
    );
	}

	/**
	 * @type {CustomEvent} Akkordeon wurde geschlossen
	 * @summary Index des ausgewählten Akkordeon Headings wm-accordion-heading
	 */
	_collapseContent(heading) {
		const options = {
			bubbles: true,
			composed: true,
			detail: {
				id: heading.id,
				index: parseInt(heading.id.split("heading-")[1]),
			},
		};

		heading.nextElementSibling.dispatchEvent(
			new CustomEvent("wm-collapsed", options)
		);
	}

	/**
	 * Panel öffnen
	 * @param {number} element - index
	 */
	expand(index) {
		this._openOrClose(index);
	}

	/**
	 * Panel schließen
	 * @param {number} element - index
	 */
	collapse(index) {
		this._openOrClose(index, "close");
	}

	render() {
		return n`
			<div>
				<slot @slotchange="${this._rerender}"></slot>
			</div>
		`;
	}
}

customElements.define("wm-accordion", Accordion);

const tagName = "wm-accordion";

export { Accordion, tagName };
