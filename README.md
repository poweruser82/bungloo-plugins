bungloo-plugins
===============

A set of plugins for [Tent](https://tent.io) client [Bungloo](http://jabs.nu/bungloo)

*The plugins are in a alpha stage. The code is not clean and there are known bugs. Use at your own risk.*

# Plugins
## Marked Posts
Double click on a post to mark it with a green border on the right. Doble click it again to unmark.

**Note**: [Minaliffic](https://github.com/sfcgeorge/Minimaliffic/) plugin contains a very similar version of this plugin. If you use minimaliffic, disable this one.

## Hide Media
This plugin add a button to every post which has at least an image, video or map.

Clicking the `☗` button all the media of that post will be hidden.  
Clicking the button (now `☖`) again, the media will reappear.

## Hide Replies
This plugin add a button to every post that has at least a reply.

Clicking the `⤼` button, all the replies of that post will be hidden.  
Clicking the button (now `⤽`) again, the replies will reappear.

The usecase is this.

1. You read all your timeline and then you have to leave for some time.
* When you come back you start reading timeline posts from where you left.
* You read an interesting post that you know has replies (because of the new `⤼` icon).
* You open its conversation view, read all the replies and go back to the timeline.
* You click the `⤼` icon next the repost button.
* The replies you have already read in the conversation view will disappear.
* You keep reading the rest of your timeline.

## Unread Posts
This plugin counts the new posts in your timeline you didn't read yet and locks the scroll of the timeline to the last one you read.

The number of unread posts appears as a badge on the Timeline icon in the sidebar.
The last read post has a thick top border to let you know there are unread posts and you can start to scroll your timeline to read them.

The unread count is updated every 1 second.

# Requirements
* [Bungloo](http://jabs.nu/bungloo) 1.4.0–1.4.3

# Install
1. Copy or move the `it.to.work` directory in the [Bungloo directory for plugins](https://github.com/jeena/bungloo/wiki/Plugins).
2. Add
    <pre>
    require([
        'plugins/it.to.work/hide-media',
        'plugins/it.to.work/hide-replies',
        'plugins/it.to.work/unread-posts',
        'plugins/it.to.work/marked-posts'
        ], function() {
        }
    );
    </pre>
to your `Plugin.js` file.
3. Restart Bungloo.

If you want to use only some of the plugins, edit the `require` array accordingly.