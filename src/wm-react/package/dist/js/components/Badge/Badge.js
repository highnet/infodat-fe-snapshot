/* @copyright Stadt Wien - Wiener Melange 200 */
import { s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';

/**
 * Badges sind Hervorhebungen in Großbuchstaben, um wichtige Hinweise auf den ersten Blick sichtbar zu machen.
 *
 * @slot default - Text
 */

/**
 * @cssprop --badge-color-success - Farbe für Erfolg-Badge
 * @cssprop --badge-color-error - Farbe für Error-Badge
 * @cssprop --badge-font-variation-settings - Schriftstärke für WM Variablefont
 * @cssprop --badge-font-weight - Standard-Schriftstärke
 * @cssprop --badge-gap - Gap innerhalb
 */

class Badge extends s {
	static properties = {
		color: { type: String, reflect: true },
		size: { type: String, reflect: true },
	};

	constructor() {
		super();

		/**
		 * @type {'success'|'error'} - Textfarbe
		 */
		this.color = undefined;

		/**
		 * @type {'s'} - Textfarbe
		 */
		this.size = undefined;
	}

	connectedCallback() {
		super.connectedCallback();
	}

	render() {
		return x` <slot></slot> `;
	}
}

customElements.define("wm-badge", Badge);

const tagName = "wm-badge";

export { Badge, tagName };
