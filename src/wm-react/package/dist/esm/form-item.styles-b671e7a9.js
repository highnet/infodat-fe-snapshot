/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as t}from"./lit-element-8d7b5fe2.js";import"./lit-html-34d0b6a8.js";const o=[t`
		* {
			box-sizing: border-box;
		}

		:host {
			display: block;
		}

		.has-error {
			color: var(--wm-color-ui-error, var(--wm-base-color-ui-error));
		}

		.info {
			--_height: 0fr;

			display: grid;
			grid-template-rows: var(--_height);
			transition: grid-template-rows 0.3s;
			margin-top: 0.2rem;
			inline-size: 100%;
		}

		.info-inner {
			overflow: hidden;
			font-size: var(--wm-font-size-xs);
		}

		.info-visible {
			--_height: 1fr;
		}

		.info-button {
			/* flex-grow: 0 !important; */
			position: absolute;
			top: var(--info-button-pos-top, -14px);
			right: var(--info-button-pos-right, -14px);
		}

		.password-button {
			position: absolute;
			top: 5px;
			right: 5px;
		}

		/* Fixes strange line breaks with long labels */
		.horizontal-form-control {
			align-items: baseline;
			display: flex;
			gap: 4px;
		}

		.horizontal-form-control input {
			flex-shrink: 0;
		}

		/* .vertical-form-control + .info-button {
			position: relative;
			top: 0;
		} */

		.vertical-form-control + .password-button {
			position: relative;
			top: 0;
		}

		.auto-suggest {
			background: var(--input-combobox-background-color);
			box-shadow: 0 0 10px 0 rgba(41, 41, 41, 0.1);
			left: var(--_search-button-width);
			max-height: 20rem;
			overflow: auto;
			position: absolute;
			top: 100%;
			width: calc(100% - var(--_search-button-width, 0px));
			z-index: 1210;
		}

		.option,
		.option-heading {
			background-color: var(--_link-background);
			display: grid;
			width: 100%;
			padding: 0.4rem 0.8rem;
		}

		.option {
			grid-template-columns: auto 1fr; /* Two columns: one for icon and one for text */
			align-items: start;
			gap: 0 1rem;
			cursor: pointer;
		}

		.option-container {
			display: flex;
			align-items: baseline;
		}

		.image-container {
			display: flex; /* Center the icon within its container if needed */
			align-items: center; /* Vertically center the icon */
		}

		.image-container img {
			margin: 0;
			height: 24px;
		}

		.text-container {
			display: grid;
			grid-template-rows: auto auto; /* Two rows: one for each span */
			gap: 0.2rem; /* Spacing between the two spans */
		}

		.main-content {
			font-size: var(--wm-font-size-s);
		}

		.additional-content {
			font-size: var(--wm-font-size-xs);
			padding-inline-start: 0.5rem;
		}

		.option-heading {
			--_link-background: var(--wm-theme-header-nav-wrapper-background);
			font-variation-settings: var(--wm-font-weight-bold) !important;
		}

		.option:is(:link, :visited) {
			color: var(--wm-theme-site-color);
			text-decoration: none;
		}

		.option:is(:hover, :focus-visible, [aria-selected="true"]) {
			--_link-background: var(--input-combobox-background-color--active);
			outline: 1px solid transparent;
			text-decoration: underline;
		}

		.option:has(span) {
			line-height: 1.3;
		}

		.option .row {
			opacity: 0.7;
			font-size: 0.9em;
		}

		mark {
			background-color: transparent;
			font-variation-settings: var(--wm-theme-content-font-variation-settings);
			font-weight: var(--wm-theme-content-font-weight);
		}

		input:focus {
			outline: var(--wm-theme-site-focus-outline);
			outline-offset: var(--wm-theme-site-focus-outline-offset);
		}

		:host([type="file"]) {
			border: 2px dashed var(--wm-theme-input-background);
			padding: 2rem;
			text-align: center;
			width: 100%;
		}

		:host([type="file"]:is(.dragging, :hover, :focus-within)) {
			border-color: var(--wm-theme-input-accent-color-active) !important;
		}

		:host([type="file"]) > * + * {
			margin-top: 0.5em;
		}

		:host([type="file"]) input::file-selector-button {
			position: absolute;
			white-space: nowrap;
			width: 1px;
			height: 1px;
			overflow: hidden;
			clip-path: inset(50%);
			margin: -1px;
		}

		:host([type="file"]) label {
			border: 1px solid var(--wm-theme-input-accent-color-active);
			color: var(--wm-theme-input-accent-color-active);
			display: inline-block;
			padding: 0.3em 1em;
			text-transform: uppercase;
		}

		:host([type="file"]) input {
			border: 1px solid var(--wm-theme-input-border-color);
			padding: 0.2em 0.5em;
		}

		label:has(+ #hint) {
			margin-block-end: 0;
		}

		#hint {
			font-size: var(--wm-font-size-xs);
			margin-block-end: 0.125rem;
		}

		.max-characters {
			font-size: var(--wm-font-size-xs);
			margin-block-start: 0.125rem;
		}

		:host([toggleButton]) input {
			padding-right: 3rem;
		}

		:host {
			position: relative;
		}
	`];export{o as f};
