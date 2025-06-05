/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { slug, getNodeIndex } from '../misc/utils.js';
import '../../unsafe-html-2bcd6aa9.js';
import '../../directive-4c65af6a.js';

const styles = [i`
  * {
    box-sizing: border-box;
  }

  :host {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: var(--anchor-gap);
  }

  ::slotted(*) {
    margin-bottom: 0 !important;
  }

  wm-icon {
    display: block;
  }

  :focus-visible {
    outline: var(--wm-theme-site-focus-outline);
  }

  ::slotted(input) {
    position: absolute;
    white-space: nowrap;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    margin: -1px;
  }
`];

/**
 * Ein Anker ist ein Link zu einer Überschrift oder einem Text weiter unten auf derselben oder einer anderen Seite.
 * @summary Icon/Icon
 * 
 * @slot default - h2, h3, h4, h5, oder h6
 *
 */

/**
 * @cssprop --anchor-gap - Abstand zwischen Text und Link
 */

class Anchor extends s {
	/** Heading passed through light DOM
	 * @private
	 */
	get _heading() {
		return this.querySelectorAll("h2, h3, h4, h5, h6")[0] ?? null;
	}

	/** Link to copy the current URL
	 * @private
	 */
	get _copyLink() {
		return this.shadowRoot.querySelector("a") ?? null;
	}

	/** Live region in the page
	 * @private
	 */
	get _output() {
		return document.querySelector('[role="status"]') ?? null;
	}

	/** All anchors on the page
	 * @private
	 */
	get _anchors() {
		return document.querySelectorAll("wm-anchor") ?? null;
	}

	static properties = {
		_id: { type: String, attribute: false },
		copyText: { type: String },
		successText: { type: String },
		id: { type: String },
		icon: { type: String },
	};

	static styles = styles;

	constructor() {
		super();

		/**
		 * @type {String} - Text für das "Link kopieren" Icon. [TEXT] wird automatisch durch die Überschrift ersetzt.
		 */
		this.copyText = "Link zu [TEXT] kopieren";

		/**
		 * @type {String} - Text für die Meldung nachdem der Link kopiert worden ist.
		 */
		this.successText = "Link erfolgreich kopiert";

		/**
		 * @type {String} - Icon für den "Link kopieren"-Link
		 */
		this.icon = "link";

		/**
		 * @type {String} - Die ID kann entweder auf dem Element selber oder der Überschrift vergeben werden.
		 */
		this.id = undefined;

		/**
		 * @type {String} - Generierte ID
		 * @private
		 */
		this._id = "";
	}

	connectedCallback() {
		super.connectedCallback();

		if (!this._output) {
			throw new Error(
				'Es muss eine Live-Region mit role="status" im Dokument geben.'
			);
		}

		/**
		 * This block of code checks if the 'data-heading' attribute of the '_heading' object is set to 'false'.
		 * If it is, it sets the 'data-heading' attribute of the current object (this) to false as well.
		 */
		if (this._heading.getAttribute("data-heading") == "false") {
			this.setAttribute("data-heading", false);
		}

		this._id = this._generateID();

		// Set generated id
		this.setAttribute("id", this._id);

		// Improve default copy text
		this.copyText = this.copyText.replace("[TEXT]", this._heading.textContent);

		this._addAnchor();
		this._heading.setAttribute('aria-label', this._heading.textContent);
	}

	/**
	 * Get the exisiting id of the heading or generate a unique id
	 * @private
	 * @returns {String} id for the heading
	 */
	_generateID() {
		// Assign the id of the current instance to 'id', if it's not available, get the 'id' attribute from the associated heading
		let id = this.id || this._heading.getAttribute("id");

		this._heading.removeAttribute("id");

		// If the id is not set, generate a slug from the heading's text content
		// If an element with the same id already exists, append the index of the current anchor to the id to make it unique
		if (!id) {
			id = slug(this._heading.textContent.trim());

			if (document.querySelector(`#${id}`)) {
				id += `${getNodeIndex(this._anchors, this)}`;
			}
		}

		return id;
	}

	/**
	 * Lifecycle method
	 * @private
	 * @param {*} changedProperties
	 */
	updated(changedProperties) {
		// If the user provides a custom id on the host itself, use it.
		if (changedProperties.has("id")) {
			if (this.id) {
				this._id = this.id;
			}
		}
	}

	/**
	 * This is a private asynchronous method '_copyText' in the 'Anchor' class.
	 * It copies the current window's URL to the clipboard.
	 * If the '_copyLink' property is set, it focuses on that element.
	 * If the '_output' property is set, it changes its text content to the success message.
	 *
	 * @private
	 */
	async _copyText() {
		// Wait until the URL has changed
		setTimeout(async () => {
			try {
				const textToCopy = window.location.href;
				await navigator.clipboard.writeText(textToCopy);

				if (this._copyLink) {
					this._copyLink.focus();
				}

				if (this._output) {
					this._output.textContent = this.successText;
				}
			} catch (error) {
				console.error("Error copying text: ", error);
			}
		}, 0);
	}

	/**
	 * @private
	 */
	_addAnchor() {
		const link = document.createElement("a");
		link.href = `#${this._id}`;
		link.setAttribute("aria-label", this.copyText);
		link.addEventListener("click", this._copyText);

		const icon = document.createElement("wm-icon");
		icon.setAttribute("iconid", this.icon);

		link.append(icon);

		this._heading.append(link);
	}

	render() {
		return x` <slot></slot> `;
	}
}

customElements.define("wm-anchor", Anchor);

const tagName = "wm-anchor";

export { Anchor, tagName };
