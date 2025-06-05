/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as t,s as e}from"../../lit-element-8d7b5fe2.js";import{x as s}from"../../lit-html-34d0b6a8.js";const i=[t`
  * {
    box-sizing: border-box;
  }
  
  :host {
    --_width: calc(var(--wm-theme-site-wrapper-width-s) + var(--wm-theme-site-wrapper-padding) * 2);
    transition: transform 0.3s;
    z-index: 1230;
  }

  @media(min-width: 48em) {
    :host {
      --_width: var(--wm-theme-site-wrapper-width);
    }
  }

  

  

  [hidden] {
    display: none !important;
  }
`];class o extends e{static properties={color:{type:String},_scrolledOffset:{type:Number}};get _navAndActionsBar(){return this.querySelector(":scope > div:nth-child(2)")}get _actions(){return this.querySelector(":scope > div:nth-child(2) > div")}static styles=[i];constructor(){super(),this._scrolledOffset=30,this.color=void 0}connectedCallback(){super.connectedCallback(),this._addGlobalEvents(),this.setAttribute("role","banner"),this._scrollHeader()}_addGlobalEvents(){this._lastKnownScrollPosition=window.pageYOffset,window.addEventListener("scroll",this._scrollHeader.bind(this))}_scrollHeader(){this._lastKnownScrollPosition=window.pageYOffset,this._lastKnownScrollPosition>this._scrolledOffset?document.documentElement.classList.add("wm-window-was-scrolled"):document.documentElement.classList.remove("wm-window-was-scrolled")}addAction(t){if(this._actions)this._appendAction(t);else{const e=document.createElement("div");this._navAndActionsBar.appendChild(e),this._appendAction(t)}}_appendAction(t){this._actions.appendChild(t)}createRenderRoot(){return this}render(){return s` <slot></slot> `}}customElements.define("wm-header",o);const n="wm-header";export{o as Header,n as tagName};
