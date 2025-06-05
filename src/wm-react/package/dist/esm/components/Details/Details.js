/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as t,s as e}from"../../lit-element-8d7b5fe2.js";import{x as i}from"../../lit-html-34d0b6a8.js";import{e as n}from"../../class-map-b15037ef.js";import"../../directive-16e189ed.js";const o=[t`
  :host {
    --_details-height: 0fr;

    align-content: start;
    align-items: start;
    border: var(--details-border);
    display: inline-grid;
    grid-template-rows: auto var(--_details-height);
    overflow: hidden;
    padding: var(--details-padding);
    transition: grid-template-rows 0.3s, visibility 0.3s;
  }

  :host([selectable="false"]) {
     /* create new stacking context */
     transform: rotate(0);
  }

  :host([selectable="false"]) button::before {
    content: "";
    inset: 0;
    position: fixed;
  }

  :host([open]) {
    --_details-height: 1fr;
    --_details-margin: var(--wm-base-spacing-xs);
  }

  :host([_opened]) {
    overflow: visible;
  }

  :host([full]) {
    display: grid;
  }

  wm-button {
    display: inline-flex;
  }

  button {
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--wm-theme-site-color);
    display: flex;
    font: inherit;
    font-family: var(--wm-theme-site-font-family);
    justify-content: space-between;
    padding: var(--details-padding-button);
    position: relative;
  }

  button:focus-visible {
    outline: var(--wm-theme-site-focus-outline);
    outline-offset: -2px;
  }

  button::after {
    background: var(--details-icon) no-repeat center right !important;
    background-size: contain !important;
    content: "";
    display: block;
    height: 1.4em;
    transition: transform 0.3s;
    width: 1.2em;
  }

  [aria-expanded="true"]::after{
    transform: rotate(180deg)
  }

  :host([full]) button {
    justify-content: space-between;
    width: 100%;
  }

  :host([full]) wm-button {
    display: flex;
  }

  .button--hidden {
    display: none !important;
  }

  .content {
    transition: all 0.3s;
    overflow: hidden;
    visibility: hidden;
    min-width: 0;
  }

  :host([_opened]) .content {
    overflow: visible;
  }

  .button--hidden + .content {
    overflow: visible;
    visibility: visible;
  }

  :host([open]) .content {
    visibility: visible;
    margin-block-start: var(--_details-margin);
    margin-block-end: var(--_details-margin);
  }

  .wrap {
    padding: var(--details-padding-content);
  }

  ::slotted(strong) {
    font-weight: var(--details-font-weight);
    font-variation-settings: var(--details-font-variation-settings);
  }
`];class s extends e{static properties={full:{type:Boolean,reflect:!0},open:{type:Boolean,reflect:!0},min:{type:String,reflect:!0},selectable:{type:Boolean,reflect:!0},_active:{type:Boolean},_opened:{type:Boolean,reflect:!0}};static styles=[o];get _content(){return this.renderRoot.querySelector(".content")??null}get _wrap(){return this.renderRoot.querySelector(".wrap")??null}constructor(){super(),this.full=!1,this.open=!1,this.min=void 0,this._active=!0,this.selectable=!1,this._opened=!1}connectedCallback(){super.connectedCallback(),this.min&&this._isActive(),this._addEvents()}_addEvents(){this.addEventListener("transitionend",(()=>{this._opened=this.open}))}toggleDetails(){this.open=!this.open,this.open||(this._opened=!1)}_isActive(){const t=window.matchMedia(`(min-width: ${this.min})`),e=t=>{this._active=t.matches};t.addEventListener("change",e),e(t)}render(){const t={"button--hidden":!this._active};return i`
			<wm-button
				@click="${this.toggleDetails}"
				?full="${this.full}"
				class="${n(t)}"
			>
				<button aria-expanded="${this.open??"false"}">
					<slot name="label"></slot>
				</button>
			</wm-button>

			<div class="content">
				<div class="wrap">
					<slot name="content"></slot>
				</div>
			</div>
		`}}customElements.define("wm-details",s);const a="wm-details";export{s as Details,a as tagName};
