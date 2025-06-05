/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { o } from '../../unsafe-html-2bcd6aa9.js';
import '../../directive-4c65af6a.js';

const styles = [i`
  :host {
    display: block;
    overflow: hidden;
  }

  :host([type=large]) ::slotted(img) {
    width: 10rem;
  }

  figure {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;
  }

  blockquote {
    font-size: 1.2rem;
    margin-block: 1.5rem;
    margin-inline: 0;
    max-width: var(--wm-theme-content-text-max-width);
    padding-left: 1.5em;
    position: relative;
  }

  blockquote::before {
    content: open-quote no-close-quote;
    color: rgba(0, 0, 0, 0.1);
    font-size: 8.5rem;
    inset-inline-start: 5px;
    line-height: 1;
    position: absolute;
    transform: translateY(-85%);
  }

  blockquote::after {
    content: none;
  }

  figcaption {
    background-color: transparent;
    text-align: center;
  }

  ::slotted(img) {
    aspect-ratio: 1;
    border: 2px solid var(--wm-color-nebelgrau-light);
    border-radius:50%;
    object-fit: cover;
    width: 6rem;
  }

`];

/**
 * Darstellung eines Zitats
 *
 * @slot image - Optionales Bild
 * @slot default - Zitat
 */

class Quote extends s {
	static properties = {
		caption: { type: String },
		source: { type: String },
		type: { type: String, reflect: true },
	};

	static styles = [styles];

	constructor() {
		super();

		/**
		 * @type {'large'|'small'} - Größe des Bildes
		 */
		this.type = "small";

		/**
		 * @type {String} - Die Quelle des Zitats (unterstützt HTML-Tags)
		 */
		this.source = undefined;

		/**
		 * @type {String} - Untertitel der Quelle (unterstützt HTML-Tags)
		 */
		this.caption = undefined;
	}
	render() {
		return x` <figure>
			<blockquote part="quote">
				<slot></slot>
			</blockquote>

			<slot name="image"></slot>

			<figcaption>
				<strong>${this.source ? x`${o(this.source)}` : ''}</strong>
				${this.caption ? x`<br /><small>${o(this.caption)}</small>` : ''}
			</figcaption>
		</figure>`;
	}
}

customElements.define("wm-quote", Quote);

const tagName = "wm-quote";

export { Quote, tagName };
