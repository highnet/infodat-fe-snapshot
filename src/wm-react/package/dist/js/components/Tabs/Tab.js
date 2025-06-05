/* @copyright Stadt Wien - Wiener Melange 200 */
import { s, i } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';

/**
 * Reiter
 *
 * @slot default - Bezeichnung
 *
 */

class Tab extends s {
	static properties = {
		selected: { type: Boolean, reflect: true },
	};

	static styles = [
		i`
			* {
				box-sizing: border-box;
			}

			:host {
				--_border-color: var(--tab-border-color);
				--_background-color: var(--tab-background-color);
				--_font-color: var(--tab-font-color);

				background-color: var(--_background-color);
				color: var(--_font-color);
				display: block;
				cursor: pointer;
				line-height: 1.4;
				border-style: solid;
				border-width: var(--tab-border-width);
				border-color: var(--_border-color);
				font-variation-settings: var(--tab-font-variation-settings);
				font-weight: var(--tab-font-weight);
				padding: var(--tab-padding);
				min-width: fit-content;
			}

			:host([selected]) {
				--_border-color: var(--tab-border-color--active);
				--_background-color: var(--tab-background-color--active);
				--_font-color: var(--tab-font-color--active);
			}

			:host(:hover) {
				--_background-color: var(--tab-background-color--active);
				--_font-color: var(--tab-font-color--active);
			}

			:host(:focus-visible) {
				outline-offset: calc(var(--wm-theme-site-focus-outline-width) * -1) !important;
			}
		`,
	];

	constructor() {
		super();

		this.selected = false;
	}

	connectedCallback() {
		super.connectedCallback();
		this.setAttribute("role", "tab");
	}

	updated() {
		this.setAttribute("aria-selected", this.hasAttribute("selected"));
		this.setAttribute("tabindex", this.hasAttribute("selected") ? 0 : -1);
	}

	render() {
		return x` <slot></slot> `;
	}
}

customElements.define("wm-tab", Tab);

export { Tab };
