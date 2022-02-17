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
function add(s, p) {
	s.classList.add(p);
}
function remove(s, p) {
	s.classList.remove(p);
}
function contains(s, p) {
	s.classList.contains(p);
}
function toggle(s, p1, p2) {
	s.classList.toggle(p1, p2);
}
function replace(s, p1, p2) {
	s.classList.replace(p1, p2);
}
function len(s) {
	s.length();
}
function setAttr(s, p, v) {
	s.setAttribute(p, v);
}
function getAttr(s, p, v) {
	s.getAttribute(p, v);
}
function switchClass(s, p1, p2) {
	$(s).switchClass(p1, p2, 0);
}
function attr(s, p, v) {
	$(s).attr(p, v);
}
function prop(s, p, v) {
	$(s).prop(p, v);
}
function hasClass(s, p) {
	$(s).hasClass(p);
}
function addClass(s, p) {
	$(s).addClass(p);
}
function html(s) {
	$(s).html();
}
function removeClass(s, p) {
	$(s).removeClass(p);
}
function toggleClass(s, p1, p2) {
	$(s).toggleClass(p1, p2);
}
function val(s) {
	$(s).v();
}
function css(s, p, v) {
	$(s).css(cssList[p], v);
}
function data(s, p, v) {
	$(s).data(p, v);
}
function append(s, p) {
	$(s).appendTo(p);
}
function insert(m, s, p) {
	if (m === 'before') {
		$(s).insertBefore(p);
	}
	if (m === 'after') {
		$(s).insertAfter(p);
	}
}
function prepend(s, p) {
	$(s).prependTo(p);
}
function wrap(s, v, i) {
	if (i === undefined) {
		$(s).wrap("<div class='" + v + "'></div>");
	}
	if (i !== undefined) {
		$(s).wrap("<div id='" + i + "'" + "class='" + v + "'></div>");
	}
}
function inner(s, v, i) {
	if (i === undefined) {
		$(s).wrap("<div class='" + v + "'></div>");
	}
	if (i !== undefined) {
		$(s).wrap("<div id='" + i + "'" + "class='" + v + "'></div>");
	}
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
	append,
	prepend,
	wrap,
	inner,
	insert,
};
function getId(e) {
	return document.getElementById(e);
}
function getQry(e) {
	return document.querys(e);
}
function getAll(e) {
	return document.querysAll(e);
}
function getClass(e) {
	return document.getElementsByClassName(e);
}
function getTag(e) {
	return document.getElementsByTagName(e);
}
const elementsList = {
	id: getId,
	qry: getQry,
	all: getAll,
	class: getClass,
	tag: getTag,
};

function change(e, i, m, p) {
	s = elementsList[e](i);
	methodList[m](s, p);
}

function newID(i, v) {
	s = elementsList['id'](i);
	methodList['attr'](s, 'id', v);
}

function setID(i, v) {
	s = elementsList['class'](i);
	methodList['attr'](s, 'id', v);
}

change('id', 'page-index', 'add', 'SUCK-MY-BALLS');

const div = 'block-be2ef39cad6b4a7b9323e5d661b095bc';
const main = 'block-6d55f0a3e06c494e9a42d3a4349643ae';

const content = newID(main, 'mainContent');
const newDiv = newID(div, 'newDiv');

prepend('#newDiv', '#mainContent');
wrap('#page-index', 'wrapper', 'pageWrapper');
inner('#mainContent', 'inner-wrapper');

insert('before', '#newDiv', '#mainContent');
$('.wrapper').css({
	'background-color': '#f8f8f8',
	width: '100%',
	'max-width': '1000px',
	margin: '20px auto',
});

// setID('wrapper', 'pageWrapper');

console.log(content);
// const fuck = change('id', 'pageindex', 'add', 'fuckme');
// console.log(fuck);
