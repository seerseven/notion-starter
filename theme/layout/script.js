const cssList = {
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
const classList = {
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
function add(selector, prop) {
	selector.classList.add(prop);
}
function remove(prop, selector) {
	selector.classList.remove(classList[prop]);
}
function contains(prop, selector) {
	selector.classList.contains(classList[prop]);
}
function toggle(prop1, prop2, selector) {
	selector.classList.toggle(classList[prop1], classList[prop2]);
}
function replace(prop1, prop2, selector) {
	selector.classList.replace(prop1, prop2);
}
function len(selector) {
	selector.length();
}
function setAttr(prop, val, selector) {
	selector.setAttribute(prop, val);
}
function getAttr(prop, val, selector) {
	selector.getAttribute(prop, val);
}
function switchClass(prop1, prop2, selector) {
	$(selector).switchClass(prop1, prop2, 0);
}
function attr(prop, val, selector) {
	$(selector).attr(prop, val);
}
function prop(prop, val, selector) {
	$(selector).prop(prop, val);
}
function hasClass(prop, selector) {
	$(selector).hasClass(prop);
}
function addClass(prop, selector) {
	$(selector).addClass(prop);
}
function html(selector) {
	$(selector).html();
}
function removeClass(prop, selector) {
	$(selector).removeClass(prop);
}
function toggleClass(prop1, prop2, selector) {
	$(selector).toggleClass(prop1, prop2);
}
function val(selector) {
	$(selector).val();
}
function css(prop, val, selector) {
	$(selector).css(cssList[prop], val);
}
function data(prop, val, selector) {
	$(selector).data(prop, val);
}
const methodList = {
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

function getId(x) {
	return document.getElementById(x);
}
function getQry(x) {
	return document.querySelector(x);
}
function getAll(x) {
	return document.querySelectorAll(x);
}
function getClass(x) {
	return document.getElementsByClassName(x);
}
function getTag(x) {
	return document.getElementsByTagName(x);
}

const elementsList = {
	id: getId,
	qry: getQry,
	all: getAll,
	class: getClass,
	tag: getTag,
};

function change(elm, iD, meth, prop) {
	var src = elementsList[elm](iD);
	methodList[meth](src, prop);
}

// const fuck = change('id', 'pageindex', 'add', 'fuckme');
// console.log(fuck);
