// src/js/shopify/customelements.js
function sticky() {
  class StickyHeader extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.header = document.getElementById("shopify-section-header");
      this.headerBounds = {};
      this.currentScrollTop = 0;
      this.preventReveal = false;
      this.predictiveSearch = this.querySelector("predictive-search");
      this.darkmodeIcon = this.querySelector("sticky-darkmode");
      this.onScrollHandler = this.onScroll.bind(this);
      this.hideHeaderOnScrollUp = () => this.preventReveal = true;
      this.addEventListener("preventHeaderReveal", this.hideHeaderOnScrollUp);
      window.addEventListener("scroll", this.onScrollHandler, false);
      this.createObserver();
    }
    disconnectedCallback() {
      this.removeEventListener("preventHeaderReveal", this.hideHeaderOnScrollUp);
      window.removeEventListener("scroll", this.onScrollHandler);
    }
    createObserver() {
      let observer = new IntersectionObserver((entries, observer2) => {
        this.headerBounds = entries[0].intersectionRect;
        observer2.disconnect();
      });
      observer.observe(this.header);
    }
    onScroll() {
      const scrollTop2 = window.pageYOffset || document.documentElement.scrollTop;
      if (this.predictiveSearch && this.predictiveSearch.isOpen)
        return;
      if (scrollTop2 > this.currentScrollTop && scrollTop2 > this.headerBounds.bottom) {
        requestAnimationFrame(this.hide.bind(this));
      } else if (scrollTop2 < this.currentScrollTop && scrollTop2 > this.headerBounds.bottom) {
        if (!this.preventReveal) {
          requestAnimationFrame(this.reveal.bind(this));
        } else {
          window.clearTimeout(this.isScrolling);
          this.isScrolling = setTimeout(() => {
            this.preventReveal = false;
          }, 66);
          requestAnimationFrame(this.hide.bind(this));
        }
      } else if (scrollTop2 <= this.headerBounds.top) {
        requestAnimationFrame(this.reset.bind(this));
      }
      this.currentScrollTop = scrollTop2;
    }
    hide() {
      const darkMode = this.darkmodeIcon;
      this.header.classList.add("shopify-section-header-hidden", "shopify-section-header-sticky");
      this.closeMenuDisclosure();
      this.closeSearchModal();
      darkMode.classList.add("sticky:hide");
      if (darkMode.classList.contains("sticky-bg")) {
        darkMode.classList.remove("sticky-bg");
      }
      if (darkMode.classList.contains("sticky-bgv")) {
        darkMode.classList.remove("sticky-bgv");
      }
    }
    reveal() {
      const darkMode = this.darkmodeIcon;
      const html = document.documentElement;
      this.header.classList.add("shopify-section-header-sticky", "animate");
      this.header.classList.remove("shopify-section-header-hidden");
      darkMode.classList.remove("sticky:hide");
      darkMode.classList.add("sticky:show");
      if (darkMode.classList.contains("colormode:off")) {
        if (html.classList.contains("dark")) {
          darkMode.classList.add("sticky-bgv");
        }
        if (html.classList.contains("light")) {
          darkMode.classList.add("sticky-bgv");
        }
      }
    }
    reset() {
      const darkMode = this.darkmodeIcon;
      const html = document.documentElement;
      const darkToggle = document.getElementById("sticky-darkmode-toggle");
      function switchIconBG() {
        if (html.classList.contains("dark")) {
          darkToggle.classList.remove("sticky-bg");
          darkToggle.classList.add("sticky-bgv");
        }
        if (html.classList.contains("light")) {
          darkToggle.classList.remove("sticky-bgv");
          darkToggle.classList.add("sticky-bg");
        }
      }
      let themeToggle2 = document.querySelector('.theme-switch input[type="checkbox"]');
      themeToggle2.onclick = function() {
        switchIconBG();
      };
      this.header.classList.remove("shopify-section-header-hidden", "shopify-section-header-sticky", "animate");
      darkMode.classList.remove("sticky:hide");
      darkMode.classList.add("sticky:show");
      if (darkMode.classList.contains("colormode:on")) {
        darkMode.classList.remove("sticky-bg");
        darkMode.classList.remove("sticky-bgv");
      }
      if (darkMode.classList.contains("colormode:off")) {
        if (html.classList.contains("trans:off")) {
          darkMode.classList.add("sticky-bgv");
        }
        if (html.classList.contains("trans:on")) {
          if (html.classList.contains("dark")) {
            darkMode.classList.remove("sticky-bg");
            darkMode.classList.add("sticky-bgv");
          }
          if (html.classList.contains("light")) {
            darkMode.classList.remove("sticky-bgv");
            darkMode.classList.add("sticky-bg");
          }
        }
      }
    }
    closeMenuDisclosure() {
      this.disclosures = this.disclosures || this.header.querySelectorAll("details-disclosure");
      this.disclosures.forEach((disclosure) => disclosure.close());
    }
    closeSearchModal() {
      this.searchModal = this.searchModal || this.header.querySelector("details-modal");
      this.searchModal.close(false);
    }
  }
  customElements.define("sticky-header", StickyHeader);
}
function local() {
  class LocalizationForm extends HTMLElement {
    constructor() {
      super();
      this.elements = {
        input: this.querySelector('input[name="locale_code"], input[name="country_code"]'),
        button: this.querySelector("button"),
        panel: this.querySelector("ul")
      };
      this.elements.button.addEventListener("click", this.openSelector.bind(this));
      this.elements.button.addEventListener("focusout", this.closeSelector.bind(this));
      this.addEventListener("keyup", this.onContainerKeyUp.bind(this));
      this.querySelectorAll("a").forEach((item) => item.addEventListener("click", this.onItemClick.bind(this)));
    }
    hidePanel() {
      this.elements.button.setAttribute("aria-expanded", "false");
      this.elements.panel.setAttribute("hidden", true);
    }
    onContainerKeyUp(event) {
      if (event.code.toUpperCase() !== "ESCAPE")
        return;
      this.hidePanel();
      this.elements.button.focus();
    }
    onItemClick(event) {
      event.preventDefault();
      const form = this.querySelector("form");
      this.elements.input.value = event.currentTarget.dataset.value;
      if (form)
        form.submit();
    }
    openSelector() {
      this.elements.button.focus();
      this.elements.panel.toggleAttribute("hidden");
      this.elements.button.setAttribute("aria-expanded", (this.elements.button.getAttribute("aria-expanded") === "false").toString());
    }
    closeSelector(event) {
      const shouldClose = event.relatedTarget && event.relatedTarget.nodeName === "BUTTON";
      if (event.relatedTarget === null || shouldClose) {
        this.hidePanel();
      }
    }
  }
  customElements.define("localization-form", LocalizationForm);
}
function modal() {
  class ProductModal extends ModalDialog {
    constructor() {
      super();
    }
    hide() {
      super.hide();
    }
    show(opener) {
      super.show(opener);
      this.showActiveMedia();
    }
    showActiveMedia() {
      this.querySelectorAll(`[data-media-id]:not([data-media-id="${this.openedBy.getAttribute("data-media-id")}"])`).forEach((element) => {
        element.classList.remove("active");
      });
      const activeMedia = this.querySelector(`[data-media-id="${this.openedBy.getAttribute("data-media-id")}"]`);
      const activeMediaTemplate = activeMedia.querySelector("template");
      const activeMediaContent = activeMediaTemplate ? activeMediaTemplate.content : null;
      activeMedia.classList.add("active");
      activeMedia.scrollIntoView();
      const container = this.querySelector('[role="document"]');
      container.scrollLeft = (activeMedia.width - container.clientWidth) / 2;
      if (activeMedia.nodeName == "DEFERRED-MEDIA" && activeMediaContent && activeMediaContent.querySelector(".js-youtube"))
        activeMedia.loadContent();
    }
  }
  customElements.define("product-modal", ProductModal);
}

