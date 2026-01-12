import {LitElement, html, css} from 'lit-element';
import {customElement} from 'lit/decorators.js';
import tailwindCss from "../../../tailwind/tailwindCss.ts";
import '../../layouts/full-layout.ts'
import '../../../features/services/service-section-main.ts'
import '../../../components/welcome-main/welcome-section.ts'
import '../../../components/faqs/faqs-component.ts'
import '../../../components/testemonials/customer-review.ts'
import '../../../components/image-and-quote/image-and-quote.ts'

@customElement('main-page')
export class MainPage extends LitElement {
  override render() {
    return html`
	    <image-and-quote></image-and-quote>
	    
      <full-layout>
	      <welcome-section></welcome-section>
	      <service-section-main></service-section-main>
<!--	      <faqs-component></faqs-component>-->
	      <customer-review></customer-review>
      </full-layout>
    `;
  }

  static override styles = [tailwindCss, css`
    
  `];
}

declare global {
  interface HTMLElementTagNameMap {
    'main-page': MainPage;
  }
}