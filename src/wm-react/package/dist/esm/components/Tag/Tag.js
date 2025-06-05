/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as t,s as o}from"../../lit-element-8d7b5fe2.js";import{x as e}from"../../lit-html-34d0b6a8.js";import{n as i}from"../../when-741bb8d9.js";const n=[t`
* {
  box-sizing: border-box;
}

:host {
  --_tag-dropdown-width: auto; /* Default width */
}



wm-button {
  --_padding: var(--tag-padding-block--mobil) var(--tag-padding-inline--mobil);
  --_min-height: var(--tag-min-height--mobil);
  align-items: center;
  background-color: var(--tag-background-color) !important;
  border: 1px solid var(--tag-border-color);
  border-radius: 20px;
  cursor: pointer;
  display: inline-flex;
  font-size: var(--tag-font-size) !important;
  gap: var(--tag-gap);
  min-height: var(--_min-height);
  padding: var(--_padding) !important;
  text-decoration: none;
}

wm-button {
  white-space: nowrap;
}

/* Show list when button expanded */
:host wm-icon {
  transition: transform 0.3s ease;
  transform: rotate(0deg);
}

:host([open="true"]) wm-icon {
  transform: rotate(180deg);
}

/* TODO: solution for tag dropdown in taglist overflow container */
/* :host([open="true"]) {
  position: absolute !important;
  z-index: 1230;
} */

:host([open="true"]) wm-button {
  border-bottom: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

:host([open="true"]) wm-icon {
  transform: rotate(180deg);
}

:host([dropdown]) > ::slotted(a) {
  display: none !important;
}

.dropdown-open {
  width: var(--_tag-dropdown-width);
}

a:is(:link, :visited) {
  color: var(--wm-theme-link-color);
  background-position: right 0 top 0.4em;
}

:is(a, wm-button):where(:hover, :focus) {
  background-color: var(--tag-background-color--hover);
  color: var(--tag-link-color--hover);
}

:is(a):focus-visible,
:is(wm-button):focus-within {
  outline: var(--wm-theme-site-focus-outline-width) solid var(--wm-color-ui-interactive);
  outline-offset: 1px;
}

::slotted(:is(ul, ol)) {
  background-color: var(--tag-background-color);
  border: solid var(--tag-border-color);
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-width: 0 1px 1px;
  display: none;
  left: 0;
  list-style-type: "";
  margin: 0 !important;
  max-height: 12rem;
  overflow: auto;
  overscroll-behavior: contain;
  padding: 0 !important;
  position: absolute;
  scrollbar-gutter: stable;
  top: 100%;
  width: var(--_tag-dropdown-width);
}

:host([open="true"]) ::slotted(:is(ul, ol)) {
  display: block;
  z-index: 1230;
}

button {
  --_button-focus-outline: none !important;
}
`];class s extends o{#t=null;#o=null;#e=null;get _link(){return this.#t||(this.#t=this.querySelectorAll("a")[0]??null),this.#t}get _button(){return this.#o||(this.#o=this.shadowRoot?.querySelector("wm-button")??null),this.#o}get _list(){return this.#e||(this.#e=this.querySelectorAll("ul, ol")??null),this.#e}static properties={color:{type:String,reflect:!0},open:{type:String,reflect:!0},dropdown:{type:Boolean,reflect:!0}};static styles=n;constructor(){super(),this.color=void 0,this.open="false",this.dropdown=!1}async connectedCallback(){if(super.connectedCallback(),this._list?.length&&(this.dropdown=!0,this._attachDropDownEvents(),"true"===this.getAttribute("open"))){await this.updateComplete,await new Promise((t=>requestAnimationFrame(t)));const t=this._button.offsetWidth,o=this._dropdownTagGetLargestItem(),e=Math.max(t,o);this.style.setProperty("--_tag-dropdown-width",`${e}px`),this._button.classList.add("dropdown-open")}}disconnectedCallback(){super.disconnectedCallback(),this.dropdown&&(this.removeEventListener("keyup",this._closeOnEscape),document.removeEventListener("click",this._clickOutSide),this.removeEventListener("focusout",this._closeOnFocusOut)),this.#t=null,this.#o=null,this.#e=null}_attachDropDownEvents(){this.addEventListener("keyup",this._closeOnEscape),document.addEventListener("click",this._clickOutSide),this.addEventListener("focusout",this._closeOnFocusOut)}_removeDropDownEvents(){this.removeEventListener("keyup",this._closeOnEscape),document.removeEventListener("click",this._clickOutSide),this.removeEventListener("focusout",this._closeOnFocusOut)}_closeOnEscape(t){"Escape"===t.code&&(this.closeDropdown(),this._button.querySelector("button").focus())}_clickOutSide=t=>{t.composedPath().find((t=>"WM-TAG"===t.tagName))||this.closeDropdown()};_closeOnFocusOut=t=>{this.contains(t.relatedTarget)||this.closeDropdown()};_dropdownTagGetLargestItem(){this.style.removeProperty("--_tag-dropdown-width"),this._list[0].style.removeProperty("width");const t=document.createElement("div");t.style.cssText="\n      position: absolute;\n      visibility: hidden;\n      white-space: nowrap;\n      padding: 0.3rem var(--tag-padding-inline--mobil);\n      width: auto;\n      left: -9999px;\n    ",document.body.appendChild(t);let o=0;return this._list[0].querySelectorAll("a").forEach((e=>{t.textContent=e.textContent,o=Math.max(o,t.offsetWidth)})),document.body.removeChild(t),o+20}toggle(t){t&&t.preventDefault(),this.open="true"!==this.getAttribute("open"),this.open?this.openDropdown():this.closeDropdown()}_dispatchTagEvent(t){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:{tag:this}}))}async openDropdown(){if(!this._list||!this._button)return void console.error("List or button element is not found.");const t=await new Promise((t=>{requestAnimationFrame((()=>{const o=this._button.offsetWidth,e=this._dropdownTagGetLargestItem();t({buttonWidth:o,largestItemWidth:e})}))}));requestAnimationFrame((()=>{const o=Math.max(t.buttonWidth,t.largestItemWidth);this.style.setProperty("--_tag-dropdown-width",`${o}px`),this._button.classList.add("dropdown-open"),this.setAttribute("open","true"),this._dispatchTagEvent("wm-tag-open")}))}closeDropdown(){this.setAttribute("open","false"),this._button&&(this.style.removeProperty("--_tag-dropdown-width"),this._button.classList.remove("dropdown-open"),this._dispatchTagEvent("wm-tag-close"))}render(){return e`
      ${i(this.dropdown,(()=>e`
          <wm-button
            kind="clean"
            full="true"
            justify="space-between"
            @click="${this.toggle.bind(this)}"
          >
            <button aria-expanded="${this.open}">
              <span class="link-text">${this._link?.textContent}</span>
              <wm-icon iconid="chevron-down"></wm-icon>
            </button>
          </wm-button>
        `))}
      <slot></slot>
    `}}customElements.define("wm-tag",s);const r="wm-tag";export{s as Tag,r as tagName};
