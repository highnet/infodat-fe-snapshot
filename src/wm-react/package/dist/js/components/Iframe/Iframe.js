/* @copyright Stadt Wien - Wiener Melange 200 */
import { s, i } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';

/**
 * Wrapper für Iframes
 *
 * @slot default - Text
 */

class Iframe extends s {
	static properties = {
		_iframe: { type: Node },
		_src: { type: String },
		_observer: { type: IntersectionObserver },
	};

	static styles = [
		i`
			:host {
				display: block;
			}
		`,
	];

	constructor() {
		super();

		/**
		 * @private
		 */
		this._iframe = undefined;

		/**
		 * @private
		 */
		this._src = "";

		/**
		 * @private
		 */
		this._observer = undefined;
	}

	connectedCallback() {
		super.connectedCallback();

		this._observer = new IntersectionObserver(
			this._handleIntersection.bind(this),
			{
				threshold: 0.2,
			}
		);

		this._observer.observe(this);
	}

	/**
	 * @private
	 */
	_handleIntersection(entries) {
		entries.map((entry) => {
			if (entry.isIntersecting) {
				if (this._iframe && this._src) {
					this._iframe.setAttribute("src", this._src);
					this._observer.unobserve(this);
				}
			}
			return entry;
		});
	}

	/**
	 * @private
	 */
	_removeSource(e) {
		this._iframe = e.target.assignedElements({ flatten: true })[0];

		if (this._iframe) {
			this._src = this._iframe.getAttribute("src");
			this._iframe.removeAttribute("src");
		}
	}

	render() {
		return x` <slot @slotchange="${this._removeSource}"></slot> `;
	}
}

customElements.define("wm-iframe", Iframe);

const tagName = "wm-iframe";

export { Iframe, tagName };
