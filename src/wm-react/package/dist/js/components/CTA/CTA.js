/* @copyright Stadt Wien - Wiener Melange 200 */
import { s } from '../../lit-element-8bc32369.js';
import '../../lit-html-0378a13e.js';

/**
 * Komponente zur Darstellung CTA Links oder Button, die aussehen wie Links.
 *
 * @slot default - Link oder Button
 *
 */

/**
 * @cssprop --cta-icon - Icon neben dem Text rechts
 * @cssprop --cta-icon-start - Icon neben dem Text links
 * @cssprop --cta-link-color - Standard :link Farbe
 * @cssprop --cta-link-color--visited - Standard :visited Farbe
 * @cssprop --cta-font-variation-settings - Schriftstärke für WM Variablefont
 * @cssprop --cta-font-weight - Standard-Schriftstärke
 * @cssprop --cta-padding-inline - Innenabstand x-Achse
 * @cssprop --cta-padding-block - Innenabstand y-Achse 
 * @cssprop --cta-text-decoration - Linkunterstreichung
 */

class CTA extends s {
	static properties = {
		align: { type: String, reflect: true },
		full: { type: Boolean, reflect: true },
		start: { type: Boolean, reflect: true },
		clean: { type: Boolean, reflect: true },
	};

	constructor() {
		super();

		/** @type {'end'} - Textausrichtung */
		this.align = undefined;

		/** @type {Boolean} - Über die volle Breite anzeigen */
		this.full = false;

		/** @type {Boolean} - Pfeil auf der linken Seite */
		this.start = false;

		/** @type {Boolean} - Stärke der Schrift zurücksetzen (normal statt fett)  */
		this.clean = false;
	}

	/**
	 * @private
	 */
	createRenderRoot() {
		return this;
	}
}

customElements.define("wm-cta", CTA);

const tagName = "wm-cta";

export { CTA, tagName };
