$(document).foundation();

$(document).ready(function () {

	$('#fullpage').fullpage({
		anchors : ['section-1', 'section-2', 'section-3', 'section-4', 'section-5', 'section-6', 'section-7'],
		menu : '#sections-nav',
		autoScrolling : true,
		scrollOverflow : true,
		scrollHorizontally : true,
		verticalCentered : false
	});

});
