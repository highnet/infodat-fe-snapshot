/* @copyright Stadt Wien - Wiener Melange 200 */
import { s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';

/**
 * Fortschrittsanzeige für mehrseitige Formulare
 *
 * @slot default - Liste
 */

/**
 * @cssprop --formprogress-background-color - Standardfarbe
 * @cssprop --formprogress-background-color--active - Farbe für aktive Schritte
 * @cssprop --formprogress-font-color - Schriftfarbe für Schritte
 * @cssprop --formprogress-font-color--active - Schriftfarbe für aktive Schritte
 */

class FormProgress extends s {
	/** @private */
	get _list() {
		return this.querySelectorAll("ol, ul")[0] ?? null;
	}

	/** @private */
	get _steps() {
		return this.querySelectorAll("li") ?? null;
	}

	/** @private */
	get _currentStep() {
		return this.querySelector('[aria-current="step"]') ?? null;
	}

	static properties = {
		current: { type: Number, reflect: true },
		label: { type: String },
	};

	constructor() {
		super();

		/**
		 * @type {Number} - Aktiver Schritt
		 */
		this.current = 1;

		/**
		 * Accessible Name der Navigation-Landmark
		 */
		this.label = "Fortschrittsanzeige";
	}

	updated(changedProperties) {
		if (changedProperties.has("current")) {
			this._setCurrentStep();
		}
	}

	/** @private */
	_setCurrentStep() {
		const percent = (100 / (this._steps.length - 1)) * (this.current - 1);
		this.style.setProperty("--_progress", `${percent}%`);

		if (this._currentStep) {
			this._currentStep.removeAttribute("aria-current");
		}

		this._steps[this.current - 1].setAttribute("aria-current", "step");
	}

	/** @private */
	_addEvents() {
		this._list.addEventListener("click", (e) => {
			if (e.target.nodeName === "LI") {
				e.target.querySelectorAll("button, a")[0].click();
			}
		});
	}

	connectedCallback() {
		super.connectedCallback();

		this._addEvents();
	}

	render() {
		return x`
			<nav aria-label="${this.label}">
				<slot></slot>
			</nav>
		`;
	}
}

customElements.define("wm-formprogress", FormProgress);

const tagName = "wm-formprogress";

export { FormProgress, tagName };
