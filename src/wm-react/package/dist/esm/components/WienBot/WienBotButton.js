/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as t,s as e}from"../../lit-element-8d7b5fe2.js";import{x as s}from"../../lit-html-34d0b6a8.js";const o=[t`
* {
  box-sizing: border-box;
}
:host button {
			background-color: #ff5a64;
			color: var(--wm-color-fastschwarz) !important;
			border: 1px solid #ff5a64;
      padding: 0.463em 0.88em;
      font-size: 1rem;
			text-align: left;
			text-transform: none;
			font-family: inherit;
      display: flex;
      justify-content: center;
			align-items: center;
      gap: var(--wm-spacing-xxs) !important;
      cursor: pointer;
		}

		:host button:focus-visible {
			outline: var(--wm-theme-site-focus-outline) !important;
			outline-offset: 2px !important;
		}

    @media (min-width: 768px) {
    :host button {
      font-size: 1.1rem;
    }
}

		:host button:is(:hover, :focus-visible) {
			background-color: var(--wm-color-morgenrot-light);
      color: var(--wm-color-fastschwarz);
		}

    :host button:active {
      background-color: #e6515a;
    }
`];class i extends e{static properties={message:{type:String,reflect:!0},showMessage:{type:Boolean,reflect:!0},resetMessages:{type:Boolean,reflect:!0},type:{type:String,reflect:!0}};static styles=o;constructor(){super(),this.message="",this.resetMessages=!1,this.showMessage=!1,this.type="text"}connectedCallback(){super.connectedCallback()}_showBot(){window.ut_api.sendMessage({message:{type:this.type,data:{text:this.message}},addMessage:this.showMessage,resetMessages:this.resetMessages})}render(){return s`
        <button
          @click="${this._showBot}"
        >
          <wm-icon iconid="wien-bot"></wm-icon>
          <slot>WienBot</slot>
        </button>
    `}}customElements.define("wm-button-wienbot",i);const n="wm-button-wienbot";export{i as WienBotButton,n as tagName};
