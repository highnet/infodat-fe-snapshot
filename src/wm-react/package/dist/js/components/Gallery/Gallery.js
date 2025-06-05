/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';

const styles = [i`
  * {
    box-sizing: border-box;
  }

  :host {
    display: block;
  }

  ::slotted(ul) {
    --_columns: var(--gallery-size);

    display: grid;
    gap: 0.625rem;
    grid-template-columns: repeat(auto-fill, minmax(var(--_columns), 1fr));
    list-style: none;
    margin: 0 !important;
    padding: 0 !important;
  }
  
  :host([fixed]) ::slotted(ul) {
    grid-template-columns: repeat(auto-fill, var(--_columns));
  }
`];

/**
 * Galerie
 *
 * @slot default - Text
 */

/**
 * @cssprop --gallery-size - Breite der Bilder
 */

class Gallery extends s {
	static properties = {
		fixed: { type: Boolean, reflect: true },
		size: { type: Number },
	};

	static styles = [styles];

	constructor() {
		super();

		/**
		 * @type {Number} - Größe der Vorschaubilder
		 */
		this.size = 208;

		/**
		 * @type {Boolean} - Größe der Vorschaubilder ist nicht fluide, sondern immer fix.
		 */
		this.fixed = false;
	}

	updated(changedProperties) {
		if (changedProperties.has("size")) {
			this.style.setProperty("--gallery-size", `${this.size / 16}rem`);
		}
	}

	render() {
		return x` <slot></slot> `;
	}
}

customElements.define("wm-gallery", Gallery);

const tagName = "wm-gallery";

export { Gallery, tagName };
