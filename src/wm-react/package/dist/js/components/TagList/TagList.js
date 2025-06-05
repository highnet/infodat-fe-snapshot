/* @copyright Stadt Wien - Wiener Melange 200 */
import { s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';

/**
 * Horizontale Liste vom Tags
 *
 * @slot default - Liste
 */

/**
 * @cssprop --taglist-padding - Innenabstand der Liste
 * @cssprop --taglist-gap - Abstand zwischen Tags
 */

class TagList extends s {
	static properties = {
		scrollable: { type: Boolean },
		label: { type: String },
	};

	constructor() {
		super();

		/** @type {Boolean} - Sollen Tags gescrolled werden oder umbrechen?  */
		this.scrollable = false;

		/** @type {String} - Bezeichnung der Navigations  */
		this.label = "Verwandte Seiten";
	}

	render() {
		return x`
			<nav aria-label="${this.label}">
				<slot></slot>
			</nav>
		`;
	}
}

customElements.define("wm-tag-list", TagList);

const tagName = "wm-tag-list";

export { TagList, tagName };
