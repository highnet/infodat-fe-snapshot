/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as e,s as t}from"../../lit-element-8d7b5fe2.js";import{x as i}from"../../lit-html-34d0b6a8.js";import{n as s}from"../../when-741bb8d9.js";import{e as n}from"../../class-map-b15037ef.js";import{o}from"../../if-defined-d257cee1.js";import"../../directive-16e189ed.js";const a=[e`
  * {
    box-sizing: border-box;
  }

  /* Default styles for smaller screens (mobile-first approach) */
  :host {
    /* Define smaller font size for smaller screens */
    font-size: 15px; /* Adjust as needed */

    /* Default icon size for smaller screens */
    --icon-size: 16px; /* Adjust as needed */
  }

  /* Adjust styles for larger screens */
  @media (min-width: 64rem) {
    /* Increase font size for larger screens */
    :host {
      font-size: 16px; /* Adjust as needed */
    }

    /* Increase icon size for larger screens */
    .icon {
      font-size: 24px; /* Adjust as needed */
    }
  }

  :host {
    /* see header section in /styles/whitelabel/page.css for details */
    --_dialog-offset: 0;

    display: block;
    /* Nav should fill the header */
    height: 100%;
  }

  :host([microsite]) {
    --_dialog-offset: var(--dialog-offset, var(--wm-theme-header-height-dynamic));
    /* --_dialog-offset: 10rem; */
  }

  nav {
    /* inherit height from header */
    height: inherit;
  }

  dialog {
    background-color: transparent;
    border: 0;
    height: 100dvh;
    max-height: 100dvh;
    width: 100vw;
    max-width: 100vw;
    margin-block: 0;
    margin: 0 0 0 auto;
    overflow: hidden;
    padding: 0;
    scrollbar-gutter: stable;
  }

  @supports not selector(::backdrop) {
    dialog {
      display: none !important;
    }
  }

  /* TODO: not scrolled needs top, scrolled needs top!  */
  ::backdrop {
    background: rgb(0 0 0 / 0.5);
  }

  /* Backdrop doesn't inherit anything, that's why we have to apply this ugly hack
  3.5 equals the header height
    The star before is::backdrop is mandatory because of a potential bug Firefox
  */
  :host([microsite]) *::backdrop {
    --_top: 3.5rem;
  }

  @media (min-width: 64rem) {
    :host([microsite]) *::backdrop {
      --_top: 6.25rem;
    }
  }

  /* Content within the dialog is wrapped */
  .wrapper {
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    max-width: var(--navmain-wrapperwidth);
    /* overflow: hidden; */
  }

  .wrapper--hidden {
    transform: translateX(100vw);
  }

  /* The transition is applied conditionally to avoid quirky behavior */
  .transition {
    transition: transform 0.25s ease-out;
  }

  /* Content within the dialog */
  .content {
    --_spacing-inline-end: 0;
    --_content-background: var(--wm-color-weiss); /* TODO: verschieben */

    background-color: var(--_content-background);
    flex-direction: column;
    height: 100%;
    margin-left: auto;
    margin-right: var(--_spacing-inline-end);
    max-width: 26rem;
    width: 100%;
    overflow: auto;
  }

  /* The header is fixed and .lists is scrollable. The media query ensure that it's only at certain viewport
  min height to avoid the header from taking up to much space in zoomed in UIs */
  @media(min-height: 35em) {
    .content {
      display: flex;
      overflow: visible;
    }
  }

  :host([microsite]) .content {
    --_content-background: var(--header-nav-level1-background-color);
  }

  /* Header within the dialog (contains close button and optionally user name) */
  .header {
    --_padding-inline: var(--wm-theme-site-wrapper-padding);
    --_header-height: var(--wm-theme-header-height-dynamic);
    min-height: var(--_header-height);
    position: relative;
    z-index: 1;
  }

  :host([microsite]) .header {
    --_header-height: var(--wm-theme-header-nav-height);
  }

  @media (min-width: 64rem) {
    .header {
      --_padding-inline: calc(var(--wm-theme-site-wrapper-padding) / 2);
    }
  }

  /* Wrapper for links */
  .lists {
    height: inherit;
  }

  /* The header is fixed and .lists is scrollable. The media query ensure that it's only at certain viewport
  min height to avoid the header from taking up to much space in zoomed in UIs */
  @media(min-height: 35em) {
    .lists {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
  }

  .lists > * + *,
  ::slotted(*) {
    border-top: 1px solid var(--wm-color-fastschwarz);
    margin-top: var(--wm-spacing-m) !important;
    padding-top: var(--wm-spacing-s);
  }

  ::slotted(*) {
    padding-top: var(--wm-spacing-l);
  }

  ::slotted(:last-child) {
    /* margin: auto 0 !important;  */
    padding-bottom: var(--wm-spacing-m) !important;
  }

  ul {
    font-variation-settings: "wght" 700;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    position: relative;
    height: inherit;
  }

  ul ul {
    --_sublist-indent: 0.7rem;
    margin-left: var(--_sublist-indent);
  }

  ul ul ul {
    font-variation-settings: "wght" 400;
  }

  @media (min-width: 64rem) {
    :host([microsite]) ul ul {
      --_sublist-indent: 0;
    }
  }

  /* Toggle buttons */
  .lists button {
    all: initial;
    font: inherit;
  }

  /* General styling for links and buttons */
  .lists :is(a, button) {
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
    font-weight: var(--navmain-font-weight);
    padding: 0;
    display: flex;
    justify-content: space-between;
    height: inherit;
    width: 100%;
  }

  .lists :is(a, button):is(:link, :visited) {
    color: inherit;
    text-decoration: none;
  }

  .lists :is(a, button):focus-visible {
    outline: 3px solid currentColor;
  }

  /* Show list when button expanded */
  [aria-expanded="true"] + ul {
    display: block;
  }

  /* Show list when button expanded */
  wm-icon {
    transition: transform 0.3s ease;
  }

  wm-icon.collapsed {
    transform: rotate(0deg);
  }

  wm-icon.expanded {
    transform: rotate(180deg);
  }

  /**
 * Variation when links are not hidden “behind a burger”
 */

  /* Nav takes up the whole space */
  :host([_listsVisible]) {
    flex-grow: 1;
  }

  /* inherit height from header */
  :host([_listsVisible]) ul {
    height: inherit;
  }

  :host([_listsVisible]) ul ul,
  li li {
    height: auto;
    text-indent: 0;
  }

  :host([listsVisible]) [aria-expanded="true"] + ul {
    position: absolute;
    background: var(--header-nav-level2-background-color);
    top: 100%;
    left: 0;
    width: max-content;
  }

  :host([_listsVisible]) [aria-expanded="true"] + ul {
    position: absolute;
    background: var(--header-nav-level3-background-color);
    top: 100%;
    left: 0;
    width: max-content;
  }

  :host([_listsVisible]) [aria-expanded="true"] + ul ul {
    position: static;
    display: block !important;
    max-height: 100%;
    margin-left: 1rem;
  }

  :host([_listsVisible]) .lists li li :is(a, button) {
    padding-block: 0.3125rem 0.3875rem;
    color: var(--header-nav-flyout-link-color--desktop);
  }

  :host([_listsVisible]) .lists li li :is(a, button):is(:hover, :focus-visible, .active, [aria-current="page"]) span {
    color: var(--header-nav-flyout-link-color--desktop);
    box-shadow: 0 3px 0 0 var(--header-nav-flyout-link-color--desktop);
  }

  :host([_listsVisible]) .lists li li li :is(a, button) {
    padding-block: 0.15rem 0.3875rem;
  }

  :host([listsVisible]) .lists li ul {
    padding-block: 0.5rem;
    max-height: calc(100vh - 100%);
    border-image: conic-gradient(var(--header-nav-flyout-background-color--desktop) 0 0)
      fill 1 //0 100vw;;
  }

  /* Menu desktop ebene unterhalb header */
  :host([_listsVisible]) .lists li ul {
    padding-block: 0.5rem;
    max-height: calc(100vh - 100%);
    border-image: conic-gradient( var(--header-nav-flyout-background-color--desktop) 0 0) fill 1//0 100vw;
    min-width: 100%;
  }

  :host .level-1 {
    border-image: conic-gradient(var(--header-nav-level2-background-color) 0 0)
    fill 1 //0 100vw;;
  }

  :host .level-2 {
    border-image: conic-gradient(var(--header-nav-level3-background-color) 0 0)
    fill 1 //0 100vw;;
  }

  :host([_listsVisible]) wm-icon {
    display: none;
  }

  :host([_listsVisible]) ul:not([hidden]) {
    display: flex;
    gap: clamp(1rem, 5%, var(--navmain-gap));
  }

  @supports not selector(::backdrop) {
    :host([_listsVisible]) ul:not([hidden]) {
      overflow: auto;
    }

    :host([_listsVisible]) ul:not([hidden]) > li {
      flex-shrink: 0;
    }
  }

  /**
   * Variation when links are hidden "behind a burger"
  */

  .burger {
    height: 100%;
    display: flex;
    align-items: center;
  }

  :host(:not([_listsVisible])) [aria-expanded="true"] {
    font-variation-settings: "wght" 700;
    border-image: conic-gradient( var(--header-nav-level2-background-color) 0 0) fill 1//0 50vw !important;
  }

  :host(:not([_listsVisible])) ul ul [aria-expanded="true"] {
    border-image: conic-gradient( var(--header-nav-level3-background-color) 0 0) fill 1//0 50vw !important;
    color: var(--wm-theme-site-color);
  }

  /* Underline links */
  :is(a, button):is(:hover, :focus-visible, .active, [aria-current="page"]) span,
  :host([_listsVisible]) [aria-expanded="true"] span,
  :host(:not([_listsVisible])) ul ul [aria-expanded="true"] span {
    /*box-shadow: 0 4px 0 0 var(--header-nav-flyout-background-color--desktop);*/
    color: var(--header-nav-link-color);
    box-shadow: 0 3px 0 0 var(--header-nav-link-color);
  }

  /* Adapt link and button styling */
  :host(:not([_listsVisible])) .lists :is(a, button):not([level-2]) {
    text-transform: uppercase;
  }

  :host(:not([_listsVisible])) .lists :is(a, button) {
    --_button-padding-block-start: 0.8125rem;
    --_button-padding-block-end: 0.6875rem;
    --_button-padding-inline: 0;
    padding: var(--_button-padding-block-start) var(--_button-padding-inline) var(--_button-padding-block-end);
  }

  :host([microsite]:not([_listsVisible])) .lists :is(a, button) {
    --_button-padding-inline: 1.5625rem;
  }

  :host(:not([_listsVisible])) .lists :is(a, button):focus-visible {
    outline-offset: -3px;
  }

  :host(:not([_listsVisible])) .lists {
    overflow: auto;
  }

  :host(:not([microsite])) .lists {
    padding: var(--wm-spacing-s) var(--wm-spacing-l);
  }

  ::slotted(ul),
  ::slotted(ol) {
    display: none !important;
  }

  .link-inner {
    align-items: center;
    display: flex;
    gap: var(--wm-spacing-xs);
  }

  ::slotted(.fallback) {
    display: none !important;
  }

  /* Close button */
  /* styling anpassen mit paddings in einer flucht mit anderen buttons/menüaufklappen */
  dialog[open] wm-button {
    --_button-padding-inline: 1.5625rem;
    --_button-padding-block-start: 0.8125rem;
    position: absolute;
    top: 0;
    right: 0;
    padding: var(--_button-padding-block-start) var(--_button-padding-inline);
    padding: var(--_button-padding-block-start) 1.5625rem var(--_button-padding-block-start) var(--_button-padding-block-start);
  }

  ::slotted([slot="precontent"]) {
    --_header-height: var(--wm-theme-header-height-dynamic);
    min-height: var(--_header-height);
    width: 100%;
    border-top: none;
    text-align: left;
    padding: var(--wm-spacing-xl) var(--wm-spacing-l) var(--wm-spacing-s) !important;
    margin: 0 !important;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.15);
  }

  ::slotted([slot="postcontent"]) {
    padding: 1rem calc(1.5625rem + 2rem) 1rem 1.5625rem !important;
  }

  .wm-h-vh,
  .wm-h-vh-m {
    position: absolute;
    white-space: nowrap;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    margin: -1px;
  }
  
  @media(min-width: 64em) {
    .wm-h-vh-m {
      position: static;
      width: auto;
      height: auto;
      overflow: auto;
      clip-path: none;
      margin: auto;
    }
  }
`];class l extends t{get _dialog(){return this.renderRoot?.querySelector("dialog")??null}get _content(){return this.renderRoot?.querySelector(".wrapper")??null}static properties={label:{type:String},labelOpen:{type:String},labelOpenIcon:{type:String},labelClose:{type:String},isopen:{type:Boolean,reflect:!0},microsite:{type:Boolean,reflect:!0},type:{type:String,reflect:!0},_listsVisible:{type:Boolean,reflect:!0},hideLabel:{type:Boolean},_items:{type:Array},_openItem:{type:Number,attribute:!1},_lastFocusedElement:{type:Node,attribute:!1},_level:{type:Number,attribute:!1}};static styles=[a];constructor(){super(),this.label="Haupt",this.labelOpen="Menü",this.labelOpenIcon="burger",this.labelClose="Schließen",this.hideLabel=!1,this._items=[],this.isopen=!1,this.microsite=!1,this.type="visible",this._listsVisible=!1,this._openItem=void 0,this._lastFocusedElement=void 0,this._level=!1,this._nativeCloseEvent=this._nativeClose.bind(this),this._closeOnTransitionEndEvent=this._closeOnTransitionEnd.bind(this),this.addEventListener("mouseleave",(()=>{this._listsVisible&&this._closeSub(0,this._openItem)}))}connectedCallback(){super.connectedCallback(),this._getLayout(),this._addGlovalEvents()}updated(e){e.has("isopen")&&(this.isopen?this.open():this.close()),e.has("type")&&(window.HTMLDialogElement||(this.type="visible",this._listsVisible=!0))}_addGlovalEvents(){this.addEventListener("keydown",(e=>{"Escape"===e.code&&(e.preventDefault(),void 0!==this._openItem&&this._closeSub(0,this._openItem),this.isopen=!1,this._moveFocus())}))}_moveFocus(){this._lastFocusedElement&&(this._lastFocusedElement.focus(),this._lastFocusedElement=void 0)}_handleClickOutside(e){e.target.classList.contains("wrapper")&&(this.isopen=!1)}_addEvents(){setTimeout((()=>{this._dialog&&(this._dialog.addEventListener("close",this._nativeCloseEvent),this._content.addEventListener("transitionend",this._closeOnTransitionEndEvent))}),0)}_closeOnTransitionEnd(e){e.target.classList.contains("wrapper--hidden")&&(this._dialog.close(),this._content.classList.remove("wrapper--hidden"))}_nativeClose(e){e.target.classList.contains("wrapper--hidden")||this._content.classList.remove("transition")}_getLayout(){"visible"===this.type&&(this._listsVisible=!0);const e=window.matchMedia("(min-width: 64em)"),t=e=>{"hiddenmobile"===this.type&&(this._listsVisible=e.matches),this._listsVisible?"hiddenmobile"===this.type&&this.isopen&&(this.isopen=!1):this._addEvents()};e.addEventListener("change",t),t(e)}open(){this._content&&(this._content.classList.remove("wrapper--hidden"),this._dialog.showModal(),this._content.classList.add("wrapper--hidden"),setTimeout((()=>{this._content.classList.add("transition"),this._content.classList.remove("wrapper--hidden")}),0))}close(){this._content&&this._content.classList.add("wrapper--hidden")}_getContents(e){const t=[],i=e.target.assignedElements();function s(e){for(var t=[];e.parentNode&&"wm-nav-main"!=e.parentNode.nodeName.toLowerCase();)"UL"!==(e=e.parentNode).nodeName&&"OL"!==e.nodeName||t.push(e);return t.length-1}const n=(e,t)=>{const i=t.querySelectorAll(":scope > li");for(let t=0;t<i.length;t++){const o=i[t],a=o.querySelector("a"),l=o.querySelector("wm-icon"),r={list:!0,text:a.textContent,href:a.getAttribute("href"),target:a.getAttribute("target"),active:a.hasAttribute("aria-current"),children:[],level:s(o),collapsed:!0};l&&(r.icon=l.getAttribute("iconid"));const d=o.querySelectorAll("ul, ol")[0];if(d){const e=[];n(e,d),r.children=e}e.push(r)}};for(let e=0;e<i.length;e++){let s=[];const o=i[e];"UL"!==o.nodeName&&"OL"!==o.nodeName||(n(s,o),t.push(s))}this._items=t}_openCloseSub(e,t,i,s){this._lastFocusedElement=s.target,void 0!==this._openItem&&this._openItem!==t&&this._closeSub(i,this._openItem),null!==e?(this._items[i][t].children[e].collapsed=!this._items[i][t].children[e].collapsed,this.requestUpdate()):this._items[i][t]&&(this._openItem=t,this._items[i][t].collapsed=!this._items[i][t].collapsed,this.requestUpdate(),"visible"===this.type&&(this.isopen=!this._items[i][t].collapsed))}_openSub(e,t,i){void 0!==this._openItem&&this._closeSub(i,this._openItem),this._openItem=t,this._items[i][t].collapsed=!1,null!==e&&(this._items[i][t].children[e].collapsed=!1),this.requestUpdate()}_closeSub(e,t){void 0!==this._openItem&&(this._items[e][t].collapsed=!0,this.requestUpdate(),this._openItem=void 0)}_openCloseNav(){this.isopen=!this.isopen}_handleKeyDown(e,t){if("Tab"===t.key){const i=t.target.parentNode.parentNode;(!t.shiftKey&&t.target===i.lastElementChild.querySelector("a")||t.shiftKey&&t.target===i.firstElementChild.querySelector("a"))&&i.classList.contains("level-1")&&this._closeSub(e,this._openItem)}}_handleButtonMouseOver(e,t,i,s){this._listsVisible&&this._openSub(t,e,i,s)}_handleLinkMouseOver(e){this._listsVisible&&this._closeSub(e,this._openItem)}_burgerTemplate(){return i`
			<wm-button kind="clean" @click="${this._openCloseNav}" class="burger">
				<button aria-expanded="${this.isopen}">
					${this.hideLabel?i`<span class="wm-h-vh">${this.labelOpen}</span>`:i`<p class="wm-h-vh-m">${this.labelOpen}</p>`}
					<wm-icon iconid="${this.labelOpenIcon}"></wm-icon>
				</button>
			</wm-button>
		`}_renderLinkOrButton(e,t,a,l){return i`
			${s(!e.children.length||!window.HTMLDialogElement,(()=>i`
					${s(0===e.level,(()=>i`
							<a
								href="${e.href}"
								target="${e.target}"
								@mouseover="${this._handleLinkMouseOver.bind(this,a)}"
								aria-current="${o(e.href===window.location.pathname||e.active?"page":void 0)}"
							>
								<span class="link-inner">
									${s(e.icon,(()=>i`<wm-icon width="24" height="24" iconid="${e.icon}"></wm-icon>`))}
									${e.text}
								</span>
							</a>
						`),(()=>i`
							<a
								href="${e.href}"
								target="${e.target}"
								@keydown="${this._handleKeyDown.bind(this,a)}"
								aria-current="${o(e.href===window.location.pathname||e.active?"page":void 0)}"
							>
								<span> ${e.text} </span>
							</a>
						`))}
				`),(()=>i`
					${s(0===e.level,(()=>i`
							<button
								class="${n({active:-1!==window.location.pathname.indexOf(e.href)||e.active})}"
								aria-expanded="${!e.collapsed}"
								@click="${this._openCloseSub.bind(this,null,t,a)}"
								@mouseover="${this._handleButtonMouseOver.bind(this,t,null,a)}"
							>
								<span class="link-inner">
									${s(e.icon,(()=>i`<wm-icon width="24" height="24" iconid="${e.icon}"></wm-icon>`))}
									${e.text}
								</span>

								<wm-icon
									class="${e.collapsed?"collapsed":"expanded"}"
									iconid="chevron-down"
								></wm-icon>
							</button>
						`),(()=>i`
							<button
								aria-expanded="${!e.collapsed}"
								@click="${this._openCloseSub.bind(this,t,l,a)}"
							>
								<span>${e.text}</span>
								<wm-icon
									class="${e.collapsed?"collapsed":"expanded"}"
									iconid="chevron-down"
								></wm-icon>
							</button>
						`))}
				`))}
		`}_renderList(e,t,n=!1,o,a){return this._level++,i`
			<ul class="level-${t}" part="level${t}" ?hidden="${n}">
				${e.map(((e,t)=>i`
						<li>
							${this._renderLinkOrButton(e,t,o,a)}
							${s(e.children.length,(()=>i`
									${this._renderList(e.children,e.level+1,!0,o,t)}
								`))}
						</li>
					`))}
			</ul>
		`}_listsTemplate(){return i`
			<div class="lists">
				${this._items.map(((e,t)=>i`${this._renderList(e,0,!1,t,0)}`))}

				<slot @slotchange="${this._getContents}"></slot>
			</div>
		`}render(){return i`
			<nav aria-label="${this.label}">
				${this._listsVisible?"":this._burgerTemplate()}
				${this._listsVisible?i` ${this._listsTemplate()} `:i`
							<dialog @click="${this._handleClickOutside}">
								<div class="wrapper">
									<div class="content">
										<div class="header">
											<wm-button kind="clean" @click="${this._openCloseNav}">
												<button>
													<span class="wm-h-vh">${this.labelClose}</span>
													<wm-icon iconid="close"></wm-icon>
												</button>
											</wm-button>
											<!-- Custom content slot for additional header content -->
											<slot name="precontent"></slot>
										</div>
										${this._listsTemplate()}
										<!-- Custom content slot for additional footer content -->
										<slot name="postcontent"></slot>
									</div>
								</div>
							</dialog>
					  `}
			</nav>
		`}}customElements.define("wm-nav-main",l);export{l as NavMain};
