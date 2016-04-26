$(document).ready(function () {
	var $main = $('.mainContent'),
		skillsCounter = 0,
		wasAnimationSkills = false,
		intervals = [],
		ua = navigator.userAgent,
		isMobile = false,
		$downArrow = $('.fa-arrow-circle-o-down'),
		afterArrow,
		$windowOffset,
		$window = $(window),
		$body = $('body, html');

	if (ua.match(/(iPhone|iPod|iPad)/gi) || ua.match(/BlackBerry/gi) || ua.match(/Android/gi)) {
		isMobile = true;
	}

	var arrowSliding = function () {
		afterArrow = $downArrow.next();
		$body.animate({
			scrollTop: afterArrow.position().top + 100
		}, 500);
		$body.animate({
			scrollTop: afterArrow.position().top - 40
		}, 500);
	};

	$main.on('click.arrow', $downArrow, arrowSliding);

	var hamburgerFunction = function () {
		$('.hamburgerMenu ul').slideUp(1);
		$('.hamburgerMenu').on('click', function () {
			var $hamburger = $(this);
			if ($hamburger.hasClass('opening')) {
				$hamburger.removeClass('opening');
				$('.hamburgerMenu ul').slideDown();
				setTimeout(function () {
					$hamburger.addClass('closing');

				}, 20);
				$('.column').animate({
					'minHeight': '133px',
					'maxHeight': '133px'
				}, 'medium');
			} else if ($hamburger.hasClass('closing')) {
				$hamburger.removeClass('closing');
				$('.hamburgerMenu ul').slideUp();
				setTimeout(function () {
					$hamburger.addClass('opening');
				}, 20);
				$('.column').animate({
					'minHeight': '70px',
					'maxHeight': '70px'
				}, 'medium');
			} else if ($hamburger.hasClass('hm-first')) {
				$hamburger.removeClass('hm-first');
				$hamburger.addClass('closing');
				$('.hamburgerMenu ul').slideDown();
				$('.column').animate({
					'minHeight': '133px',
					'maxHeight': '133px'
				}, 'medium');
			}


		}); // end of event for .hamburgerMenu
	};


	var scrolling = function () {
		if ($window.width() > 780) {
			$('.column').animate({
				paddingTop: $window.scrollTop()
			}, 100, 'linear');
		}
		if ($windowOffset > 390 && $(window).width() < 780) {
			$('.column').removeClass('fadeOut');
			$('.column').addClass('fadeIn').css({
				position: 'fixed',
				left: 0,
				top: 0,
				width: '100%',
				zIndex: 10000
			});
			$main.css('marginTop', '72px');
		} else if ($windowOffset < 230 && $(window).width() < 780 && $windowOffset > 10) {
			$('.column').removeClass('fadeIn');
			if (!$('column').hasClass('fadeOut')) {
				$('.column').addClass('fadeOut');
				setTimeout(function () {
					$('.column').removeAttr('style');
					$main.css('marginTop', 0);
				}, 400);
			}
		}
		$windowOffset = $window.scrollTop();
		$main.children().each(function (i, e) {
			if ($(e).offset().top < $windowOffset + $(e).height()) {
				if (i > 0) {
					$(e).addClass('fadeIn');
					$downArrow = $('.fa-arrow-circle-o-down');
					if (i < $main.children().length - 1) {
						$(e).after($downArrow);
					} else {
						$downArrow.remove();
						$main.off('click.arrow');
					}
				}

				if ($(e).hasClass('mainContent__skills') && !wasAnimationSkills) {
					$('.mainContent__skills ul li').each(function (i, e) {
						$(e).addClass('mainContent__skills__' + $(e).data('what'));
					});
					wasAnimationSkills = true;
					$('.mainContent__skills li').each(function (idx, el) {
						var perc = parseInt($(el).data('percentages')),
							$where = $(el).children('span'),
							x = 0;
						intervals.push(setInterval(function () {
							x++;
							if (x <= perc) {
								$where.html(x + "%");
							} else {
								clearInterval(intervals[idx]);
							}
						}, 30));
					}); // end of iteration for each li element of .mainContent__skills	
				} // end of 'if' statement in which is animation for setting 0 margin-left

			} // end of 'if' statement checking whether the children has a 'mainContent__skills' class
		}); // end of iteration for $main childrens (if their index is greater than 0)
	};

	$window.on('scroll.main', scrolling); // end of event for scrolling animation

	function rwd() {
		if ($(window).width() <= 780) {
			hamburgerFunction();
		} else {
			$main.one('mouseenter', function () {
				$downArrow.next().addClass('fadeIn');
				$downArrow.insertAfter($downArrow.next());
			});
		} // end of if statement for RWD
	}
	rwd();
	if (!isMobile) {
		$(window).on('resize', function () {
			if ($(window).width() > 780) {
				$('.hamburgerMenu ul').slideDown();
				$('.column').removeAttr('style');
				$('.hamburgerMenu').removeClass('closing').removeClass('opening').addClass('hm-first').off('click');
				$main.css('marginTop', 0);

			} else {
				hamburgerFunction();
				$window.off('scroll.column');
				$('.column').animate({
					paddingTop: 0
				}, 100, 'linear').css({
					position: 'fixed',
					left: 0,
					top: 0,
					width: '100%',
					zIndex: 10000
				});
			}
		}); // event for resizing ; ) just preventing some strange bugs
	} // end of if statement checking whether to include resize event listener

	$('.mainContent').on('click', '.mainContent__skills__title', function () {
		skillsCounter++;

		if (skillsCounter % 2 !== 0) {
			$(this).children('i').animate({
				borderSpacing: 180
			}, {
				step: function (now, fx) {
					$(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
					$(this).css('-moz-transform', 'rotate(' + now + 'deg)');
					$(this).css('transform', 'rotate(' + now + 'deg)');
				},
				duration: 'slow'
			}, 'linear'); // end of animation
		} else {
			$(this).children('i').animate({
				borderSpacing: 360
			}, {
				step: function (now, fx) {
					$(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
					$(this).css('-moz-transform', 'rotate(' + now + 'deg)');
					$(this).css('transform', 'rotate(' + now + 'deg)');
				},
				duration: 'slow'
			}, 'linear');
		} // end of if / else block for choosing an animatin type

		$('.mainContent__skills__description').slideToggle();
	}); // end of event for .mainContent__skills


	$main.on('about', function () {
		$('.mainContent__skills__description').slideUp(1);
	}); // end of 'about' event

	$main.trigger('about');



	$('nav ul li a').on('click', function (e) {
		e.preventDefault();
		var where = $(this).attr('href');

		$.ajax({
			url: where,
			dataType: 'html',
			success: function (res) {
				$main.off('click.arrow');
				$body.animate({
					scrollTop: 0
				}, 300);
				setTimeout(function () {
					$main.html(res);
					wasAnimationSkills = false;
					$downArrow = $('.fa-arrow-circle-o-down');
					$main.on('click.arrow', $downArrow, arrowSliding);
					if (where === '/about.html') {
						$main.trigger('about');
					}
					$('.column').removeClass('fadeIn').removeAttr('style').removeClass('fadeOut');
					rwd();
					$('.hamburgerMenu').removeClass('closing');
				}, 400);

			},
			beforeSend: function () {
				$main.addClass('loading');
			},
			error: function () {
				$main.html('<h1 class="header--name">Ups, coś poszło nie tak i nie udało się wczytać strony. : ( <br> Spróbuj ponownie ' + 'później lub sprawdź stan swojego połączenia internetowego.</h1>');
			},
			complete: function () {
				$main.removeClass('loading');


			}
		}); // end of AJAX call

	}); // end of click event for links on the nav list

});