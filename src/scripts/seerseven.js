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

// src/js/seerseven.js
var element = document.getElementById(pageindex);
add(element, "i-added-this-class");
console.log(element);
