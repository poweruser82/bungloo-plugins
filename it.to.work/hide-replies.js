define(['module', 'jquery', 'plugins/it.to.work/scrollingElement'], function(myself, $, scrollingElement) {

	return new function() {

//include css file
$('<link/>', {
	rel: 'stylesheet',
	type: 'text/css',
	href: myself.uri.replace(/.js$/, '.css')
}).appendTo('head');

$(document).ready(function() {
	if (bungloo.timeline) {
		bungloo.timeline.body.addEventListener('DOMNodeInserted', hideReplies, false);
	}
});

function hideReplies(e) {
	var element = e.target;
	if (element.nodeName != 'LI')
		return;
	var parent = element.parentNode;
	if (parent != bungloo.timeline.body) return;
	
	// mark the post as reply
	var mentions = element.status.mentions;
	for (var i=0; i<mentions.length; i++) {
		if (mentions[i].hasOwnProperty('post')) {
			//add a class with the parent post
			var parentPostId = mentions[i].post;
			$(element).addClass('in-reply-to-'+parentPostId);
			
			var parentPost = $('#post-'+parentPostId+'-timeline');
			addHideRepliesButton(parentPost[0]);
		}
	}
	
	// check if there are replies for this post
	var replies = $('.in-reply-to-'+element.status.id);
	if (replies.length > 0) {
		addHideRepliesButton(element);
	}

};

var addHideRepliesButton = function(element) {
	//add the hide button
	//var buttons_container = $(element).find('.reply_to').parent()[0];
	var buttons_container = element.getElementsByTagName('aside')[0];
	if ($(buttons_container).find('.hide_replies').length == 0) {
		var a = document.createElement('a');
		var hideRepliesButton = a.cloneNode();
		hideRepliesButton.className = 'hide_replies';
		//hideRepliesButton.innerText = '⇞';
		hideRepliesButton.href = '#';
		hideRepliesButton.title = 'Toggle replies';
		hideRepliesButton.onclick = function() {
			var classaction = 'add';
			if ($(element).hasClass('has-hidden-replies')) {
				classaction = 'remove';
			}
			$(element).toggleClass('has-hidden-replies');
			
			var st_pre = scrollingElement.scrollTop();
			var ot_pre = $(element).offset().top;

			processPost([element], classaction);

			var ot_post = $(element).offset().top;
			var st_post = st_pre - ot_pre + ot_post;
			
			scrollingElement.scrollTop(st_post);
			
			return false;
		};
		buttons_container.appendChild(hideRepliesButton);
	}
};

var processPost = function(parentPost, classaction) {
	for (var i=0; i<parentPost.length; i++) {
		var parentPostId = parentPost[i].status.id;
		//$(parentPost[i]).toggleClass('has-hidden-replies');
		var replies = $('.in-reply-to-'+parentPostId);
		if (classaction == 'add')
			replies.addClass('hidden-reply');
		else {
			replies.removeClass('hidden-reply');
			$(parentPost[i]).removeClass('has-hidden-replies');
		}
		//process replies
		for (var j=0; j<replies.length; j++) {
			processPost([replies[j]], classaction);
		}
	}
};



	};

});
