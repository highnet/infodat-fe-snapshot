/* @copyright Stadt Wien - Wiener Melange 200 */
import { s, i } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';

/**
 * Reiter Inhalt
 *
 * @slot default - Text- oder HTML-Content
 *
 */

class TabPanel extends s {
	static properties = {
		selected: { type: Boolean, reflect: true },
	};

	static styles = [
		i`
			* {
				box-sizing: border-box;
			}

			:host {
				background-color: var(--tab-background-color--active);
				border-style: solid;
				border-color: var(--tabpanel-border-color);
				border-width: var(--tabpanel-border-width);
				display: block;
				padding: var(--tabpanel-padding);
			}

			::slotted(*:not(:first-child, section, wm-section)) {
				margin-block-start: 1.5em !important;
			}
		`
	];

	constructor() {
		super();

		this.selected = false;
	}

	connectedCallback() {
		super.connectedCallback();
		this.setAttribute("role", "tabpanel");
		this.setAttribute("aria-hidden", "true");
		this.setAttribute("aria-label", this.previousElementSibling.textContent);
	}

	updated() {
		this.setAttribute(
			"aria-hidden",
			this.hasAttribute("selected") ? "false" : "true"
		);
	}

	render() {
		return x`
			<slot></slot>
		`;
	}
}

customElements.define("wm-tabpanel", TabPanel);

export { TabPanel };
