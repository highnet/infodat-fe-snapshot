/* @copyright Stadt Wien - Wiener Melange 200 */
import '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { o } from '../../if-defined-4084517f.js';
import { o as o$1 } from '../../unsafe-html-2bcd6aa9.js';
import '../../directive-4c65af6a.js';

function toggleInfo() {
  this._infoOpen = !this._infoOpen;
}

function hasInfo() {
  return Boolean(this.info && this.info.trim() !== "");
}

function renderInfoButton(style, color = "wasserblau") {
  return x`
    <wm-button round
      color="${color}"
      @click="${this._toggleInfo}"
      class="info-button"
      style="${o(style)}"
    >
      <button aria-expanded="${this._infoOpen}">
        <wm-icon iconid="info" width="28">Details</wm-icon>
      </button>
    </wm-button>
  `;
}

function renderInfoText() {
  return x`
    <div class="info ${this._infoOpen ? 'info-visible' : ''}" aria-hidden="${!this._infoOpen}">
      <div class="info-inner">
        <wm-notification type="info" iconSize="28">
          <slot name="info">${this.info ? o$1(this.info) : ''}</slot>
        </wm-notification>
      </div>
    </div>
  `;
}

const SharedInfoMixin = (BaseClass) => {
  class SharedInfoElement extends BaseClass {
    _toggleInfo() {
      toggleInfo.call(this);
    }

    get hasInfo() {
      return hasInfo.call(this);
    }

    _renderInfoButton(style, color = "wasserblau") {
      return renderInfoButton.call(this, style, color);
    }

    _renderInfoText() {
      return renderInfoText.call(this);
    }
  }

  return SharedInfoElement;
};

export { SharedInfoMixin, hasInfo, renderInfoButton, renderInfoText, toggleInfo };
