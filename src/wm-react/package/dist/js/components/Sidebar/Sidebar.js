/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';

const styles = [i`
* {
  box-sizing: border-box;
}

:host {
  display: block;
  inset-block-start: 0;
  inset-inline: 0;
  height: 100dvh;
  opacity: 0;
  pointer-events: none;
  position: fixed;
  transform: translateX(-100%);
  transition: transform 0.3s, margin 0.3s, opacity 0.3s, visibility 0.3s;
  visibility: hidden;
}

:host([open]) {
  opacity: 1;
  transform: none;
  visibility: visible;
  z-index: 1231;
}

:host::before {
  content: "";
  background: rgb(0 0 0 / 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  inset: 0;
  z-index: -1;
  transition: all 0.3s 0.3s;
}

:host(:not([open]))::before {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0s;
}

@media (min-width: 99.75em) {
  :host {
    max-width: var(--wm-theme-site-wrapper-width);
    width: 100%;
    padding-inline: var(--wm-theme-site-wrapper-padding);
    transform: none;
    transition: margin 0.3s, opacity 0.3s;
  }

  :host([open])::before {
    content: normal;
  }
}

@media (min-width: 123.5em) {
  :host {
    margin-inline: auto;
    transform: translateX(calc((var(--sidebar-inline-size) + var(--_sidebar-offset)) * -1)) !important;
  }
}

.sidebar-inner {
  --_padding-block-start: var(--wm-theme-header-height-dynamic);
  
  background-color: var(--sidebar-background-color);
  padding: var(--_padding-block-start) 0 1rem;
  box-shadow: var(--card-shadow);
  height: 100%;
  display: flex;
  flex-direction: column;
  width: min(100%, var(--sidebar-inline-size));
  transition: padding 0.3s;
}

:host([open]) .sidebar-inner {
  pointer-events: all;
}

.sidebar-header {
  background-color: var(--sidebar-header-background-color);
  color: var(--sidebar-header-font-color);
  display: flex;
  margin-block-end: var(--sidebar-header-margin);
  height: var(--wm-theme-header-nav-height);
  justify-content: space-between;
  align-items: center;
  padding-inline: var(--sidebar-padding);
  transition: transform 0.3s;
}

.sidebar-content {
  padding-inline: var(--sidebar-padding);
  flex-grow: 1;
  overflow: auto;
  transition: transform 0.3s;
  overscroll-behavior: none;
  scrollbar-gutter: stable;
}

h2 {
  font-size: var(--wm-theme-headings-font-size);
}
`];

/**
 * Seitenleiste für Inhalte, die ständig, auch wenn Seiten gewechselt werden, angezeigt bzw. eingeblendet werden können sollen.
 * @summary Button/Button
 *
 * @slot default - Jeglicher HTML-Content
 */

/**
 * @cssprop --sidebar-background-color - Hintergrundfarbe
 * @cssprop --sidebar-header-background-color - Hintergrundfarbe Balken
 * @cssprop --sidebar-header-font-color - Textfarbe Balken
 * @cssprop --sidebar-header-margin - Außenabstand nach unten
 * @cssprop --sidebar-input-background-color - Hintergrundfarbe von Eingabefeldern
 * @cssprop --sidebar-padding - Innenabstand
 * @cssprop --sidebar-inline-size - Breite
 */

class Sidebar extends s {
	/** @private */
	get _closeButton() {
		return this.shadowRoot.querySelector(".close-filter") ?? null;
	}

	/** @private */
	get _toggles() {
		return document.querySelectorAll(`[data-sidebar="${this.id}"]`) ?? null;
	}

	static properties = {
		_sidebarID: { type: String },
		id: { type: String, reflect: true },
		label: { type: String, reflect: true },
		open: { type: Boolean, reflect: true },
		shortcut: { type: String, reflect: true },
	};

	static styles = [styles];

	constructor() {
		super();

		/**
		 * @type {Boolean} Ist die Seitenleisten eingeblendet.
		 */
		this.open = true;

		/**
		 * @type {String} Einzigartige ID
		 */
		this.id = undefined;

		/**
		 * @type {String} Sichtbare Bezeichnung
		 */
		this.label = "";

		/**
		 * @type {String} Keyboard-Shortcut zum Öffnen und Schließen, zum Beispiel: gs
		 */
		this.shortcut = "s";

		/**
		 * @private
		 * Internal ID used for saving the open/closed state
		 **/
		this._sidebarID = "";

		/**
		 * @private
		 * Media query that determines when the layout and logic changes
		 **/
		this._breakPoint = window.matchMedia(`(max-width: 99.75em)`);
	}

