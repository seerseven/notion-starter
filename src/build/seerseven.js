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
var classList = {
  bg: "sticky-bg",
  bgv: "sticky-bgv",
  hide: "sticky:hide",
  show: "sticky:show",
  colormodeOn: "colormode:on",
  colormodeOff: "colormode:off",
  transOn: "trans:on",
  transOff: "trans:off",
  dark: "dark",
  light: "light",
  blue: "header-blue"
};
function add2(prop2, selector) {
  selector.classList.add(classList[prop2]);
}
function remove(prop2, selector) {
  selector.classList.remove(classList[prop2]);
}
function contains(prop2, selector) {
  selector.classList.contains(classList[prop2]);
}
function toggle(prop1, prop2, selector) {
  selector.classList.toggle(classList[prop1], classList[prop2]);
}
function replace(prop1, prop2, selector) {
  selector.classList.replace(prop1, prop2);
}
function length(selector) {
  selector.length();
}
function setAttr(prop2, val2, selector) {
  selector.setAttribute(prop2, val2);
}
function getAttr(prop2, val2, selector) {
  selector.getAttribute(prop2, val2);
}
function switchClass(prop1, prop2, selector) {
  $(selector).switchClass(prop1, prop2, 0);
}
function attr(prop2, val2, selector) {
  $(selector).attr(prop2, val2);
}
function prop(prop2, val2, selector) {
  $(selector).prop(prop2, val2);
}
function hasClass(prop2, selector) {
  $(selector).hasClass(prop2);
}
function addClass(prop2, selector) {
  $(selector).addClass(prop2);
}
function html(selector) {
  $(selector).html();
}
function removeClass(prop2, selector) {
  $(selector).removeClass(prop2);
}
function toggleClass(prop1, prop2, selector) {
  $(selector).toggleClass(prop1, prop2);
}
function val(selector) {
  $(selector).val();
}
function css(prop2, val2, selector) {
  $(selector).css(cssList[prop2], val2);
}
function data(prop2, val2, selector) {
  $(selector).data(prop2, val2);
}
var methodList = {
  add: add2,
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
  prop
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
var elementsList = {
  getId,
  getQry,
  getAll,
  getClass,
  getTag
};
function change(elm, iD, meth, prop2) {
  var src = elementsList[elm](iD);
  methodList[meth](prop2, src);
}

// src/js/seerseven.js
AOS.init();
change(getID, "block-50026b0adf9c46bdbeef004adaa17c67", add, "notion-z");
