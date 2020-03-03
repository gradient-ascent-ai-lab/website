/*
	Eventually by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
(function () {

	"use strict";

	var $body = document.querySelector('body');

	// Methods/polyfills.

	// classList | (c) @remy | github.com/remy/polyfills | rem.mit-license.org
	!function () { function t(t) { this.el = t; for (var n = t.className.replace(/^\s+|\s+$/g, "").split(/\s+/), i = 0; i < n.length; i++)e.call(this, n[i]) } function n(t, n, i) { Object.defineProperty ? Object.defineProperty(t, n, { get: i }) : t.__defineGetter__(n, i) } if (!("undefined" == typeof window.Element || "classList" in document.documentElement)) { var i = Array.prototype, e = i.push, s = i.splice, o = i.join; t.prototype = { add: function (t) { this.contains(t) || (e.call(this, t), this.el.className = this.toString()) }, contains: function (t) { return -1 != this.el.className.indexOf(t) }, item: function (t) { return this[t] || null }, remove: function (t) { if (this.contains(t)) { for (var n = 0; n < this.length && this[n] != t; n++); s.call(this, n, 1), this.el.className = this.toString() } }, toString: function () { return o.call(this, " ") }, toggle: function (t) { return this.contains(t) ? this.remove(t) : this.add(t), this.contains(t) } }, window.DOMTokenList = t, n(Element.prototype, "classList", function () { return new t(this) }) } }();

	// canUse
	window.canUse = function (p) { if (!window._canUse) window._canUse = document.createElement("div"); var e = window._canUse.style, up = p.charAt(0).toUpperCase() + p.slice(1); return p in e || "Moz" + up in e || "Webkit" + up in e || "O" + up in e || "ms" + up in e };

	// window.addEventListener
	(function () { if ("addEventListener" in window) return; window.addEventListener = function (type, f) { window.attachEvent("on" + type, f) } })();

	// Play initial animations on page load.
	window.addEventListener('load', function () {
		window.setTimeout(function () {
			$body.classList.remove('is-preload');
		}, 100);
	});

	particlesJS("particles-js", {
		"particles": {
		  "number": {
			"value": 80,
			"density": {
			  "enable": true,
			  "value_area": 800
			}
		  },
		  "color": {
			"value": "#ffffff"
		  },
		  "shape": {
			"type": "circle",
			"stroke": {
			  "width": 0,
			  "color": "#000000"
			},
			"polygon": {
			  "nb_sides": 5
			},
			"image": {
			  "src": "img/github.svg",
			  "width": 100,
			  "height": 100
			}
		  },
		  "opacity": {
			"value": 0.5,
			"random": false,
			"anim": {
			  "enable": false,
			  "speed": 1,
			  "opacity_min": 0.1,
			  "sync": false
			}
		  },
		  "size": {
			"value": 3,
			"random": true,
			"anim": {
			  "enable": false,
			  "speed": 2,
			  "size_min": 0.1,
			  "sync": false
			}
		  },
		  "line_linked": {
			"enable": true,
			"distance": 150,
			"color": "#ffffff",
			"opacity": 0.4,
			"width": 1
		  },
		  "move": {
			"enable": true,
			"speed": 6,
			"direction": "none",
			"random": false,
			"straight": false,
			"out_mode": "out",
			"bounce": false,
			"attract": {
			  "enable": false,
			  "rotateX": 600,
			  "rotateY": 1200
			}
		  }
		},
		"interactivity": {
		  "detect_on": "canvas",
		  "events": {
			"onhover": {
			  "enable": true,
			  "mode": "grab"
			},
			"onclick": {
			  "enable": true,
			  "mode": "push"
			},
			"resize": true
		  },
		  "modes": {
			"grab": {
			  "distance": 400,
			  "line_linked": {
				"opacity": 1
			  }
			},
			"bubble": {
			  "distance": 400,
			  "size": 40,
			  "duration": 2,
			  "opacity": 8,
			  "speed": 3
			},
			"repulse": {
			  "distance": 200,
			  "duration": 0.4
			},
			"push": {
			  "particles_nb": 4
			},
			"remove": {
			  "particles_nb": 2
			}
		  }
		},
		"retina_detect": true
	  });
	// Slideshow Background.
	// (function() {

	// 	// Settings.
	// 	var settings = {

	// 		// Images (in the format of 'url': 'alignment').
	// 				images: {
	// 					'images/bg01.jpg': 'center',
	// 					'images/bg02.jpg': 'center',
	// 					'images/bg03.jpg': 'center'
	// 				},

	// 			// Delay.
	// 				delay: 6000

	// 		};

	// 	// Vars.
	// 		var	pos = 0, lastPos = 0,
	// 			$wrapper, $bgs = [], $bg,
	// 			k, v;

	// 	// Create BG wrapper, BGs.
	// 		$wrapper = document.createElement('div');
	// 			$wrapper.id = 'bg';
	// 			$body.appendChild($wrapper);

	// 		for (k in settings.images) {

	// 			// Create BG.
	// 				$bg = document.createElement('div');
	// 					$bg.style.backgroundImage = 'url("' + k + '")';
	// 					$bg.style.backgroundPosition = settings.images[k];
	// 					$wrapper.appendChild($bg);

	// 			// Add it to array.
	// 				$bgs.push($bg);

	// 		}

	// 	// Main loop.
	// 		$bgs[pos].classList.add('visible');
	// 		$bgs[pos].classList.add('top');

	// 		// Bail if we only have a single BG or the client doesn't support transitions.
	// 			if ($bgs.length == 1
	// 			||	!canUse('transition'))
	// 				return;

	// 		window.setInterval(function() {

	// 			lastPos = pos;
	// 			pos++;

	// 			// Wrap to beginning if necessary.
	// 				if (pos >= $bgs.length)
	// 					pos = 0;

	// 			// Swap top images.
	// 				$bgs[lastPos].classList.remove('top');
	// 				$bgs[pos].classList.add('visible');
	// 				$bgs[pos].classList.add('top');

	// 			// Hide last image after a short delay.
	// 				window.setTimeout(function() {
	// 					$bgs[lastPos].classList.remove('visible');
	// 				}, settings.delay / 2);

	// 		}, settings.delay);

	// })();

	// Signup Form.
	(function () {

		// Vars.
		var $form = document.querySelectorAll('#signup-form')[0],
			$submit = document.querySelectorAll('#signup-form input[type="submit"]')[0],
			$message;

		// Bail if addEventListener isn't supported.
		if (!('addEventListener' in $form))
			return;

		// Message.
		$message = document.createElement('span');
		$message.classList.add('message');
		$form.appendChild($message);

		$message._show = function (type, text) {

			$message.innerHTML = text;
			$message.classList.add(type);
			$message.classList.add('visible');

			window.setTimeout(function () {
				$message._hide();
			}, 3000);

		};

		$message._hide = function () {
			$message.classList.remove('visible');
		};

		// Events.
		// Note: If you're *not* using AJAX, get rid of this event listener.
		$form.addEventListener('submit', function (event) {
			event.stopPropagation();
			event.preventDefault();
			// Hide message.
			$message._hide();
			// Disable submit.
			$submit.disabled = true;
			// Process form.
			var form = $('#signup-form');
			var formData = $(form).serialize();
			$.ajax({
				type: 'POST',
				url: $(form).attr('action'),
				data: formData
			})

			window.setTimeout(function () {

				// Reset form.
				$form.reset();

				// Enable submit.
				$submit.disabled = false;

				// Show message.
				$message._show('success', 'Thank you!');
				//$message._show('failure', 'Something went wrong. Please try again.');

			}, 750);

		});

	})();

})();