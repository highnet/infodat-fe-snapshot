/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { n } from '../../when-55b3d1d8.js';
import { g as globalCSS } from '../../wiener-melange.bundle.min-0e2d13dc.js';

const styles = [i`
  * {
    box-sizing: border-box;
  }

  :host {
    display: block;
    position: relative;

    /* Add border in highlight and adjust padding */
    --highlight-border-width: 1px;
    --highlight-padding: 1rem 1.5rem 1rem 1rem;
  }

  .close {
    position: absolute;
    inset-block-start: 0.5rem;
    inset-inline-end: 0.5rem;
  }
`];

const globalStyles = new CSSStyleSheet();
globalStyles.replaceSync(globalCSS);

/**
 * Info-, Warn- und Fehler-Hinweise
 * @summary Button/Button, Icon/Icon, Highlight/Highlight
 *
 * @slot default - Meldung
 */

class notification extends s {
	static properties = {
		dismissible: { type: Boolean },
		dismissLabel: { type: String },
		type: { type: String, reflect: true },
		_types: { type: Object },
		_color: { type: String },
		_icon: { type: String },
		iconSize: { type: String },
	};

	static styles = [globalStyles, styles];

	constructor() {
		super();

		/** @type {'info'|'warning'|'error'} - Art der Meldung */
		this.type = "info";

		/** @type {Boolean} - Schließen-Button anzeigen */
		this.dismissible = false;

		/** @type {String} - Accessible Name für den Entfernen-Button */
		this.dismissLabel = "Entfernen";

		/**
		 * @private
		 */
		this._types = {
			error: {
				color: "morgenrot-light",
				icon: "error",
			},
			info: {
				color: "wasserblau-light",
				icon: "info",
			},
			warning: {
				color: "goldgelb-light",
				icon: "warning",
			},
			success: {
				color: "frischgruen-light",
				icon: "success",
			},
		};

		/**
		 * @private
		 */
		this._color = this._types["info"].color;
		/**
		 * @private
		 */
		this._icon = this._types["info"].icon;

		this.iconSize = "28";
	}

	connectedCallback() {
		super.connectedCallback();
	}

	updated(changedProperties) {
		if (changedProperties.has("type")) {
			this._color = this._types[this.type].color;
			this._icon = this._types[this.type].icon;
		}
	}

	/**
	 * @private
	 */
	_dismiss() {
		this.remove();
	}

	render() {
		return x`
			<wm-highlight color="${this._color}">
				${n(
					this.dismissible,
					() => x`
						<wm-button kind="clean" class="close">
							<button
								@click="${this._dismiss}"
								aria-expanded="${this.flipped}"
								type="button"
							>
								<wm-icon iconid="close" width="20">
									${this.dismissLabel}
								</wm-icon>
							</button>
						</wm-button>
					`
				)}
				<wm-stack gap="xxs">
					<wm-icon iconid="${this._icon}" width="${this.iconSize}"></wm-icon>
					<div>
						<slot></slot>
					</div>
				</wm-stack>
			</wm-highlight>
		`;
	}
}

customElements.define("wm-notification", notification);

const tagName = "wm-notification";

export { notification, tagName };
