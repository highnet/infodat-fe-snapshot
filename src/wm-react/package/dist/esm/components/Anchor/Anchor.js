/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as t,s as e}from"../../lit-element-8d7b5fe2.js";import{x as i}from"../../lit-html-34d0b6a8.js";import{slug as s,getNodeIndex as o}from"../misc/utils.js";import"../../unsafe-html-4e49b66a.js";import"../../directive-16e189ed.js";const n=[t`
  * {
    box-sizing: border-box;
  }

  :host {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: var(--anchor-gap);
  }

  ::slotted(*) {
    margin-bottom: 0 !important;
  }

  wm-icon {
    display: block;
  }

  :focus-visible {
    outline: var(--wm-theme-site-focus-outline);
  }

  ::slotted(input) {
    position: absolute;
    white-space: nowrap;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    margin: -1px;
  }
`];class r extends e{get _heading(){return this.querySelectorAll("h2, h3, h4, h5, h6")[0]??null}get _copyLink(){return this.shadowRoot.querySelector("a")??null}get _output(){return document.querySelector('[role="status"]')??null}get _anchors(){return document.querySelectorAll("wm-anchor")??null}static properties={_id:{type:String,attribute:!1},copyText:{type:String},successText:{type:String},id:{type:String},icon:{type:String}};static styles=n;constructor(){super(),this.copyText="Link zu [TEXT] kopieren",this.successText="Link erfolgreich kopiert",this.icon="link",this.id=void 0,this._id=""}connectedCallback(){if(super.connectedCallback(),!this._output)throw new Error('Es muss eine Live-Region mit role="status" im Dokument geben.');"false"==this._heading.getAttribute("data-heading")&&this.setAttribute("data-heading",!1),this._id=this._generateID(),this.setAttribute("id",this._id),this.copyText=this.copyText.replace("[TEXT]",this._heading.textContent),this._addAnchor(),this._heading.setAttribute("aria-label",this._heading.textContent)}_generateID(){let t=this.id||this._heading.getAttribute("id");return this._heading.removeAttribute("id"),t||(t=s(this._heading.textContent.trim()),document.querySelector(`#${t}`)&&(t+=`${o(this._anchors,this)}`)),t}updated(t){t.has("id")&&this.id&&(this._id=this.id)}async _copyText(){setTimeout((async()=>{try{const t=window.location.href;await navigator.clipboard.writeText(t),this._copyLink&&this._copyLink.focus(),this._output&&(this._output.textContent=this.successText)}catch(t){console.error("Error copying text: ",t)}}),0)}_addAnchor(){const t=document.createElement("a");t.href=`#${this._id}`,t.setAttribute("aria-label",this.copyText),t.addEventListener("click",this._copyText);const e=document.createElement("wm-icon");e.setAttribute("iconid",this.icon),t.append(e),this._heading.append(t)}render(){return i` <slot></slot> `}}customElements.define("wm-anchor",r);const c="wm-anchor";export{r as Anchor,c as tagName};
