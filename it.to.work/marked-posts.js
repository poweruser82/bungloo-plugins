// mark posts with dbl-click
// $('ol').delegate('a', 'click dblclick', function(e) {
// 	e.stopPropagation();
// }).delegate('li', 'dblclick', function(e) {
// 	$(this).toggleClass('marked');
// });

/*
//Mark posts with a double click
$('ol').on('dblclick', 'li:not(a)', function(e) { 
	//Deselect this post as the intention was to mark it
	$(this).removeClass('selected'); 
	$(this).toggleClass('marked'); //Mark this post only
});
*/

//(Un)Mark posts with a double click
define(['module', 'jquery'], function(myself, $) {
	return new function() {

		//include css file
		$('<link/>', {
			rel: 'stylesheet',
			type: 'text/css',
			href: myself.uri.replace(/.js$/, '.css')
		}).appendTo('head');
	
		$('ol').on('dblclick', 'li:not(a)', function(e) { 
			$(this).toggleClass('marked'); //Mark this post only
		});
	};
});