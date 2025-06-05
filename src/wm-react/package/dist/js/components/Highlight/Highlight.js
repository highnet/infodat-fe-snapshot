/* @copyright Stadt Wien - Wiener Melange 200 */
import { s } from '../../lit-element-8bc32369.js';
import '../../lit-html-0378a13e.js';

/**
 * Farbliche Texthervorhebung
 *
 * Highlight mit Hintergrundfarbe kann eingesetzt werden, um einzelne Sätze oder Absätze farblich hervorzuheben.
 *
 * Highlight mit Rahmenlinien heben Inhalte hervor, zum Beispiel kurzfristig geänderte Öffnungszeiten oder ein kurzfristig nicht verfügbares Service. Fastschwarz ist üblich für Archiv-Inhalte.
 *
 * @slot default - HTML oder Text-Content
 */

/**
 * @cssprop --highlight-background-color - Hintergrundfarbe
 * @cssprop --highlight-border-color - Rahmenfarbe
 * @cssprop --highlight-border-width - Rahmenstärke
 * @cssprop --highlight-font-color - Textfarbe
 * @cssprop --highlight-padding - Innenabstand
 * @cssprop --highlight-padding--large - Innenabstand der Large-Variante in der Desktopansicht (ab 64em)
 */

class Highlight extends s {
	static properties = {
		color: { type: String, reflect: true },
		type: { type: String, reflect: true }
	};

	constructor() {
		super();

		/**
		 * @type {'abendstimmung'|'abendstimmung-light'|'flieder'|'flieder-light'|'frischgruen'|'frischgruen-light'|'goldgelb'|'goldgelb-light'|'morgenrot'|'morgenrot-light'|'nebelgrau'|'nebelgrau-light'|'wasserblau'|'wasserblau-light'} - Farbe
		 */
		this.color = "nebelgrau-light";

		/**
		 * @type {'prominent'} - Art der Hervorhebung
		 */
		this.type = undefined;
	}

	/**
	 * @private
	 */
	createRenderRoot() {
		return this;
	}
}

customElements.define("wm-highlight", Highlight);

const tagName = "wm-highlight";

export { Highlight, tagName };
