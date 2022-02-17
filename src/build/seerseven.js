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
function add(s2, p) {
  s2.classList.add(p);
}
function remove(s2, p) {
  s2.classList.remove(p);
}
function contains(s2, p) {
  s2.classList.contains(p);
}
function toggle(s2, p1, p2) {
  s2.classList.toggle(p1, p2);
}
function replace(s2, p1, p2) {
  s2.classList.replace(p1, p2);
}
function len(s2) {
  s2.length();
}
function setAttr(s2, p, v) {
  s2.setAttribute(p, v);
}
function getAttr(s2, p, v) {
  s2.getAttribute(p, v);
}
function switchClass(s2, p1, p2) {
  $(s2).switchClass(p1, p2, 0);
}
function attr(s2, p, v) {
  $(s2).attr(p, v);
}
function prop(s2, p, v) {
  $(s2).prop(p, v);
}
function hasClass(s2, p) {
  $(s2).hasClass(p);
}
function addClass(s2, p) {
  $(s2).addClass(p);
}
function html(s2) {
  $(s2).html();
}
function removeClass(s2, p) {
  $(s2).removeClass(p);
}
function toggleClass(s2, p1, p2) {
  $(s2).toggleClass(p1, p2);
}
function val(s2) {
  $(s2).v();
}
function css(s2, p, v) {
  $(s2).css(cssList[p], v);
}
function data(s2, p, v) {
  $(s2).data(p, v);
}
function append(s2, p) {
  $(s2).appendTo(p);
}
function insert(m, s2, p) {
  if (m === "before") {
    $(s2).insertBefore(p);
  }
  if (m === "after") {
    $(s2).insertAfter(p);
  }
}
function prepend(s2, p) {
  $(s2).prependTo(p);
}
function wrap(s2, v, i) {
  if (i === void 0) {
    $(s2).wrap("<div class='" + v + "'></div>");
  }
  if (i !== void 0) {
    $(s2).wrap("<div id='" + i + "'class='" + v + "'></div>");
  }
}
function inner(s2, v, i) {
  if (i === void 0) {
    $(s2).wrap("<div class='" + v + "'></div>");
  }
  if (i !== void 0) {
    $(s2).wrap("<div id='" + i + "'class='" + v + "'></div>");
  }
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
  prop,
  append,
  prepend,
  wrap,
  inner,
  insert
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
  methodList[m](s, p);
}
function newID(i, v) {
  s = elementsList["id"](i);
  methodList["attr"](s, "id", v);
}

// src/js/seerseven.js
document.addEventListener("DOMContentLoaded", function() {
  change("id", "page-index", "add", "SUCK-MY-BALLS");
  const div = "block-be2ef39cad6b4a7b9323e5d661b095bc";
  const main = "block-6d55f0a3e06c494e9a42d3a4349643ae";
  const content = newID(main, "mainContent");
  const newDiv = newID(div, "newDiv");
  console.log(content);
  console.log(newDiv);
  prepend("#newDiv", "#mainContent");
  wrap("#page-index", "wrapper", "pageWrapper");
  inner("#mainContent", "inner-wrapper");
  insert("before", "#newDiv", "#mainContent");
  $(".wrapper").css({
    "background-color": "#f8f8f8",
    width: "100%",
    "max-width": "1000px",
    margin: "20px auto"
  });
});
