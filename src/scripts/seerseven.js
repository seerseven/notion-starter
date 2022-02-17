// src/js/utils/element.js
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
function add(prop, selector) {
  selector.classList.add(classList[prop]);
}
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

// src/js/seerseven.js
var element = document.getElementById(pageindex);
add(pageindex, "i-added-this-class");
console.log(elementsList.getID);
