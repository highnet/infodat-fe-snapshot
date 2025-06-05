/* @copyright Stadt Wien - Wiener Melange 200 */
import { i, s } from '../../lit-element-8bc32369.js';
import { x } from '../../lit-html-0378a13e.js';
import { n } from '../../when-55b3d1d8.js';
import { o } from '../../unsafe-html-2bcd6aa9.js';
import '../../directive-4c65af6a.js';

const styles = [i`
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
`];

/**
 * Ein benutzerdefiniertes Webkomponente für die Verwaltung von Fußnoten in einem Dokument. Es werden verweise auf Fußnoten im Text gesucht und in einer Liste am Ende des Dokuments aufgeführt.
 * Eine Referenz im Text wird durch eine Zahl markiert, die auf die entsprechende Fußnote verweist.
 * Fußnoten sind numerierte Verweise am Ende einer Seite, die zusätzliche Informationen oder Erklärungen zu bestimmten Textpassagen bieten.
 * Bei Klick auf eine Fußnote wird der Benutzer zur entsprechenden Referenz im Text zurückgeführt.
 */

class Footnote extends s {
  static styles = [styles];

  static get properties() {
    return {
      label: { type: String },
      footnoteLabel: { type: String },
      referenceLabel: { type: String }
    };
  }

  constructor() {
    super();
    this.footnotes = [];
    // Default labels
    this.label = "Fußnoten";
    this.referenceLabel = "Zur Fußnote springen";
    this.footnoteLabel = "Zurück zu Referenz der Fußnote springen";
  }

  connectedCallback() {
    super.connectedCallback();
    this.collectFootnotes();
  }

  collectFootnotes() {
    const footnotes = document.querySelectorAll(".wm-parse-footnote[title]");
    this.footnotes = Array.from(footnotes).map((footnote, index) => this.processFootnote(footnote, index));
  }

  processFootnote(footnote, index) {
    const id = this.generateId(index);
    const content = this.getContent(footnote);
    this.updateFootnoteElement(footnote, id);
    return { id, content };
  }

  generateId(index) {
    return index + 1;
  }

  getContent(footnote) {
    const titleContent = footnote.getAttribute("title");
    footnote.removeAttribute("title");
    return o(titleContent);
  }

  updateFootnoteElement(footnote, id) {
    footnote.classList.remove("wm-parse-footnote");
    const link = this.createLink(id);
    footnote.appendChild(link);
  }

  createLink(id) {
    const link = document.createElement("a");
    link.classList.add("wm-footnote");
    link.setAttribute("href", `#gotofootnote-${id}`);
    link.setAttribute("id", `backtoreference-${id}`);
    link.setAttribute("aria-label", `${this.referenceLabel} ${id}`);
    link.innerHTML = id;
    return link;
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return x`
      ${n(
        this.footnotes.length > 0,
        () => x`
          <div aria-labelledby="footnote-heading">
            <h2 slot="label" id="footnote-heading">${this.label}</h2>
            <div slot="content">
              <ol>
                ${this.footnotes.map(
                  (footnote) => x`
                    <li id="gotofootnote-${footnote.id}">
                      ${footnote.content}
                      <a href="#backtoreference-${footnote.id}" aria-label="${this.footnoteLabel} ${footnote.id}" class="back-to-footnote">↩</a>
                    </li>
                  `
                )}
              </ol>
            </div>
          </div>
        `,
        () => x``
      )}
    `;
  }
}

customElements.define("wm-footnote", Footnote);

const tagName = "wm-footnote";

export { Footnote, tagName };
