export function sticky() {
	class StickyHeader extends HTMLElement {
		constructor() {
			super();
		}

		connectedCallback() {
			this.header = document.getElementById('shopify-section-header');
			this.headerBounds = {};
			this.currentScrollTop = 0;
			this.preventReveal = false;
			this.predictiveSearch = this.querySelector('predictive-search');
			this.darkmodeIcon = this.querySelector('sticky-darkmode');

			this.onScrollHandler = this.onScroll.bind(this);
			this.hideHeaderOnScrollUp = () => (this.preventReveal = true);

			this.addEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
			window.addEventListener('scroll', this.onScrollHandler, false);

			this.createObserver();
		}

		disconnectedCallback() {
			this.removeEventListener(
				'preventHeaderReveal',
				this.hideHeaderOnScrollUp
			);
			window.removeEventListener('scroll', this.onScrollHandler);
		}

		createObserver() {
			let observer = new IntersectionObserver((entries, observer) => {
				this.headerBounds = entries[0].intersectionRect;
				observer.disconnect();
			});

			observer.observe(this.header);
		}

		onScroll() {
			const scrollTop =
				window.pageYOffset || document.documentElement.scrollTop;

			if (this.predictiveSearch && this.predictiveSearch.isOpen) return;

			if (
				scrollTop > this.currentScrollTop &&
				scrollTop > this.headerBounds.bottom
			) {
				requestAnimationFrame(this.hide.bind(this));
			} else if (
				scrollTop < this.currentScrollTop &&
				scrollTop > this.headerBounds.bottom
			) {
				if (!this.preventReveal) {
					requestAnimationFrame(this.reveal.bind(this));
				} else {
					window.clearTimeout(this.isScrolling);

					this.isScrolling = setTimeout(() => {
						this.preventReveal = false;
					}, 66);

					requestAnimationFrame(this.hide.bind(this));
				}
			} else if (scrollTop <= this.headerBounds.top) {
				requestAnimationFrame(this.reset.bind(this));
			}

			this.currentScrollTop = scrollTop;
		}

		hide() {
			const darkMode = this.darkmodeIcon;
			this.header.classList.add(
				'shopify-section-header-hidden',
				'shopify-section-header-sticky'
			);
			this.closeMenuDisclosure();
			this.closeSearchModal();
			darkMode.classList.add('sticky:hide');
			if (darkMode.classList.contains('sticky-bg')) {
				darkMode.classList.remove('sticky-bg');
			}
			if (darkMode.classList.contains('sticky-bgv')) {
				darkMode.classList.remove('sticky-bgv');
			}
		}

		reveal() {
			const darkMode = this.darkmodeIcon;
			const html = document.documentElement;
			this.header.classList.add('shopify-section-header-sticky', 'animate');
			this.header.classList.remove('shopify-section-header-hidden');
			darkMode.classList.remove('sticky:hide');
			darkMode.classList.add('sticky:show');

			if (darkMode.classList.contains('colormode:off')) {
				if (html.classList.contains('dark')) {
					darkMode.classList.add('sticky-bgv');
				}
				if (html.classList.contains('light')) {
					darkMode.classList.add('sticky-bgv');
				}
			}
		}

		reset() {
			const darkMode = this.darkmodeIcon;
			const html = document.documentElement;

			const darkToggle = document.getElementById('sticky-darkmode-toggle');
			function switchIconBG() {
				if (html.classList.contains('dark')) {
					darkToggle.classList.remove('sticky-bg');
					darkToggle.classList.add('sticky-bgv');
				}
				if (html.classList.contains('light')) {
					darkToggle.classList.remove('sticky-bgv');
					darkToggle.classList.add('sticky-bg');
				}
			}

			let themeToggle = document.querySelector(
				'.theme-switch input[type="checkbox"]'
			);

			themeToggle.onclick = function () {
				switchIconBG();
			};

			this.header.classList.remove(
				'shopify-section-header-hidden',
				'shopify-section-header-sticky',
				'animate'
			);
			darkMode.classList.remove('sticky:hide');
			darkMode.classList.add('sticky:show');

			if (darkMode.classList.contains('colormode:on')) {
				darkMode.classList.remove('sticky-bg');
				darkMode.classList.remove('sticky-bgv');
			}
			if (darkMode.classList.contains('colormode:off')) {
				if (html.classList.contains('trans:off')) {
					darkMode.classList.add('sticky-bgv');
				}
				if (html.classList.contains('trans:on')) {
					if (html.classList.contains('dark')) {
						darkMode.classList.remove('sticky-bg');
						darkMode.classList.add('sticky-bgv');
					}
					if (html.classList.contains('light')) {
						darkMode.classList.remove('sticky-bgv');
						darkMode.classList.add('sticky-bg');
					}
				}
			}
		}

		closeMenuDisclosure() {
			this.disclosures =
				this.disclosures || this.header.querySelectorAll('details-disclosure');
			this.disclosures.forEach((disclosure) => disclosure.close());
		}

		closeSearchModal() {
			this.searchModal =
				this.searchModal || this.header.querySelector('details-modal');
			this.searchModal.close(false);
		}
	}

	customElements.define('sticky-header', StickyHeader);
}

