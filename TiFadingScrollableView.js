/**
 *
 * @param args
 * {
 *  parent = The parent view to which the scrollableView hast been added to
 *  views = array of views
 * }
 * @returns Ti.UI.ScrollableView
 */
exports.createScrollableView = function (args) {
    /**
     * Check completeness of args
     */
    if (!args.views) {
        return Ti.UI.createScrollableView(args);
    }
    if (!args.parent) {
        return Ti.UI.createScrollableView(args);
    }

    var allViews = [];

    /**
     * create container for views
     */
    for (var i = 0; i < args.views.length; i++) {
        var item = args.views[i];

        var scrollContainer = Ti.UI.createView({
            backgroundColor: 'transparent',
            width: args.width || Ti.UI.FILL,
            height: args.height || Ti.UI.FILL
        });

        var backgroundImage = Ti.UI.createImageView({
            opacity: (i == 0) ? 1 : 0,
            image: item.backgroundImage,
            width: args.width || Ti.UI.FILL,
            height: args.height || Ti.UI.FILL
        });
        args.parent.add(backgroundImage);
        scrollContainer.background = backgroundImage;

        item.backgroundColor = 'transparent';
        item.backgroundImage = null;

        allViews.push(scrollContainer);
    }

    var scrollableView = Ti.UI.createScrollableView(args);

    var currentPage = 0;
    scrollableView.addEventListener('scroll', function (e) {
        var right = e.currentPageAsFloat < parseFloat(currentPage);
        var left = e.currentPageAsFloat > parseFloat(currentPage);

        var opacity = e.currentPageAsFloat - currentPage;
        if (opacity < 0) {
            opacity = opacity * (-1);
        }

        if (left) {
            /**
             * Check if max entries is reached
             */
            if (currentPage == allViews.length - 1) {
                return;
            }

            var nextView = allViews[currentPage + 1];
            if (nextView) {
                nextView.background.opacity = opacity;
            }
        }
        if (right) {
            if (currentPage == 0) {
                return;
            }
            opacity = 1 - opacity;
            allViews[currentPage].background.opacity = opacity;
        }
    });

    /**
     * Make visible/invisible
     * Set currentPage
     */
    scrollableView.addEventListener('scrollend', function (e) {
        currentPage = e.currentPage;

        var prevView = allViews[currentPage - 1];
        if (prevView) {
            prevView.background.opacity = 1;
        }

        var actView = allViews[currentPage];
        if (actView) {
            actView.background.opacity = 1;
        }

        var nextView = allViews[currentPage + 1];
        if (nextView) {
            nextView.background.opacity = 0;
        }
    });

    return scrollableView;
}
