define(['module', 'jquery', './scrollingElement'], function(myself, $, scrollingElement) {

	return new function() {

//include css file
$('<link/>', {
	rel: 'stylesheet',
	type: 'text/css',
	href: myself.uri.replace(/.js$/, '.css')
}).appendTo('head');

$(document).ready(function() {
	if (bungloo.timeline) {
		bungloo.timeline.body.addEventListener('DOMNodeInserted', hideMedia, false);
	}
});

function hideMedia(e) {
	var element = e.target;
	if (element.nodeName != 'LI')
		return;
	var parent = element.parentNode;
	if (parent != bungloo.timeline.body) return;
		
	// check if element has images
	setTimeout(function() {
		var media_container = element.getElementsByClassName('images')[0];
		if ($(media_container).children().length > 0) {
			addHideMediaButton(element);
		}
	}, 2000);
};

var addHideMediaButton = function(element) {
	//add the hide button
	//var buttons_container = $(element).find('.reply_to').parent()[0];
	var buttons_container = element.getElementsByTagName('aside')[0];
	var a = document.createElement('a');
	var hideMediaButton = a.cloneNode();
	hideMediaButton.className = 'hide_media';
	hideMediaButton.href = '#';
	hideMediaButton.title = 'Toggle media';
	hideMediaButton.onclick = function() {
		var st_pre = scrollingElement.scrollTop();
		var ot_pre = $(element).offset().top;

		$(element).toggleClass('has-hidden-media');

		var ot_post = $(element).offset().top;
		var st_post = st_pre - ot_pre + ot_post;
		
		scrollingElement.scrollTop(st_post);
		
		return false;
	};
	buttons_container.appendChild(hideMediaButton);
};


	};

});
