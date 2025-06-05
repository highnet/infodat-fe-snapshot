/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { e } from '../../class-map-68392fb3.js';
import '../../directive-4c65af6a.js';

const styles = [i`
  :host {
    --_details-height: 0fr;

    align-content: start;
    align-items: start;
    border: var(--details-border);
    display: inline-grid;
    grid-template-rows: auto var(--_details-height);
    overflow: hidden;
    padding: var(--details-padding);
    transition: grid-template-rows 0.3s, visibility 0.3s;
  }

  :host([selectable="false"]) {
     /* create new stacking context */
     transform: rotate(0);
  }

  :host([selectable="false"]) button::before {
    content: "";
    inset: 0;
    position: fixed;
  }

  :host([open]) {
    --_details-height: 1fr;
    --_details-margin: var(--wm-base-spacing-xs);
  }

  :host([_opened]) {
    overflow: visible;
  }

  :host([full]) {
    display: grid;
  }

  wm-button {
    display: inline-flex;
  }

  button {
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--wm-theme-site-color);
    display: flex;
    font: inherit;
    font-family: var(--wm-theme-site-font-family);
    justify-content: space-between;
    padding: var(--details-padding-button);
    position: relative;
  }

  button:focus-visible {
    outline: var(--wm-theme-site-focus-outline);
    outline-offset: -2px;
  }

  button::after {
    background: var(--details-icon) no-repeat center right !important;
    background-size: contain !important;
    content: "";
    display: block;
    height: 1.4em;
    transition: transform 0.3s;
    width: 1.2em;
  }

  [aria-expanded="true"]::after{
    transform: rotate(180deg)
  }

  :host([full]) button {
    justify-content: space-between;
    width: 100%;
  }

  :host([full]) wm-button {
    display: flex;
  }

  .button--hidden {
    display: none !important;
  }

  .content {
    transition: all 0.3s;
    overflow: hidden;
    visibility: hidden;
    min-width: 0;
  }

  :host([_opened]) .content {
    overflow: visible;
  }

  .button--hidden + .content {
    overflow: visible;
    visibility: visible;
  }

  :host([open]) .content {
    visibility: visible;
    margin-block-start: var(--_details-margin);
    margin-block-end: var(--_details-margin);
  }

  .wrap {
    padding: var(--details-padding-content);
  }

  ::slotted(strong) {
    font-weight: var(--details-font-weight);
    font-variation-settings: var(--details-font-variation-settings);
  }
`];

/**
 * Disclosure Widget
 * @summary Button/Button
 *
 * @slot label - Bezeichnung
 * @slot content - Inhalt
 *
 */

/**
 * @cssprop --details-border - Rahmen
 * @cssprop --details-icon - Dropdown Icon
 * @cssprop --details-padding - Innenabstand
 * @cssprop --details-padding-button - Innenabstand im Button
 * @cssprop --details-padding-content - Innenabstand im Inhalt
 * @cssprop --details-font-variation-settings - Schriftstärke für WM Variablefont
 * @cssprop --details-font-weight - Standard-Schriftstärke
 */

class Details extends s {
	static properties = {
		full: { type: Boolean, reflect: true },
		open: { type: Boolean, reflect: true },
		min: { type: String, reflect: true },
		selectable: { type: Boolean, reflect: true },
		_active: { type: Boolean },
		_opened: { type: Boolean, reflect: true },
	};

	static styles = [styles];

	/**
	 * @type {string} - content
	 * @private
	 * */
	get _content() {
		return this.renderRoot.querySelector(".content") ?? null;
	}

	/**
	 * @type {Node} - content wrapper
	 * @private
	 * */
	get _wrap() {
		return this.renderRoot.querySelector(".wrap") ?? null;
	}

	constructor() {
		super();

		/** @type {Boolean} - Über die volle Breite anzeigen. */
		this.full = false;

		/** @type {Boolean} - Offen oder nicht */
		this.open = false;

		/**
		 * @type {String} - Wenn erst ab einer bestimmten Viewportbreite getoggelt werden soll, zum Beispiel 48em, 64em.
		 */
		this.min = undefined;

		/**
		 * @type {Boolean} - Is the toggle active or not
		 * @private
		 * */
		this._active = true;

		/**
		 * @type {Boolean} - Text kann ausgewählt werden. Wenn false, ist die ganze Fläche klickbar.
		 * */
		this.selectable = false;

		/**
		 * @type {Boolean} - Zustand nach der Animation
		 * @private */
		this._opened = false;
	}

	connectedCallback() {
		super.connectedCallback();

		if (this.min) {
			this._isActive();
		}

		this._addEvents();
	}

	/**
	 * @private
	 */
	_addEvents() {
		this.addEventListener("transitionend", () => {
			this._opened = this.open;
		});
	}

	/**
	 * Sichtbarkeit umschalten
	 */
	toggleDetails() {
		this.open = !this.open;

		if (!this.open) {
			this._opened = false;
		}
	}

	/**
	 * Add breakpoint and (de)activate component accordingly
	 * @private
	 */
	_isActive() {
		const mql = window.matchMedia(`(min-width: ${this.min})`);

		const checkViewportWidth = (e) => {
			this._active = e.matches;
		};

		mql.addEventListener("change", checkViewportWidth);
		checkViewportWidth(mql);
	}

	render() {
		const buttonClass = { "button--hidden": !this._active };

		return x`
			<wm-button
				@click="${this.toggleDetails}"
				?full="${this.full}"
				class="${e(buttonClass)}"
			>
				<button aria-expanded="${this.open ?? "false"}">
					<slot name="label"></slot>
				</button>
			</wm-button>

			<div class="content">
				<div class="wrap">
					<slot name="content"></slot>
				</div>
			</div>
		`;
	}
}

customElements.define("wm-details", Details);

const tagName = "wm-details";

export { Details, tagName };
