/* @copyright Stadt Wien - Wiener Melange 200 */
import { s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';

/**
 * Mit Sections werden größere, thematisch abgegrenze Blöcke innerhalb einer Seite definiert.
 *
 * @slot default - HTML oder Text-Content
 *
 */

/**
 * @cssprop --section-background-color - Hintergrundfarbe
 * @cssprop --section-border-color - Rahmenfarbe
 * @cssprop --section-border-width - Rahmenstärke
 * @cssprop --section-padding - Innenabstand
 * @cssprop --section-highlight-padding--mobil - Innenabstand hervorgehoben (Mobilansicht unter 64em)
 * @cssprop --section-highlight-padding--desktop - Innenabstand hervorgehoben (Desktopansicht ab 64em)
 * @cssprop --section-highlight-background-color - Hintergrundfarbe hervorgehoben
 */

class Section extends s {
	static properties = {
		highlight: { type: String, reflect: true },
		type: { type: String, reflect: true },
		contentsize: { type: String, reflect: true },
	};

	constructor() {
		super();

		/** @type {'abendstimmung'|'flieder'|'frischgruen'|'goldgelb'|'morgenrot'|'nebelgrau'|'wasserblau'} Section mit oder ohne Hintergrund. */
		this.highlight = undefined;

		/**
		 * @type {'full'} Bei Map-Einbindungen
		 */
		this.type = undefined;

		/**
		 * @type {'full'|'text'} Wieviel Platz gibt es für Inhalt. Voll oder im Theme definiertes Maximum für Text.
		 */
		this.contentsize = "full";
	}

	connectedCallback() {
		super.connectedCallback();
	}

	render() {
		return x` <slot></slot> `;
	}
}

if (!customElements.get("wm-section")) {
	customElements.define("wm-section", Section);
}

const tagName = "wm-section";

export { Section, tagName };
