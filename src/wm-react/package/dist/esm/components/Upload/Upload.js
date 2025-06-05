/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as e,s as t}from"../../lit-element-8d7b5fe2.js";import{x as i}from"../../lit-html-34d0b6a8.js";import{e as s}from"../../class-map-b15037ef.js";import{FormWrapper as r}from"../misc/form-wrapper.js";import{dispatchCustomEvent as l}from"../misc/utils.js";import{ErrorStateController as a}from"../misc/error-state-controller.js";import{FormStateManager as o}from"../misc/form-state-manager.js";import{g as n}from"../../wiener-melange.bundle.min-ae18d627.js";import"../../directive-16e189ed.js";import"../../when-741bb8d9.js";import"../misc/slot.js";import"../../unsafe-html-4e49b66a.js";import"../misc/error-tracking.js";const h=[e`
  :host {
    --_border-color: var(--upload-border-color);

    display: block;
    /*text-align: center;*/
    width: 100%;
  }

  :host([multiple]) {
    background-color: var(--upload-background-color);
  }

  :host([multiple]) .upload {
    border: 2px dashed var(--_border-color);
  }
  
  .upload:has(.droparea:hover, [type="file"]:focus),
  .dragging {
    --_border-color: var(--upload-border-color--active);
  }

  :host([multiple]) .droparea {
    cursor: pointer;
    padding: var(--upload-padding);
  }

  :host([multiple]) .files-selected {
    padding: var(--upload-padding);
  }

  :host([multiple]) .files-selected .droparea {
    padding: 0;
  }


  .selected-files {
    background-color: var(--upload-background-color);
    text-align: start;
  }

  .selected-files li {
    white-space: break-word;
  }

  .selected-files li:last-child {
    padding-bottom: 0 !important;
  }

  .selected-files wm-button {
    margin-inline-start: auto;
  }

  :host(:not([multiple])) .selected-files {
    padding: 1rem;
  }

  :host(:not([multiple])) .droparea:hover {
    cursor: pointer;
  }

  :host(:not([multiple])) .files-selected .droparea:hover{
    cursor: not-allowed;
    
  }

  :host(:not([multiple]):focus-within) .btn-upload, 
  :host(:not([multiple])) :not(.files-selected) .droparea:hover .btn-upload {
    --button-background: var(--button-background-hover);
    --_button-color: var(--button-color-hover);

    outline-offset: var(--wm-theme-site-focus-outline-offset);
    outline: var(--wm-theme-site-focus-outline);
  }

  ::slotted(:last-child) {
    margin-bottom: 0;
  }

  .has-error {
    --_border-color: var(--wm-color-ui-error,  var(--wm-base-color-ui-error));

    color: var(--wm-color-ui-error,  var(--wm-base-color-ui-error));
  }
`],d=new CSSStyleSheet;d.replaceSync(n);class u extends(o(r(t))){get _input(){return this.shadowRoot?.querySelector("input")??null}get _droparea(){return this.shadowRoot?.querySelector(".droparea")??null}get _output(){return this.shadowRoot?.querySelector('[role="status"]')??null}get _removeButtons(){return this.shadowRoot?.querySelectorAll(".removeButton")??null}static properties={_files:{type:Array,reactive:!0},_formData:{type:Object},hasError:{type:Boolean,reflect:!0},label:{type:String},labelDelete:{type:String},labelSelection:{type:String},labelDeleted:{type:String},multiple:{type:Boolean},hideSelectedFiles:{type:Boolean},disabled:{type:Boolean,reflect:!0},errormessage:{type:String,attribute:"errormessage"},summaryErrormessage:{type:String,attribute:"summary-errormessage"},validator:{type:Function},validate:{type:Boolean,reflect:!0},showErrors:{type:Boolean,reflect:!0},_hasInteracted:{state:!0}};static styles=[d,h];constructor(){super(),this.label="Datei hochladen",this.labelDelete="Lösche",this.labelDeleted="gelöscht",this.labelSelection="Datei(en) ausgewählt",this._files=new DataTransfer,this._fileList=[],this.multiple=!1,this.hideSelectedFiles=!1,this._formData=new FormData,this.disabled=!1,this.errormessage="",this.summaryErrormessage="",this.hasError=!1,this._hasInteracted=!1,this.validate=!1,this.showErrors=!1,this._errorController=new a(this)}connectedCallback(){super.connectedCallback(),this._setupFileUpload()}_dragOver=e=>{this.disabled||(e.preventDefault(),this._droparea.classList.add("dragging"))};_dragLeave=e=>{this.disabled||(e.preventDefault(),this._droparea.classList.remove("dragging"))};_preventDefault=e=>{e.preventDefault()};_drop=e=>{this.disabled||(e.preventDefault(),this.classList.remove("dragging"),this._addFiles(null,e.dataTransfer.files))};_click=e=>{this.disabled||["label","input","button"].includes(e.composedPath()[0].nodeName.toLowerCase())||this._input.click()};_setupFileUpload(){setTimeout((()=>{this.addEventListener("dragover",this._dragOver,!1),this.addEventListener("dragleave",this._dragLeave,!1),this.addEventListener("drag",this._preventDefault),this.addEventListener("dragstart",this._preventDefault),this.addEventListener("dragenter",this._preventDefault),this.addEventListener("drop",this._drop,!1),this._droparea.addEventListener("click",this._click,!1),this._input.addEventListener("click",this._handleInputClick.bind(this)),this._input.addEventListener("change",this._addFiles.bind(this))}),0)}_handleInputClick(e){!this.multiple&&this._fileList.length>0&&e.preventDefault()}_updateFileList(){this._input.files=this._files.files,this._fileList=[...this._files.files],this.requestUpdate(),this.dispatchEvent(new CustomEvent("wm-files-updated",{detail:this._fileList,bubbles:!0,composed:!0}))}_addFiles(e,t){this.disabled||(Array.prototype.forEach.call(t||this._input.files,(e=>{this._files.items.add(e)})),this._updateFileList(),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("wm-files-added",{detail:this._fileList,bubbles:!0,composed:!0})),this._updateLiveRegion(`${this._fileList.length} ${this.labelSelection}`))}removeFile(e,t){if(!this.disabled){t.preventDefault();const i=this._files.files[e];this._files.items.remove(e),this._unsetFileValues(),this._setFileValues(),this._updateFileList(),this._manageFocusAfterDeletion(e),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("wm-files-removed",{detail:{remaining:this._fileList,removed:i},bubbles:!0,composed:!0})),this._updateLiveRegion(`${i.name} ${this.labelDeleted} (Noch ${this._fileList.length} ${this.labelSelection})`)}}_manageFocusAfterDeletion(e){setTimeout((()=>{let t=e;this._removeButtons.length?(this._removeButtons[t]||(t=e-1),this._removeButtons[t].focus()):this._input.focus()}),0)}_returnFileSize(e){return e<1024?`${e} bytes`:e>=1024&&e<1048576?`${(e/1024).toFixed(1)} KB`:e>=1048576?`${(e/1048576).toFixed(1)} MB`:void 0}_isImage(e){return["image/apng","image/bmp","image/gif","image/jpeg","image/pjpeg","image/png","image/svg+xml","image/tiff","image/webp","image/x-icon"].includes(e.type)}_updateLiveRegion(e){this._output.textContent=e,setTimeout((()=>{this._output.textContent=""}),5e3)}_changed(){setTimeout((()=>{this._setFileValues(),this.dispatchEvent(new CustomEvent("change",{detail:this._files.files})),this._defineErrorMessages(),this._internals.setValidity(this._item.validity,this._item.validationMessage,this._item),this.validate&&this.checkValidity()}),100)}checkValidity(){if(!0===this.disabled)return this._errorController.clearError(),"";const e=this._input;let t="";return!this.required||this._fileList&&0!==this._fileList.length?(e.setCustomValidity(""),this._errorController.clearError()):(t=this.errormessage||"Bitte wählen Sie eine Datei aus.",e.setCustomValidity(t)),t?this._errorController.setError(t):this._errorController.clearError(),t}showError(e){this.disabled||this._errorController.setError(e)}clearError(){this._errorController.clearError()}_performValidation(){if(!0===this.disabled)return"";if(!this._hasInteracted&&!this.showErrors)return"";const e=!this.required||this._fileList&&0!==this._fileList.length?"":this.errormessage||"Bitte wählen Sie eine Datei aus.";return e?this._errorController.setError(e):this._errorController.clearError(),e}setDisabled(e){this.disabled=!!e,this.disabled&&this._errorController.clearError(),this._input&&(this._input.disabled=this.disabled),this._removeButtons&&this._removeButtons.forEach((e=>{e.disabled=this.disabled})),this.requestUpdate()}_validateWithoutController(){if(this.disabled)return"";const e=this._input;return e?(e.setCustomValidity(""),!this.required||this._fileList&&0!==this._fileList.length?"":this.errormessage||"Bitte wählen Sie eine Datei aus."):""}_unsetFileValues(){this._formData.delete(this.name)}_setFileValues(){let e="";this._files.files.length&&(e=`C:\\fakepath\\${this._files.files[0].name}`),this.value=e;for(let e=0;e<this._files.files.length;e++)this._formData.append(this.name,this._files.files[e]);this._internals.setFormValue(this._formData)}_handleChange(e){this.disabled||(this._hasInteracted=!0,l(this,"change",{value:this.value,target:e.target}))}_handleEvent(e){this.disabled||(l(this,e.type,{value:this.value,target:e.target}),e.type)}_handleUpload(e){if(!this.disabled)try{this._hasInteracted=!0,(this.validate||this.showErrors)&&this._errorController.validate()}catch(e){console.error("Error handling upload:",e)}}formResetCallback(){super.formResetCallback?.(),this._unsetFileValues(),this._hasInteracted=!1,this._errorController.clearError()}reset(){this._files=new DataTransfer,this._fileList=[],this._unsetFileValues(),this._formData=new FormData,this._hasInteracted=!1,this._input&&(this._input.value=""),this._errorController.clearError(),this._internals?.setFormValue(""),this.requestUpdate(),l(this,"change",{value:"",isReset:!0})}render(){const e={"files-selected":this._fileList.length,"has-error":this.hasError,disabled:this.disabled};return this._renderWrapper(i`
			<wm-stack
				justify="center"
				grow
				equal
				gap="l"
				?vertical="${!this.multiple}"
				class="upload ${s(e)}"
			>
				<wm-stack
					vertical
					alignment="${this.multiple?"center":"start"}"
					class="droparea"
					gap="${this.multiple?"s":"xs"}"
				>
					<div>
						<slot></slot>
					</div>

					<p>
						<wm-button kind="secondary" inert>
							<button
								aria-disabled="${this._fileList.length&&!this.multiple?"true":"false"}"
								?disabled=${this.disabled}
								class="btn-upload"
							>
								${this.label}
							</button>
						</wm-button>
					</p>

					<input
						aria-label="${this.label}"
						class="wm-h-vh"
						type="file"
						?multiple="${this.multiple}"
						?required=${this.required}
						@change="${this.disabled?void 0:this._changed}"
						@blur="${this.disabled?void 0:this._handleBlur}"
						@focus="${this.disabled?void 0:this._handleFocus}"
						?disabled=${this.disabled}
					/>

					<div>
						<slot name="postcontent"></slot>
					</div>
				</wm-stack>

				<div
					?hidden="${!this._fileList.length||this.hideSelectedFiles}"
					class="selected-files"
				>
					<p ?hidden="${!this.multiple}">
						<strong>${this._fileList.length} ${this.labelSelection}</strong>
					</p>
					<wm-list type="row" gap="xs">
						<ul>
							${this._fileList.map(((e,t)=>i`
									<li>
										<img
											src="${URL.createObjectURL(e)}"
											width="48"
											?hidden="${!this._isImage(e)}"
											alt="0"
										/>
										${e.name} (${this._returnFileSize(e.size)})

										<wm-button kind="secondary" color="morgenrot" size="xs">
											<button
												@click="${this.disabled?void 0:this.removeFile.bind(this,t)}"
												type="button"
												aria-label="${this.labelDelete} ${e.name}"
												class="removeButton"
												?disabled=${this.disabled}
											>
												<wm-icon iconid="trash"></wm-icon>
											</button>
										</wm-button>
									</li>
								`))}
						</ul>
					</wm-list>
				</div>
			</wm-stack>
			<div role="status" class="wm-h-vh"></div>
		`)}}customElements.define("wm-upload",u);const c="wm-upload";export{u as Upload,c as tagName};
