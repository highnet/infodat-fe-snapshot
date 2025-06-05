/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as t,s as e}from"../../lit-element-8d7b5fe2.js";import{x as o}from"../../lit-html-34d0b6a8.js";const r=[t`
  * {
    box-sizing: border-box;
  }

  :host {
    display: block;
  }

  [role="region"] {
    overflow: auto;
  }

  [role="region"]:focus-visible {
    outline: var(--wm-theme-site-focus-outline) !important;
    outline-offset: -2px !important;
  }
`];class n extends e{get _table(){return this.querySelector("table")??null}get _tbody(){return this.querySelector("tbody")??null}get _rows(){return this._tbody.querySelectorAll("tr")??null}get _caption(){return this.querySelector("caption")??null}get _colgroup(){return this.querySelector("colgroup")??null}get _ths(){return this.querySelectorAll("thead th")??null}get _output(){return document.querySelector('[role="status"]')??null}static properties={alignment:{type:String,reflect:!0},border:{type:String,reflect:!0},cols:{type:String,reflect:!0},header:{type:String,reflect:!0},hideCaption:{type:Boolean,reflect:!0},label:{type:String,reflect:!0},sort:{type:String,reflect:!0},zebra:{type:String,reflect:!0}};static styles=[r];constructor(){super(),this.alignment=void 0,this.border=void 0,this.cols=void 0,this.header=void 0,this.hideCaption=!1,this.label="",this.sort=void 0,this.zebra=void 0}connectedCallback(){super.connectedCallback(),this._caption&&(this.label=this._caption.textContent)}updated(t){t.has("alignment")&&this._setColumnAlignment(),t.has("cols")&&this._setColumnSizes(),t.has("sort")&&this._addSorting()}_addSorting(){this._addSortButton()}_addSortButton(){const t=this.sort.replaceAll(" ","").split(",");for(let e=0;e<this._ths.length;e++)if("true"===t[e]){const t=this._ths[e],o=document.createElement("wm-button");o.setAttribute("kind","clean");const r=document.createElement("button");r.textContent=t.textContent,r.setAttribute("title","Sortieren");const n=document.createElement("wm-icon");n.setAttribute("iconid","chevron-down"),r.append(n),r.dataset.sort="1",r.addEventListener("click",this._sortColumn.bind(this)),t.innerHTML="",o.append(r),t.append(o)}}_sortColumn(t){const e=t.target.closest("button"),o=e.closest("th"),r="0"===e.dataset.sort?1:0;this._table.querySelector("[aria-sort]")&&(this._table.querySelector("[aria-sort] button").dataset.sort="1",this._table.querySelector("[aria-sort]").removeAttribute("aria-sort")),e.setAttribute("data-sort",r);const n=r?"ascending":"descending";o.setAttribute("aria-sort",n),this.rearrangeRows(o,r)}rearrangeRows(t,e){const o=[...t.parentNode.children].indexOf(t),r=[];for(let t=0;t<this._rows.length;t++){const e=this._rows[t],n=e.querySelectorAll("td");if(!n.length)throw new Error("Keine <td> Elemente im tbody gefunden.");const s=n[o].innerText.trim(),i=parseFloat(s);r.push([s,isNaN(i)?s.toUpperCase():i,e.cloneNode(!0)])}r.sort((function(t,o){const r=t[1],n=o[1];if("number"==typeof r&&"number"==typeof n)return e?r-n:n-r;{const t=isNaN(r)?r.toUpperCase():r,o=isNaN(n)?n.toUpperCase():n;return t<o?e?-1:1:t>o?e?1:-1:0}}));for(let t=0;t<this._rows.length;t++){const e=this._rows[t];e.parentNode.replaceChild(r[t][2],e)}const n=["Absteigend","Aufsteigend"];this._updateLiveRegion(n[e],t.textContent),this.dispatchEvent(new CustomEvent("wm-table-sorted",{bubbles:!0,composed:!0,detail:{direction:n[e],column:t.textContent}}))}_updateLiveRegion(t,e){this._output.textContent=`${t} nach ${e} sortiert`}_setColumnAlignment(){for(let t=1;t<11;t++)this.style.removeProperty(`--_col-${t}-alignment`);const t=this.alignment.replaceAll(" ","").split(",");if(1===t.length)for(let e=1;e<this._ths.length;e++)t.push(t[0]);t.forEach(((t,e)=>{this.style.setProperty(`--_col-${e+1}-alignment`,t)}))}_setColumnSizes(){const t=this.cols.replaceAll(" ","").split(",");if(!t.length)return;this._colgroup&&this._colgroup.remove();let e=0;t.forEach((t=>{t.match(/^\d+$/)&&(e+=parseInt(t))}));const o=100/e;if(1===t.length)for(let e=1;e<this._ths.length;e++)t.push(t[0]);let r=document.createElement("colgroup");t.forEach((t=>{let e=t;t.match(/^\d+$/)&&(e=t*o+"%");const n=document.createElement("col");n.setAttribute("width",e),r.appendChild(n)})),this._table.prepend(r)}render(){return o`
			<div role="region" tabindex="0" aria-label="${this.label}">
				<slot></slot>
			</div>
		`}}customElements.define("wm-table",n);const s="wm-table";export{n as Table,s as tagName};
