/* @copyright Stadt Wien - Wiener Melange 200 */
import { s } from '../../lit-element-8bc32369.js';
import '../../lit-html-0378a13e.js';

/**
 * Darstellung von Listen vertikal, horizontal oder mit Trenner
 *
 * @slot default - <ol> oder <ul>
 *
 */

/**
 * @cssprop --list-border - Rahmen zwischen Listenelementen
 * @cssprop --list-border-color - Rahmenfarbe
 * @cssprop --list-gap - Abstand zwischen Elementen
 * @cssprop --list-link-background-image - Hintergrundbild des 2. Buttons
 */

class List extends s {
	static properties = {
		alignment: { type: String, reflect: true },
		block: { type: Boolean, reflect: true },
		clean: { type: Boolean, reflect: true },
		gap: { type: String, reflect: true },
		separator: { type: String, reflect: true },
		type: { type: String, reflect: true },
	};

	constructor() {
		super();

		/**
		 * @type {Boolean} Liste ohne Aufzählungszeichen, Innen- und Außenabstand
		 */
		this.clean = false;

		/**
		 * @type {'xxs'|'xs'|'s'|'m'|'l'|'none'} Abstand zwischen Elementen
		 */
		this.gap = "s";

		/**
		 * @type {'horizontal'|'row'} Art der Darstellung
		 */
		this.type = undefined;

		/**
		 * @type {'pipe'} Trennzeichen zwischen Elementen
		 */
		this.separator = undefined;

		/**
		 * @type {'center'} Ausrichtung der Elemente
		 */
		this.alignment = undefined;

		/**
		 * @type {Boolean} Ganze Zeile verlinken?
		 */
		this.block = false;
	}

	/**
	 * @private
	 */
	createRenderRoot() {
		return this;
	}
}

customElements.define("wm-list", List);

const tagName = "wm-list";

export { List, tagName };
