/* @copyright Stadt Wien - Wiener Melange 200 */
import { s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { _stringToObject, getFocusableChildren } from '../misc/utils.js';
import '../../unsafe-html-2bcd6aa9.js';
import '../../directive-4c65af6a.js';

/**
 * Daten von einer API holen.
 * @summary Button/Button, Stack/Stack, Pagination/Pagination
 *
 * @slot default - Ausgabe der Daten
 *
 */

/**
 * @cssprop --fetch-gap - Abstand zwischen Komponenten
 */

class Fetch extends s {
	static properties = {
		json: { type: String },
		url: { type: String },
		dataset: { type: String },
		pagination: { type: String, reflect: true },
		itemsPerPage: { type: Number, reflect: true },
		total: { type: Number, reflect: true },
		_offset: { type: Number },
		_itemsPerSet: { type: Number },
		_results: { type: Array },
		_debug: { type: Boolean },
	};

	/**
	 * @private
	 */
	get _pagination() {
		return this.querySelector("wm-pagination") ?? null;
	}

	/**
	 * @private
	 */
	get _content() {
		return this.querySelector("[data-fetch-content]") ?? null;
	}

	/**
	 * @private
	 */
	get _attributes() {
		return this.querySelectorAll("[data-fetch-attributes]") ?? null;
	}

	/**
	 * @private
	 */
	get _template() {
		return this.querySelector("template") ?? null;
	}

	/**
	 * @private
	 */
	get _table() {
		return this.querySelector("wm-table") ?? null;
	}

	constructor() {
		super();

		/** @type {String} - JSON String (Alternative zur Url) */
		this.json = "";

		/** @type {String} - Url zur API */
		this.url = "";

		/** @type {String} - Feld im Datensatz in dem sich die Ergebnisse befinden */
		this.dataset = undefined;

		/**
		 * @type {String} - All results
		 * @private
		 */
		this._results = "";

		/** @type {String} - Wieviele Ergebnisse sollen pro Seite angezeigt werden */
		this.itemsPerPage = 5;

		/**
		 * @type {String} - Items per set, equals either itemPerPage or less
		 * @private
		 */
		this._itemsPerSet = this.itemsPerPage;

		/**
		 * @type {String} - Offset for pagination
		 * @private
		 */
		this._offset = 0;

		/** @type {'number'|'button'} - Art der Paginierung */
		this.pagination = undefined;

		// this._addEvents()
		// this._results = []
		// this.skeleton = "false"
		// this.fetchSource = ''
		// this.fetchTarget = ''

		this.total = 0;

		/**
		 * @type {Boolean} - Debug mode
		 * @private
		 */
		this._debug = false;
	}

	/**
	 * @private
	 */
	createRenderRoot() {
		return this;
	}

	updated(changedProperties) {
		if (changedProperties.has("itemsPerPage")) {
			this._itemsPerSet = this.itemsPerPage;
		}

		if (changedProperties.has("url")) {
			if (this.url) {
				this._fetchData();
			}
		}

		if (changedProperties.has("json")) {
			if (this.json) {
				this._fetchData();
			}
		}
	}

	/**
	 * Fetch data from the API
	 * @private
	 */
	_fetchData() {
		if (this.json) {
			this._processData(JSON.parse(this.json));
		}

		if (this.url) {
			fetch(this.url)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					this._processData(data);
				});
		}
	}

	/**
	 * Doe something with the fetched data
	 * @private
	 */
	_processData(data) {
		if (this._pagination) {
			this._reset();
		}

		this._results = this.dataset ? data[this.dataset] : data;
		this._displayData(true);
		// this._updateMap();
		this.total = this._results.length;

		if (this._debug) {
			console.log(this._results);
		}

		/**
		 * @type {CustomEvent} Daten wurden erfolgreich geladen
		 * @summary Anzahl der Ergebnisse
		 */
		this.dispatchEvent(
			new CustomEvent("wm-fetched", {
				detail: this._results.length,
				bubbles: true,
				composed: true,
			})
		);

		this._overrideSortingInTables();
	}

	/**
	 * @private
	 */
	async _overrideSortingInTables() {
		// If there is a wm-table
		if (this._table) {
			// wait until it's ready
			await this._table.updateComplete;
			// wait for the DOM to be ready
			setTimeout(() => {
				// add a click event to the table
				this._table.addEventListener("click", (e) => {
					// if there is a sortable button and data-fetch-sort-property is set
					if (
						e.target.closest("[data-sort]") &&
						e.target.closest("[data-fetch-sort-property]")
					) {
						// get the property we want to sort
						const field = e.target.closest("[data-fetch-sort-property]").dataset
							.fetchSortProperty;
						// get the direction
						const direction = e.target.closest("[data-sort]").dataset.sort;
						// sort the field accordingly
						this._results = this._results.sort((a, b) => {
							console.log(direction);
							const first = direction === "1" ? a[field] : b[field];
							const second = direction === "1" ? b[field] : a[field];

							return first.localeCompare(second, undefined, {
								numeric: true,
								sensitivity: "base",
							});
						});
						// reset everything
						this._reset();
						// display fresh data
						this._displayData();
					}
				});
			}, 0);
		}
	}

	/**
	 * @private
	 * Reset pagination
	 */
	_reset() {
		setTimeout(() => {
			this._pagination.reset();
		}, 0);
		this._offset = 0;
		this._itemsPerSet = this.itemsPerPage;
	}

	/**
	 * Takes markup from the slotted template and replaces fields and attributes with data
	 * @private
	 */
	_displayData() {
		if (this._content) {
			this._content.innerHTML = "";
			for (let i = this._offset; i < this._itemsPerSet; i++) {
				const result = this._results[i];
				if (result) {
					const template = this._template.content.cloneNode(true).children[0];

					// Finds and parse fields
					const fields = template.querySelectorAll("[data-fetch-field]");
					for (let i = 0; i < fields.length; i++) {
						const field = fields[i];
						field.innerHTML = _stringToObject(field.dataset.fetchField, result);
					}

					const conditions = template.querySelectorAll(
						"[data-fetch-condition]"
					);
					for (let j = 0; j < conditions.length; j++) {
						const condition = conditions[j];
						const attrAndValue = condition.dataset.fetchCondition.split(":");
						if (_stringToObject(attrAndValue[1], result) !== attrAndValue[0]) {
							condition.remove();
						}
					}

					this._replaceAttributes(template.querySelectorAll("*"), result);

					//  if (this.skeleton === "true" && initial) {
					//    template.style.transition = 'opacity 0.3s'
					//    template.style.opacity = '0'
					//  }

					this._content.appendChild(template);

					//  setTimeout(() => {
					//    template.style.opacity = '1'
					//  }, 0);
				}
			}
		} else if (this._attributes) {
			this._replaceAttributes(this._attributes, this._results[0]);
		}
	}

	/** Scans template for attributes
	 * @private
	 */
	_replaceAttributes(elements, result) {
		for (let i = 0; i < elements.length; i++) {
			const element = elements[i];
			for (const d in element.dataset) {
				if (d.indexOf("fetchAttribute") !== -1 && d !== "fetchAttributes") {
					if (element.dataset[d]) {
						const attrAndValue = element.dataset[d].split(":");
						element.setAttribute(
							attrAndValue[0],
							_stringToObject(attrAndValue[1], result)
						);
						delete element.dataset[d];
					}
				}
			}
		}
	}

	/**
	 * Load and display the next set of entries
	 * @private
	 */
	_loadMore() {
		this._itemsPerSet = this._itemsPerSet + this.itemsPerPage;
		this._displayData();
	}

	/**
	 * JSON mit Daten übergeben
	 * @param {Object} data
	 */
	async setJSON(d) {
		await this.updateComplete;

		let data = d;

		if (typeof d === "string") {
			data = JSON.parse(d);
		}

		this._processData(data);
	}

	connectedCallback() {
		super.connectedCallback();
	}

	firstUpdated() {
		if (this._pagination) {
			this._pagination.addEventListener("wm-page-changed", (e) => {
				this._offset = this.itemsPerPage * (e.detail.currentPage - 1);
				this._itemsPerSet = this.itemsPerPage * e.detail.currentPage;
				this._displayData();

				/* Focus the first item in the list */
				if (getFocusableChildren(this._content).length) {
					getFocusableChildren(this._content)[0].focus();
				}
			});
		}

		/** @type {CustomEvent} Web Component ist bereit*/
		this.dispatchEvent(
			new CustomEvent("wm-defined", {
				detail: {},
				bubbles: true,
				composed: true,
			})
		);
	}

	render() {
		return x`
			<wm-stack vertical gap="xs">
				<div><slot></slot></div>

				${this.pagination === "number"
					? x`
							<wm-pagination
								total="${this.total}"
								perPage="${this.itemsPerPage}"
								maxpages="6"
								justify="center"
								?hidden="${this.itemsPerPage > this._results.length}"
								firstAndLast
							></wm-pagination>
					  `
					: ``}
				${this.pagination === "button" &&
				this._itemsPerSet < this._results.length
					? x` <wm-button @click="${this._loadMore}">
							<button>Mehr laden</button>
					  </wm-button>`
					: ""}
			</wm-stack>
		`;
	}
}

customElements.define("wm-fetch", Fetch);

const tagName = "wm-fetch";

export { Fetch, tagName };
