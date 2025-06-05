/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as t,s as e}from"../../lit-element-8d7b5fe2.js";import{x as r}from"../../lit-html-34d0b6a8.js";const i=[t`
  * {
    box-sizing: border-box;
  }

  :host {
    display: block;
  }

  :host([justify="center"]) ul {
    justify-content: center;
  }
  
  :host([justify="space-between"]) ul {
    justify-content: space-between;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  ::slotted(button),
  button {
    align-items: center;
    background-color: var(--pagination-background-color) !important;
    color: var(--pagination-font-color) !important;
    border-color: var(--pagination-border-color) !important;
    border-radius: 50%;
    display: inline-flex;
    font-family: inherit;
    font-size: inherit;
    font-variation-settings: normal !important;
    height: 2.5rem;
    justify-content: center;
    width: 2.5rem;
  }

  button[aria-current="page"] {
    background-color: var(--pagination-background-color--active) !important;
    color: var(--pagination-font-color--active) !important;
    border-color: var(--pagination-border-color--active) !important;
  }

  button:is(:hover, :focus-visible, :focus) {
    background-color: var(--pagination-background-color--hover) !important;
    color: var(--pagination-font-color--hover) !important;
    border-color: var(--pagination-border-color--hover) !important;
  }

  [aria-disabled="true"] {
    opacity: 0.2;
    pointer-events: none;
  }

  [role="status"] {
    position: absolute;
    white-space: nowrap;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    margin: -1px;
  }
`];class a extends e{get _output(){return this.shadowRoot?.querySelector('[role="status"]')??null}static properties={hideAllControls:{type:Boolean,reflect:!0},currentPage:{type:Number,reflect:!0},firstAndLast:{type:Boolean,reflect:!0},justify:{type:String,reflect:!0},label:{type:String,reflect:!0},maxPages:{type:Number,reflect:!0},perPage:{type:Number,reflect:!0},total:{type:Number,reflect:!0},_firstPage:{type:Number},_items:{type:Array},_pages:{type:Number}};static styles=[i];constructor(){super(),this.currentPage=1,this.firstAndLast=void 0,this.label="Weitere Seiten",this.maxPages=10,this.perPage=8,this.total=0,this.justify=void 0,this._firstPage=1,this._items=[],this.hideAllControls=!1,this._pages=0}connectedCallback(){super.connectedCallback()}_prevPage(){this._changePage(this.currentPage-1)}_nextPage(){this._changePage(this.currentPage+1)}_click(t){this._changePage(parseInt(t.target.dataset.index))}_changePage(t){const e={currentPage:t,previousPage:this.currentPage};this.currentPage=t,this._updateFirstPage(),this._output.textContent=`Zeige Seite ${this.currentPage} von ${this._pages}`,this.dispatchEvent(new CustomEvent("wm-page-changed",{detail:e,bubbles:!0,composed:!0}))}_updateFirstPage(){const t=Math.floor(this.maxPages/2)+1;this._firstPage=this.currentPage-t+2,this._firstPage>this._pages-this.maxPages+1&&(this._firstPage=this._pages-this.maxPages+1),this._firstPage<1&&(this._firstPage=1)}_renderItems(){this._pages=Math.ceil(this.total/this.perPage),this._items=[];const t=Math.min(this._pages,this.maxPages);for(let e=this._firstPage;e<t+this._firstPage;e++){const t=e===this.currentPage&&"page";this._items.push(r`
        <li>
          <button
            aria-current="${t}"
            data-index="${e}"
            @click="${this._click}"
          >
            ${e}
          </button>
        </li>
      `)}}updated(t){t.has("currentPage")&&this._renderItems()}reset(){this.currentPage=1,this._firstPage=1}render(){return this._renderItems(),r`
      <nav aria-label="${this.label}">
        <ul>
          ${this._renderControlButton(1,"chevron-double-left",1===this.currentPage,this.hideAllControls||!this.firstAndLast,"Erste Seite")}
          ${this._renderControlButton(this.currentPage-1,"chevron-left",1===this.currentPage,this.hideAllControls,"Vorherige Seite")}

          ${this._items}
          <slot></slot>

          ${this._renderControlButton(this.currentPage+1,"chevron-right",this.currentPage===this._pages,this.hideAllControls,"Nächste Seite")}
          ${this._renderControlButton(this._pages,"chevron-double-right",this.currentPage===this._pages,this.hideAllControls||!this.firstAndLast,"Letzte Seite")}
        </ul>
        <div role="status"></div>
      </nav>
    `}_renderControlButton(t,e,i,a,s){return r`
      <li ?hidden="${a}">
        <button
          @click="${()=>this._changePage(t)}"
          aria-disabled="${i?"true":"false"}"
          aria-label="${s}"
        >
          <wm-icon width="22" iconid="${e}"></wm-icon>
        </button>
      </li>
    `}}customElements.define("wm-pagination",a);const s="wm-pagination";export{a as Pagination,s as tagName};
