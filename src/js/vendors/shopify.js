function getFocusableElements(e) {
	return Array.from(
		e.querySelectorAll(
			"summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
		)
	);
}
const trapFocusHandlers = {};
function trapFocus(t, e = t) {
	var i = getFocusableElements(t),
		n = i[0],
		s = i[i.length - 1];
	removeTrapFocus(),
		(trapFocusHandlers.focusin = (e) => {
			(e.target !== t && e.target !== s && e.target !== n) ||
				document.addEventListener('keydown', trapFocusHandlers.keydown);
		}),
		(trapFocusHandlers.focusout = function () {
			document.removeEventListener('keydown', trapFocusHandlers.keydown);
		}),
		(trapFocusHandlers.keydown = function (e) {
			'TAB' === e.code.toUpperCase() &&
				(e.target !== s || e.shiftKey || (e.preventDefault(), n.focus()),
				(e.target !== t && e.target !== n) ||
					!e.shiftKey ||
					(e.preventDefault(), s.focus()));
		}),
		document.addEventListener('focusout', trapFocusHandlers.focusout),
		document.addEventListener('focusin', trapFocusHandlers.focusin),
		e.focus();
}
try {
	document.querySelector(':focus-visible');
} catch {
	focusVisiblePolyfill();
}
function focusVisiblePolyfill() {
	const t = [
		'ARROWUP',
		'ARROWDOWN',
		'ARROWLEFT',
		'ARROWRIGHT',
		'TAB',
		'ENTER',
		'SPACE',
		'ESCAPE',
		'HOME',
		'END',
		'PAGEUP',
		'PAGEDOWN',
	];
	let e = null,
		i = null;
	window.addEventListener('keydown', (e) => {
		t.includes(e.code.toUpperCase()) && (i = !1);
	}),
		window.addEventListener('mousedown', (e) => {
			i = !0;
		}),
		window.addEventListener(
			'focus',
			() => {
				e && e.classList.remove('focused'),
					i || ((e = document.activeElement), e.classList.add('focused'));
			},
			!0
		);
}
function pauseAllMedia() {
	document.querySelectorAll('.js-youtube').forEach((e) => {
		e.contentWindow.postMessage(
			'{"event":"command","func":"pauseVideo","args":""}',
			'*'
		);
	}),
		document.querySelectorAll('.js-vimeo').forEach((e) => {
			e.contentWindow.postMessage('{"method":"pause"}', '*');
		}),
		document.querySelectorAll('video').forEach((e) => e.pause()),
		document.querySelectorAll('product-model').forEach((e) => {
			e.modelViewerUI && e.modelViewerUI.pause();
		});
}
function removeTrapFocus(e = null) {
	document.removeEventListener('focusin', trapFocusHandlers.focusin),
		document.removeEventListener('focusout', trapFocusHandlers.focusout),
		document.removeEventListener('keydown', trapFocusHandlers.keydown),
		e && e.focus();
}
function onKeyUpEscape(e) {
	if ('ESCAPE' === e.code.toUpperCase()) {
		const t = e.target.closest('details[open]');
		if (t) {
			const i = t.querySelector('summary');
			t.removeAttribute('open'), i.focus();
		}
	}
}
class QuantityInput extends HTMLElement {
	constructor() {
		super(),
			(this.input = this.querySelector('input')),
			(this.changeEvent = new Event('change', { bubbles: !0 })),
			this.querySelectorAll('button').forEach((e) =>
				e.addEventListener('click', this.onButtonClick.bind(this))
			);
	}
	onButtonClick(e) {
		e.preventDefault();
		var t = this.input.value;
		'plus' === e.target.name ? this.input.stepUp() : this.input.stepDown(),
			t !== this.input.value && this.input.dispatchEvent(this.changeEvent);
	}
}
function debounce(t, i) {
	let n;
	return (...e) => {
		clearTimeout(n), (n = setTimeout(() => t.apply(this, e), i));
	};
}
function fetchConfig(e = 'json') {
	return {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Accept: 'application/' + e },
	};
}
customElements.define('quantity-input', QuantityInput),
	void 0 === window.Shopify && (window.Shopify = {}),
	(Shopify.bind = function (e, t) {
		return function () {
			return e.apply(t, arguments);
		};
	}),
	(Shopify.setSelectorByValue = function (e, t) {
		for (var i = 0, n = e.options.length; i < n; i++) {
			var s = e.options[i];
			if (t == s.value || t == s.innerHTML) return (e.selectedIndex = i);
		}
	}),
	(Shopify.addListener = function (e, t, i) {
		e.addEventListener
			? e.addEventListener(t, i, !1)
			: e.attachEvent('on' + t, i);
	}),
	(Shopify.postLink = function (e, t) {
		var i,
			n = (t = t || {}).method || 'post',
			s = t.parameters || {},
			o = document.createElement('form');
		for (i in (o.setAttribute('method', n), o.setAttribute('action', e), s)) {
			var r = document.createElement('input');
			r.setAttribute('type', 'hidden'),
				r.setAttribute('name', i),
				r.setAttribute('value', s[i]),
				o.appendChild(r);
		}
		document.body.appendChild(o), o.submit(), document.body.removeChild(o);
	}),
	(Shopify.CountryProvinceSelector = function (e, t, i) {
		(this.countryEl = document.getElementById(e)),
			(this.provinceEl = document.getElementById(t)),
			(this.provinceContainer = document.getElementById(i.hideElement || t)),
			Shopify.addListener(
				this.countryEl,
				'change',
				Shopify.bind(this.countryHandler, this)
			),
			this.initCountry(),
			this.initProvince();
	}),
	(Shopify.CountryProvinceSelector.prototype = {
		initCountry: function () {
			var e = this.countryEl.getAttribute('data-default');
			Shopify.setSelectorByValue(this.countryEl, e), this.countryHandler();
		},
		initProvince: function () {
			var e = this.provinceEl.getAttribute('data-default');
			e &&
				0 < this.provinceEl.options.length &&
				Shopify.setSelectorByValue(this.provinceEl, e);
		},
		countryHandler: function (e) {
			var t = (n =
					this.countryEl.options[this.countryEl.selectedIndex]).getAttribute(
					'data-provinces'
				),
				i = JSON.parse(t);
			if ((this.clearOptions(this.provinceEl), i && 0 == i.length))
				this.provinceContainer.style.display = 'none';
			else {
				for (var n, s = 0; s < i.length; s++)
					((n = document.createElement('option')).value = i[s][0]),
						(n.innerHTML = i[s][1]),
						this.provinceEl.appendChild(n);
				this.provinceContainer.style.display = '';
			}
		},
		clearOptions: function (e) {
			for (; e.firstChild; ) e.removeChild(e.firstChild);
		},
		setOptions: function (e, t) {
			var i = 0;
			for (t.length; i < t.length; i++) {
				var n = document.createElement('option');
				(n.value = t[i]), (n.innerHTML = t[i]), e.appendChild(n);
			}
		},
	});
