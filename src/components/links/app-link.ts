import { LitElement, html, css, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { localized } from '@lit/localize'
import tailwindCss from '../../tailwind/tailwindCss.ts'
import { currentLocalePath, navigateFromLinkClick } from '../../router/navigate.ts'

type LinkVariant = 'nav' | 'logo'

@localized()
@customElement('app-link')
export class AppLink extends LitElement {
	@property({ type: String }) to = '/'
	@property({ type: Boolean, reflect: true }) active = false
	@property({ type: String }) variant: LinkVariant = 'nav'

	private onClick(event: MouseEvent) {
		navigateFromLinkClick(event, this.to)
	}

	override render() {
		const isNav = this.variant === 'nav'

		return html`
			<a
				href=${currentLocalePath(this.to)}
				aria-current=${this.active ? 'page' : nothing}
				@click=${this.onClick}
				class="
					block w-full rounded-sm
					focus-visible:outline-none
					focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2
				"
			>
				<span
					class="
						relative inline-block
						${isNav ? 'group transition-all duration-200 motion-safe:hover:-translate-y-0.5' : ''}
						${isNav ? (this.active ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900') : ''}
					"
				>
					<slot></slot>

					${isNav
						? html`<span
								class="
									pointer-events-none
									absolute -bottom-1 left-0 h-px w-full
									origin-left transition-transform duration-300
									${this.active ? 'scale-x-100 bg-teal-500' : 'scale-x-0 bg-gray-900/70 group-hover:scale-x-100'}
								"
							></span>`
						: nothing}
				</span>
			</a>
		`
	}

	static override styles = [
		tailwindCss,
		css`
			:host {
				display: inline-block;
			}
		`,
	]
}

declare global {
	interface HTMLElementTagNameMap {
		'app-link': AppLink;
	}
}
