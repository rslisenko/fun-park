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


	// FORM CHECKBOX CLICK
	$('.confirmation-wrapper input[type="checkbox"]').on('click', function () {
		if ($(this).is(':checked')) {
			$('.contact-form').find('input[type="submit"]').removeClass('inactive');
		} else {
			$('.contact-form').find('input[type="submit"]').addClass('inactive');
		}
	});

	$('.inactive').on('click', function (event) {
		return false;
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
			if (in_range(offset_top + vh, item.start, item.end)) {
				current_section = '".section-' + i + '"';
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
	});

});