class MenuDrawer extends HTMLElement {
	constructor() {
		super(), (this.mainDetailsToggle = this.querySelector('details'));
		var e = this.querySelectorAll('summary');
		this.addAccessibilityAttributes(e),
			'iPhone' === navigator.platform &&
				document.documentElement.style.setProperty(
					'--viewport-height',
					window.innerHeight + 'px'
				),
			this.addEventListener('keyup', this.onKeyUp.bind(this)),
			this.addEventListener('focusout', this.onFocusOut.bind(this)),
			this.bindEvents();
	}
	bindEvents() {
		this.querySelectorAll('summary').forEach((e) =>
			e.addEventListener('click', this.onSummaryClick.bind(this))
		),
			this.querySelectorAll('button').forEach((e) =>
				e.addEventListener('click', this.onCloseButtonClick.bind(this))
			);
	}
	addAccessibilityAttributes(e) {
		e.forEach((e) => {
			e.setAttribute('role', 'button'),
				e.setAttribute('aria-expanded', !1),
				e.setAttribute('aria-controls', e.nextElementSibling.id);
		});
	}
	onKeyUp(e) {
		'ESCAPE' !== e.code.toUpperCase() ||
			((e = e.target.closest('details[open]')) &&
				(e === this.mainDetailsToggle
					? this.closeMenuDrawer(
							this.mainDetailsToggle.querySelector('summary')
					  )
					: this.closeSubmenu(e)));
	}
	onSummaryClick(e) {
		var t = e.currentTarget;
		const i = t.parentNode;
		var n = i.hasAttribute('open');
		i === this.mainDetailsToggle
			? (n && e.preventDefault(),
			  n ? this.closeMenuDrawer(t) : this.openMenuDrawer(t))
			: (trapFocus(t.nextElementSibling, i.querySelector('button')),
			  setTimeout(() => {
					i.classList.add('menu-opening');
			  }));
	}
	openMenuDrawer(e) {
		setTimeout(() => {
			this.mainDetailsToggle.classList.add('menu-opening');
		}),
			e.setAttribute('aria-expanded', !0),
			trapFocus(this.mainDetailsToggle, e),
			document.body.classList.add('overflow-hidden-' + this.dataset.breakpoint);
	}
	closeMenuDrawer(e, t = !1) {
		void 0 !== e &&
			(this.mainDetailsToggle.classList.remove('menu-opening'),
			this.mainDetailsToggle.querySelectorAll('details').forEach((e) => {
				e.removeAttribute('open'), e.classList.remove('menu-opening');
			}),
			this.mainDetailsToggle
				.querySelector('summary')
				.setAttribute('aria-expanded', !1),
			document.body.classList.remove(
				'overflow-hidden-' + this.dataset.breakpoint
			),
			removeTrapFocus(t),
			this.closeAnimation(this.mainDetailsToggle));
	}
	onFocusOut(e) {
		setTimeout(() => {
			this.mainDetailsToggle.hasAttribute('open') &&
				!this.mainDetailsToggle.contains(document.activeElement) &&
				this.closeMenuDrawer();
		});
	}
	onCloseButtonClick(e) {
		e = e.currentTarget.closest('details');
		this.closeSubmenu(e);
	}
	closeSubmenu(e) {
		e.classList.remove('menu-opening'),
			removeTrapFocus(),
			this.closeAnimation(e);
	}
	closeAnimation(t) {
		let i;
		const n = (e) => {
			void 0 === i && (i = e),
				e - i < 400
					? window.requestAnimationFrame(n)
					: (t.removeAttribute('open'),
					  t.closest('details[open]') &&
							trapFocus(
								t.closest('details[open]'),
								t.querySelector('summary')
							));
		};
		window.requestAnimationFrame(n);
	}
}
customElements.define('menu-drawer', MenuDrawer);
class HeaderDrawer extends MenuDrawer {
	constructor() {
		super();
	}
	openMenuDrawer(e) {
		(this.header =
			this.header || document.getElementById('shopify-section-header')),
			(this.borderOffset =
				this.borderOffset ||
				this.closest('.header-wrapper').classList.contains(
					'header-wrapper--border-bottom'
				)
					? 1
					: 0),
			document.documentElement.style.setProperty(
				'--header-bottom-position',
				parseInt(
					this.header.getBoundingClientRect().bottom - this.borderOffset
				) + 'px'
			),
			setTimeout(() => {
				this.mainDetailsToggle.classList.add('menu-opening');
			}),
			e.setAttribute('aria-expanded', !0),
			trapFocus(this.mainDetailsToggle, e),
			document.body.classList.add('overflow-hidden-' + this.dataset.breakpoint);
	}
}
customElements.define('header-drawer', HeaderDrawer);
class ModalDialog extends HTMLElement {
	constructor() {
		super(),
			this.querySelector('[id^="ModalClose-"]').addEventListener(
				'click',
				this.hide.bind(this)
			),
			this.addEventListener('keyup', (e) => {
				'ESCAPE' === e.code.toUpperCase() && this.hide();
			}),
			this.classList.contains('media-modal')
				? this.addEventListener('pointerup', (e) => {
						'mouse' !== e.pointerType ||
							e.target.closest('deferred-media, product-model') ||
							this.hide();
				  })
				: this.addEventListener('click', (e) => {
						'MODAL-DIALOG' === e.target.nodeName && this.hide();
				  });
	}
	show(e) {
		this.openedBy = e;
		const t = this.querySelector('.template-popup');
		document.body.classList.add('overflow-hidden'),
			this.setAttribute('open', ''),
			t && t.loadContent(),
			trapFocus(this, this.querySelector('[role="dialog"]')),
			window.pauseAllMedia();
	}
	hide() {
		document.body.classList.remove('overflow-hidden'),
			this.removeAttribute('open'),
			removeTrapFocus(this.openedBy),
			window.pauseAllMedia();
	}
}
customElements.define('modal-dialog', ModalDialog);
class ModalOpener extends HTMLElement {
	constructor() {
		super();
		const t = this.querySelector('button');
		t &&
			t.addEventListener('click', () => {
				const e = document.querySelector(this.getAttribute('data-modal'));
				e && e.show(t);
			});
	}
}
customElements.define('modal-opener', ModalOpener);
class DeferredMedia extends HTMLElement {
	constructor() {
		super();
		const e = this.querySelector('[id^="Deferred-Poster-"]');
		e && e.addEventListener('click', this.loadContent.bind(this));
	}
	loadContent() {
		if ((window.pauseAllMedia(), !this.getAttribute('loaded'))) {
			const e = document.createElement('div');
			e.appendChild(
				this.querySelector('template').content.firstElementChild.cloneNode(!0)
			),
				this.setAttribute('loaded', !0),
				this.appendChild(
					e.querySelector('video, model-viewer, iframe')
				).focus();
		}
	}
}
customElements.define('deferred-media', DeferredMedia);
class SliderComponent extends HTMLElement {
	constructor() {
		if (
			(super(),
			(this.slider = this.querySelector('ul')),
			(this.sliderItems = this.querySelectorAll('li')),
			(this.pageCount = this.querySelector('.slider-counter--current')),
			(this.pageTotal = this.querySelector('.slider-counter--total')),
			(this.prevButton = this.querySelector('button[name="previous"]')),
			(this.nextButton = this.querySelector('button[name="next"]')),
			this.slider && this.nextButton)
		) {
			const e = new ResizeObserver((e) => this.initPages());
			e.observe(this.slider),
				this.slider.addEventListener('scroll', this.update.bind(this)),
				this.prevButton.addEventListener(
					'click',
					this.onButtonClick.bind(this)
				),
				this.nextButton.addEventListener(
					'click',
					this.onButtonClick.bind(this)
				);
		}
	}
	initPages() {
		var e = Array.from(this.sliderItems).filter((e) => 0 < e.clientWidth);
		(this.sliderLastItem = e[e.length - 1]),
			0 !== e.length &&
				((this.slidesPerPage = Math.floor(
					this.slider.clientWidth / e[0].clientWidth
				)),
				(this.totalPages = e.length - this.slidesPerPage + 1),
				this.update());
	}
	update() {
		this.pageCount &&
			this.pageTotal &&
			((this.currentPage =
				Math.round(this.slider.scrollLeft / this.sliderLastItem.clientWidth) +
				1),
			1 === this.currentPage
				? this.prevButton.setAttribute('disabled', !0)
				: this.prevButton.removeAttribute('disabled'),
			this.currentPage === this.totalPages
				? this.nextButton.setAttribute('disabled', !0)
				: this.nextButton.removeAttribute('disabled'),
			(this.pageCount.textContent = this.currentPage),
			(this.pageTotal.textContent = this.totalPages));
	}
	onButtonClick(e) {
		e.preventDefault();
		e =
			'next' === e.currentTarget.name
				? this.slider.scrollLeft + this.sliderLastItem.clientWidth
				: this.slider.scrollLeft - this.sliderLastItem.clientWidth;
		this.slider.scrollTo({ left: e });
	}
}
customElements.define('slider-component', SliderComponent);
class VariantSelects extends HTMLElement {
	constructor() {
		super(), this.addEventListener('change', this.onVariantChange);
	}
	onVariantChange() {
		this.updateOptions(),
			this.updateMasterId(),
			this.toggleAddButton(!0, '', !1),
			this.updatePickupAvailability(),
			this.removeErrorMessage(),
			this.currentVariant
				? (this.updateMedia(),
				  this.updateURL(),
				  this.updateVariantInput(),
				  this.renderProductInfo())
				: (this.toggleAddButton(!0, '', !0), this.setUnavailable());
	}
	updateOptions() {
		this.options = Array.from(this.querySelectorAll('select'), (e) => e.value);
	}
	updateMasterId() {
		this.currentVariant = this.getVariantData().find(
			(e) => !e.options.map((e, t) => this.options[t] === e).includes(!1)
		);
	}
	updateMedia() {
		if (this.currentVariant && this.currentVariant.featured_media) {
			var e = document.querySelector(
				`[data-media-id="${this.dataset.section}-${this.currentVariant.featured_media.id}"]`
			);
			if (e) {
				const i = document.querySelector(
					`#ProductModal-${this.dataset.section} .product-media-modal__content`
				);
				var t = i.querySelector(
					`[data-media-id="${this.currentVariant.featured_media.id}"]`
				);
				const n = e.parentElement;
				n.firstChild != e &&
					(i.prepend(t),
					n.prepend(e),
					(this.stickyHeader =
						this.stickyHeader || document.querySelector('sticky-header')),
					this.stickyHeader &&
						this.stickyHeader.dispatchEvent(new Event('preventHeaderReveal')),
					window.setTimeout(() => {
						n.querySelector('li.product__media-item').scrollIntoView({
							behavior: 'smooth',
						});
					}));
			}
		}
	}
	updateURL() {
		this.currentVariant &&
			'false' !== this.dataset.updateUrl &&
			window.history.replaceState(
				{},
				'',
				this.dataset.url + '?variant=' + this.currentVariant.id
			);
	}
	updateVariantInput() {
		const e = document.querySelectorAll(
			`#product-form-${this.dataset.section}, #product-form-installment`
		);
		e.forEach((e) => {
			const t = e.querySelector('input[name="id"]');
			(t.value = this.currentVariant.id),
				t.dispatchEvent(new Event('change', { bubbles: !0 }));
		});
	}
	updatePickupAvailability() {
		const e = document.querySelector('pickup-availability');
		e &&
			(this.currentVariant && this.currentVariant.available
				? e.fetchAvailability(this.currentVariant.id)
				: (e.removeAttribute('available'), (e.innerHTML = '')));
	}
	removeErrorMessage() {
		const e = this.closest('section');
		if (e) {
			const t = e.querySelector('product-form');
			t && t.handleErrorMessage();
		}
	}
	renderProductInfo() {
		fetch(
			`${this.dataset.url}?variant=${this.currentVariant.id}&section_id=` +
				this.dataset.section
		)
			.then((e) => e.text())
			.then((e) => {
				var t = 'price-' + this.dataset.section;
				const i = new DOMParser().parseFromString(e, 'text/html'),
					n = document.getElementById(t);
				t = i.getElementById(t);
				t && n && (n.innerHTML = t.innerHTML);
				const s = document.getElementById('price-' + this.dataset.section);
				s && s.classList.remove('visibility-hidden'),
					this.toggleAddButton(
						!this.currentVariant.available,
						window.variantStrings.soldOut
					);
			});
	}
	toggleAddButton(e = !0, t, i) {
		const n = document.getElementById('product-form-' + this.dataset.section);
		if (n) {
			const s = n.querySelector('[name="add"]'),
				o = n.querySelector('[name="add"] > span');
			s &&
				(e
					? (s.setAttribute('disabled', !0), t && (o.textContent = t))
					: (s.removeAttribute('disabled'),
					  (o.textContent = window.variantStrings.addToCart)));
		}
	}
	setUnavailable() {
		const e = document.getElementById('product-form-' + this.dataset.section);
		var t = e.querySelector('[name="add"]');
		const i = e.querySelector('[name="add"] > span'),
			n = document.getElementById('price-' + this.dataset.section);
		t &&
			((i.textContent = window.variantStrings.unavailable),
			n && n.classList.add('visibility-hidden'));
	}
	getVariantData() {
		return (
			(this.variantData =
				this.variantData ||
				JSON.parse(
					this.querySelector('[type="application/json"]').textContent
				)),
			this.variantData
		);
	}
}
customElements.define('variant-selects', VariantSelects);
class VariantRadios extends VariantSelects {
	constructor() {
		super();
	}
	updateOptions() {
		const e = Array.from(this.querySelectorAll('fieldset'));
		this.options = e.map(
			(e) =>
				Array.from(e.querySelectorAll('input')).find((e) => e.checked).value
		);
	}
}
customElements.define('variant-radios', VariantRadios);
class CartNotification extends HTMLElement {
	constructor() {
		super(),
			(this.notification = document.getElementById('cart-notification')),
			(this.header = document.querySelector('sticky-header')),
			(this.onBodyClick = this.handleBodyClick.bind(this)),
			this.notification.addEventListener(
				'keyup',
				(t) => 'Escape' === t.code && this.close()
			),
			this.querySelectorAll('button[type="button"]').forEach((t) =>
				t.addEventListener('click', this.close.bind(this))
			);
	}
	open() {
		this.notification.classList.add('animate', 'active'),
			this.notification.addEventListener(
				'transitionend',
				() => {
					this.notification.focus(), trapFocus(this.notification);
				},
				{ once: !0 }
			),
			document.body.addEventListener('click', this.onBodyClick);
	}
	close() {
		this.notification.classList.remove('active'),
			document.body.removeEventListener('click', this.onBodyClick),
			removeTrapFocus(this.activeElement);
	}
	renderContents(e) {
		(this.productId = e.id),
			this.getSectionsToRender().forEach((t) => {
				document.getElementById(t.id).innerHTML = this.getSectionInnerHTML(
					e.sections[t.id],
					t.selector
				);
			}),
			this.header && this.header.reveal(),
			this.open();
	}
	getSectionsToRender() {
		return [
			{
				id: 'cart-notification-product',
				selector: '#cart-notification-product-' + this.productId,
			},
			{ id: 'cart-notification-button' },
			{ id: 'cart-icon-bubble' },
		];
	}
	getSectionInnerHTML(t, e = '.shopify-section') {
		return new DOMParser().parseFromString(t, 'text/html').querySelector(e)
			.innerHTML;
	}
	handleBodyClick(t) {
		const e = t.target;
		if (e !== this.notification && !e.closest('cart-notification')) {
			const i = e.closest('details-disclosure');
			(this.activeElement = i ? i.querySelector('summary') : null),
				this.close();
		}
	}
	setActiveElement(t) {
		this.activeElement = t;
	}
}
customElements.define('cart-notification', CartNotification);
class CartRemoveButton extends HTMLElement {
	constructor() {
		super(),
			this.addEventListener('click', (e) => {
				e.preventDefault(),
					this.closest('cart-items').updateQuantity(this.dataset.index, 0);
			});
	}
}
customElements.define('cart-remove-button', CartRemoveButton);
class CartItems extends HTMLElement {
	constructor() {
		super(),
			(this.lineItemStatusElement = document.getElementById(
				'shopping-cart-line-item-status'
			)),
			(this.currentItemCount = Array.from(
				this.querySelectorAll('[name="updates[]"]')
			).reduce((e, t) => e + parseInt(t.value), 0)),
			(this.debouncedOnChange = debounce((e) => {
				this.onChange(e);
			}, 300)),
			this.addEventListener('change', this.debouncedOnChange.bind(this));
	}
	onChange(e) {
		this.updateQuantity(
			e.target.dataset.index,
			e.target.value,
			document.activeElement.getAttribute('name')
		);
	}
	getSectionsToRender() {
		return [
			{
				id: 'main-cart-items',
				section: document.getElementById('main-cart-items').dataset.id,
				selector: '.js-contents',
			},
			{
				id: 'cart-icon-bubble',
				section: 'cart-icon-bubble',
				selector: '.shopify-section',
			},
			{
				id: 'cart-live-region-text',
				section: 'cart-live-region-text',
				selector: '.shopify-section',
			},
			{
				id: 'main-cart-footer',
				section: document.getElementById('main-cart-footer').dataset.id,
				selector: '.js-contents',
			},
		];
	}
	updateQuantity(s, e, r) {
		this.enableLoading(s);
		e = JSON.stringify({
			line: s,
			quantity: e,
			sections: this.getSectionsToRender().map((e) => e.section),
			sections_url: window.location.pathname,
		});
		fetch('' + routes.cart_change_url, { ...fetchConfig(), body: e })
			.then((e) => e.text())
			.then((e) => {
				const n = JSON.parse(e);
				this.classList.toggle('is-empty', 0 === n.item_count);
				const t = document.getElementById('main-cart-footer');
				t && t.classList.toggle('is-empty', 0 === n.item_count),
					this.getSectionsToRender().forEach((e) => {
						const t =
							document.getElementById(e.id).querySelector(e.selector) ||
							document.getElementById(e.id);
						t.innerHTML = this.getSectionInnerHTML(
							n.sections[e.section],
							e.selector
						);
					}),
					this.updateLiveRegions(s, n.item_count);
				const i = document.getElementById('CartItem-' + s);
				i &&
					i.querySelector(`[name="${r}"]`) &&
					i.querySelector(`[name="${r}"]`).focus(),
					this.disableLoading();
			})
			.catch(() => {
				this.querySelectorAll('.loading-overlay').forEach((e) =>
					e.classList.add('hidden')
				),
					(document.getElementById('cart-errors').textContent =
						window.cartStrings.error),
					this.disableLoading();
			});
	}
	updateLiveRegions(e, t) {
		this.currentItemCount === t &&
			(document
				.getElementById('Line-item-error-' + e)
				.querySelector('.cart-item__error-text').innerHTML =
				window.cartStrings.quantityError.replace(
					'[quantity]',
					document.getElementById('Quantity-' + e).value
				)),
			(this.currentItemCount = t),
			this.lineItemStatusElement.setAttribute('aria-hidden', !0);
		const n = document.getElementById('cart-live-region-text');
		n.setAttribute('aria-hidden', !1),
			setTimeout(() => {
				n.setAttribute('aria-hidden', !0);
			}, 1e3);
	}
	getSectionInnerHTML(e, t) {
		return new DOMParser().parseFromString(e, 'text/html').querySelector(t)
			.innerHTML;
	}
	enableLoading(e) {
		document
			.getElementById('main-cart-items')
			.classList.add('cart__items--disabled'),
			this.querySelectorAll(`#CartItem-${e} .loading-overlay`).forEach((e) =>
				e.classList.remove('hidden')
			),
			document.activeElement.blur(),
			this.lineItemStatusElement.setAttribute('aria-hidden', !1);
	}
	disableLoading() {
		document
			.getElementById('main-cart-items')
			.classList.remove('cart__items--disabled');
	}
}
customElements.define('cart-items', CartItems);
class DetailsDisclosure extends HTMLElement {
	constructor() {
		super(),
			(this.mainDetailsToggle = this.querySelector('details')),
			this.addEventListener('keyup', onKeyUpEscape),
			this.mainDetailsToggle.addEventListener(
				'focusout',
				this.onFocusOut.bind(this)
			);
	}
	onFocusOut() {
		setTimeout(() => {
			this.contains(document.activeElement) || this.close();
		});
	}
	close() {
		this.mainDetailsToggle.removeAttribute('open');
	}
}
customElements.define('details-disclosure', DetailsDisclosure);
class DetailsModal extends HTMLElement {
	constructor() {
		super(),
			(this.detailsContainer = this.querySelector('details')),
			(this.summaryToggle = this.querySelector('summary')),
			this.detailsContainer.addEventListener(
				'keyup',
				(t) => 'ESCAPE' === t.code.toUpperCase() && this.close()
			),
			this.summaryToggle.addEventListener(
				'click',
				this.onSummaryClick.bind(this)
			),
			this.querySelector('button[type="button"]').addEventListener(
				'click',
				this.close.bind(this)
			),
			this.summaryToggle.setAttribute('role', 'button'),
			this.summaryToggle.setAttribute('aria-expanded', 'false');
	}
	isOpen() {
		return this.detailsContainer.hasAttribute('open');
	}
	onSummaryClick(t) {
		t.preventDefault(),
			t.target.closest('details').hasAttribute('open')
				? this.close()
				: this.open(t);
	}
	onBodyClick(t) {
		(this.contains(t.target) &&
			!t.target.classList.contains('modal-overlay')) ||
			this.close(!1);
	}
	open(t) {
		(this.onBodyClickEvent =
			this.onBodyClickEvent || this.onBodyClick.bind(this)),
			t.target.closest('details').setAttribute('open', !0),
			document.body.addEventListener('click', this.onBodyClickEvent),
			document.body.classList.add('overflow-hidden'),
			trapFocus(
				this.detailsContainer.querySelector('[tabindex="-1"]'),
				this.detailsContainer.querySelector('input:not([type="hidden"])')
			);
	}
	close(t = !0) {
		removeTrapFocus(t ? this.summaryToggle : null),
			this.detailsContainer.removeAttribute('open'),
			document.body.removeEventListener('click', this.onBodyClickEvent),
			document.body.classList.remove('overflow-hidden');
	}
}
customElements.define('details-modal', DetailsModal);
class FacetFiltersForm extends HTMLElement {
	constructor() {
		super(),
			(this.onActiveFilterClick = this.onActiveFilterClick.bind(this)),
			(this.debouncedOnSubmit = debounce((e) => {
				this.onSubmitHandler(e);
			}, 500)),
			this.querySelector('form').addEventListener(
				'input',
				this.debouncedOnSubmit.bind(this)
			);
		const e = this.querySelector('#FacetsWrapperDesktop');
		e && e.addEventListener('keyup', onKeyUpEscape);
	}
	static setListeners() {
		window.addEventListener('popstate', (e) => {
			e = e.state ? e.state.searchParams : FacetFiltersForm.searchParamsInitial;
			e !== FacetFiltersForm.searchParamsPrev &&
				FacetFiltersForm.renderPage(e, null, !1);
		});
	}
	static toggleActiveFacets(t = !0) {
		document.querySelectorAll('.js-facet-remove').forEach((e) => {
			e.classList.toggle('disabled', t);
		});
	}
	static renderPage(r, a, e = !0) {
		FacetFiltersForm.searchParamsPrev = r;
		const t = FacetFiltersForm.getSections(),
			n = document.getElementById('ProductCount'),
			s = document.getElementById('ProductCountDesktop');
		document
			.getElementById('ProductGridContainer')
			.querySelector('.collection')
			.classList.add('loading'),
			n && n.classList.add('loading'),
			s && s.classList.add('loading'),
			t.forEach((e) => {
				const t = `${window.location.pathname}?section_id=${e.section}&` + r;
				e = (e) => e.url === t;
				FacetFiltersForm.filterData.some(e)
					? FacetFiltersForm.renderSectionFromCache(e, a)
					: FacetFiltersForm.renderSectionFromFetch(t, a);
			}),
			e && FacetFiltersForm.updateURLHash(r);
	}
	static renderSectionFromFetch(t, r) {
		fetch(t)
			.then((e) => e.text())
			.then((e) => {
				(FacetFiltersForm.filterData = [
					...FacetFiltersForm.filterData,
					{ html: e, url: t },
				]),
					FacetFiltersForm.renderFilters(e, r),
					FacetFiltersForm.renderProductGridContainer(e),
					FacetFiltersForm.renderProductCount(e);
			});
	}
	static renderSectionFromCache(e, t) {
		e = FacetFiltersForm.filterData.find(e).html;
		FacetFiltersForm.renderFilters(e, t),
			FacetFiltersForm.renderProductGridContainer(e),
			FacetFiltersForm.renderProductCount(e);
	}
	static renderProductGridContainer(e) {
		document.getElementById('ProductGridContainer').innerHTML = new DOMParser()
			.parseFromString(e, 'text/html')
			.getElementById('ProductGridContainer').innerHTML;
	}
	static renderProductCount(e) {
		e = new DOMParser()
			.parseFromString(e, 'text/html')
			.getElementById('ProductCount').innerHTML;
		const t = document.getElementById('ProductCount'),
			r = document.getElementById('ProductCountDesktop');
		(t.innerHTML = e),
			t.classList.remove('loading'),
			r && ((r.innerHTML = e), r.classList.remove('loading'));
	}
	static renderFilters(e, r) {
		const t = new DOMParser().parseFromString(e, 'text/html');
		e = t.querySelectorAll(
			'#FacetFiltersForm .js-filter, #FacetFiltersFormMobile .js-filter'
		);
		const a = (e) => {
				var t = r ? r.target.closest('.js-filter') : void 0;
				return !!t && e.dataset.index === t.dataset.index;
			},
			n = Array.from(e).filter((e) => !a(e));
		e = Array.from(e).find(a);
		n.forEach((e) => {
			document.querySelector(
				`.js-filter[data-index="${e.dataset.index}"]`
			).innerHTML = e.innerHTML;
		}),
			FacetFiltersForm.renderActiveFacets(t),
			FacetFiltersForm.renderAdditionalElements(t),
			e && FacetFiltersForm.renderCounts(e, r.target.closest('.js-filter'));
	}
	static renderActiveFacets(r) {
		['.active-facets-mobile', '.active-facets-desktop'].forEach((e) => {
			var t = r.querySelector(e);
			t && (document.querySelector(e).innerHTML = t.innerHTML);
		}),
			FacetFiltersForm.toggleActiveFacets(!1);
	}
	static renderAdditionalElements(t) {
		['.mobile-facets__open', '.mobile-facets__count', '.sorting'].forEach(
			(e) => {
				t.querySelector(e) &&
					(document.querySelector(e).innerHTML = t.querySelector(e).innerHTML);
			}
		),
			document
				.getElementById('FacetFiltersFormMobile')
				.closest('menu-drawer')
				.bindEvents();
	}
	static renderCounts(e, t) {
		var r = t.querySelector('.facets__selected');
		e.querySelector('.facets__selected') &&
			r &&
			(t.querySelector('.facets__selected').outerHTML =
				e.querySelector('.facets__selected').outerHTML);
	}
	static updateURLHash(e) {
		history.pushState(
			{ searchParams: e },
			'',
			'' + window.location.pathname + (e && '?'.concat(e))
		);
	}
	static getSections() {
		return [{ section: document.getElementById('product-grid').dataset.id }];
	}
	onSubmitHandler(e) {
		e.preventDefault();
		var t = new FormData(e.target.closest('form')),
			t = new URLSearchParams(t).toString();
		FacetFiltersForm.renderPage(t, e);
	}
	onActiveFilterClick(e) {
		e.preventDefault(), FacetFiltersForm.toggleActiveFacets();
		e =
			-1 == e.currentTarget.href.indexOf('?')
				? ''
				: e.currentTarget.href.slice(e.currentTarget.href.indexOf('?') + 1);
		FacetFiltersForm.renderPage(e);
	}
}
(FacetFiltersForm.filterData = []),
	(FacetFiltersForm.searchParamsInitial = window.location.search.slice(1)),
	(FacetFiltersForm.searchParamsPrev = window.location.search.slice(1)),
	customElements.define('facet-filters-form', FacetFiltersForm),
	FacetFiltersForm.setListeners();
