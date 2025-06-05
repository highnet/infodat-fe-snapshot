/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as e,s as t}from"../../lit-element-8d7b5fe2.js";import{x as s}from"../../lit-html-34d0b6a8.js";const l=[e`
  * {
    box-sizing: border-box;
  }

  :host {
    display: block;
  }

  ::slotted(ul) {
    --_columns: var(--gallery-size);

    display: grid;
    gap: 0.625rem;
    grid-template-columns: repeat(auto-fill, minmax(var(--_columns), 1fr));
    list-style: none;
    margin: 0 !important;
    padding: 0 !important;
  }
  
  :host([fixed]) ::slotted(ul) {
    grid-template-columns: repeat(auto-fill, var(--_columns));
  }
`];class r extends t{static properties={fixed:{type:Boolean,reflect:!0},size:{type:Number}};static styles=[l];constructor(){super(),this.size=208,this.fixed=!1}updated(e){e.has("size")&&this.style.setProperty("--gallery-size",this.size/16+"rem")}render(){return s` <slot></slot> `}}customElements.define("wm-gallery",r);const i="wm-gallery";export{r as Gallery,i as tagName};
