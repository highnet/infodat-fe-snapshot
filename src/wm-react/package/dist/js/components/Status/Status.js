/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';

const styles = [i`
* {
  box-sizing: border-box;
}

:host {
  align-items: center;
  display: inline-flex;
  flex-wrap: wrap;
  gap: var(--status-gap);
}

span {
  align-items: center;
  display: inline-flex;
  gap: 0.6rem;
}

:host([reverse]) span {
  flex-direction: row-reverse;
}

.status {
  background-color: var(--status-color);
  block-size: var(--status-size);
  border-radius: 50%;
  display: inline-block;
  inline-size:  var(--status-size);
}


strong {
  font-weight: var(--wm-theme-content-font-weight);
  font-variation-settings: var(--wm-theme-content-font-variation-settings);
}
`];

/** 
 * Status
 * 
 * @slot default
 */

/**
 * @cssprop --status-gap - Abstand zwischen Kindelementen
 * @cssprop --status-color - Farbe des Status
 * @cssprop --status-size - Größe des Status
 */

class Status extends s {
	static properties = {
		label: { type: String, reflect: true },
		loadingLabel: { type: String, reflect: true },
		reverse: { type: Boolean, reflect: true },
		status: { type: Number, reflect: true },
		statusText: { type: String, reflect: true },
	};

	static styles = [styles];

	constructor() {
		super();

		/**
		 * @type {String} Der Text vor der Statusanzeige
		 */
		this.label = "Auslastung:";

		/**
		 * @type {String} Text, der angezeigt wird, solange Daten laden.
		 */
		this.loadingLabel = "Lade Auslastung…";

		/**
		 * @type {Boolean} Text vor Status anzeigen
		 */
		this.reverse = false;

		/**
		 * @type {0|1|2|3|4|5|6} ID des jeweiligen Status (0 = Schwarz, 1 = Grün, 2 = Gelb, 3 = Dunkelgelb, 4 = Orange, 5 = Rot, 6 = Hellgrau)
		 */
		this.status = 6;

		/**
		 * @type {String} Text, der neben der visuellen Anzeige dargestellt wird
		 */
		this.statusText = "";
	}

	render() {
		return x`
			<strong>${this.label}</strong>
			<span>
				<span class="status"></span>
				${this.statusText
					? x`${this.statusText}`
					: x`${this.loadingLabel}`
				}
			</span>
			<slot></slot>
		`;
	}
}

customElements.define("wm-status", Status);

export { Status };
