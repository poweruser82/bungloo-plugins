bungloo-plugins
===============

A set of plugins for [Tent](https://tent.io) client [Bungloo](http://jabs.nu/bungloo)

#Install
1. Copy or move the `it.to.work` directory in the [Bungloo directory](https://github.com/jeena/bungloo/wiki/Plugins).
2. Add
```
require( [
	'plugins/it.to.work/hide-replies',
	'plugins/it.to.work/unread-posts',
	'plugins/it.to.work/marked-posts'
	], function() {
	}
);
```
to your `Plugin.js` file.
3. Restart Bungloo.