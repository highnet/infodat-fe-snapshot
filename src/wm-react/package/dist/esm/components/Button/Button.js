/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as t,s as e}from"../../lit-element-8d7b5fe2.js";import{x as o}from"../../lit-html-34d0b6a8.js";import{randomHash as n}from"../misc/utils.js";import"../../unsafe-html-4e49b66a.js";import"../../directive-16e189ed.js";const i=[t`

:host {
  --wm-theme-content-font-weight: unset;
  --wm-theme-content-font-variation-settings: var(--wm-font-weight-bold);
  --button-font-size: var(--wm-font-size-s, 1rem);
  --button-padding-block: var(--wm-button-padding-block, 0.5em);
  --button-padding-inline: var(--wm-button-padding-inline, 1em);
  --button-min-height: var(--wm-button-min-height, 2.5em);
  --button-min-width: var(--wm-button-min-width, auto);

  display: inline-block;
  line-height: 1;
}

:host ::slotted(:is(button, a)) {
  display: flex;
  justify-content: center;
  gap: var(--button-gap) !important;
  cursor: pointer;
  /* test if this is still needed?*/
  /* padding: var(--button-padding-block) var(--button-padding-inline) !important;
  min-height: var(--button-min-height) !important;
  min-width: var(--button-min-width) !important; */
}

/* Active state for buttons */
:host ::slotted(:is(button:active, a:active)) {
  transform: var(--button-active-transform);
  filter: var(--button-active-filter);
}

/* Disabled buttons */

::slotted(button:is([aria-disabled="true"], [disabled])) {
  opacity: 0.5;
  pointer-events: none;
}


:host([kind="tertiary"]) ::slotted(button:is(:hover, :focus-visible)) {
  text-decoration: none !important;
}

/* Clean Buttons */

:host([kind="clean"]) ::slotted(:is(button, a)) {
  all: unset !important;
  align-items: center !important;
  cursor: pointer !important;
  display: inline-flex !important;
  gap: var(--button-gap) !important;
  line-height: 1.45 !important;
  outline: revert !important;
  box-sizing: border-box !important;
  font-size: var(--button-font-size, 1rem) !important;
}

/* Clean Buttons active state */
:host([kind="clean"]) ::slotted(:is(button:active, a:active)) {
  transform: var(--button-active-transform);
  opacity: 0.8;
}

:host([kind="clean"]) ::slotted(button:focus-visible) {
  outline-offset: var(--wm-theme-site-focus-outline-offset) !important;
  outline: var(--_button-focus-outline, var(--wm-theme-site-focus-outline)) !important;
}

:host([round]) {
  position: relative;
}

:host([round])::before {
  content: '';
  position: absolute;
  top: -8px;
  bottom: -8px;
  left: -8px;
  cursor: pointer;
}

:host([round]) ::slotted(:is(button, a)) {
  border-radius: 50%;
  padding: 0.1rem !important;
}

/* Tag buttons active state */
:host([kind="tag"]) ::slotted(:is(button:active, a:active)) {
  transform: var(--button-active-transform);
  filter: var(--button-active-filter);
}

:host([kind="tag"]) ::slotted(:is(button, a)) {
  border-radius: 30px;
  --button-text-transform: none;
}

:host([justify="center"]) ::slotted(:is(button, a)) {
  justify-content: center !important;
}

:host([justify="space-between"]) ::slotted(:is(button, a)) {
  justify-content: space-between !important;
}

:host([size="xs"]) {
  --button-font-size: 0.85rem;
  --button-padding-block: 0.2em;
  --button-padding-inline: 0.4em;
  --button-min-height: 1.8em;
  --wm-theme-content-font-weight: normal;
}

:host([size="xs"]) ::slotted(:is(button, a)) {
  font-variation-settings: var(--wm-theme-content-font-weight) !important;
  text-transform: none !important;
}

:host([size="s"]) {
  --button-font-size: 0.95rem;
  --button-padding-block: 0.4em;
  --button-padding-inline: 0.8em;
  --button-min-height: 2em;
}

:host([size="l"]) {
  --button-font-size: 1.1rem;
  --button-padding-block: 1.15em;
  --button-padding-inline: 2.7em;
  --button-min-width: 25rem;
}

:host([size="l"]) ::slotted(:is(button, a)) {
  max-width: 25rem !important; /* Maintain backwards compatibility */
  text-transform: none !important;
  width: 100% !important;
}


/* Full width Buttons */

:host([full]) {
  display: block;
}
:host([full="s"]),
:host([full="m"]) {
  display: inline-block;
}

:host([full]) ::slotted(:is(button, a)) {
  max-width:100% !important;
  width:100% !important;
}

@media (max-width: 32.5rem) {
  :host([full="s"]) {
    display: block;
  }

  :host([full="s"]) ::slotted(:is(button, a)) {
    width:100% !important;
  }
}

@media (max-width: 48rem) {
  :host([full="m"]) {
    display: block;
  }

  :host([full="m"]) ::slotted(:is(button, a)) {
    width:100% !important;
  }
}

:host([round]) ::slotted(:is(button, a)) {
  border-radius: 50%;
  min-width: 2rem;
  padding: 0 !important;
  aspect-ratio: 1;
  position: relative;
  z-index: 1;
}

:host([menu]) {
  display: inline-block;
  position: relative;
}

::slotted(ul) {
  background-color: var(--button-menu-background-color);
  box-shadow: var(--button-menu-shadow);
  display: none;
  left:  var(--button-menu-inline-offset, 0);
  list-style: none;
  margin: 0;
  padding: 0 !important;
  position: absolute;
}

:host([menu][open]) ::slotted(ul)  {
  display: block;
  white-space: nowrap;
}

:host([menu]) ::slotted(ul),
:host([menu*="block-start"]) ::slotted(ul) {
  bottom: calc(100% + var(--button-menu-block-offset));
}

:host([menu*="block-end"]) ::slotted(ul) {
  top: calc(100% + var(--button-menu-block-offset));
  bottom: auto;
}
:host([menu*="inline-end"]) ::slotted(ul) {
  right: var(--button-menu-inline-offset, 0);
  left: auto;
}
`];class s extends e{get _button(){return this?.querySelector("button")??null}get _menu(){return this?.querySelector("ul")??null}get _elements(){return this._menu.querySelectorAll("button, a")??null}static properties={_keyShortcuts:{type:Object},_selected:{type:Number},copy:{type:String,reflect:!0},open:{type:Boolean,reflect:!0},menu:{type:String,reflect:!0},justify:{type:String,reflect:!0},color:{type:String,reflect:!0},kind:{type:String,reflect:!0},full:{type:String,reflect:!0},round:{type:Boolean,reflect:!0},size:{type:String,reflect:!0},width:{type:String,reflect:!0}};static styles=i;constructor(){super(),this.kind=void 0,this.full=void 0,this.justify=void 0,this.color=void 0,this.size=void 0,this.menu=void 0,this._selected=0,this.open=!1,this.round=!1,this.width=void 0,this._keyShortcuts={},this.copy=void 0}connectedCallback(){super.connectedCallback(),this._menu&&(this.menu||(this.menu="block-start"),this._setUpMenu(),this._addEvents()),this._button&&this._button.addEventListener("click",this._handleClick.bind(this))}_setUpMenu(){const t=`menu_${n()}`;this._setUpMenuButton(t),this._setUpMenuList(t),this._elements.forEach(((t,e)=>{const o=t.textContent[0].toLowerCase();this._keyShortcuts[o]||(this._keyShortcuts[o]=[]),this._keyShortcuts[o].push(e)}))}_setUpMenuList(t){this._menu.setAttribute("role","menu"),this._menu.setAttribute("id",t);for(let t=0;t<this._elements.length;t++){const e=this._elements[t];e.setAttribute("tabindex",-1),e.setAttribute("role","menuitem"),e.parentNode.setAttribute("role","none")}}_toggleMenu(){this.open=!this.open,this._button.setAttribute("aria-expanded",this.open),this.open?setTimeout((()=>{this._elements[0].focus()}),0):(this._selected=0,this._button.focus())}_setUpMenuButton(t){this._button.setAttribute("aria-haspopup",!0),this._button.setAttribute("aria-expanded",this.open),this._button.setAttribute("aria-controls",t),this._button.setAttribute("type","button"),this._button.addEventListener("click",this._toggleMenu.bind(this))}_addEvents(){this.menu&&(this.addEventListener("keydown",(t=>{if(this.open&&Object.keys(this._keyShortcuts).includes(t.key)){let e=0,o=this._keyShortcuts[t.key][e];o===this._selected&&(e++,this._keyShortcuts[t.key][e]&&(o=this._keyShortcuts[t.key][e])),this._selected=o,this._elements[this._selected].focus(),e=0}"ArrowUp"===t.code&&(t.preventDefault(),this._selected--),"ArrowDown"===t.code&&(t.preventDefault(),this._selected++),this._selected===this._elements.length&&(this._selected=0),this._selected<0&&(this._selected=this._elements.length-1),"ArrowUp"!==t.code&&"ArrowDown"!==t.code||this._elements[this._selected].focus(),this._button===document.activeElement&&"Tab"===t.code&&this.open&&this._toggleMenu()})),document.addEventListener("keydown",(t=>{this.open&&"Escape"===t.code&&this._toggleMenu()})),document.addEventListener("click",this._clickOutSide.bind(this)))}_handleClick(){this._copyContent()}async _copyContent(){if(this.copy){const t=document.querySelector(`${this.copy}`);console.log(t);let e=t.textContent;t.value&&(e=t.value),await navigator.clipboard.writeText(e);const o=this.color;this.color="frischgruen",setInterval((()=>{this.color=o}),2e3)}}_clickOutSide(t){t.target.closest("wm-button")!==this&&this.open&&this._toggleMenu()}_getMenuPosition(){this._menu&&this._menu.getBoundingClientRect().top<0&&(this.menu="block-end")}firstUpdated(){this._getMenuPosition()}render(){return o` <slot></slot> `}}customElements.define("wm-button",s);const r="wm-button";export{s as Button,r as tagName};
