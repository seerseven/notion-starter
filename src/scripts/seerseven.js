// src/js/utils/element.js
var cssList = {
  bgc: "background-color",
  color: "color",
  op: "opacity",
  w: "width",
  h: "heigh",
  dis: "display",
  raid: "border-radius",
  vis: "visibility",
  z: "z-index",
  pos: "position"
};
function add(p, s2) {
  s2.classList.add(p);
}
function remove(p, s2) {
  s2.classList.remove(p);
}
function contains(p, s2) {
  s2.classList.contains(p);
}
function toggle(p1, p2, s2) {
  s2.classList.toggle(p1, p2);
}
function replace(p1, p2, s2) {
  s2.classList.replace(p1, p2);
}
function len(s2) {
  s2.length();
}
function setAttr(p, v, s2) {
  s2.setAttribute(p, v);
}
function getAttr(p, v, s2) {
  s2.getAttribute(p, v);
}
function switchClass(p1, p2, s2) {
  $(s2).switchClass(p1, p2, 0);
}
function attr(p, v, s2) {
  $(s2).attr(p, v);
}
function prop(p, v, s2) {
  $(s2).prop(p, v);
}
function hasClass(p, s2) {
  $(s2).hasClass(p);
}
function addClass(p, s2) {
  $(s2).addClass(p);
}
function html(s2) {
  $(s2).html();
}
function removeClass(p, s2) {
  $(s2).removeClass(p);
}
function toggleClass(p1, p2, s2) {
  $(s2).toggleClass(p1, p2);
}
function val(s2) {
  $(s2).v();
}
function css(p, v, s2) {
  $(s2).css(cssList[p], v);
}
function data(p, v, s2) {
  $(s2).data(p, v);
}
var methodList = {
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
  prop
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
var elementsList = {
  id: getId,
  qry: getQry,
  all: getAll,
  class: getClass,
  tag: getTag
};
function change(e, i, m, p) {
  s = elementsList[e](i);
  methodList[m](p, s);
}

// src/js/seerseven.js
document.addEventListener("DOMContentLoaded", function() {
  change("id", "page-index", "add", "SUCK-IT-NOTION-imyourgod");
});
