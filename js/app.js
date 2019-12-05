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


	// scroll on ancor click
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

	// mark active nav item
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

	// check all sections border
	let sections = [];
	let section_start = 0;
	let section_end = 0;

	$('.sections .section').each(function(index, el) {
		let section = {};
		section.start = $(el).offset().top;
		section.end = section.start + $(el).outerHeight();
		sections.push(section);
	});
	// console.log('sections: ', sections);


	let vh = $(window).height();
	let offset_top = 0;
	let current_section = '';

	$(document).on('scroll', function(event) {
		offset_top = $(this).scrollTop();

		sections.forEach(function(item, i , arr) {
			// console.log('item: ', item);
			// console.log('i: ', i);
			if (in_range(offset_top + vh, item.start, item.end)) {
				// console.log('section: ', i);
				current_section = '".section-'+i+'"';
				console.log(current_section);
				$('.sections-nav li').removeClass('active');
				$(".sections-nav").find('[data-menuanchor="section-'+i+'"]').addClass('active');
			}
		});
	});

});
