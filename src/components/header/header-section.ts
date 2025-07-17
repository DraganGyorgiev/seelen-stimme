import {LitElement, html} from 'lit-element';
import {customElement} from 'lit/decorators.js';
import tailwindCss from "../../tailwind/tailwindCss.ts";
import "./nav-bar.ts"

@customElement('header-section')
export class HeaderSection extends LitElement {

	override render() {
		return html`
			<nav-bar></nav-bar>
    `;
	}

	static override styles = tailwindCss;
}

declare global {
	interface HTMLElementTagNameMap {
		'header-section': HeaderSection;
	}
}