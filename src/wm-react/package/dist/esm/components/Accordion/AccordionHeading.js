/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as t,s as n}from"../../lit-element-8d7b5fe2.js";import"../../lit-html-34d0b6a8.js";import{n as e}from"../../static-714d3441.js";const o=[t`
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

	`];class i extends n{get _slottedChildren(){return this.shadowRoot.querySelector("slot").assignedElements({flatten:!0})}static properties={_headingContent:{type:String},_headingLevel:{type:String},expanded:{type:Boolean,reflect:!0},id:{type:String},icon:{type:String}};static styles=[o];constructor(){super(),this._headingContent="",this._headingLevel="3",this.expanded=!1,this.icon="chevron-up"}connectedCallback(){super.connectedCallback()}_getData(){const t=this._slottedChildren.find((t=>/^H[1-6]$/.test(t.nodeName)));if(t){this._headingContent=t.textContent;const n=t.nodeName.match(/^H([1-6])$/);n&&(this._headingLevel=n[1])}}_openOrClose(){this.expanded=!this.expanded;const t={bubbles:!0,composed:!0,detail:{id:this.id,index:parseInt(this.id.split("heading-")[1])}};this.expanded?(this.parentNode.dispatchEvent(new CustomEvent("wm-expanded",t)),this.nextElementSibling.dispatchEvent(new CustomEvent("wm-expanded",t))):(this.parentNode.dispatchEvent(new CustomEvent("wm-collapsed",t)),this.nextElementSibling.dispatchEvent(new CustomEvent("wm-collapsed",t)))}_rerender(){this._getData();this.dispatchEvent(new CustomEvent("wm-contentchanged",{bubbles:!0,composed:!0,detail:{}}))}render(){return e`
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
		`}}customElements.define("wm-accordion-heading",i);const a="wm-accordion-heading";export{i as AccordionHeading,a as tagName};
