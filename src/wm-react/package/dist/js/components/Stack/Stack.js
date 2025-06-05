/* @copyright Stadt Wien - Wiener Melange 200 */
import { s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';

/**
 * Komponeten zur vertikalen oder horizontalen Ausrichtung von Elementen
 *
 * @slot default - HTML oder Text-Content
 */

/**
 * @cssprop --stack-spacing - Abstand zwischen den Elementen
 */

class Stack extends s {
	static properties = {
		gap: { type: String, reflect: true },
		gapx: { type: String, reflect: true },
		gapy: { type: String, reflect: true },
		grow: { type: Boolean, reflect: true },
		equal: { type: Boolean, reflect: true },
		wrap: { type: Boolean, reflect: true },
		vertical: { type: Boolean, reflect: true },
		horizontal: { type: Boolean, reflect: true },
		alignment: { type: String, reflect: true },
		justify: { type: String, reflect: true },
	};

	constructor() {
		super();

		/**
		 * @type {'xxs'|'xs'|'s'|'m'|'l'} - Abstand zwischen Elementen
		 */
		this.gap = "s";

		/**
		 * @type {'xxs'|'xs'|'s'|'m'|'l'} - Horizontaler Abstand zwischen Elementen
		 */
		this.gapx = undefined;

		/**
		 * @type {'xxs'|'xs'|'s'|'m'|'l'} - Vertikaler Abstand zwischen Elementen
		 */
		this.gapy = undefined;

		/** @type {Boolean} - Elternelement füllen. Entspricht der `flex-grow` Eigenschaft. */
		this.grow = undefined;

		/** @type {Boolean} - Wird mit `grow` verwendet und teilt den Platz nicht gleichmäßig auf, sondern macht alle Elemente gleich breit. */
		this.equal = undefined;

		/** @type {Boolean} - Erlauben, dass Elemente wrappen können. */
		this.wrap = undefined;

		/** @type {Boolean} - Vertikal darstellen */
		this.vertical = false;

		/** @type {Boolean} - Immer horizontal darstellen */
		this.horizontal = false;

		/** @type {'center'|'end'|'space-between'} - Ausrichtung auf der Hauptachse */
		this.justify = undefined;

		/** @type {'center'|'end'|'start'|'stretch'} - Ausrichtung auf der Gegenachse */
		this.alignment = undefined;
	}

	/**
	 * @private
	 */
	createRenderRoot() {
		return this;
	}

	render() {
		return x` <slot></slot> `;
	}
}

customElements.define("wm-stack", Stack);

const tagName = "wm-stack";

export { Stack, tagName };