export function local() {
	class LocalizationForm extends HTMLElement {
		constructor() {
			super();
			this.elements = {
				input: this.querySelector(
					'input[name="locale_code"], input[name="country_code"]'
				),
				button: this.querySelector('button'),
				panel: this.querySelector('ul'),
			};
			this.elements.button.addEventListener(
				'click',
				this.openSelector.bind(this)
			);
			this.elements.button.addEventListener(
				'focusout',
				this.closeSelector.bind(this)
			);
			this.addEventListener('keyup', this.onContainerKeyUp.bind(this));

			this.querySelectorAll('a').forEach((item) =>
				item.addEventListener('click', this.onItemClick.bind(this))
			);
		}

		hidePanel() {
			this.elements.button.setAttribute('aria-expanded', 'false');
			this.elements.panel.setAttribute('hidden', true);
		}

		onContainerKeyUp(event) {
			if (event.code.toUpperCase() !== 'ESCAPE') return;

			this.hidePanel();
			this.elements.button.focus();
		}

		onItemClick(event) {
			event.preventDefault();
			const form = this.querySelector('form');
			this.elements.input.value = event.currentTarget.dataset.value;
			if (form) form.submit();
		}

		openSelector() {
			this.elements.button.focus();
			this.elements.panel.toggleAttribute('hidden');
			this.elements.button.setAttribute(
				'aria-expanded',
				(
					this.elements.button.getAttribute('aria-expanded') === 'false'
				).toString()
			);
		}

		closeSelector(event) {
			const shouldClose =
				event.relatedTarget && event.relatedTarget.nodeName === 'BUTTON';
			if (event.relatedTarget === null || shouldClose) {
				this.hidePanel();
			}
		}
	}

	customElements.define('localization-form', LocalizationForm);
}

export function modal() {
	class ProductModal extends ModalDialog {
		constructor() {
			super();
		}

		hide() {
			super.hide();
		}

		show(opener) {
			super.show(opener);
			this.showActiveMedia();
		}

		showActiveMedia() {
			this.querySelectorAll(
				`[data-media-id]:not([data-media-id="${this.openedBy.getAttribute(
					'data-media-id'
				)}"])`
			).forEach((element) => {
				element.classList.remove('active');
			});
			const activeMedia = this.querySelector(
				`[data-media-id="${this.openedBy.getAttribute('data-media-id')}"]`
			);
			const activeMediaTemplate = activeMedia.querySelector('template');
			const activeMediaContent = activeMediaTemplate
				? activeMediaTemplate.content
				: null;
			activeMedia.classList.add('active');
			activeMedia.scrollIntoView();

			const container = this.querySelector('[role="document"]');
			container.scrollLeft = (activeMedia.width - container.clientWidth) / 2;

			if (
				activeMedia.nodeName == 'DEFERRED-MEDIA' &&
				activeMediaContent &&
				activeMediaContent.querySelector('.js-youtube')
			)
				activeMedia.loadContent();
		}
	}

	customElements.define('product-modal', ProductModal);
}
