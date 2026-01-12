import {LitElement, html, css} from 'lit-element';
import {customElement} from 'lit/decorators.js';
import '../../components/layout/site-header.ts'
import '../../components/layout/site-footer.ts'
import '../../components/cookie-consent/cookie-consent-banner.ts'

@customElement('app-page')
export class AppPage extends LitElement {
  override render() {
    return html`
      <div class="app">
	      <cookie-consent-banner></cookie-consent-banner>
	      <site-header></site-header>
        
	      <div class="content">
	        <main>
	          <slot></slot>
	        </main>
		      
	        <site-footer></site-footer>
	      </div>
      </div>
    `;
  }

  static override styles = css`
    .app {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }
	  
	  .content {
      overflow-x: hidden;
	  }

    main {
      flex-grow: 1;
    }
  `;
}

declare global {
    interface HTMLElementTagNameMap {
        'app-page': AppPage;
    }
}