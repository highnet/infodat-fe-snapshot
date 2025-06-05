/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as t,s as e}from"../../lit-element-8d7b5fe2.js";import{x as o}from"../../lit-html-34d0b6a8.js";import{n}from"../../when-741bb8d9.js";import{o as r}from"../../unsafe-html-4e49b66a.js";import"../../directive-16e189ed.js";const s=[t`
  * {
    box-sizing: border-box;
  }

  :host {
    display: block;
    align-self: start;
    text-align: left;
  }

  [hidden] {
    display: none !important;
  }
`];class i extends e{static styles=[s];static get properties(){return{label:{type:String},footnoteLabel:{type:String},referenceLabel:{type:String}}}constructor(){super(),this.footnotes=[],this.label="Fußnoten",this.referenceLabel="Zur Fußnote springen",this.footnoteLabel="Zurück zu Referenz der Fußnote springen"}connectedCallback(){super.connectedCallback(),this.collectFootnotes()}collectFootnotes(){const t=document.querySelectorAll(".wm-parse-footnote[title]");this.footnotes=Array.from(t).map(((t,e)=>this.processFootnote(t,e)))}processFootnote(t,e){const o=this.generateId(e),n=this.getContent(t);return this.updateFootnoteElement(t,o),{id:o,content:n}}generateId(t){return t+1}getContent(t){const e=t.getAttribute("title");return t.removeAttribute("title"),r(e)}updateFootnoteElement(t,e){t.classList.remove("wm-parse-footnote");const o=this.createLink(e);t.appendChild(o)}createLink(t){const e=document.createElement("a");return e.classList.add("wm-footnote"),e.setAttribute("href",`#gotofootnote-${t}`),e.setAttribute("id",`backtoreference-${t}`),e.setAttribute("aria-label",`${this.referenceLabel} ${t}`),e.innerHTML=t,e}createRenderRoot(){return this}render(){return o`
      ${n(this.footnotes.length>0,(()=>o`
          <div aria-labelledby="footnote-heading">
            <h2 slot="label" id="footnote-heading">${this.label}</h2>
            <div slot="content">
              <ol>
                ${this.footnotes.map((t=>o`
                    <li id="gotofootnote-${t.id}">
                      ${t.content}
                      <a href="#backtoreference-${t.id}" aria-label="${this.footnoteLabel} ${t.id}" class="back-to-footnote">↩</a>
                    </li>
                  `))}
              </ol>
            </div>
          </div>
        `),(()=>o``))}
    `}}customElements.define("wm-footnote",i);const l="wm-footnote";export{i as Footnote,l as tagName};
