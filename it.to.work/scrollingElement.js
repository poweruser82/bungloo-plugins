define(['jquery'], function($) {
	var scrollingElement = $(document);
	setTimeout(function() {
		if ($('#content').css('overflow') == 'scroll')
			scrollingElement = $('#content');
	}, 1000);

	return scrollingElement;
});