class PriceRange extends HTMLElement {
	constructor() {
		super(),
			this.querySelectorAll('input').forEach((e) =>
				e.addEventListener('change', this.onRangeChange.bind(this))
			),
			this.setMinAndMaxValues();
	}
	onRangeChange(e) {
		this.adjustToValidValues(e.currentTarget), this.setMinAndMaxValues();
	}
	setMinAndMaxValues() {
		var e = this.querySelectorAll('input');
		const t = e[0],
			r = e[1];
		r.value && t.setAttribute('max', r.value),
			t.value && r.setAttribute('min', t.value),
			'' === t.value && r.setAttribute('min', 0),
			'' === r.value && t.setAttribute('max', r.getAttribute('max'));
	}
	adjustToValidValues(e) {
		var t = Number(e.value),
			r = Number(e.getAttribute('min')),
			a = Number(e.getAttribute('max'));
		t < r && (e.value = r), a < t && (e.value = a);
	}
}
customElements.define('price-range', PriceRange);
class FacetRemove extends HTMLElement {
	constructor() {
		super(),
			this.querySelector('a').addEventListener('click', (e) => {
				e.preventDefault();
				const t =
					this.closest('facet-filters-form') ||
					document.querySelector('facet-filters-form');
				t.onActiveFilterClick(e);
			});
	}
}
customElements.define('facet-remove', FacetRemove);
class PasswordModal extends DetailsModal {
	constructor() {
		super(),
			this.querySelector('input[aria-invalid="true"]') &&
				this.open({ target: this.querySelector('details') });
	}
}
customElements.define('password-modal', PasswordModal);
customElements.get('pickup-availability') ||
	customElements.define(
		'pickup-availability',
		class extends HTMLElement {
			constructor() {
				super(),
					this.hasAttribute('available') &&
						((this.errorHtml = this.querySelector(
							'template'
						).content.firstElementChild.cloneNode(!0)),
						(this.onClickRefreshList = this.onClickRefreshList.bind(this)),
						this.fetchAvailability(this.dataset.variantId));
			}
			fetchAvailability(e) {
				e =
					this.dataset.baseUrl +
					`variants/${e}/?section_id=pickup-availability`;
				fetch(e)
					.then((e) => e.text())
					.then((e) => {
						e = new DOMParser()
							.parseFromString(e, 'text/html')
							.querySelector('.shopify-section');
						this.renderPreview(e);
					})
					.catch((e) => {
						const t = this.querySelector('button');
						t && t.removeEventListener('click', this.onClickRefreshList),
							this.renderError();
					});
			}
			onClickRefreshList(e) {
				this.fetchAvailability(this.dataset.variantId);
			}
			renderError() {
				(this.innerHTML = ''),
					this.appendChild(this.errorHtml),
					this.querySelector('button').addEventListener(
						'click',
						this.onClickRefreshList
					);
			}
			renderPreview(e) {
				const t = document.querySelector('pickup-availability-drawer');
				if ((t && t.remove(), !e.querySelector('pickup-availability-preview')))
					return (this.innerHTML = ''), void this.removeAttribute('available');
				(this.innerHTML = e.querySelector(
					'pickup-availability-preview'
				).outerHTML),
					this.setAttribute('available', ''),
					document.body.appendChild(
						e.querySelector('pickup-availability-drawer')
					),
					this.querySelector('button').addEventListener('click', (e) => {
						document.querySelector('pickup-availability-drawer').show(e.target);
					});
			}
		}
	),
	customElements.get('pickup-availability-drawer') ||
		customElements.define(
			'pickup-availability-drawer',
			class extends HTMLElement {
				constructor() {
					super(),
						(this.onBodyClick = this.handleBodyClick.bind(this)),
						this.querySelector('button').addEventListener('click', () => {
							this.hide();
						}),
						this.addEventListener('keyup', () => {
							'ESCAPE' === event.code.toUpperCase() && this.hide();
						});
				}
				handleBodyClick(e) {
					const t = e.target;
					t == this ||
						t.closest('pickup-availability-drawer') ||
						'ShowPickupAvailabilityDrawer' == t.id ||
						this.hide();
				}
				hide() {
					this.removeAttribute('open'),
						document.body.removeEventListener('click', this.onBodyClick),
						document.body.classList.remove('overflow-hidden'),
						removeTrapFocus(this.focusElement);
				}
				show(e) {
					(this.focusElement = e),
						this.setAttribute('open', ''),
						document.body.addEventListener('click', this.onBodyClick),
						document.body.classList.add('overflow-hidden'),
						trapFocus(this);
				}
			}
		);
