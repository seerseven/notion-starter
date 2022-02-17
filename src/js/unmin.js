var cssList = {
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
	},
	classList = {
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
function add(t, s) {
	s.classList.add(classList[t]);
}
function remove(t, s) {
	s.classList.remove(classList[t]);
}
function contains(t, s) {
	s.classList.contains(classList[t]);
}
function toggle(t, s, e) {
	e.classList.toggle(classList[t], classList[s]);
}
function replace(t, s, e) {
	e.classList.replace(t, s);
}
function length(t) {
	t.length();
}
function setAttr(t, s, e) {
	e.setAttribute(t, s);
}
function getAttr(t, s, e) {
	e.getAttribute(t, s);
}
function switchClass(t, s, e) {
	$(e).switchClass(t, s, 0);
}
function attr(t, s, e) {
	$(e).attr(t, s);
}
function prop(t, s, e) {
	$(e).prop(t, s);
}
function hasClass(t, s) {
	$(s).hasClass(t);
}
function addClass(t, s) {
	$(s).addClass(t);
}
function html(t) {
	$(t).html();
}
function removeClass(t, s) {
	$(s).removeClass(t);
}
function toggleClass(t, s, e) {
	$(e).toggleClass(t, s);
}
function val(t) {
	$(t).val();
}
function css(t, s, e) {
	$(e).css(cssList[t], s);
}
function data(t, s, e) {
	$(e).data(t, s);
}
var methodList = {
	add: add,
	remove: remove,
	contains: contains,
	replace: replace,
	toggle: toggle,
	switchClass: switchClass,
	hasClass: hasClass,
	addClass: addClass,
	css: css,
	val: val,
	length: length,
	setAttr: setAttr,
	getAttr: getAttr,
	attr: attr,
	html: html,
	removeClass: removeClass,
	toggleClass: toggleClass,
	data: data,
	prop: prop,
};
function getId(t) {
	return document.getElementById(t);
}
function getQry(t) {
	return document.querySelector(t);
}
function getAll(t) {
	return document.querySelectorAll(t);
}
function getClass(t) {
	return document.getElementsByClassName(t);
}
function getTag(t) {
	return document.getElementsByTagName(t);
}
var elementsList = {
	getId: getId,
	getQry: getQry,
	getAll: getAll,
	getClass: getClass,
	getTag: getTag,
};
function change(t, s, e, a) {
	t = elementsList[t](s);
	methodList[e](a, t);
}
document.addEventListener('DOMContentLoaded', function () {
	change('id', 'page-index', 'add', 'fuckme');
});