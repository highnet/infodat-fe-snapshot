/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';

const styles = [i`
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
`];

/**
 * WienBotButton
 * <br>
 * Docs: <a href="https://stp.wien.gv.at/wienbotwidget/static/widget/wienbot/widget.html">ubitec docs</a>
 *
 * @slot default - Text für den Button. Standard: „WienBotButton”
 */

class WienBotButton extends s {
	static properties = {
		message: { type: String, reflect: true },
		showMessage: { type: Boolean, reflect: true },
		resetMessages: { type: Boolean, reflect: true },
		type: { type: String, reflect: true },
	};

	static styles = styles;

	constructor() {
		super();

		/**
		 * @type {String} - Fragen an den WienBot
     * @default ""
		 **/
		this.message = "";

		/**
		 * @type {Boolean} - Bestehende Nachrichten bei einem erneuten Aufruf zurücksetzen
     * @default false
		 **/
		this.resetMessages = false;

		/**
		 * @type {Boolean} - Frage als Nachricht im Chat angezeigen
     * @default false
		 **/
		this.showMessage = false;

		/**
		 * @type {'text'|'quicklink'|'voice'} - Art des Nachricht. In den meisten Fällen `text`.
     * @default "text"
		 **/
		this.type = "text";
	}

	connectedCallback() {
		super.connectedCallback();
	}

	/**
	 * Call WienBot
	 * @private
	 */
	_showBot() {
		window.ut_api.sendMessage({
			message: {
				type: this.type,
				data: {
					text: this.message,
				},
			},
			addMessage: this.showMessage,
			resetMessages: this.resetMessages,
		});
	}

	render() {
		return x`
        <button
          @click="${this._showBot}"
        >
          <wm-icon iconid="wien-bot"></wm-icon>
          <slot>WienBot</slot>
        </button>
    `;
	}
}

customElements.define("wm-button-wienbot", WienBotButton);

const tagName = "wm-button-wienbot";

export { WienBotButton, tagName };
