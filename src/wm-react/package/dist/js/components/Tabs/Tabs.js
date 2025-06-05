/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { getNodeIndex } from '../misc/utils.js';
import '../../unsafe-html-2bcd6aa9.js';
import '../../directive-4c65af6a.js';

const styles = [i`
:host {
  border: var(--tabs-border);
  display: block;
  padding: var(--tabs-padding);
  width: 100%;
}

[role="tablist"] {
  display: flex;
  gap: var(--tabs-gap);
  justify-content: var(--tabs-alignment);
  margin-bottom: var(--tabs-spacing);
  overflow: auto;
}

/* Always show tabpanel content when printing the page */
@media not print {
  ::slotted([aria-hidden="true"]) {
    display: none;
  }
}

::slotted([aria-hidden="false"]) {
  display: block;
}

@media print {
  [role="tablist"] {
    display: none;
  }
}

`];

/**
 * Reiter sind nur dann geeignet, wenn die Inhalte nicht sehr wichtig sind. Zum einen bekommen Inhalte hinter Reitern weniger Aufmerksamkeit, zum anderen werden sie von der Google-Suche wenig bis gar nicht berücksichtigt.
 * @summary Tabs/Tab, Tabs/TabPanel
 * 
 * @slot tab - Bezeichnung im Reiter
 * @slot default - Inhalte
 *
 */

/**
 * @cssprop --tabs-alignment - Ausrichtung der Tabs in der tablist
 * @cssprop --tabs-border - Rahmen der gesamten Komponente
 * @cssprop --tabs-gap - Abstand zwischen den Tabs
 * @cssprop --tabs-padding - Innenabstand für die gesamten Komponente
 * @cssprop --tabs-spacing - Abstand zwischen Tablist und Panel
 * @cssprop --tabs-theme-clean-gap - Abstand zwischen den Tabs (Clean-Theme)
 * @cssprop --tabs-theme-clean-spacing - Abstand zwischen Tablist und Panel (Clean-Theme)
 * @cssprop --tab-background-color - Hintergrundfarbe eines einzelnen Tabs
 * @cssprop --tab-background-color--active - Hintergrundfarbe für ausgewählten Tab
 * @cssprop --tab-border-width - Rahmenstärke um einen einzelnen Tab
 * @cssprop --tab-border-color - Rahmenfarbe um einen einzelnen Tab
 * @cssprop --tab-border-color--active - Rahmenfarbe für ausgewählten Tab
 * @cssprop --tab-font-color - Schriftfarbe für einzelne Tabs
 * @cssprop --tab-font-color--active - Schriffarbe für ausgewählten Tab
 * @cssprop --tab-font-variation-settings - Schriftstärke für WM Variablefont
 * @cssprop --tab-font-weight - Standard-Schriftstärke
 * @cssprop --tab-padding - Innenabstand in einem einzelnen Tab
 * @cssprop --tabpanel-padding - Innenabstand im Tabpanel
 * @cssprop --tabpanel-border-width - Rahmenstärke um den Tabpanel
 * @cssprop --tabpanel-border-color - Rahmenfarbe um den Tabpanel
 */

class Tabs extends s {
	/** @private */
	get _tabcontainers() {
		return document.querySelectorAll("wm-tabs") ?? null;
	}

	/** @private */
	get _tabs() {
		return this.querySelectorAll(":scope > wm-tab") ?? null;
	}

	/** @private */
	get _tabpanels() {
		return this.querySelectorAll(":scope > wm-tabpanel") ?? null;
	}

	static properties = {
		selectedIndex: { type: Number, attribute: false },
		_lastIndex: { type: Number, attribute: false },
		_id: { type: String, attribute: false },
		remember: { type: Boolean },
		theme: { type: String },
	};

	static styles = [styles];

	constructor() {
		super();

		/**
		 * @type {String} - einzigartige id jeder Komponente
		 * @private
		 **/
		this._id = "";

		/**
		 * @type {Number} - Zuletzt aktiver Index
		 * @private
		 **/
		this._lastIndex = 0;

		/** @type {Number} - Index des ausgewählten Tabs */
		this.selectedIndex = 0;

		/** @type {Boolean} - Zuletzt geöffneten Tab speichern  */
		this.remember = false;

		/**
		 * @type {'clean'} - Tab-Design
		 */
		this.theme = 'default';
	}

	connectedCallback() {
		super.connectedCallback();
		this._setParams();
	}

