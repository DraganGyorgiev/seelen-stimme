import {LitElement, html, css} from 'lit-element';
import {customElement} from 'lit/decorators.js';
import '../../components/header/nav-bar.ts'
import '../../components/footer/footer-simple.ts'

@customElement('app-page')
export class AppPage extends LitElement {
  override render() {
    return html`
      <div class="app">
	      <nav-bar></nav-bar>
        
	      <div class="content">
	        <main>
	          <slot></slot>
	        </main>
		      
	        <footer-simple></footer-simple>
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