class PredictiveSearch extends HTMLElement {
	constructor() {
		super(),
			(this.cachedResults = {}),
			(this.input = this.querySelector('input[type="search"]')),
			(this.predictiveSearchResults = this.querySelector(
				'[data-predictive-search]'
			)),
			this.setupEventListeners();
	}
	setupEventListeners() {
		const e = this.querySelector('form.search');
		e.addEventListener('submit', this.onFormSubmit.bind(this)),
			this.input.addEventListener(
				'input',
				debounce((e) => {
					this.onChange(e);
				}, 300).bind(this)
			),
			this.input.addEventListener('focus', this.onFocus.bind(this)),
			this.addEventListener('focusout', this.onFocusOut.bind(this)),
			this.addEventListener('keyup', this.onKeyup.bind(this)),
			this.addEventListener('keydown', this.onKeydown.bind(this));
	}
	getQuery() {
		return this.input.value.trim();
	}
	onChange() {
		var e = this.getQuery();
		e.length ? this.getSearchResults(e) : this.close(!0);
	}
	onFormSubmit(e) {
		(this.getQuery().length &&
			!this.querySelector('[aria-selected="true"] a')) ||
			e.preventDefault();
	}
	onFocus() {
		var e = this.getQuery();
		e.length &&
			('true' === this.getAttribute('results')
				? this.open()
				: this.getSearchResults(e));
	}
	onFocusOut() {
		setTimeout(() => {
			this.contains(document.activeElement) || this.close();
		});
	}
	onKeyup(e) {
		switch (
			(this.getQuery().length || this.close(!0), e.preventDefault(), e.code)
		) {
			case 'ArrowUp':
				this.switchOption('up');
				break;
			case 'ArrowDown':
				this.switchOption('down');
				break;
			case 'Enter':
				this.selectOption();
		}
	}
	onKeydown(e) {
		('ArrowUp' !== e.code && 'ArrowDown' !== e.code) || e.preventDefault();
	}
	switchOption(t) {
		if (this.getAttribute('open')) {
			var s = 'up' === t;
			const i = this.querySelector('[aria-selected="true"]');
			t = this.querySelectorAll('li');
			let e = this.querySelector('li');
			(s && !i) ||
				((this.statusElement.textContent = ''),
				!s && i
					? (e = i.nextElementSibling || t[0])
					: s && (e = i.previousElementSibling || t[t.length - 1]),
				e !== i &&
					(e.setAttribute('aria-selected', !0),
					i && i.setAttribute('aria-selected', !1),
					this.setLiveRegionText(e.textContent),
					this.input.setAttribute('aria-activedescendant', e.id)));
		}
	}
	selectOption() {
		const e = this.querySelector(
			'[aria-selected="true"] a, [aria-selected="true"] button'
		);
		e && e.click();
	}
	getSearchResults(e) {
		const t = e.replace(' ', '-').toLowerCase();
		this.setLiveRegionLoadingState(),
			this.cachedResults[t]
				? this.renderSearchResults(this.cachedResults[t])
				: fetch(
						`${routes.predictive_search_url}?q=${encodeURIComponent(
							e
						)}&${encodeURIComponent(
							'resources[type]'
						)}=product&${encodeURIComponent(
							'resources[limit]'
						)}=4&section_id=predictive-search`
				  )
						.then((e) => {
							if (e.ok) return e.text();
							e = new Error(e.status);
							throw (this.close(), e);
						})
						.then((e) => {
							e = new DOMParser()
								.parseFromString(e, 'text/html')
								.querySelector('#shopify-section-predictive-search').innerHTML;
							(this.cachedResults[t] = e), this.renderSearchResults(e);
						})
						.catch((e) => {
							throw (this.close(), e);
						});
	}
	setLiveRegionLoadingState() {
		(this.statusElement =
			this.statusElement || this.querySelector('.predictive-search-status')),
			(this.loadingText =
				this.loadingText || this.getAttribute('data-loading-text')),
			this.setLiveRegionText(this.loadingText),
			this.setAttribute('loading', !0);
	}
	setLiveRegionText(e) {
		this.statusElement.setAttribute('aria-hidden', 'false'),
			(this.statusElement.textContent = e),
			setTimeout(() => {
				this.statusElement.setAttribute('aria-hidden', 'true');
			}, 1e3);
	}
	renderSearchResults(e) {
		(this.predictiveSearchResults.innerHTML = e),
			this.setAttribute('results', !0),
			this.setLiveRegionResults(),
			this.open();
	}
	setLiveRegionResults() {
		this.removeAttribute('loading'),
			this.setLiveRegionText(
				this.querySelector('[data-predictive-search-live-region-count-value]')
					.textContent
			);
	}
	getResultsMaxHeight() {
		return (
			(this.resultsMaxHeight =
				window.innerHeight -
				document
					.getElementById('shopify-section-header')
					.getBoundingClientRect().bottom),
			this.resultsMaxHeight
		);
	}
	open() {
		(this.predictiveSearchResults.style.maxHeight =
			this.resultsMaxHeight || this.getResultsMaxHeight() + 'px'),
			this.setAttribute('open', !0),
			this.input.setAttribute('aria-expanded', !0);
	}
	close(e = !1) {
		e && ((this.input.value = ''), this.removeAttribute('results'));
		const t = this.querySelector('[aria-selected="true"]');
		t && t.setAttribute('aria-selected', !1),
			this.input.setAttribute('aria-activedescendant', ''),
			this.removeAttribute('open'),
			this.input.setAttribute('aria-expanded', !1),
			(this.resultsMaxHeight = !1),
			this.predictiveSearchResults.removeAttribute('style');
	}
}
customElements.define('predictive-search', PredictiveSearch);
customElements.get('product-form') ||
	customElements.define(
		'product-form',
		class extends HTMLElement {
			constructor() {
				super(),
					(this.form = this.querySelector('form')),
					(this.form.querySelector('[name=id]').disabled = !1),
					this.form.addEventListener('submit', this.onSubmitHandler.bind(this)),
					(this.cartNotification = document.querySelector('cart-notification'));
			}
			onSubmitHandler(e) {
				e.preventDefault();
				const t = this.querySelector('[type="submit"]');
				if (!t.classList.contains('loading')) {
					this.handleErrorMessage(),
						this.cartNotification.setActiveElement(document.activeElement),
						t.setAttribute('aria-disabled', !0),
						t.classList.add('loading'),
						this.querySelector('.loading-overlay__spinner').classList.remove(
							'hidden'
						);
					const r = fetchConfig('javascript');
					(r.headers['X-Requested-With'] = 'XMLHttpRequest'),
						delete r.headers['Content-Type'];
					const s = new FormData(this.form);
					s.append(
						'sections',
						this.cartNotification.getSectionsToRender().map((e) => e.id)
					),
						s.append('sections_url', window.location.pathname),
						(r.body = s),
						fetch('' + routes.cart_add_url, r)
							.then((e) => e.json())
							.then((e) => {
								e.status
									? this.handleErrorMessage(e.description)
									: this.cartNotification.renderContents(e);
							})
							.catch((e) => {
								console.error(e);
							})
							.finally(() => {
								t.classList.remove('loading'),
									t.removeAttribute('aria-disabled'),
									this.querySelector('.loading-overlay__spinner').classList.add(
										'hidden'
									);
							});
				}
			}
			handleErrorMessage(e = !1) {
				(this.errorMessageWrapper =
					this.errorMessageWrapper ||
					this.querySelector('.product-form__error-message-wrapper')),
					(this.errorMessage =
						this.errorMessage ||
						this.errorMessageWrapper.querySelector(
							'.product-form__error-message'
						)),
					this.errorMessageWrapper.toggleAttribute('hidden', !e),
					e && (this.errorMessage.textContent = e);
			}
		}
	);
