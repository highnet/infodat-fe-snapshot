/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';

const styles = [i`
  * {
    box-sizing: border-box;
  }

  :host {
    display: block;
  }

  [role="region"] {
    overflow: auto;
  }

  [role="region"]:focus-visible {
    outline: var(--wm-theme-site-focus-outline) !important;
    outline-offset: -2px !important;
  }
`];

/**
 * Tabelle
 * @summary Button/Button
 *
 * @slot default - Text
 */

/**
 * @cssprop --table-zebra-color - Farbe für das Zebramuster
 */

class Table extends s {
	/** @private */
	get _table() {
		return this.querySelector("table") ?? null;
	}

	/** @private */
	get _tbody() {
		return this.querySelector("tbody") ?? null;
	}

	/** @private */
	get _rows() {
		return this._tbody.querySelectorAll("tr") ?? null;
	}

	/** @private */
	get _caption() {
		return this.querySelector("caption") ?? null;
	}

	/** @private */
	get _colgroup() {
		return this.querySelector("colgroup") ?? null;
	}

	/** @private */
	get _ths() {
		return this.querySelectorAll("thead th") ?? null;
	}

	/** @private */
	get _output() {
		return document.querySelector('[role="status"]') ?? null;
	}

	static properties = {
		alignment: { type: String, reflect: true },
		border: { type: String, reflect: true },
		cols: { type: String, reflect: true },
		header: { type: String, reflect: true },
		hideCaption: { type: Boolean, reflect: true },
		label: { type: String, reflect: true },
		sort: { type: String, reflect: true },
		zebra: { type: String, reflect: true },
	};

	static styles = [styles];

	constructor() {
		super();

		/**
		 * @type {'start'|'end'|'center'} - Ausrichtung der Spalten: Ein Wert für alle Spalten oder Komma-separierte Liste.
		 **/
		this.alignment = undefined;

		/**
		 * @type {'columns'|'columns-frame'|'grid'|'full'|'none'|'head'|'rows'|'frame'} - Rahmen
		 */
		this.border = undefined;

		/**
		 * @type {String} - Breite der Spalten. Entweder relativ zur Gesamtbreite, angegeben in Fraktionen (1, 2, 1) oder Pixel (200px, 150px 400px) oder Mischung (200px, 1, 2)
		 **/
		this.cols = undefined;

		/**
		 * @type {'abendstimmung'|'flieder'|'frischgruen'|'goldgelb'|'morgenrot'|'nebelgrau'|'wasserblau'} - Header einfärben
		 **/
		this.header = undefined;

		/**
		 * @type {Boolean} - Caption verbergen
		 **/
		this.hideCaption = false;

		/**
		 * @type {String} - Accessible name für die Region
		 **/
		this.label = "";

		/**
		 * @type {String} - Spalte sortieren (Komma-separierte Liste von Booleans)
		 **/
		this.sort = undefined;

		/**
		 * @type {'even'|'odd'} - Zebra gerade oder ungerade
		 **/
		this.zebra = undefined;
	}

	connectedCallback() {
		super.connectedCallback();

		if (this._caption) {
			this.label = this._caption.textContent;
		}
	}

	updated(changedProperties) {
		if (changedProperties.has("alignment")) {
			this._setColumnAlignment();
		}

		if (changedProperties.has("cols")) {
			this._setColumnSizes();
		}

		if (changedProperties.has("sort")) {
			this._addSorting();
		}
	}

	/** @private */
	_addSorting() {
		this._addSortButton();
	}

	/** @private */
	_addSortButton() {
		const sorting = this.sort.replaceAll(" ", "").split(",");

		for (let i = 0; i < this._ths.length; i++) {
			if (sorting[i] === "true") {
				const th = this._ths[i];

				const wmbutton = document.createElement("wm-button");
				wmbutton.setAttribute("kind", "clean");

				const button = document.createElement("button");
				button.textContent = th.textContent;
				button.setAttribute('title', 'Sortieren');

				const icon = document.createElement("wm-icon");
				icon.setAttribute("iconid", "chevron-down");

				button.append(icon);
				button.dataset.sort = "1";
				button.addEventListener("click", this._sortColumn.bind(this));
				th.innerHTML = "";
				wmbutton.append(button);
				th.append(wmbutton);
			}
		}
	}

	/** @private */
	_sortColumn(e) {
		const button = e.target.closest("button");
		const th = button.closest("th");
		const newDirection = button.dataset.sort === "0" ? 1 : 0;

		if (this._table.querySelector("[aria-sort]")) {
			this._table.querySelector("[aria-sort] button").dataset.sort = "1";
			this._table.querySelector("[aria-sort]").removeAttribute("aria-sort");
		}

		button.setAttribute("data-sort", newDirection);
		const textDirection = newDirection ? "ascending" : "descending";
		th.setAttribute("aria-sort", textDirection);

		this.rearrangeRows(th, newDirection);
	}

