import * as el from './utils/element';

import { sticky, modal, local } from './shopify/customelements';

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
};

function add(f0, f1) {
	f0.classList.add(classList[f1]);
}
function remove(f0, f2) {
	f0.classList.remove(classList[f2]);
}
function contains(f0, f3) {
	f0.classList.contains(classList[f3]);
}

VANTA.CELLS({
	el: '#element',
	mouseControls: true,
	touchControls: true,
	gyroControls: false,
	minHeight: 200.0,
	minWidth: 200.0,
	scale: 1.0,
	color1: 0x2ebebe,
	color2: 0xf28235,
	size: 2.9,
	speed: 2.2,
});

function showLightThemeLogo() {
	$('#logo-dark').switchClass('d-block', 'd-none', 0);
	$('#logo-light').switchClass('d-none', 'd-block', 0);
}

function showDarkThemeLogo() {
	$('#logo-light').switchClass('d-block', 'd-none', 0);
	$('#logo-dark').switchClass('d-none', 'd-block', 0);
}

function showBaseLinks() {
	if ($('#effects a').hasClass('transparency:light')) {
		$('#effects a').switchClass('link:transparent-light', 'link:link', 0);
		$('.header-icons').switchClass('link:transparent-light', 'link:icon', 0);
	}
	if ($('#effects a').hasClass('transparency:dark')) {
		$('#effects a').switchClass('link:transparent-dark', 'link:link', 0);
		$('.header-icons').switchClass('link:transparent-dark', 'link:icon', 0);
	}
}

function showTransLinks() {
	if ($('#effects a').hasClass('transparency:light')) {
		$('#effects a').switchClass('link:link', 'link:transparent-light', 0);
		$('.header-icons').switchClass('link:icon', 'link:transparent-light', 0);
	}
	if ($('#effects a').hasClass('transparency:dark')) {
		$('#effects a').switchClass('link:link', 'link:transparent-dark', 0);
		$('.header-icons').switchClass('link:icon', 'link:transparent-dark', 0);
	}
}

const transEnabled = $('.fake').length;

const transDisabled = $('.notrans').length;

function transparencyToggle() {
	if (transDisabled) {
		$('html').addClass('trans:off');
	}

	if (transEnabled) {
		$('html').addClass('trans:on');
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
		if ($('html').hasClass('dark')) {
			$('.sticky-dark').switchClass('stickybg', 'sticky-bgv', 0);
		}
		if ($('html').hasClass('light')) {
			$('.sticky-dark').switchClass('stickybg', 'sticky-bg', 0);
		}
	}
}
transStickyDarkmode();

const themeToggle = document.querySelector(
	'.theme-switch input[type="checkbox"]'
);

const currentTheme = localStorage.getItem('theme');
console.log(currentTheme);

if (currentTheme) {
	document.documentElement.setAttribute('data-theme', currentTheme);
	if (currentTheme === 'dark') {
		themeToggle.checked = true;
		themeToggle.setAttribute('data-theme', currentTheme);
		showDarkThemeLogo();
		$('html').switchClass('light', 'dark', 0);
	} else {
		$('html').switchClass('dark', 'light', 0);
	}
}

const colorModeOff = $('#sticky-darkmode-toggle').hasClass('colormode:off');
const transparencyOn = $('html').hasClass('trans:on');
let scrollTop = $(window).scrollTop();

function switchTheme(e) {
	if (e.target.checked) {
		document.documentElement.setAttribute('data-theme', 'dark');
		themeToggle.setAttribute('data-theme', 'dark');
		localStorage.setItem('theme', 'dark');
		$('html').switchClass('light', 'dark', 0);
		$('#sticky-darkmode-toggle').switchClass('sticky-bg', 'sticky-bgv', 0);
		showDarkThemeLogo();
	} else {
		document.documentElement.setAttribute('data-theme', 'light');
		themeToggle.setAttribute('data-theme', 'light');
		localStorage.setItem('theme', 'light');
		$('html').switchClass('dark', 'light', 0);
		showLightThemeLogo();
		$('#sticky-darkmode-toggle').switchClass('sticky-bgv', 'sticky-bg', 0);
	}
}

themeToggle.addEventListener('change', switchTheme, false);

transheader();

$(window).scroll(function () {
	var scroll = $(window).scrollTop();

	if (scroll >= 300) {
		$('.bg\\:trans').css({
			opacity: '1',
			transition: 'opacity 0.2s ease-out',
		});
		$('.fake').switchClass('trans', 'bg:trans');

		if (transEnabled) {
			$('#logo-trans').switchClass('d-block', 'd-none', 0);
			showBaseLinks();
		}
	} else {
		$('.bg\\:trans').css({
			opacity: '0',
			transition: 'opacity 0.3s ease-out',
		});
		$('.fake').switchClass('bg:trans', 'trans');

		if (transEnabled) {
			$('#logo-trans').switchClass('d-none', 'd-block', 0);
			showTransLinks();
		}
	}
});

var lastScrollTop = 0;
$(window).scroll(function (event) {
	var st = $(this).scrollTop();
	if (st > lastScrollTop) {
		$('.sticky\\:show').switchClass('sticky:show', 'sticky:hide', 0);
	}
	lastScrollTop = st;
});

var hasBeenClicked = false;
$(themeToggle).click(function () {
	hasBeenClicked = true;
});

if (
	hasBeenClicked &&
	currentTheme === 'light' &&
	transparencyOn &&
	colorModeOff
) {
	$('#sticky-darkmode-toggle').switchClass('sticky-bg', 'sticky-bgv', 0);
} else {
	// The link has not been clicked.
}

$(themeToggle).on('click', function () {
	if (currentTheme === 'light' && transparencyOn && colorModeOff) {
		$('#sticky-darkmode-toggle').switchClass('sticky-bg', 'sticky-bgv', 0);
	}
	if (currentTheme === 'dark' && transparencyOn && colorModeOff) {
		$('#sticky-darkmode-toggle').switchClass('sticky-bgv', 'sticky-bg', 0);
	}
});

sticky();
modal();
local();
AOS.init();

// Scroll to specific values
// scrollTo is the same
window.scroll({
	top: 2500,
	left: 0,
	behavior: 'smooth',
});

// Scroll certain amounts from current position
window.scrollBy({
	top: 100, // could be negative value
	left: 0,
	behavior: 'smooth',
});
/*! Generated with PostCSS Click */

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
