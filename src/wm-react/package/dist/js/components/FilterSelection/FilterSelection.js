/* @copyright Stadt Wien - Wiener Melange 200 */
import { s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { n } from '../../when-55b3d1d8.js';
import { getFocusableChildren } from '../misc/utils.js';
import '../../unsafe-html-2bcd6aa9.js';
import '../../directive-4c65af6a.js';

class FilterSelection extends s {
	static properties = {
		filterid: { type: String, reflect: true },
		resetlabel: { type: String, reflect: true },
		categorize: { type: Boolean, reflect: true },
		_selectedElements: { type: Array },
	};

	constructor() {
		super();

		/**
		 * @type {String} - ids der Filter, die abgebildet werden sollen (Komma-separierte Liste)
		 */
		this.filterid = undefined;

		/** @type {String} - Label für den Zurücksetzen Button */
		this.resetLabel = "Alle entfernen";

		/**
		 * @type {Array} - Filtered elements
		 * @private
		 */
		this._selectedElements = [];

		/**
		 * @type {Boolean} - Alternative Darstellung
		 */
		this.categorize = false;
	}

	connectedCallback() {
		super.connectedCallback();

		if (!this.filterid) {
			console.error("Bitte filterid angeben.");
		}

		this._addEvents();
	}

	/**
	 * Add events from filters
	 * @private
	 */
	_addEvents() {
		const filters = this.filterid.replaceAll(" ", "").split(",");

		filters.forEach((filter) => {
			const filterElement = document.querySelector(`#${filter}`);

			if (filterElement) {
				filterElement.addEventListener(
					"wm-filter-selected",
					this._getSelections.bind(this)
				);
			} else {
				console.warn(`Element with id "${filter}" not found`);
			}
		});
	}

	/**
	 * Add events from filters
	 * @private
	 */
	_getSelections(e) {
		/* groups holds data about each fieldset within a filter */
		const groups = e.detail;
		/* get all checked items in each group */
		groups.forEach((group) => {
			// Get all checked items
			const checkedItems = group.items.filter((item) => item.checked);
			this._selectedElements = [...this._selectedElements, ...checkedItems];
		});

		/* Remove duplicates */
		this._selectedElements = [
			...new Map(this._selectedElements.map((v) => [v.id, v])).values(),
		];
	}

	/**
	 * Remove items from list and filter
	 * @private
	 */
	_remove(e) {
		const button = e.target.closest("button");
		let detail = button.dataset.id;

		/* If there's an id, remove the specific element */
		if (detail) {
			this._selectedElements = this._selectedElements.filter(
				(item) => item.id !== detail
			);
			/* If the value is 0, remove everything */
		} else {
			this._selectedElements = [];
			detail = 0;

			// Focus the first focusable element in the form, if there is a form, when all filters are
			// deleted and the reset button disappears
			if (this.closest("form")) {
				getFocusableChildren(this.closest("form"))[0].focus();
			}
		}

		/* Send the info back to each filter */
		const filters = button.dataset.parentid.replaceAll(" ", "").split(",");
		/**
		 * @type {CustomEvent} Wenn eine Auswahl entfernt worden ist
		 */
		const removeEvent = new CustomEvent("wm-filter-selection-removed", {
			detail,
			bubbles: true,
			composed: true,
		});

		filters.forEach((filter) => {
			document.querySelector(`#${filter}`).dispatchEvent(removeEvent);
		});

		/* Event in the element itself to communicate to the outside that an updated happended */
		this.dispatchEvent(
			new CustomEvent("wm-filter-updated", {
				detail: {
					trigger: detail,
				},
				bubbles: true,
				composed: true,
			})
		);
	}

	createRenderRoot() {
		return this;
	}

	render() {
		// Create a set to store unique parent labels
		const uniqueParentLabels = new Set();

		if (this.categorize) {
			return x`
				<ul>
					${this._selectedElements.map((item, index) => {
						// Check if the parent label is unique, if so, add it to the set
						if (!uniqueParentLabels.has(item.parentlabel)) {
							uniqueParentLabels.add(item.parentlabel);

							// Render the parent label and all buttons for this parent
							return x`
								<li>
									<span id="parentlabel-${index}" class="label"
										>${item.parentlabel}:</span
									>
									<div>
										${this._selectedElements
											.filter(
												(element) => element.parentlabel === item.parentlabel
											)
											.map(
												(childItem) => x`
													<wm-button kind="secondary" size="xs">
														<button
															@click="${this._remove}"
															data-id="${childItem.id}"
															data-parentid="${childItem.parentid}"
															type="button"
															aria-describedby="parentlabel-${index}"
														>
															${childItem.label}
															<span class="wm-h-vh">entfernen</span>
															<wm-icon
																iconid="close"
																width="16"
																height="16"
															></wm-icon>
														</button>
													</wm-button>
												`
											)}
									</div>
								</li>
							`;
						}
						// If the parent label is not unique, return empty string
						return "";
					})}
				</ul>
				${n(
					this._selectedElements.length,
					() => x`
						<wm-button kind="tertiary">
							<button
								@click="${this._remove}"
								data-parentid="${this.filterid}"
								type="button"
							>
								${this.resetLabel}
							</button>
						</wm-button>
					`
				)}
			`;
		} else {
			return x`
				<wm-stack gap="xxs" wrap="true" horizontal>
					${this._selectedElements.map((item) => {
						return x`
							<wm-button kind="secondary" size="xs">
								<button
									@click="${this._remove}"
									data-id="${item.id}"
									data-parentid="${item.parentid}"
									type="button"
								>
									${item.parentlabel}: ${item.label}
									<span class="wm-h-vh">entfernen</span>
									<wm-icon iconid="close" width="16" height="16"></wm-icon>
								</button>
							</wm-button>
						`;
					})}
					${n(
						this._selectedElements.length,
						() => x`
							<wm-button kind="tertiary">
								<button
									@click="${this._remove}"
									data-parentid="${this.filterid}"
									type="button"
								>
									${this.resetLabel}
								</button>
							</wm-button>
						`
					)}
				</wm-stack>
				<slot></slot>
			`;
		}
	}
}

customElements.define("wm-filter-selection", FilterSelection);

export { FilterSelection };
