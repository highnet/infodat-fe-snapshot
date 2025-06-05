/* @copyright Stadt Wien - Wiener Melange 200 */
import { s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { n } from '../../when-55b3d1d8.js';
import { o } from '../../if-defined-4084517f.js';
import { e } from '../../class-map-68392fb3.js';
import '../../directive-4c65af6a.js';

/**
 * Filter
 *
 * @slot default
 */

/**
 * @cssprop --filter-controls-background-color - Hintergrundfarbe der Controls
 * @cssprop --filter-dropdown-background-color - Hintergrundfarbe Dropdown
 * @cssprop --filter-dropdown-border - Rahmen Dropdown
 * @cssprop --filter-dropdown-shadow - Schatten Dropdown
 * @cssprop --filter-dropdown-button-border - Farbe der unteren Rahmenlinie am Toggle-Button
 */

class Filter extends s {
	/** Slotted Groups of checkboxes
	 * @private
	 **/
	get _fieldsets() {
		return this.querySelectorAll("fieldset") ?? null;
	}

	/** Rendered lists of checkboxes
	 * @private
	 **/
	get _lists() {
		return this.querySelectorAll(".list") ?? null;
	}

	/** Checkboxes
	 * @private
	 **/
	get _inputs() {
		return this.querySelectorAll("input:not(.check-all)") ?? null;
	}

	/** Button that toggles the filter
	 * @private
	 **/
	get _dropdownButton() {
		return this.querySelector(".filter-dropdown-button") ?? null;
	}

	/** @private */
	get _output() {
		return document.querySelector('[role="status"]') ?? null;
	}

	static properties = {
		label: { type: String, reflect: true },
		searchLabel: { type: String, reflect: true },
		dismissLabel: { type: String, reflect: true },
		selectedLabel: { type: String, reflect: true },
		selectLabel: { type: String, reflect: true },
		type: { type: String, reflect: true },
		open: { type: Boolean, reflect: true },
		controls: { type: Boolean, reflect: true },
		totals: { type: Object, attribute: false },
		_selection: { type: Array, attribute: false },
		_newSelection: { type: Array, attribute: false, reflect: true },
	};

	constructor() {
		super();

		/**
		 * @type {String} - Bezeichnung für das Dropdown
		 */
		this.label = "Erweiterte Filter";

		/**
		 * @type {String} - Text für Suchen-Button
		 */
		this.searchLabel = "Anwenden";

		/**
		 * @type {String} - Text für Abbrechen-Button
		 */
		this.dismissLabel = "Abbrechen";

		/**
		 * @type {String} - Text für auswählen-Text in Dropdown
		 */
		this.selectLabel = "Auswählen";

		/**
		 * @type {String} - Text für ausgewählt-Text in Dropdown
		 */
		this.selectedLabel = "ausgewählt";

		/**
		 * @type {'dropdown'} - Art des Filters
		 */
		this.type = undefined;

		/**
		 * @type {Boolean} - Ist das Dropdown geöffnet
		 */
		this.open = false;

		/**
		 * @type {Boolean} - Buttons zu Senden/Schließen/Abbrechen anzeigen
		 */
		this.controls = false;

		/**
		 * @type {Object} - Anzahl der Elemente insgesamt und der ausgewählten
		 */
		this.totals = {
			all: {
				total: this._inputs.length,
				checked: 0,
				active: 0,
			},
		};

		/**
		 * @type {Boolean} - Array that holds information about all checkboxes
		 * @private
		 */
		this._selection = [];

		/**
		 * @type {Boolean} - Array that holds information about all selected, but not yet confirmed checkboxes
		 * @private
		 */
		this._newSelection = [];
	}

	connectedCallback() {
		super.connectedCallback();

		this._registerCheckboxes();
		this._updateTotalChecked();
	}

	updated(changedProperties) {
		/* Listen to changes to this._newSelection */
		if (changedProperties.has("_newSelection")) {
			this._updateCheckboxes();
			this._updateTotalChecked();
		}
	}

	firstUpdated() {
		this._addEvents();
	}

	/**
	 * Update totals
	 * @private
	 */
	_updateTotalChecked() {
		this.totals.all.checked = 0;
		Array.from(this._fieldsets).forEach((fieldset, idx) => {
			this._newSelection[idx].checked = Array.from(
				fieldset.querySelectorAll("input")
			).filter((input) => input.checked).length;
			this.totals.all.checked += this._newSelection[idx].checked;
		});

		this.requestUpdate();
	}

	/**
	 * Add events
	 * @private
	 */
	_addEvents() {
		/* Listen to click on checkboxes */
		this.addEventListener("change", this._check);
		/* Listen to FilterSelection events */
		this.addEventListener("wm-filter-selection-removed", this._uncheck);
		/* Close on click outside */
		document.addEventListener("click", this._clickOutSide.bind(this));

		this.addEventListener("keyup", (e) => {
			if (e.code === "Escape" && this.open) {
				e.preventDefault();

				if (this.type === "dropdown") {
					this._toggleDropdown();
				}

				this._dropdownButton.focus();
			}
		});
	}

	/**
	 * Close when clicking somewhere outside the dialog
	 * @private
	 */
	_clickOutSide(e) {
		if (!e.target.closest("wm-filter") && this.open) {
			this._toggleDropdown();
		}
	}

	/**
	 * Uncheck checkboxes
	 * @private
	 */
	_uncheck(e) {
		Array.from(this._newSelection).forEach((group, idx) => {
			group.items.forEach((item) => {
				/* If the value coming from outside (e.g. FilterSelection) is 0, uncheck all boxes */
				if (e.detail === 0) {
					item.checked = false;
					this.querySelector(`#${item.id}`).checked = false;
					/* Update search params */
					const searchParams = new URL(document.location).searchParams;
					searchParams.delete(item.name);
					window.history.replaceState(
						null,
						"",
						`${window.location.origin}${window.location.pathname}?${searchParams}`
					);
				} else {
					/* Uncheck selected checkbox */
					if (item.id === e.detail) {
						item.checked = false;
						this.querySelector(`#${item.id}`).checked = false;
						/* Update search params */
						window.history.replaceState(
							null,
							"",
							`${window.location.origin}${
								window.location.pathname
							}${window.location.search.replace(
								`${encodeURI(item.name)}=${item.value}`,
								""
							)}`
						);
					}
				}
			});

			this._updateParentCheckbox(idx);
		});

		this._selection = JSON.parse(JSON.stringify(this._newSelection));
		this._updateTotalChecked();
	}

	/**
	 * Check checkboxes
	 * @private
	 */
	_check(e) {
		if (e.target.classList.contains("check-all")) return;

		// Get index of parent fieldset
		const idx = e.target.dataset.index;

		// Checked the matching checkbox
		this._newSelection[idx].items.map((item) => {
			if (item.value === e.target.value) {
				item.checked = !item.checked;
			}
			return item;
		});

		this._updateParentCheckbox(idx);
		this._updateTotalChecked();
	}

	/**
	 * (Un)check “check all” checkbox
	 * @private
	 */
	_updateParentCheckbox(idx) {
		const totalChecked = this._newSelection[idx].items.filter(
			(item) => item.checked
		).length;

		const checkbox = this._lists[idx].querySelector(".check-all");
		if (checkbox) {
			checkbox.indeterminate = false;
			checkbox.checked = true;

			/* None selected */
			if (totalChecked === 0) {
				checkbox.checked = false;
				/* At least one, but not all checked */
			} else if (this._newSelection[idx].items.length !== totalChecked) {
				checkbox.indeterminate = true;
			}
		}
	}

	/**
	 * Gather information about current list of checkboxes
	 * @private
	 */
	_registerCheckboxes() {
		for (let i = 0; i < this._fieldsets.length; i++) {
			const fieldset = this._fieldsets[i];
			const legend = fieldset.querySelector("legend");
			const inputs = fieldset.querySelectorAll(
				'input[type="checkbox"], input[type="radio"]'
			);

			/* Read url params and get checked checkboxes */
			const searchParams = new URL(document.location).searchParams;

			this._selection.push({
				total: inputs.length,
				checked: 0,
				items: [],
			});

			let totalInitialChecked = 0;
			for (let j = 0; j < inputs.length; j++) {
				const input = inputs[j];
				input.dataset.index = i;
				const checkedParams = searchParams.getAll(inputs[j].name);

				this._selection[i].items.push({
					id: input.id,
					parentid: this.id,
					parentlabel: legend.textContent,
					value: input.value,
					name: input.name,
					label: fieldset.querySelector(`[for="${input.id}"]`).textContent,
					checked: checkedParams.indexOf(input.value) !== -1,
				});

				if (checkedParams.indexOf(input.value) !== -1) {
					totalInitialChecked++;
				}
			}

			this._selection[i].checked = totalInitialChecked;
			this.totals.all.active += totalInitialChecked;
		}

		/* Update current selection */
		this._newSelection = JSON.parse(JSON.stringify(this._selection));
		/* Send data to FilterSelection */
		this._showSelection(this._newSelection);
	}

	/**
	 * Check all boxes at once
	 * @private
	 */
	_checkAll(idx, e) {
		this._newSelection[idx].items = this._newSelection[idx].items.filter(
			(item) => {
				item.checked = e.target.checked;
				return item;
			}
		);

		/* Looks strange, but it won't trigger an update otherwise */
		const tempArray = this._newSelection;
		this._newSelection = [];
		this._newSelection = tempArray;
	}

	/**
	 * (Un)check boxes
	 * @private
	 */
	_updateCheckboxes() {
		Array.from(this._newSelection).forEach((group, idx) => {
			group.items.forEach((item, itemidx) => {
				this._fieldsets[idx].querySelectorAll("input")[itemidx].checked =
					item.checked;
			});

			this._updateParentCheckbox(idx);
		});
	}

	/**
	 * Dismiss current selection
	 * @private
	 */
	_abort() {
		this._newSelection = JSON.parse(JSON.stringify(this._selection));

		if (this.type === "dropdown") {
			this._toggleDropdown();
		}

		this._dropdownButton.focus();
	}

	/**
	 * Aktuelle Auswahl speichern
	 */
	submit() {
		this._selection = JSON.parse(JSON.stringify(this._newSelection));
		// this.totals.all.active
		this.totals.all.active = 0;
		Array.from(this._fieldsets).forEach((fieldset, idx) => {
			this._selection[idx].checked = Array.from(
				fieldset.querySelectorAll("input")
			).filter((input) => input.checked).length;
			this.totals.all.active += this._selection[idx].checked;
		});

		this.totals.all.active = this.totals.all.checked;

		/* Close if dropdown open */
		if (this.type === "dropdown" && this.open) {
			this._toggleDropdown();
		}

		this._dropdownButton.focus();
		this._output.textContent = `${this.totals.all.checked} von ${this.totals.all.total} Filteroptionen ausgewählt`;

		/**
		 * @type {CustomEvent} Wenn eine Auswahl getroffen und angewendet worden ist
		 * @summary Object mit allen Filter Daten
		 */
		this.dispatchEvent(
			new CustomEvent("wm-filter-selection-submitted", {
				detail: {},
				bubbles: true,
				composed: true,
			})
		);
	}

	/**
	 * Wenn es eine Filter Selection gibt, kann man diese clientseitig aktualisieren
	 */
	updateSelection() {
		this._selection = [];
		this._registerCheckboxes();
	}

	/**
	 * Send data to FilterSelection
	 * @private
	 */
	_showSelection(selection) {
		setTimeout(() => {
			/**
			 * @type {CustomEvent} Wenn eine Auswahl getroffen worden ist
			 * @summary Object mit allen Filter Daten
			 */
			this.dispatchEvent(
				new CustomEvent("wm-filter-selected", {
					detail: selection,
					bubbles: true,
					composed: true,
				})
			);
		}, 0);
	}

	/**
	 * Open or close dropdown Filter
	 * @private
	 */
	_toggleDropdown() {
		this.open = !this.open;

		if (this.open) {
			/* If there's another open, close it */
			if (document.querySelector("wm-filter[open]")) {
				document.querySelector("wm-filter[open]")._toggleDropdown();
			}
		}
	}

	/**
	 * List of checkboxes
	 * @private
	 */
	_renderCheckboxes() {
		const listClass = { "list--single": this._fieldsets.length === 1 };

		return x`
			<div class="content">
				${Array.from(this._fieldsets).map((fieldset, idx) => {
					const legend = fieldset.querySelector("legend");
					legend.classList.add("wm-h-vh");
					return x`
						<div class="list ${e(listClass)}">
							${n(
								this._fieldsets.length === 1,
								() => x`${fieldset}`,
								() => x`
									<input
										type="checkbox"
										class="check-all"
										id="check_${idx}"
										@change="${this._checkAll.bind(this, idx)}"
										indeterminate="true"
									/>
									<label for="check_${idx}" class="wm-h-vh"
										>${legend.textContent}</label
									>
									<wm-details
										full
										open="${o(
											this._fieldsets.length === 1 ? true : undefined
										)}"
									>
										<span slot="label">
											<strong>${legend.textContent}</strong>
											${n(
												this._newSelection[idx].checked,
												() =>
													x`(${this._newSelection[idx].checked} von
														${this._newSelection[idx].items.length})
														<span class="wm-h-vh">${this.selectedLabel}</span>`
											)}
										</span>
										<div slot="content">${fieldset}</div>
									</wm-details>
								`
							)}
						</div>
					`;
				})}
			</div>
		`;
	}

	/**
	 * Totals in parenthesis
	 * @private
	 */
	_renderTotalSelected() {
		return x`
			${n(
				this.totals.all.checked > 0,
				() => x`
					${this.totals.all.checked} von ${this.totals.all.total}
					${this.selectedLabel}
				`,
				() => x`${this.selectLabel}`
			)}
		`;
	}

	/**
	 * Search and dismiss button
	 * @private
	 */
	_renderFilterControls() {
		return x`${n(
			this.controls,
			() => x`
				<wm-stack gap="xs">
					<wm-button full kind="primary" size="s">
						<button @click="${this.submit}" type="button">
							${this.searchLabel}
						</button>
					</wm-button>
					<wm-button full kind="secondary" size="s">
						<button @click="${this._abort}" type="button">
							${this.dismissLabel}
						</button>
					</wm-button>
				</wm-stack>
			`
		)}`;
	}

	/**
	 * Filter wrapper
	 * @private
	 */
	_renderFilters() {
		const contentClass = { "filter-dropdown-content--controls": this.controls };

		return x`
			${n(
				this.type === "dropdown",
				() => x`
					<strong id="label_${this.getAttribute("id")}">${this.label}</strong>

					<div class="filter-dropdown-wrapper">
						<button
							class="filter-dropdown-button"
							aria-expanded="${this.open}"
							@click="${this._toggleDropdown}"
							type="button"
							aria-labelledby="label_${this.getAttribute("id")}"
						>
							${this._renderTotalSelected()}
						</button>

						<div
							class="filter-dropdown-content ${e(contentClass)}"
							hidden
						>
							${this._renderCheckboxes()}
							${n(
								this.controls,
								() => x`
									<div class="controls">
										${n(
											this.totals.all.checked > 0 ||
												this.totals.all.checked !== this.totals.all.active,
											() => x` ${this._renderFilterControls()} `,
											() => x`

              <wm-button full kind="primary" color="nebelgrau" size="s">
                <button @click="${this._toggleDropdown}"  type="button">
                  Schliessen
                </button>
              </wm-button>
            </div>
            `
										)}
									</div>
								`
							)}
						</div>
					</div>
				`,
				() => x`
					<wm-stack vertical gap="xs">
						<h3>${this.label} ${this._renderTotalSelected()}</h3>

						${this._renderCheckboxes()} ${this._renderFilterControls()}
					</wm-stack>
				`
			)}
		`;
	}

	/**
	 * @private
	 */
	createRenderRoot() {
		return this;
	}

	render() {
		return x`
			${this._renderFilters()}
			<slot></slot>
		`;
	}
}

customElements.define("wm-filter", Filter);

export { Filter };
