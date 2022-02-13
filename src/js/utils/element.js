export const cssList = {
	bgc: 'background-color',
	color: 'color',
	op: 'opacity',
	w: 'width',
	h: 'heigh',
	dis: 'display',
	raid: 'border-radius',
	vis: 'visibility',
	z: 'z-index',
	pos: 'position',
};
export const classList = {
	bg: 'sticky-bg',
	bgv: 'sticky-bgv',
	hide: 'sticky:hide',
	show: 'sticky:show',
	colormodeOn: 'colormode:on',
	colormodeOff: 'colormode:off',
	transOn: 'trans:on',
	transOff: 'trans:off',
	dark: 'dark',
	light: 'light',
	blue: 'header-blue',
};
export function add(prop, selector) {
	selector.classList.add(classList[prop]);
}
export function remove(prop, selector) {
	selector.classList.remove(classList[prop]);
}
export function contains(prop, selector) {
	selector.classList.contains(classList[prop]);
}
export function toggle(prop1, prop2, selector) {
	selector.classList.toggle(classList[prop1], classList[prop2]);
}
export function replace(prop1, prop2, selector) {
	selector.classList.replace(prop1, prop2);
}
export function length(selector) {
	selector.length();
}
export function setAttr(prop, val, selector) {
	selector.setAttribute(prop, val);
}
export function getAttr(prop, val, selector) {
	selector.getAttribute(prop, val);
}
export function switchClass(prop1, prop2, selector) {
	$(selector).switchClass(prop1, prop2, 0);
}
export function attr(prop, val, selector) {
	$(selector).attr(prop, val);
}
export function prop(prop, val, selector) {
	$(selector).prop(prop, val);
}
export function hasClass(prop, selector) {
	$(selector).hasClass(prop);
}
export function addClass(prop, selector) {
	$(selector).addClass(prop);
}
export function html(selector) {
	$(selector).html();
}
export function removeClass(prop, selector) {
	$(selector).removeClass(prop);
}
export function toggleClass(prop1, prop2, selector) {
	$(selector).toggleClass(prop1, prop2);
}
export function val(selector) {
	$(selector).val();
}
export function css(prop, val, selector) {
	$(selector).css(cssList[prop], val);
}
export function data(prop, val, selector) {
	$(selector).data(prop, val);
}
export const methodList = {
	add,
	remove,
	contains,
	replace,
	toggle,
	switchClass,
	hasClass,
	addClass,
	css,
	val,
	length,
	setAttr,
	getAttr,
	attr,
	html,
	removeClass,
	toggleClass,
	data,
	prop,
};
export function getId(x) {
	return document.getElementById(x);
}
export function getQry(x) {
	return document.querySelector(x);
}
export function getAll(x) {
	return document.querySelectorAll(x);
}
export function getClass(x) {
	return document.getElementsByClassName(x);
}
export function getTag(x) {
	return document.getElementsByTagName(x);
}
export const elementsList = {
	getId,
	getQry,
	getAll,
	getClass,
	getTag,
};
export function change(elm, iD, meth, prop) {
	var src = elementsList[elm](iD);
	methodList[meth](prop, src);
}
