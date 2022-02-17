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
export function add(p, s) {
	s.classList.add(p);
}
export function remove(p, s) {
	s.classList.remove(p);
}
export function contains(p, s) {
	s.classList.contains(p);
}
export function toggle(p1, p2, s) {
	s.classList.toggle(p1, p2);
}
export function replace(p1, p2, s) {
	s.classList.replace(p1, p2);
}
export function len(s) {
	s.length();
}
export function setAttr(p, v, s) {
	s.setAttribute(p, v);
}
export function getAttr(p, v, s) {
	s.getAttribute(p, v);
}
export function switchClass(p1, p2, s) {
	$(s).switchClass(p1, p2, 0);
}
export function attr(p, v, s) {
	$(s).attr(p, v);
}
export function prop(p, v, s) {
	$(s).prop(p, v);
}
export function hasClass(p, s) {
	$(s).hasClass(p);
}
export function addClass(p, s) {
	$(s).addClass(p);
}
export function html(s) {
	$(s).html();
}
export function removeClass(p, s) {
	$(s).removeClass(p);
}
export function toggleClass(p1, p2, s) {
	$(s).toggleClass(p1, p2);
}
export function val(s) {
	$(s).v();
}
export function css(p, v, s) {
	$(s).css(cssList[p], v);
}
export function data(p, v, s) {
	$(s).data(p, v);
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
	len,
	setAttr,
	getAttr,
	attr,
	html,
	removeClass,
	toggleClass,
	data,
	prop,
};
export function getId(e) {
	return document.getElementById(e);
}
export function getQry(e) {
	return document.querys(e);
}
export function getAll(e) {
	return document.querysAll(e);
}
export function getClass(e) {
	return document.getElementsByClassName(e);
}
export function getTag(e) {
	return document.getElementsByTagName(e);
}
export const elementsList = {
	getId,
	getQry,
	getAll,
	getClass,
	getTag,
};
export function change(e, i, m, p) {
	s = elementsList[e](i);
	methodList[m](p, s);
}
