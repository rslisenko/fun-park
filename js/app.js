$(document).foundation();

function in_range(current, start, end) {
	return current > start && current < end ? true : false;
}

$(document).ready(function () {

	// $('#fullpage').fullpage({
	// 	anchors : ['section-1', 'section-2', 'section-3', 'section-4', 'section-5', 'section-6', 'section-7'],
	// 	menu : '#sections-nav',
	// 	autoScrolling : true,
	// 	scrollOverflow : true,
	// 	scrollHorizontally : true,
	// 	verticalCentered : false
	// });


	// SCROLL ON ANCOR CLICK
	$('a[href*="#"]').on('click', function(event) {
		event.preventDefault();
		let section_name = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(section_name).offset().top
		}, 800);
		setTimeout(function() {
			$('.sections-nav li').removeClass('active');
			$('.sections-nav li').last().addClass('active');
		}, 800)
	});


	// SCROLL TOP ON CLICK
	$('.scroll-top').on('click', function () {
		$('html, body').animate({
			scrollTop: 0
		}, 500);
	});


	// MOBILE MENU ITEM CLICK
	$('.trigger-mobile-menu-btn').on('click', function () {
		// console.log('click');
		$(this).toggleClass('open');
		$('.nav-wrapper.mobile').toggleClass('show-nav');
	});


	// MARK ACTIVE NAV ITEM ON CLICK
	$('.sections-nav li').on('click', function(){
		$this = $(this);
		if ($this.hasClass('first')) {
			$('html, body').animate({
				scrollTop: 0
			}, 0);
		}
		setTimeout(function(){
			$('.sections-nav li').removeClass('active');
			$this.addClass('active');
		}, 800);
		if ($(window).width() < 769) {
			console.log('< 769');
			$('.trigger-mobile-menu-btn').removeClass('open');
			$('.nav-wrapper.mobile').removeClass('show-nav');
		}
	});


	// CALCULATE SECTIONS START-END POINTS
	let sections = [];
	let section_start = 0;
	let section_end = 0;

	$('.sections .section').each(function(index, el) {
		let section = {};
		section.start = $(el).offset().top;
		section.end = section.start + $(el).outerHeight();
		sections.push(section);
	});


	// FORM POPUP CLOSE
	$('.popup .btn-ok, .popup .close').on('click', function(event) {
		$('.send-successfuly-popup').addClass('hide-block');
	});


	// CHECK FORM INPUTS IF NOT EMPTY
	$('.contact-form input').on('focus keyup',  function(event) {
		// $('.contact-form input').each(function(index, el) {
		// 	console.log($(el), ' : ',$(el).val().length);
		// });
		// console.log('change');
	});

	// FORM ACTIONS
	let localStorage = window.localStorage;
	let $form_status_popup = $('.send-successfuly-popup');
	$('form').on('submit', function () {
		localStorage.setItem('form_send_status', 'ok');
	});


	if (localStorage.getItem('form_send_status') == 'ok') {
		localStorage.clear();
		$('html, body').animate({
			scrollTop: sections[1].start
		}, 0);
		$form_status_popup.removeClass('hide-block');
	} else {
		$form_status_popup.addClass('hide-block');
	}


	// FORM CHECKBOX CLICK
	$('.confirmation-wrapper input[type="checkbox"]').on('click', function () {
		if ($(this).is(':checked')) {
			$('.contact-form').find('input[type="submit"]').removeClass('inactive');
			console.log('checkbox checked');
			console.log($('.contact-form'));
		} else {
			$('.contact-form').find('input[type="submit"]').addClass('inactive');
			console.log('checkbox unchecked');
		}
	});


	$(document).on('click', '.inactive', function (event) {
		return false;
	});



	// ON SCROLL
	let vh = $(window).height();
	let offset_top = 0;
	let current_section = '';
	let last_index = sections.length - 1;
	$scroll_top_btn = $('.scroll-top');
	$hint = $('.hint');

	$(document).on('scroll', function(event) {
		offset_top = $(this).scrollTop();

		sections.forEach(function(item, i , arr) {
			if (offset_top == 0) {
				$('.sections-nav li').removeClass('active');
				$('.sections-nav li:first-child').addClass('active');
			} else {
				if (in_range(offset_top + vh, item.start, item.end)) {
					current_section = '".section-' + i + '"';
					$('.sections-nav li').removeClass('active');
					$(".sections-nav").find('[data-menuanchor="section-'+i+'"]').addClass('active');
					if (i == 3) {
						console.log('section 3');
					}
					if (i == last_index) {
						$scroll_top_btn.removeClass('hide-block');
						$hint.addClass('hide-block');
					} else {
						$scroll_top_btn.addClass('hide-block');
						$hint.removeClass('hide-block');
					}
				}
			}
		});
	});

});
