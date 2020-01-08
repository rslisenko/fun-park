$(document).foundation();

function in_range(current, start, end) {
	return current > start && current < end ? true : false;
}

function is_phone_number(phone_input) {
	let $this = $(phone_input);
	let current_input_val = $this.val() > 12 ? $this.val().substring(0,12) : $this.val();
	$this.val(current_input_val.replace(/\D/g, ''));

	return $this.val().match(/^38\d{10}$/) ? true : false;
}

function is_email_valid (email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function is_form_valid($form) {
	let is_valid = true;
	$form.find('input').each(function(index, el) {
		let is_filed_valid = false;
		if ($(el).hasClass('invalid')) {
			is_filed_valid = false;
		} else {
			is_filed_valid = true;
		}
		is_valid = is_valid && is_filed_valid;
	});
	return is_valid;
}



$(document).ready(function () {

	// GLOBAL VARS
	const vh = $(window).height();
	let $page_overlay = $('.page-overlay');
	let localStorage = window.localStorage;
	let $form_status_popup = $('.send-successfuly-popup');
	let $contact_form = $('.contact-form');
	let $red_block = $('.red-block');
	let $nav_wrapper = $('.nav-wrapper');
	let $events_block = $('.events-block');
	let on_ticket = false;

	function change_images($images, current) {
		console.log('on_ticket: ', on_ticket);
		if (on_ticket) {
			let total = $images.length;
			current == 0 ? current = total : current;
			setTimeout(function() {
				$images.removeClass('active');
		  		current--;
		  		$images.closest('.images-container').find('.image-wrapper').eq((total-current)%total).addClass('active');
		  		change_images($images, current, on_ticket);
			}, 1000);
		} else {
			current = 0;
			return;
		}
	}

	// $('.our-entertainments__item .inner').on('mouseenter',function(event) {
	// 	console.log('mouseenter');
	// 	on_ticket = true;
	// 	change_images($('.images-container .image-wrapper'), $('.images-container .image-wrapper').length, on_ticket);
	// });
	// $('.our-entertainments__item .inner').on('mouseleave',function(event) {
	// 	console.log('mouseleave');
	// 	on_ticket = false;
	// 	change_images($('.images-container .image-wrapper'), $('.images-container .image-wrapper').length, on_ticket);
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
		if (section.end - section.start <= vh) {
			$(el).addClass('screen-height-section');
		}
	});


	// FORM POPUP CLOSE
	$('.popup .btn-ok, .popup .close').on('click', function(event) {
		$('.send-successfuly-popup').addClass('hide-block');
		$page_overlay.removeClass('show-overlay');
	});


	//
	$('.hint-wrapper .hint').on('click', function () {
		let section_number = $('.sections-nav').find('.active').data('order');
		console.log(section_number);
		$('html, body').animate({
			scrollTop: sections[section_number].end
		}, 500);
	});

	//
	$('.contact-form input').on('focus', function () {
		$this = $(this);
		if ($this.hasClass('phone')) {
			$this.val('380');
		}
	});

	// CHECK FORM INPUTS IF NOT EMPTY
	let val = 0;
	$('.contact-form input').on('keyup',  function(event) {
		$this = $(this);

		if ($this.hasClass('phone')) {
			// val = $this.val().replace(/[^\d]/g, '');
			// val = val.length > 12 ? val.substring(0,12) : val;
			// $this.val(val);
			if ($this.val().length < 3) {
				$this.val('380');
			}
			if (is_phone_number($this)) {
				$this.addClass('valid');
				$this.removeClass('invalid');
			} else {
				$this.addClass('invalid');
				$this.removeClass('valid');
			}
		} else if($this.hasClass('email')) {
			if (is_email_valid($this.val()) && $this.val().length > 5) {
				$this.addClass('valid');
				$this.removeClass('invalid');
			} else {
				$this.removeClass('valid');
				$this.addClass('invalid');
			}
		} else {
			if ($this.val().length > 3) {
				$this.addClass('valid');
				$this.removeClass('invalid');
			} else {
				$this.removeClass('valid');
				$this.addClass('invalid');
			}
		}

		if (is_form_valid($contact_form)) {
			$('.contact-form').find('input[type="submit"]').removeClass('inactive');
		} else {
			$('.contact-form').find('input[type="submit"]').addClass('inactive');
		}
	});

	// FORM CHECKBOX CLICK
	$('.confirmation-wrapper input[type="checkbox"]').on('click', function () {
		$this = $(this);

		if ($this.is(':checked')) {
			$this.addClass('valid');
			$this.removeClass('invalid');
		} else {
			$this.removeClass('valid');
			$this.addClass('invalid');
		}

		if (is_form_valid($contact_form)) {
			$('.contact-form').find('input[type="submit"]').removeClass('inactive');
		} else {
			$('.contact-form').find('input[type="submit"]').addClass('inactive');
		}
	});

	// FORM ACTIONS
	$('form').on('submit', function () {
		localStorage.setItem('form_send_status', 'ok');
		window.location = window.location.origin;
	});

	if (localStorage.getItem('form_send_status') == 'ok') {
		localStorage.clear();
		$('html, body').animate({
			scrollTop: sections[1].start
		}, 0);
		$form_status_popup.removeClass('hide-block');
		$page_overlay.addClass('show-overlay');
	} else {
		$form_status_popup.addClass('hide-block');
		$page_overlay.removeClass('show-overlay');
	}


	$(document).on('click', '.inactive', function (event) {
		return false;
	});



	// ON SCROLL
	let offset_top = 0;
	let current_section = '';
	let last_index = sections.length - 1;
	let $scroll_top_btn = $('.scroll-top');
	let $hint = $('.hint');
	let is_scroll_down = true;
    let scroll_old_pos = 0;
    let red_block_start = $red_block.offset().top;
    let red_block_end = red_block_start + $red_block.height();
    let events_block_start = $events_block.offset().top;
    let events_block_end = events_block_start + $events_block.height();

	$(document).on('scroll', function(event) {
		offset_top = $(this).scrollTop();

		if ((offset_top + vh/2) - 50 > red_block_start && (offset_top + vh/2) - 50 < red_block_end) {
			$nav_wrapper.addClass('red');
		} else {
			$nav_wrapper.removeClass('red');
		}

		if ($(window).width() < 1280) {

			if ((offset_top + vh/2) - 100 > events_block_start && (offset_top + vh/2) - 100 < events_block_end) {
				$nav_wrapper.addClass('red');
			} else {
				$nav_wrapper.removeClass('red');
			}
		}

		sections.forEach(function(item, i , arr) {
			if (offset_top == 0) {
				$('.sections-nav li').removeClass('active');
				$('.sections-nav li:first-child').addClass('active');
			} else {
				if (current_section) {}
				if (in_range(offset_top + vh, item.start, item.end)) {
					$('.sections-nav li').removeClass('active');
					$(".sections-nav").find('[data-menuanchor="section-'+i+'"]').addClass('active');
					$current_section = $('.section-' + i);

				}
			}
		});
		if (offset_top > vh) {
			$scroll_top_btn.removeClass('hide-block');
			// $hint.addClass('hide-block');
		} else {
			$scroll_top_btn.addClass('hide-block');
			// $hint.removeClass('hide-block');
		}

		scroll_old_pos = offset_top;
	});

});
