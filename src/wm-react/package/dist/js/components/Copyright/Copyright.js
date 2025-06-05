/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';

const styles = [i`
  * {
    box-sizing: border-box;
  }

  :host {
    display: block;
    align-self: start;
    text-align: left;
  }

  [hidden] {
    display: none !important;
  }
`];

/**
 * Automatische Auflistung von Copyright-Information am Ende der Seite.
 *
 * @summary Details/Details, List/List
 */

class Copyright extends s {
	/** @private */
	get _images() {
		return document.querySelectorAll('img[title^="copyright:"]') ?? null;
	}

	static properties = {
		label: { type: String },
		_credits: { type: Array },
	};

	static styles = [styles];

	constructor() {
		super();

		/**
		 * @type {String} - Die Bezeichnung der Liste
		 */
		this.label = "Foto-Credits";

		/**
		 * @type {Array} - An array with all image credits
		 * @private
		 */
		this._credits = [];
	}

	connectedCallback() {
		super.connectedCallback();

		const creditIdentifier = "copyright: ";

		for (const image of this._images) {
			const title = image.getAttribute("title");
			this._credits.push(title.split(creditIdentifier)[1]);
		}
	}

	render() {
		return x`
			<wm-details ?hidden="${!this._credits.length}">
				<strong slot="label">${this.label}</strong>
				<div slot="content">
					<wm-list clean gap="xxs">
						<ul>
							${this._credits.map((credit) => x`<li>${credit}</li>`)}
						</ul>
					</wm-list>
				</div>
			</wm-details>
		`;
	}
}

customElements.define("wm-copyright", Copyright);

const tagName = "wm-copyright";

export { Copyright, tagName };