	/**
	 * Zeilen neu sortieren
	 * @param {Node} th Table-Header der Spalte, die sortiert werden soll
	 * @param {Number} newDirection 1 aufsteigend oder 0 absteigend
	 */
	rearrangeRows(th, newDirection) {
		const index = [...th.parentNode.children].indexOf(th);

		const toSort = [];
		for (let i = 0; i < this._rows.length; i++) {
			const row = this._rows[i];
			const cells = row.querySelectorAll("td");

			if (!cells.length) {
				throw new Error("Keine <td> Elemente im tbody gefunden.");
			}

			const cellValue = cells[index].innerText.trim();
			const numericValue = parseFloat(cellValue);

			toSort.push([
				cellValue,
				isNaN(numericValue) ? cellValue.toUpperCase() : numericValue,
				row.cloneNode(true),
			]);
		}

		toSort.sort(function (a, b) {
			const valueA = a[1];
			const valueB = b[1];

			if (typeof valueA === "number" && typeof valueB === "number") {
				return newDirection ? valueA - valueB : valueB - valueA;
			} else {
				const nameA = isNaN(valueA) ? valueA.toUpperCase() : valueA;
				const nameB = isNaN(valueB) ? valueB.toUpperCase() : valueB;
				
				if (nameA < nameB) {
					return newDirection ? -1 : 1;
				}
				if (nameA > nameB) {
					return newDirection ? 1 : -1;
				}

				return 0;
			}
		});

		for (let i = 0; i < this._rows.length; i++) {
			const row = this._rows[i];
			row.parentNode.replaceChild(toSort[i][2], row);
		}

		const label = ["Absteigend", "Aufsteigend"];

		this._updateLiveRegion(label[newDirection], th.textContent);

		/**
		 * @type {CustomEvent} Wenn eine Spalte sortiert wurde
		 * @summary direction, column
		 */
		this.dispatchEvent(
			new CustomEvent("wm-table-sorted", {
				bubbles: true,
				composed: true,
				detail: {
					direction: label[newDirection],
					column: th.textContent,
				},
			})
		);
	}

	/** @private */
	_updateLiveRegion(direction, type) {
		this._output.textContent = `${direction} nach ${type} sortiert`;
	}

	/** @private */
	_setColumnAlignment() {
		// Remove existing properties (based on the assumption that there aren't more than 10 cols)
		for (let i = 1; i < 11; i++) {
			this.style.removeProperty(`--_col-${i}-alignment`);
		}

		// Turn string into array
		const alignments = this.alignment.replaceAll(" ", "").split(",");

		// If there's only one value, duplicate it until it matches the total number of columns.
		if (alignments.length === 1) {
			for (let i = 1; i < this._ths.length; i++) {
				alignments.push(alignments[0]);
			}
		}

		// Save each option in a custom property
		alignments.forEach((alignment, idx) => {
			this.style.setProperty(`--_col-${idx + 1}-alignment`, alignment);
		});
	}

	/** @private */
	_setColumnSizes() {
		// Turn string into array
		const cols = this.cols.replaceAll(" ", "").split(",");

		// If there are no fractions, stop here
		if (!cols.length) return;

		// Remove existing col group
		if (this._colgroup) {
			this._colgroup.remove();
		}

		// Count all fractions
		let fractions = 0;
		cols.forEach((col) => {
			// If the value has no unit like px, %, rem, count it as a fraction
			if (col.match(/^\d+$/)) {
				fractions += parseInt(col);
			}
		});

		// Convert fractions to percent
		const unit = 100 / fractions;

		// If there's only one value, duplicate it until it matches the total number of columns.
		if (cols.length === 1) {
			for (let i = 1; i < this._ths.length; i++) {
				cols.push(cols[0]);
			}
		}

		// Add colgroup and col nodes
		let colgroup = document.createElement("colgroup");
		cols.forEach((col) => {
			let width = col;

			if (col.match(/^\d+$/)) {
				width = `${col * unit}%`;
			}

			const column = document.createElement("col");
			column.setAttribute("width", width);
			colgroup.appendChild(column);
		});

		this._table.prepend(colgroup);
	}

	render() {
		return x`
			<div role="region" tabindex="0" aria-label="${this.label}">
				<slot></slot>
			</div>
		`;
	}
}

customElements.define("wm-table", Table);

const tagName = "wm-table";

export { Table, tagName };
