/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as t}from"../../lit-element-8d7b5fe2.js";import{x as e}from"../../lit-html-34d0b6a8.js";import{randomHash as a}from"../misc/utils.js";import{n}from"../../when-741bb8d9.js";import{Section as o}from"../Section/Section.js";import"../../unsafe-html-4e49b66a.js";import"../../directive-16e189ed.js";const r=[t`
  * {
    box-sizing: border-box;
  }

  @media (min-width: 64em) {
    :host([nav]) {
      align-items: start;
      position: relative;
      display: flex;
      flex-direction: row-reverse;
      gap: var(--navpage-gap);
      justify-content: space-between;
    }
  }

  :host > div {
    min-width: 0;
  }

  nav {
    --_nav-pos: fixed;
    --_nav-width: 100vw;
    --_shadow-color: var(--wm-color-nebelgrau);
    --_shadow-size: 100px;

    --_nav-inset: var(--navpage-inset);
    --_nav-height: calc(100vh - var(--wm-theme-header-height-total));
    --_nav-background: var(--navpage-background-color--mobil);
    --_nav-link: var(--navpage-active-link-background-color--mobil);
    --_nav-font-color: var(--navpage-link-color--mobil);
    --_nav-font-color--active: var(--navpage-active-link-color--mobil);
    --_nav-font-size: var(--navpage-link-size--mobil);
    --_nav-transform: var(--navpage-transform--default);
    --_nav-link-padding: var(--navpage-link-padding--mobil);

    background: var(--_nav-background);
    box-shadow: var(--navpage-shadow);
    height: var(--_nav-height);
    inset: var(--_nav-inset);
    max-width: var(--_nav-width);
    position: var(--_nav-pos);
    transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
    transform: translateY(var(--_nav-transform));
    width: 100%;
    z-index: 1220;
  }

  :host([nav="toggle"]) nav {
    --_nav-transform: var(--navpage-transform--scroll);
  }

  :host([nav="toggle"]) .nav-hidden {
    opacity: 0;
    visibility: hidden;
  }

  :host([nav="scroll"]) {
    container-type: normal;
    --wm-theme-header-nav-sec-height: 3.4rem;
  }

  :host([nav="scroll"]) nav {
    --_nav-height: var(--wm-theme-header-nav-sec-height);
  }

  :host([nav="scroll"]) ul {
    display: flex;
    margin: 0;
    max-height: 70vh;
    overflow: auto;
    background:
      linear-gradient(to right, var(--_nav-background) 100%, var(--_nav-background) 100%, transparent 100%),
      linear-gradient(to left, var(--_nav-background) 0%, var(--_nav-background) 100%, transparent 100%) 100% 0,
      linear-gradient(to right, var(--_shadow-color), transparent 20%) 0 0,
      linear-gradient(to left, var(--_shadow-color), transparent 20%) 100% 0;
    background-repeat: no-repeat;
    background-size: var(--_shadow-size) 100%;
    background-attachment: local, local, scroll, scroll;
  }

  :host([nav="scroll"]) li {
    flex-shrink: 0;
  }

  @media(min-width: 64em) {
    nav,
    :host([nav]) nav {
      --_shadow-size: 80px;
      --wm-theme-header-nav-sec-height: auto;
      --_nav-pos: sticky;
      --_nav-height: auto;
      --_nav-width: 20.5rem;
      --_nav-inset: var(--navpage-inset--desktop);
      --_nav-background: var(--navpage-background-color--desktop);
      --_nav-link: var(--navpage-active-link-background-color--desktop);
      --_nav-font-color: var(--navpage-link-color--desktop);
      --_nav-font-color--active: var(--navpage-active-link-color--desktop);
      --_nav-font-size: var(--navpage-link-size--desktop);
      --_nav-link-padding: var(--navpage-link-padding--desktop);
      transform: none;
    }

    :host([nav="toggle"]) .nav-hidden {
      opacity: 1;
      visibility: visible;
    }

    :host([nav="scroll"]) ul {
      display: block;
      padding: 1rem 0;
      background:
        linear-gradient(var(--_nav-background) 0%, var(--_nav-background) 20%, transparent 100%),
        linear-gradient(transparent 0%, var(--_nav-background) 20%, var(--_nav-background) 100%) 0 100%,
        linear-gradient(var(--_shadow-color), transparent 30%) 0 0,
        linear-gradient(transparent 70%, var(--_shadow-color)) 0 100%;
      background-repeat: no-repeat;
      background-size: 100% var(--_shadow-size);
      background-attachment: local, local, scroll, scroll;
    }
  }

  nav ul {
    list-style: none;
    margin: 1.4rem 0;
    padding: 0;
  }

  nav a {
    color: var(--_nav-font-color);
    font-size: var(--_nav-font-size);
    display: block;
    padding: var(--_nav-link-padding);
    text-decoration: none;
    transition: background-color 100ms;
  }

  nav a[aria-current],
  nav a:hover {
    background-color: var(--_nav-link);
    color:  var(--_nav-font-color--active);
  }

  nav a:focus-visible {
    outline-offset: calc(var(--wm-theme-site-focus-outline-width) * -1);
    outline: var(--wm-theme-site-focus-outline);
  }
`];class i extends o{static properties={_links:{type:Array,attribute:!1},nav:{type:String,reflect:!0},togglebuttonlabel:{type:String,reflect:!0},_activeAnchor:{type:String,state:!0},_observer:{state:!0},_activeId:{state:!0}};static styles=[r];get _headings(){return this.querySelectorAll(':is(h2[id], h3[id], [data-heading], wm-anchor[id]):not([data-heading="false"])')??null}get _nav(){return this.shadowRoot.querySelector("nav")??null}get _toggleButton(){return document.querySelector(".wm-section-toggle button")??null}constructor(){super(),this.nav="scroll",this.togglebuttonlabel="Thema wählen",this._links=[],this._options={offset:0},this._activeAnchor="",this._observer=null,this._updateTimer=null}updated(t){t.has("nav")&&this._addControls(),t.has("nav")&&document.documentElement.classList.add(`wm-has-nav-${this.nav}`)}connectedCallback(){super.connectedCallback(),this._getItems(),this._setupIntersectionObserver(),this._addGlobalEvents()}disconnectedCallback(){super.disconnectedCallback(),this._observer&&this._observer.disconnect()}_getOffsetFromTopEdge(){setTimeout((()=>{this._options.offset=16*(parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--wm-theme-header-height"))+parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--wm-theme-header-nav-height"))+parseFloat(getComputedStyle(this).getPropertyValue("--wm-theme-header-nav-sec-height"))+2)}),0)}_addControls(){if("toggle"===this.nav){const t=document.querySelector("wm-header"),e=this.shadowRoot.querySelector("#toggle-button").content.cloneNode(!0).children[0],a=e.querySelector("button");a.innerHTML=`${this.togglebuttonlabel} <wm-icon iconid="chevron-down"></wm-icon>`,e.addEventListener("click",(()=>{this._nav.classList.toggle("nav-hidden"),document.documentElement.classList.toggle("wm-is-locked");const t="true"===a.getAttribute("aria-expanded");a.setAttribute("aria-expanded",!t),t||setTimeout((()=>{this.shadowRoot.querySelectorAll("a")[0].focus()}),100)})),t.addAction(e)}}_addGlobalEvents(){this._getOffsetFromTopEdge();window.matchMedia("(min-width: 64em)").addListener((t=>{t.matches&&(this._removeLock(),this._nav&&this._nav.classList.remove("nav-hidden"))})),this.addEventListener("keyup",(t=>{"Escape"===t.code&&(this._closeNav(),this._toggleButton.focus())}))}_setupIntersectionObserver(){const t={root:null,rootMargin:`${this._options.offset}px 0px -50% 0px`,threshold:[0,.5,1]};this._observer=new IntersectionObserver((t=>{clearTimeout(this._updateTimer),this._updateTimer=setTimeout((()=>{const e=t.filter((t=>t.isIntersecting)).sort(((t,e)=>t.target.getBoundingClientRect().top-e.target.getBoundingClientRect().top));if(e.length>0){const t=e[0].target.getAttribute("id");this._setActiveAnchor(t,!1)}}),50)}),t),this._headings.forEach((t=>this._observer.observe(t)))}_getItems(){this._headings.forEach((t=>{let e=t.getAttribute("id"),n=t.textContent;e||(e=a(),t.setAttribute("id",e)),t.dataset.heading&&(n=t.dataset.heading),this._links.push({label:n,id:e})}))}_removeLock(){document.documentElement.classList.remove("wm-is-locked")}_closeNav(){this._removeLock(),this._nav&&this._nav.classList.add("nav-hidden"),"toggle"===this.nav&&this._toggleButton.setAttribute("aria-expanded",!1)}_contentChanged(){if(!this._headings.length)throw this.nav=void 0,new Error("Keine <h2> oder <h3> mit id-Attribut gefunden.")}_handleAnchorClick(t){const e=t.currentTarget.getAttribute("href").substring(1);this._activeAnchor=e,this._setActiveAnchor(e),this._closeNav(),setTimeout((()=>{this._activeAnchor=""}),1500)}_setActiveAnchor(t,e=!0){const a=this.shadowRoot.querySelector('[aria-current="true"]');if(a&&a.getAttribute("href")===`#${t}`)return;this.shadowRoot.querySelectorAll("[aria-current]").forEach((t=>t.removeAttribute("aria-current")));const n=this.shadowRoot.querySelector(`[href="#${t}"]`);n&&(n.setAttribute("aria-current","true"),this._activeId=t,e&&"scroll"===this.nav&&requestAnimationFrame((()=>{const t=this.shadowRoot.querySelector('[part="nav"]'),e=n.getBoundingClientRect(),o=t.getBoundingClientRect();(e.top<o.top||e.bottom>o.bottom)&&a&&this._nav.querySelector("ul").scrollTo({top:0,left:n.offsetLeft,behavior:"smooth"})})))}render(){return e`
			${n(void 0!==this.nav,(()=>e`<nav class="nav-hidden" part="nav">
					<ul>
						${this._links.map((t=>e`
								<li>
									<a href="#${t.id}" @click="${this._handleAnchorClick}">
										${t.label}
									</a>
								</li>
							`))}
					</ul>
				</nav>

				<div>
					<slot @slotchange="${this._contentChanged}"></slot>
				</div>`),(()=>e``))}

			<template id="toggle-button">
				<wm-button kind="clean" class="wm-section-toggle">
					<button aria-expanded="false"></button>
				</wm-button>
			</template>
		`}}customElements.define("wm-nav-page",i);const s="wm-nav-page";export{i as NavPage,s as tagName};