	connectedCallback() {
		super.connectedCallback();

		if (!this.id) {
			this.open = false;
			throw new Error("Es muss eine `id` angegeben werden.");
		}

		this._sidebarID = `sidebar_${this.id}`;

		this._saveAndApplySettings();
		this._attachEvents();
	}

	/**
	 * @private
	 * Render the sidebar open or close depending on previous preference
	 * Once the user closes the sidebar, it stays closed
	 **/
	_saveAndApplySettings() {
		const checkViewportWidth = (e) => {
			// Always close on small viewports
			if (e.matches) {
				this.open = false;
			}

			// On large viewports
			if (!e.matches) {
				// Has the user closed it previously? Then close!
				if (localStorage.getItem(this._sidebarID) === "true") {
					this.open = false;
				}

				// If not, leave it open
				if (
					!localStorage.getItem(this._sidebarID) ||
					localStorage.getItem(this._sidebarID) === "false"
				) {
					this.open = true;
				}
			}
		};

		// Regarless of preference, always close on small viewports
		this._breakPoint.addEventListener("change", checkViewportWidth);
		checkViewportWidth(this._breakPoint);
	}

	/**
	 * @private
	 * Attach local and global events
	 **/
	_attachEvents() {
		this._activeToggleButtons();
		this._closeOnEsacape();
		this._addKeyboardShortcut();
		this._handleClickOutside();
	}

	/**
	 * @private
	 * Escape closes the sidebar
	 **/
	_closeOnEsacape() {
		this.addEventListener("keyup", (e) => {
			if (e.code === "Escape") {
				this.closeSidebar(e);
			}
		});
	}

	/**
	 * @private
	 * Find buttons anywhere in the document and attach click events
	 **/
	_activeToggleButtons() {
		for (let i = 0; i < this._toggles.length; i++) {
			const toggleEvent = this.toggleSidebar.bind(this);
			const button = this._toggles[i];

			button.setAttribute("aria-expanded", this.open);
			button.addEventListener("click", (e) => {
				e.preventDefault();
				toggleEvent(e);
				button.setAttribute("aria-expanded", this.open);
			});
		}
	}

	/**
	 * @private
	 * The sidebar can be toggled pressing shortcuts
	 * Default: gs
	 **/
	_addKeyboardShortcut() {
		const keyCombo = [];
		const forbiddenTargets = ["INPUT", "SELECT", "TEXTAREA"];
		document.addEventListener("keyup", (e) => {
			if (forbiddenTargets.findIndex((i) => i === e.target.nodeName) < 0) {
				keyCombo.push(e.key);

				const currentCombo = keyCombo.slice(-2).join("");
				if (currentCombo === `g${this.shortcut}`) {
					this.toggleSidebar();
				}
			}
		});
	}

	/**
	 * Close on click outside of .content
	 * @private
	 */
	_handleClickOutside() {
		document.addEventListener("click", (e) => {
			if (this.open && this._breakPoint.matches) {
				if (
					!e.target.closest("wm-sidebar") &&
					!e.target.closest("[data-sidebar]")
				) {
					this.open = false;
				}
			}
		});
	}

	/**
	 * Sidebar öffnen oder schließen
	 */
	toggleSidebar(e) {
		this.open = !this.open;

		if (this.open) {
			setTimeout(() => {
				this._closeButton.focus();
			}, 300);
			if (e) localStorage.setItem(this._sidebarID, false);
		} else {
			if (e) localStorage.setItem(this._sidebarID, true);
		}
	}

	/**
	 * Sidebar schließen
	 */
	closeSidebar(e) {
		e.preventDefault();

		// Save preference
		localStorage.setItem(this._sidebarID, true);

		this.open = false;

		// If there are toggle buttons on the page, focus the first one
		if (this._toggles.length) {
			this._toggles[0].focus();
		}
	}

	render() {
		return x`
			<div class="sidebar-inner" part="sidebar-inner">
				<div class="sidebar-header" part="sidebar-header">
					<h2 class="wm-e-h3">${this.label}</h2>

					<wm-button kind="clean">
						<button
							type="button"
							class="close-filter"
							@click="${this.closeSidebar}"
							aria-expanded="true"
						>
							<wm-icon iconid="close">Close</wm-icon>
						</button>
					</wm-button>
				</div>
				<div class="sidebar-content" part="sidebar-content">
					<slot></slot>
				</div>
			</div>
		`;
	}
}

customElements.define("wm-sidebar", Sidebar);

const tagName = "wm-sidebar";

export { Sidebar, tagName };