customElements.get('product-model') ||
	customElements.define(
		'product-model',
		class extends DeferredMedia {
			constructor() {
				super();
			}
			loadContent() {
				super.loadContent(),
					Shopify.loadFeatures([
						{
							name: 'model-viewer-ui',
							version: '1.0',
							onLoad: this.setupModelViewerUI.bind(this),
						},
					]);
			}
			setupModelViewerUI(e) {
				e ||
					(this.modelViewerUI = new Shopify.ModelViewerUI(
						this.querySelector('model-viewer')
					));
			}
		}
	),
	(window.ProductModel = {
		loadShopifyXR() {
			Shopify.loadFeatures([
				{
					name: 'shopify-xr',
					version: '1.0',
					onLoad: this.setupShopifyXR.bind(this),
				},
			]);
		},
		setupShopifyXR(e) {
			e ||
				(window.ShopifyXR
					? (document.querySelectorAll('[id^="ProductJSON-"]').forEach((e) => {
							window.ShopifyXR.addModels(JSON.parse(e.textContent)), e.remove();
					  }),
					  window.ShopifyXR.setupXRElements())
					: document.addEventListener('shopify_xr_initialized', () =>
							this.setupShopifyXR()
					  ));
		},
	}),
	window.addEventListener('DOMContentLoaded', () => {
		Shopify.designMode &&
			document
				.querySelectorAll('[data-shopify-xr-hidden]')
				.forEach((e) => e.classList.add('hidden')),
			window.ProductModel && window.ProductModel.loadShopifyXR();
	});
