/* @copyright Stadt Wien - Wiener Melange 200 */
import{i as e}from"./lit-element-8d7b5fe2.js";import"./lit-html-34d0b6a8.js";const t=[e`
		form {
			margin-bottom: 2em;
		}

		form > * + * {
			margin-top: 1em;
		}

		input,
		button,
		textarea,
		select {
			font: inherit;
			/* max-width: 30rem; */
		}

		label,
		.wm-e-label {
			display: block;
			font-weight: var(--wm-theme-content-font-weight);
			font-variation-settings: var(--wm-theme-content-font-variation-settings);
			margin-bottom: 0.125rem;
		}

		:where(input[type="checkbox"], input[type="radio"]) + label {
			display: inline-block;
			font-weight: normal;
			font-variation-settings: normal;
		}

		input:is([type="time"], [type="date"], [type="datetime-local"], [type="text"],  [type="tel"], [type="url"], [type="email"], [type="number"], [type="password"], ),
		textarea {
			background-color: var(--wm-theme-input-background);
			border: 1px solid var(--wm-theme-input-border-color);
			border-radius: 0;
			color: var(--wm-theme-input-color);
  		display: block;
			line-height: 1;
			margin: 0;
			min-height: var(--wm-theme-input-min-height);
			padding: var(--wm-theme-input-padding);
			width: 100%;
		}

		@media(min-width: 48em) {
			input:is(
				[type="date"],
				[type="datetime-local"],
				[type="email"],
				[type="number"],
				[type="password"],
				[type="text"],
				[type="tel"],
				[type="time"]
				[type="url"]
			)[size] {
				width: auto;
			}
		}

		:is(input, textarea, select)[aria-disabled="true"],
		:is(input, textarea, select)[aria-disabled="true"] + label {
			opacity: 0.5;
			cursor: not-allowed;
			pointer-events: none;
			border: none;
		}


		select {
			appearance: var(--wm-theme-select-appearance);
			background-color: var(--wm-theme-select-background);
			border: 1px solid var(--wm-theme-select-border-color);
			border-radius: 0;
			color: var(--wm-theme-select-color);
			font-family: inherit;
			font-size: inherit;
			margin: 0;
			min-height: var(--wm-theme-select-min-height);
			min-width: 8.75rem;
			width: 100%;
		}

		:is(button, .wm-e-button:link, .wm-e-button:visited) {
			align-items: center;
			background-color: var(--button-background-color);
			border: 2px solid var(--button-border-color);
			color: var(--button-font-color);
			display: inline-flex;
			font-weight: var(--wm-theme-content-font-weight);
			font-variation-settings: var(--wm-theme-content-font-variation-settings);
			font-size: var(--button-font-size, inherit);
			justify-content: center;
			line-height: 1.45;
			padding: 0.463em 0.88em;
			text-align: center;
			text-decoration: none;
			text-transform: var(--button-text-transform, uppercase);
		}

		/* split up selectors because .wm-e-button:link in :is() increases the specificty of button */
		button:is(:focus-visible, :hover),
		:is(.wm-e-button:link, .wm-e-button:visited):is(:focus-visible, :hover) {
			background-color: var(--button-background-color--hover) !important;
			color: var(--button-font-color--hover) !important;
		}

		fieldset {
			position: relative;
			margin: 0;
			padding: 1rem;
			border: 1px solid var(--wm-color-nebelgrau);
		}
		
		fieldset[aria-invalid="true"],
		fieldset.group-error {
			border-color: var(--wm-color-ui-error,  var(--wm-base-color-ui-error));
		}
		
		fieldset.no-border {
			border: none;
			padding: 0;
		}
		
		legend {
			font-weight: var(--wm-theme-content-font-weight);
			font-variation-settings: var(--wm-theme-content-font-variation-settings);
			padding: 0 0.5rem;
			margin-left: -.5rem;
		}
		
		fieldset.no-border legend {
			padding: 0 0 .5rem;
			margin: 0;
		}

		:is(input[type="radio"], input[type="checkbox"]) {
			appearance: none;
			border: 1px solid var(--wm-theme-input-accent-color-active);
			height: 1rem;
			margin: 0;
			margin-right: 0.5rem;
			position: relative;
			top: 0.125rem;
			width: 1rem;
			min-width: 1rem;
		}

		input[type="radio"] {
			border-radius: 50%;
		}

		input[type="checkbox"]:is(:checked, :indeterminate) {
		  background-color: var(--accent-color, var(--wm-theme-input-accent-color-active));
			background-image: var(--wm-theme-input-checkbox-icon);
			background-position: right 0 center;
			background-size: cover;
		}

		input[type="radio"]:checked {
			box-shadow: inset 0 0 0 4px #fff;
		  background-color: var(--accent-color, var(--wm-theme-input-accent-color-active));
		}

		input[type="checkbox"]:indeterminate {
			background-color: var(--wm-theme-input-border-color);
		}

		/* Errors */

		[aria-invalid="true"] {
			--wm-theme-input-border-color: var(--wm-color-ui-error,  var(--wm-base-color-ui-error));
		}

		.wm-forms-message {
			padding-top: 0.2rem;
			padding-bottom: 0.2rem;
		}

		[aria-invalid="true"] ~ .wm-forms-message {
			color: var(--wm-color-ui-error,  var(--wm-base-color-ui-error));
		}

		div:has(> [aria-invalid="true"]) {
			color: var(--wm-color-ui-error,  var(--wm-base-color-ui-error));
		}

		/* Suche */
		:host([search]) {
			--_search-button-width: 2.5rem;
		}

		:host(:is([search="hidden"], [search="hiddenmobile"])) .input {
			visibility: hidden;
			opacity: 1.1;
			position: fixed;
			inset: 0 var(--wm-theme-site-wrapper-padding);
			display: flex;
		}

		:host([search="hidden"]) input {
			flex-grow: 1;
		}

		:host([search="hiddenmobile"]) .input {
			padding: 0.3rem 0;
		}

		:host(:is([search="hidden"], [search="hiddenmobile"])) .input-visible {
			visibility: visible;
		}

		.btn-close-search {
			background: var(--wm-theme-header-nav-wrapper-background);
			display: flex;
			width: var(--_search-button-width);
		}

		:host([search="hiddenmobile"]) .btn-close-search {
			background: var(--wm-theme-header-background);
		}

		:host(:not([search="hidden"], [search="hiddenmobile"])) .btn-search {
			align-items: center;
			bottom: 0;
			display: flex;
			position: absolute;
			right: 0.5rem;
			top: 0;
		}

		:host([search="hiddenmobile"]) .btn-search {
			margin-left: auto;
			display: flex;
			justify-content: end;
		}

		@media(min-width: 64em) {
			:host([search="hiddenmobile"]) .input {
				position: static;
				visibility: visible;
				padding: 0;
			}

			:host([search="hiddenmobile"]) .btn-close-search {
				display: none;
			}

			:host([search="hiddenmobile"]) .btn-search {
				display: none;
			}
		}

		.input {
			position: relative;
		}

		@media(max-width: 48em) {
			@media not (width: 48em) {
				.input {
					/* We're setting the max width explicitly within the component
					and need to overwrite it here for small viewport */
					max-width: 100% !important;
				}
			}
		}

		.input-button {
			position: absolute;
			top: calc(50% + 2px);
			right: 1rem;
			transform: translateY(-50%);
		}
	`];export{t as f};