// src/js/seerseven.js
VANTA.CELLS({
  el: "#element",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200,
  minWidth: 200,
  scale: 1,
  color1: 3063486,
  color2: 15893045,
  size: 2.9,
  speed: 2.2
});
function showLightThemeLogo() {
  $("#logo-dark").switchClass("d-block", "d-none", 0);
  $("#logo-light").switchClass("d-none", "d-block", 0);
}
function showDarkThemeLogo() {
  $("#logo-light").switchClass("d-block", "d-none", 0);
  $("#logo-dark").switchClass("d-none", "d-block", 0);
}
function showBaseLinks() {
  if ($("#effects a").hasClass("transparency:light")) {
    $("#effects a").switchClass("link:transparent-light", "link:link", 0);
    $(".header-icons").switchClass("link:transparent-light", "link:icon", 0);
  }
  if ($("#effects a").hasClass("transparency:dark")) {
    $("#effects a").switchClass("link:transparent-dark", "link:link", 0);
    $(".header-icons").switchClass("link:transparent-dark", "link:icon", 0);
  }
}
function showTransLinks() {
  if ($("#effects a").hasClass("transparency:light")) {
    $("#effects a").switchClass("link:link", "link:transparent-light", 0);
    $(".header-icons").switchClass("link:icon", "link:transparent-light", 0);
  }
  if ($("#effects a").hasClass("transparency:dark")) {
    $("#effects a").switchClass("link:link", "link:transparent-dark", 0);
    $(".header-icons").switchClass("link:icon", "link:transparent-dark", 0);
  }
}
var transEnabled = $(".fake").length;
var transDisabled = $(".notrans").length;
function transparencyToggle() {
  if (transDisabled) {
    $("html").addClass("trans:off");
  }
  if (transEnabled) {
    $("html").addClass("trans:on");
  }
}
transparencyToggle();
function transheader() {
  if (transEnabled) {
    showTransLinks();
  }
}
function transStickyDarkmode() {
  if (transEnabled) {
    if ($("html").hasClass("dark")) {
      $(".sticky-dark").switchClass("stickybg", "sticky-bgv", 0);
    }
    if ($("html").hasClass("light")) {
      $(".sticky-dark").switchClass("stickybg", "sticky-bg", 0);
    }
  }
}
transStickyDarkmode();
var themeToggle = document.querySelector('.theme-switch input[type="checkbox"]');
var currentTheme = localStorage.getItem("theme");
console.log(currentTheme);
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") {
    themeToggle.checked = true;
    themeToggle.setAttribute("data-theme", currentTheme);
    showDarkThemeLogo();
    $("html").switchClass("light", "dark", 0);
  } else {
    $("html").switchClass("dark", "light", 0);
  }
}
var colorModeOff = $("#sticky-darkmode-toggle").hasClass("colormode:off");
var transparencyOn = $("html").hasClass("trans:on");
var scrollTop = $(window).scrollTop();
function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    $("html").switchClass("light", "dark", 0);
    $("#sticky-darkmode-toggle").switchClass("sticky-bg", "sticky-bgv", 0);
    showDarkThemeLogo();
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    themeToggle.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    $("html").switchClass("dark", "light", 0);
    showLightThemeLogo();
    $("#sticky-darkmode-toggle").switchClass("sticky-bgv", "sticky-bg", 0);
  }
}
themeToggle.addEventListener("change", switchTheme, false);
transheader();
$(window).scroll(function() {
  var scroll = $(window).scrollTop();
  if (scroll >= 300) {
    $(".bg\\:trans").css({
      opacity: "1",
      transition: "opacity 0.2s ease-out"
    });
    $(".fake").switchClass("trans", "bg:trans");
    if (transEnabled) {
      $("#logo-trans").switchClass("d-block", "d-none", 0);
      showBaseLinks();
    }
  } else {
    $(".bg\\:trans").css({
      opacity: "0",
      transition: "opacity 0.3s ease-out"
    });
    $(".fake").switchClass("bg:trans", "trans");
    if (transEnabled) {
      $("#logo-trans").switchClass("d-none", "d-block", 0);
      showTransLinks();
    }
  }
});
var lastScrollTop = 0;
$(window).scroll(function(event) {
  var st = $(this).scrollTop();
  if (st > lastScrollTop) {
    $(".sticky\\:show").switchClass("sticky:show", "sticky:hide", 0);
  }
  lastScrollTop = st;
});
var hasBeenClicked = false;
$(themeToggle).click(function() {
  hasBeenClicked = true;
});
if (hasBeenClicked && currentTheme === "light" && transparencyOn && colorModeOff) {
  $("#sticky-darkmode-toggle").switchClass("sticky-bg", "sticky-bgv", 0);
} else {
}
$(themeToggle).on("click", function() {
  if (currentTheme === "light" && transparencyOn && colorModeOff) {
    $("#sticky-darkmode-toggle").switchClass("sticky-bg", "sticky-bgv", 0);
  }
  if (currentTheme === "dark" && transparencyOn && colorModeOff) {
    $("#sticky-darkmode-toggle").switchClass("sticky-bgv", "sticky-bg", 0);
  }
});
sticky();
modal();
local();
AOS.init();
window.scroll({
  top: 2500,
  left: 0,
  behavior: "smooth"
});
window.scrollBy({
  top: 100,
  left: 0,
  behavior: "smooth"
});
$(function() {
  $(".foo").on("click", function() {
    $(this).next().css({
      "color": "red"
    }).toggleClass("new").modal();
  });
  $(".bar .woo").on("click", function() {
    $(".opa a").css({
      "color": "green",
      "background-color": "yellow"
    });
  });
});
$(function() {
  $(".foo").on("click", function() {
    $(this).next().css({
      "color": "red"
    }).toggleClass("new").modal();
  });
  $(".bar .woo").on("click", function() {
    $(".opa a").css({
      "color": "green",
      "background-color": "yellow"
    });
  });
});
$(function() {
  $(".foo").on("click", function() {
    $(this).next().css({
      "color": "red"
    }).toggleClass("new").modal();
  });
  $(".bar .woo").on("click", function() {
    $(".opa a").css({
      "color": "green",
      "background-color": "yellow"
    });
  });
});
$(function() {
  $(".foo").on("click", function() {
    $(this).next().css({
      "color": "red"
    }).toggleClass("new").modal();
  });
  $(".bar .woo").on("click", function() {
    $(".opa a").css({
      "color": "green",
      "background-color": "yellow"
    });
  });
});
$(function() {
  $(".foo").on("click", function() {
    $(this).next().css({
      "color": "red"
    }).toggleClass("new").modal();
  });
  $(".bar .woo").on("click", function() {
    $(".opa a").css({
      "color": "green",
      "background-color": "yellow"
    });
  });
});
$(function() {
  $(".foo").on("click", function() {
    $(this).next().css({
      "color": "red"
    }).toggleClass("new").modal();
  });
  $(".bar .woo").on("click", function() {
    $(".opa a").css({
      "color": "green",
      "background-color": "yellow"
    });
  });
});
$(function() {
  $(".foo").on("click", function() {
    $(this).next().css({
      "color": "red"
    }).toggleClass("new").modal();
  });
  $(".bar .woo").on("click", function() {
    $(".opa a").css({
      "color": "green",
      "background-color": "yellow"
    });
  });
});
$(function() {
  $(".foo").on("click", function() {
    $(this).next().css({
      "color": "red"
    }).toggleClass("new").modal();
  });
  $(".bar .woo").on("click", function() {
    $(".opa a").css({
      "color": "green",
      "background-color": "yellow"
    });
  });
});
$(function() {
  $(".foo").on("click", function() {
    $(this).next().css({
      "color": "red"
    }).toggleClass("new").modal();
  });
  $(".bar .woo").on("click", function() {
    $(".opa a").css({
      "color": "green",
      "background-color": "yellow"
    });
  });
});
/*! Generated with PostCSS Click */
