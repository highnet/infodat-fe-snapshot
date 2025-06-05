/* @copyright Stadt Wien - Wiener Melange 200 */
import { s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';

/**
 * WienBot
 * <br>
 * Docs: <a href="https://stp.wien.gv.at/wienbotwidget/static/widget/wienbot/widget.html">ubitec docs</a>
 *
 */

class WienBot extends s {
	static properties = {
		widgetText: { type: String },
		infoText: { type: String },
		context: { type: String },
		channel: { type: String },
	};

	constructor() {
		super();

		/**
		 * @type {String} - Start-Frage WienBot
		 *
		 * @default "widgetwienbot"
		**/
		this.widgetText = "widgetwienbot";

		/**
		 * @type {String} - Text in WienBot Sprachblase
		 * @default "Wie kann ich helfen?"
		 **/
		this.infoText = "Wie kann ich helfen?";

		/**
		 * @type {String} - Kontext
		 * @default ""
		 **/
		this.context = "";

		/**
		 * @type {'text'|'quicklink'|'voice'} - Art der Nachricht. In den meisten Fällen 'text'.
		 **/
		this.channel = "";
	}


	loadScript() {
    const script = document.createElement('script');
    script.src = "https://stp.wien.gv.at/wienbotwidget/static/widget/wienbot/widget.js";
    script.async = true;
    script.id = "ut-widget";
		script.dataset.initialMessage = this.initialMessage = `{"type": "text", "data": {"text": "${this.widgetText}"}, "addMessage": false}`;
		script.dataset.infoText = this.infoText;
		script.dataset.context = this.context;
		script.dataset.channel = this.channel;
    this.appendChild(script);
	}

	connectedCallback() {
    super.connectedCallback();
    this.loadScript();
	}

	render() {
    return x``;
	}
}

customElements.define("wm-wienbot", WienBot);

const tagName = "wm-wienbot";

export { WienBot, tagName };
