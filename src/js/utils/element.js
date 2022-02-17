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
export function add(s, p) {
	s.classList.add(p);
}
export function remove(s, p) {
	s.classList.remove(p);
}
export function contains(s, p) {
	s.classList.contains(p);
}
export function toggle(s, p1, p2) {
	s.classList.toggle(p1, p2);
}
export function replace(s, p1, p2) {
	s.classList.replace(p1, p2);
}
export function len(s) {
	s.length();
}
export function setAttr(s, p, v) {
	s.setAttribute(p, v);
}
export function getAttr(s, p, v) {
	s.getAttribute(p, v);
}
export function switchClass(s, p1, p2) {
	$(s).switchClass(p1, p2, 0);
}
export function attr(s, p, v) {
	$(s).attr(p, v);
}
export function prop(s, p, v) {
	$(s).prop(p, v);
}
export function hasClass(s, p) {
	$(s).hasClass(p);
}
export function addClass(s, p) {
	$(s).addClass(p);
}
export function html(s) {
	$(s).html();
}
export function removeClass(s, p) {
	$(s).removeClass(p);
}
export function toggleClass(s, p1, p2) {
	$(s).toggleClass(p1, p2);
}
export function val(s) {
	$(s).v();
}
export function css(s, p, v) {
	$(s).css(cssList[p], v);
}
export function data(s, p, v) {
	$(s).data(p, v);
}
export function append(s, p) {
	$(s).appendTo(p);
}
export function insert(m, s, p) {
	if (m === 'before') {
		$(s).insertBefore(p);
	}
	if (m === 'after') {
		$(s).insertAfter(p);
	}
}
export function prepend(s, p) {
	$(s).prependTo(p);
}
export function wrap(s, v, i) {
	if (i === undefined) {
		$(s).wrap("<div class='" + v + "'></div>");
	}
	if (i !== undefined) {
		$(s).wrap("<div id='" + i + "'" + "class='" + v + "'></div>");
	}
}
export function inner(s, v, i) {
	if (i === undefined) {
		$(s).wrap("<div class='" + v + "'></div>");
	}
	if (i !== undefined) {
		$(s).wrap("<div id='" + i + "'" + "class='" + v + "'></div>");
	}
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
	append,
	prepend,
	wrap,
	inner,
	insert,
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
	id: getId,
	qry: getQry,
	all: getAll,
	class: getClass,
	tag: getTag,
};

export function change(e, i, m, p) {
	s = elementsList[e](i);
	methodList[m](s, p);
}

export function newID(i, v) {
	s = elementsList['id'](i);
	methodList['attr'](s, 'id', v);
}

export function setID(i, v) {
	s = elementsList['class'](i);
	methodList['attr'](s, 'id', v);
}
