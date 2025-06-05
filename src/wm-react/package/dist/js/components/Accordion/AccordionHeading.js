/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import '../../lit-html-0378a13e.js';
import { n } from '../../static-bc61a2dc.js';

const styles = [
	i`
    h3 {
      margin: 0 0 -1px;
    }

		.wm-accordion-heading-content {

		}

		@media (min-width: 48em) {
			.wm-accordion-heading-content {
				display: flex;
				align-items: center;
				gap: var(--wm-spacing-xxs);
			}
		}

		.wm-accordion-heading-content-inner {
			display: flex;
			align-items: center;
			gap: var(--wm-spacing-xxs);
		}

		h3 span {
			font-variation-settings: "wght" 400 !important;
		}

		wm-button {
			display: block;
			line-height: revert;
		}

		button {
			all: unset !important;
			background-color: var(--accordion-background-color) !important;
			border: var(--accordion-border) !important;
			box-sizing: border-box !important;
			cursor: pointer !important;
			color: var(--accordion-font-color) !important;
      display: flex !important;
			font-size: 1.1rem !important;
			font-variation-settings: "wght" 600 !important;
			font-weight: var(--accordion-font-weight) !important;
      justify-content: space-between !important;
			align-items: center !important;
			padding-top: var(--accordion-padding-block-start) !important;
			padding-bottom: var(--accordion-padding-block-end) !important;
			padding-left: var(--accordion-padding-inline) !important;
			padding-right: var(--accordion-padding-inline) !important;
			position: relative !important;
			width: 100% !important;
		}

		button:is(:hover, :focus) {
			background-color: var(--accordion-background-color--hover) !important;
			color: var(--accordion-font-color--hover) !important;
		}

  	wm-icon {
      transition: 0.2s transform ease-in-out;
    }

    :host([expanded]:not([icon])) wm-icon {
      transform: rotate(-180deg);
    }

		:host(:not([icon])) :where(:hover, :focus-visible) wm-icon {
			transform: rotate(-90deg);
		}

		button:focus-visible {
			outline: var(--wm-theme-site-focus-outline) !important;
			outline-offset: -2px !important;
		}

		@media print {
			button {
				--accordion-padding-inline: 0 !important;
				--accordion-padding-block-start: 0 !important;
				--accordion-padding-block-end: 0 !important;
			}
	
			button wm-icon {
				display: none;
			}
		}

	`,
];

/**
 * Accordion Heading - Klickbare Überschrift für ein Accordion Panel
 *
 * @slot default - Der Slot für die Überschrift (h1-h6)
 * @slot icon - Ein Icon oder anderes Element vor der Überschrift
 * @slot subheading - Optionaler Zusatztext in der Headline, der nicht fett dargestellt wird
 */

class AccordionHeading extends s {
	/* @private */
	get _slottedChildren() {
		const slot = this.shadowRoot.querySelector("slot");
		return slot.assignedElements({ flatten: true });
	}

	static properties = {
		_headingContent: { type: String },
		_headingLevel: { type: String },
		expanded: { type: Boolean, reflect: true },
		id: { type: String },
		icon: { type: String },
	};

	static styles = [styles];

	constructor() {
		super();

		/**
		 * Textcontent of the slotted heading
		 * @private
		 */
		this._headingContent = "";

		/**
		 * Default level of the heading
		 * @private
		 */
		this._headingLevel = "3";

		/**
		 * Standardmäßig zeigen oder nicht
		 */
		this.expanded = false;

		/**
		 * Angezeigtes Icon
		 */
		this.icon = "chevron-up";
	}

	connectedCallback() {
		super.connectedCallback();
	}

	/**
	 * Retrieve accessible name and level from slotted heading
	 */
	_getData() {
    const headingElement = this._slottedChildren.find(
        (el) => /^H[1-6]$/.test(el.nodeName)
    );

    if (headingElement) {
        this._headingContent = headingElement.textContent;

        const headingLevelMatch = headingElement.nodeName.match(/^H([1-6])$/);
        if (headingLevelMatch) {
            this._headingLevel = headingLevelMatch[1];
        }
    }
}


	/**
	 * Open or close item and dispatch event accordingly
	 * @private
	 */
	_openOrClose() {
		this.expanded = !this.expanded;

		const options = {
			bubbles: true,
			composed: true,
			detail: {
				id: this.id,
				index: parseInt(this.id.split("heading-")[1]),
			},
		};

		if (this.expanded) {
			/**
			 * @type {CustomEvent} Wenn ein Panel geöffnet wurde
			 * @summary id, index
			 */
			this.parentNode.dispatchEvent(new CustomEvent("wm-expanded", options));
			this.nextElementSibling.dispatchEvent(new CustomEvent("wm-expanded", options));
		} else {
			/**
			 * @type {CustomEvent} Wenn ein Panel geschlossen wurde
			 * @summary id, index
			 */
			this.parentNode.dispatchEvent(new CustomEvent("wm-collapsed", options));
			this.nextElementSibling.dispatchEvent(new CustomEvent("wm-collapsed", options));
		}
	}

	/**
	 * Get data from slotted content
	 * @private
	 */
	_rerender() {
		this._getData();

		const options = {
			bubbles: true,
			composed: true,
			detail: {},
		};
		/**
		 * @type {CustomEvent} Wenn ein Element hinzugefügt oder gelöscht worden ist.
		 */
		this.dispatchEvent(new CustomEvent("wm-contentchanged", options));
	}

	render() {
		return n`
			<slot @slotchange="${this._rerender}" hidden></slot>

			<h3 aria-level="${this._headingLevel}">

				<wm-button clean>
					<button
						aria-expanded="${this.expanded}"
						part="button"
						class="trigger"
						@click="${this._openOrClose}"
					>
						<div class="wm-accordion-heading-content">
							<div class="wm-accordion-heading-content-inner">
								<slot name="icon"></slot>
								${this._headingContent}
							</div>
							<span><slot name="subheading"></slot></span>
						</div>
						<wm-icon iconid="${this.icon}"></wm-icon>
					</button>
				</wm-button>
			</h3>
		`;
}

}

customElements.define("wm-accordion-heading", AccordionHeading);

const tagName = "wm-accordion-heading";

export { AccordionHeading, tagName };
