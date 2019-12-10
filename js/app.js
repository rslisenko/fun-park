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


	// CALCULATE SECTIONS START-END POINTS
	let sections = [];
	let section_start = 0;
	let section_end = 0;
	let screen_height = $(window).height();
	// console.log('screen_height: ', screen_height);

	$('.sections .section').each(function(index, el) {
		let $this = $(this);
		let section = {};
		section.start = $(el).offset().top;
		section.end = section.start + $(el).outerHeight();
		sections.push(section);
		if ((section.end - section.start) <= (screen_height + 20) ) {
			$this.addClass('section-height-scroll');
		}
	});
	// console.log(sections);

	// FORM CHECKBOX CLICK
	$('.confirmation-wrapper input[type="checkbox"]').on('click', function () {
		if ($(this).is(':checked')) {
			$('.contact-form').find('[type="submit"]').removeClass('inactive');
		} else {
			$('.contact-form').find('[type="submit"]').addClass('inactive');
		}
	});

	$(document).on('click', '.inactive', function (event) {
		return false;
	});

	// FORM ACTIONS
	let localStorage = window.localStorage;
	let $form_status_popup = $('.send-successfuly-popup');

	$('form').on('submit', function () {
		localStorage.setItem('form_send_status', 'ok');
	});

	if (localStorage.getItem('form_send_status') == 'ok') {
		console.log('form send status: ', localStorage.getItem('form_send_status'));
		localStorage.clear();
		$('html, body').animate({
			scrollTop: sections[1].start
		}, 0);
		$form_status_popup.removeClass('hide-block');
	} else {
		$form_status_popup.addClass('hide-block');
	}

	//
	$('.popup .btn-ok, .popup .close').on('click', function(event) {
		$('.send-successfuly-popup').addClass('hide-block');
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
	});



	// ON SCROLL
	let vh = $(window).height();
	let scroll_top = 0;
	let current_section = '';
	let last_index = sections.length - 1;
	let old_scroll_top = 0;
	let scroll_down = true;
	let $scroll_top_btn = $('.scroll-top');
	let $hint = $('.hint');
	let prevent = true;
	let test = 0;

	$(document).on('scroll', function(event) {
		scroll_top = $(this).scrollTop();
		event.preventDefault();
		if (scroll_top > old_scroll_top) {
			scroll_down = true;
			test = scroll_top + vh;
		} else {
			scroll_down = false;
			test = scroll_top;
		}
		// check in witch section we are
		sections.forEach(function(item, i , arr) {
			if (in_range(test, item.start, item.end)) {
				current_section = '.section-' + i;
				console.log('current_section: ', current_section);


				if (scroll_down) {
					if ($(current_section).hasClass('section-height-scroll')) {

						// $('html, body').animate({
						// 	scrollTop: sections[i].end + 10
						// }, 550);
						// clearTimeout($.data(this, 'scrollTimer'));
						// $.data(this, 'scrollTimer', setTimeout(function() {
						// 	console.log('current_section: ', current_section);
						// }, 500));
						console.log('down in scroll section');
					}
				} else if(!scroll_down) {
					event.preventDefault();
					// prevent = true;
					if ($(current_section).hasClass('section-height-scroll')) {
						// console.log('up in scroll section');
					}
					// event.preventDefault();
					// $('html, body').animate({
					// 	scrollTop: sections[i].start
					// }, 550);
					setTimeout(function(){
						prevent = false;
					}, 550);
				}
				// console.log('scroll_down: ', scroll_down);

				$('.sections-nav li').removeClass('active');
				$(".sections-nav").find('[data-menuanchor="section-'+i+'"]').addClass('active');

				if (i == last_index) {
					$scroll_top_btn.removeClass('hide-block');
					$hint.addClass('hide-block');
				} else {
					$scroll_top_btn.addClass('hide-block');
					$hint.removeClass('hide-block');
				}
			}
		});
		old_scroll_top = scroll_top;
	});

});