customElements.get('share-button') ||
	customElements.define(
		'share-button',
		class extends DetailsDisclosure {
			constructor() {
				super(),
					(this.elements = {
						shareButton: this.querySelector('button'),
						shareSummary: this.querySelector('summary'),
						closeButton: this.querySelector('.share-button__close'),
						successMessage: this.querySelector('[id^="ShareMessage"]'),
						urlInput: this.querySelector('input'),
					}),
					(this.urlToShare = this.elements.urlInput
						? this.elements.urlInput.value
						: document.location.href),
					navigator.share
						? (this.mainDetailsToggle.setAttribute('hidden', ''),
						  this.elements.shareButton.classList.remove('hidden'),
						  this.elements.shareButton.addEventListener('click', () => {
								navigator.share({
									url: this.urlToShare,
									title: document.title,
								});
						  }))
						: (this.addAccessibilityAttributes(),
						  this.mainDetailsToggle.addEventListener(
								'toggle',
								this.toggleDetails.bind(this)
						  ),
						  this.mainDetailsToggle
								.querySelector('.share-button__copy')
								.addEventListener('click', this.copyToClipboard.bind(this)),
						  this.mainDetailsToggle
								.querySelector('.share-button__close')
								.addEventListener('click', this.close.bind(this)));
			}
			addAccessibilityAttributes() {
				this.elements.shareSummary.setAttribute('role', 'button'),
					this.elements.shareSummary.setAttribute('aria-expanded', 'false'),
					this.elements.shareSummary.setAttribute(
						'aria-controls',
						this.elements.shareSummary.nextElementSibling.id
					);
			}
			toggleDetails() {
				this.mainDetailsToggle.open ||
					(this.elements.successMessage.classList.add('hidden'),
					(this.elements.successMessage.textContent = ''),
					this.elements.closeButton.classList.add('hidden'),
					this.elements.shareSummary.focus()),
					this.elements.shareSummary.setAttribute(
						'aria-expanded',
						this.mainDetailsToggle.open
					);
			}
			copyToClipboard() {
				navigator.clipboard.writeText(this.elements.urlInput.value).then(() => {
					this.elements.successMessage.classList.remove('hidden'),
						(this.elements.successMessage.textContent =
							window.accessibilityStrings.shareSuccess),
						this.elements.closeButton.classList.remove('hidden'),
						this.elements.closeButton.focus();
				});
			}
		}
	);
