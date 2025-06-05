/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';

const styles = [i`
  * {
    box-sizing: border-box;
  }
  
  :host {
    --_width: calc(var(--wm-theme-site-wrapper-width-s) + var(--wm-theme-site-wrapper-padding) * 2);
    transition: transform 0.3s;
    z-index: 1230;
  }

  @media(min-width: 48em) {
    :host {
      --_width: var(--wm-theme-site-wrapper-width);
    }
  }

  

  

  [hidden] {
    display: none !important;
  }
`];

/**
 * Header der Website. Alternative zu &gt;header&lt;.
 * Wird automatisch kleiner auf großen Viewports, wenn die Seite gescrolled wurde.
 *
 * @slot default - 1 oder 2 divs
 *
 */

/**
 * @cssprop --header-actions-gap - Abstand zwischen Elementen in der 2. Zeile
 * @cssprop --header-nav-level1-background-color - Hintergrundfarbe Navigation Level 1
 * @cssprop --header-nav-level2-background-color - Hintergrundfarbe Navigation Level 2
 * @cssprop --header-nav-level3-background-color - Hintergrundfarbe Navigation Level 3
 * @cssprop --header-nav-flyout-background-color--desktop - Hintergrundfarbe Navigationsflyout (Desktop)
 * @cssprop --header-nav-link-color - Schriftfarbe der Navigations-Links
 * @cssprop --header-nav-flyout-link-color--desktop - Schriftfarbe der Navigations-Links im Navigationsflyout (Desktop)
 */

class Header extends s {
	static properties = {
		color: { type: String },
		_scrolledOffset: { type: Number },
	};

	/**
	 * @private
	 */
	get _navAndActionsBar() {
		return this.querySelector(":scope > div:nth-child(2)");
	}

	/**
	 * @private
	 */
	get _actions() {
		return this.querySelector(":scope > div:nth-child(2) > div");
	}

	static styles = [styles];

	constructor() {
		super();

		/**
		 * @type {Number} When should the header expand/shrink
		 * @private
		 **/
		this._scrolledOffset = 30;

		/**
		 * @type {'flieder'|'goldgelb'|'abendstimmung'|'morgenrot'|'frischgruen'|'wasserblau'} Farbe der 2. Zeile im Header
		 */
		this.color = undefined;
	}

	connectedCallback() {
		super.connectedCallback();

		this._addGlobalEvents();

		// Turn generic element into banner landmark
		this.setAttribute("role", "banner");

		// Scroll header if necessary
		this._scrollHeader();
	}

	/**
	 * @private
	 */
	_addGlobalEvents() {
		// Add/remove `.wm-window-was-scrolled` on the root if the page has been scrolled
		this._lastKnownScrollPosition = window.pageYOffset;

		window.addEventListener("scroll", this._scrollHeader.bind(this));
	}

	/**
	 * Check if page scrolled and apply or remove class that shrinks or expands the header
	 * @private
	 */
	_scrollHeader() {
		this._lastKnownScrollPosition = window.pageYOffset;

		if (this._lastKnownScrollPosition > this._scrolledOffset) {
			document.documentElement.classList.add("wm-window-was-scrolled");
		} else {
			document.documentElement.classList.remove("wm-window-was-scrolled");
		}
	}

	/**
	 * Eine Action von außen hinzufügen
	 * @param {Node} node
	 */
	addAction(node) {
		// If a wrapper div for actions already exists just append the action
		if (this._actions) {
			this._appendAction(node);
		} else {
			// If a wrapper div for actions doesn't exists, create it and then append the action
			const actionsWrapper = document.createElement("div");
			this._navAndActionsBar.appendChild(actionsWrapper);
			this._appendAction(node);
		}
	}

	/**
	 * Adds a node to the actions wrapper
	 * @private
	 */
	_appendAction(node) {
		this._actions.appendChild(node);
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

customElements.define("wm-header", Header);

const tagName = "wm-header";

export { Header, tagName };
