/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as t,s as e}from"../../lit-element-8d7b5fe2.js";import{x as i}from"../../lit-html-34d0b6a8.js";const n=[t`

:host > nav > ol {
  list-style-type: none;
  padding-left: 0;
  margin-left: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end !important;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width:768px) {
  :host > nav > ol {
    flex-direction: row;
  }
}

:host > nav > ol > li {
  margin-top: 0 !important;
  flex: 1 1 0%;
  min-width: 0;
}

:host > nav > ol > li:first-child > span {
  padding-left: var(--_pager-textpadding);
}

:host > nav > ol > li:nth-child(2) {
   text-align: right;
}

:host > nav > ol > li:nth-child(2) > span {
  padding-right: var(--_pager-textpadding);
}

`];class l extends e{static properties={prevText:{type:String},nextText:{type:String},hidePrev:{type:Boolean},hideNext:{type:Boolean}};static styles=[n];constructor(){super(),this.prevText="Voriges Kapitel:",this.nextText="Nächstes Kapitel:"}render(){return i`
    <nav aria-label="Seiten blättern">
      <ol>
        <li ?hidden="${this.hidePrev}">
          <span>${this.prevText}</span><br>
            <slot name="prevLink"></slot>
        </li>
      
        <li ?hidden="${this.hideNext}">
          <span>${this.nextText}</span><br>
            <slot name="nextLink"></slot>
        </li>
      </ol>
    </nav>
    `}}customElements.define("wm-pager",l);const a="wm-pager";export{l as Pager,a as tagName};
