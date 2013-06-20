define(['module', 'jquery', './scrollingElement'], function(myself, $, scrollingElement) {

	return new function() {

var lastReadPost;
var unreadCount = 0;
var liWidth;

$(document).ready(function() {
	//include css file
	$('<link/>', {
		rel: 'stylesheet',
		type: 'text/css',
		href: myself.uri.replace(/.js$/, '.css')
	}).appendTo('head');

	if (bungloo.timeline) {

		setTimeout(function() {
			addUnreadBadge();

			bungloo.timeline.body.addEventListener( 'DOMNodeInserted', lockScroll, false );

			setInterval(function() {
				updateUnread();
			}, 1000);

		}, 15000);

	}
});

function addUnreadBadge() {
	var div = document.createElement('div');
	div.id = 'unread-badge';
	div.innerHTML = '1';
	div.onclick = function() {
		var firstUnreadTop = lastReadPost.previousElementSibling.offsetTop;
		var newPosition = firstUnreadTop;
		
		//scrollingElement.animate({ scrollTop: newPosition });
		scrollingElement.scrollTop(newPosition);
		
		updateUnread();
	};
	div.style.display = 'none';
	
	$('.sidebar-timeline > a').after(div);
};

function updateUnread() {
	//var currentTopPost = document.elementFromPoint(70, 1);
	var currentTopPost = document.elementFromPoint(70, 11);
	// stops if you are not in the timeline
	if ($(currentTopPost).closest('.timeline > ol').length <= 0)
		return;
	
	var ctpop = $(currentTopPost).offset().top;
	var dst = scrollingElement.scrollTop();
	if (ctpop < dst)
		currentTopPost = $(currentTopPost).next();
	
	if (typeof lastReadPost === 'undefined' || lastReadPost.offsetHeight == 0)
		lastReadPost = $('.timeline > ol > li:first')[0];

// 	var start = new Date().getTime();
//	var postsList = $('ol.timeline > li');
	var postsList = $('.timeline > ol > li').filter(':visible');
	var lastReadPostIndex = postsList.index(lastReadPost);
	var currentTopPostIndex = postsList.index(currentTopPost);
// 	var end = new Date().getTime();
// 	var time = end - start;

	unreadCount = Math.min(lastReadPostIndex, currentTopPostIndex);
	updateUnreadBadge(unreadCount);

	$('.timeline > ol > li.last-read-post').removeClass('last-read-post');
	if (currentTopPostIndex < lastReadPostIndex)
		lastReadPost = currentTopPost;
	$(lastReadPost).addClass('last-read-post');
	
	liWidth = $(currentTopPost).width();
};

function updateUnreadBadge(newCount) {
	var badge = $('#unread-badge');
	
	if (typeof newCount === 'undefined') {
		oldCount = parseInt(badge[0].innerText);
		newCount = ++oldCount;
	}
	
	badge[0].innerHTML = newCount;

	if (newCount <= 0) {
		badge.hide();
	} else
		badge.show();
};

$.fn.isBefore= function(sel){
  return this.nextAll(sel).length !== 0;
}

function lockScroll(e) {
	var elem = e.target;
	if (elem.nodeName != 'LI')
		return;
	var parent = elem.parentNode;
	if (parent != bungloo.timeline.body) return;
	
	var rescroll = function(element) {
		// try to grab the height of the elem
		var elementHeight = element.offsetHeight;
		if (elementHeight <= 0) {
			// if height is zero, then we're dealing with a hidden element
			//var copied_elem = $(element).clone().css({
			var copied_elem = $(element).clone().attr('id', false).css({
	//			visibility:'hidden',
				display:'block', 
				width: liWidth,
				position:'absolute'
			});
		
			var ol = $(document.createElement('ol'));
			ol.addClass('timeline');
			ol.append(copied_elem);
			$('#content').append(ol);

			elementHeight = copied_elem.outerHeight();
			ol.remove();
		
			bungloo.timeline.saveScrollTop += elementHeight;
		} else {
			var oldPosition = scrollingElement.scrollTop();
			var newPosition = oldPosition + elementHeight;
			scrollingElement.scrollTop(newPosition);	
		}

		updateUnreadBadge();
	};

	if ( $(elem).isBefore(lastReadPost) ) //is a new posts
		rescroll(elem);
};



	};

});