	/**
	 * Set default params
	 * @private
	 */
	_setParams() {
		const pathParams = document.location.pathname.split("/");
		this.searchParams = new URLSearchParams(window.location.search);
		this._id = `t_${getNodeIndex(this._tabcontainers, this)}_${
			pathParams[pathParams.length - 2]
		}`;

		const searchParams = new URL(document.location).searchParams;
		const storedIndex =
			searchParams.get("view") ??
			this.searchParams.get(this._id) ??
			sessionStorage.getItem(`active_tab_${this._id}`);
		this._lastIndex = storedIndex ?? 0;

		this.selectedIndex = storedIndex ?? 0;

		const activeTab = Array.from(this._tabs).filter((tab) =>
			tab.hasAttribute("selected")
		);
		const tab = activeTab.length ? activeTab[0] : this._tabs[this._lastIndex];

		this._selectTab(tab);
		this._selectPanel();
	}

	/**
	 * Select the new active panel
	 * @private
	 */
	_selectPanel() {
		if (this.querySelector(":scope > wm-tabpanel[selected]")) {
			this.querySelector(":scope > wm-tabpanel[selected]").removeAttribute(
				"selected"
			);
		}
		this._tabpanels[this.selectedIndex].setAttribute("selected", true);
	}

	/**
	 * Select the new active tab
	 * @private
	 * @param {{Node, Number}} element - element or index
	 */
	_selectTab(element) {
		if (this.querySelector(":scope > wm-tab[selected]")) {
			this.querySelector(":scope > wm-tab[selected]").removeAttribute(
				"selected"
			);
		}

		if (Number.isInteger(element)) {
			if (this._tabs[element]) {
				element = this._tabs[element];
			} else {
				element = this._tabs[this._tabs.length - 1];
			}
		}

		element.setAttribute("selected", true);
		element.focus();
		this.selectedIndex = getNodeIndex(this._tabs, element);

		/**
		 * @type {CustomEvent} Tab wurde gewechselt
		 * @summary Index des ausgewählten Tabs
		 */
		this.dispatchEvent(
			new CustomEvent("wm-tab-changed", {
				detail: this.selectedIndex,
				bubbles: true,
			})
		);

		if (this.remember) {
			this.searchParams = new URLSearchParams(window.location.search);

			if (this.selectedIndex > 0) {
				this.searchParams.set(this._id, this.selectedIndex);
			} else {
				this.searchParams.delete(this._id);
			}

			let newPath = `${window.location.pathname}${window.location.hash}`;

			if (this.searchParams.get(this._id)) {
				newPath = `${window.location.pathname}?${this.searchParams}${window.location.hash}`;
			} else if (this.searchParams.size > 0) {
				newPath = `${window.location.pathname}?${this.searchParams}${window.location.hash}`;
			}

			window.history.replaceState({}, "", newPath);
		}
	}

	/**
	 * Switch tab
	 * @private
	 * @param {Event} e - event
	 */
	_switchTab(e) {
		const element = e && e.type ? e.target : e;
		if (element.closest("wm-tab")) {
			this._selectTab(element);
			this._selectPanel();
		}
	}

	/**
	 * Get the next element when using arrow keys
	 * @private
	 * @param {Number} index - next index
	 */
	_getNextElement(index) {
		if (index < 0) {
			index = this._tabs.length - 1;
		}

		if (index >= this._tabs.length) {
			index = 0;
		}

		return this._tabs[index];
	}

	/**
	 * Handle key events
	 * @private
	 * @param {Event} e - event
	 */
	_handleKeydown(e) {
		let index;

		if (e.code !== "ArrowLeft" && e.code !== "ArrowRight") return;

		if (e.code === "ArrowLeft") {
			index = this.selectedIndex - 1;
		}

		if (e.code === "ArrowRight") {
			index = this.selectedIndex + 1;
		}

		this._switchTab(this._getNextElement(index));
	}

	/**
	 * Handle click event on wm-tab
	 * @private
	 * @param {Event} e - event
	 */
	_handleClick(e) {
		const element = e && e.type ? e.target : e;
		if (element.closest("wm-tab")) {
			this._selectTab(element);
			this._selectPanel();
			this.reRenderChildren();

			if (this.remember) {
				sessionStorage.setItem(`active_tab_${this._id}`, this.selectedIndex);
			}
		}
	}

	/**
	 * Initializes elements like maps when selecting tabs
	 */
	async reRenderChildren() {
		await this._tabpanels[this.selectedIndex].updateComplete;
		if (this.querySelector("[update]")) {
			this.querySelector("[update]").reRender();
		}
	}

	render() {
		return x`
			<div>
				<div
					role="tablist"
					@click="${this._handleClick}"
					@keydown="${this._handleKeydown}"
				>
					<slot name="tab"></slot>
				</div>
				<slot></slot>
			</div>
		`;
	}
}

customElements.define("wm-tabs", Tabs);

const tagName = "wm-tabs";

export { Tabs, tagName };
