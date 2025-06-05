/* @copyright Stadt Wien - Wiener Melange 200 */
import"../../lit-element-8d7b5fe2.js";import{x as i}from"../../lit-html-34d0b6a8.js";import{o as n}from"../../if-defined-d257cee1.js";import{o as t}from"../../unsafe-html-4e49b66a.js";import"../../directive-16e189ed.js";function o(){this._infoOpen=!this._infoOpen}function e(){return Boolean(this.info&&""!==this.info.trim())}function s(t,o="wasserblau"){return i`
    <wm-button round
      color="${o}"
      @click="${this._toggleInfo}"
      class="info-button"
      style="${n(t)}"
    >
      <button aria-expanded="${this._infoOpen}">
        <wm-icon iconid="info" width="28">Details</wm-icon>
      </button>
    </wm-button>
  `}function r(){return i`
    <div class="info ${this._infoOpen?"info-visible":""}" aria-hidden="${!this._infoOpen}">
      <div class="info-inner">
        <wm-notification type="info" iconSize="28">
          <slot name="info">${this.info?t(this.info):""}</slot>
        </wm-notification>
      </div>
    </div>
  `}const f=i=>class extends i{_toggleInfo(){o.call(this)}get hasInfo(){return e.call(this)}_renderInfoButton(i,n="wasserblau"){return s.call(this,i,n)}_renderInfoText(){return r.call(this)}};export{f as SharedInfoMixin,e as hasInfo,s as renderInfoButton,r as renderInfoText,o as toggleInfo};
