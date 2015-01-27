# TiFadingScrollableView
Appcelerator ScrollableView extension for fading background images

![Example](/example.gif)

## API

This module uses the [Ti.UI.ScrollableView API](http://docs.appcelerator.com/titanium/3.0/#!/api/Titanium.UI.ScrollableView).

## Usage

```
    var self = Ti.UI.createWindow();
    
    var allViews = [];
    
    for (var i = 0; i < 10; i++) {
    
        var container = Ti.UI.createView({
            backgroundImage: '/images/' + i + '.jpg', //This is IMPORTANT
            width: Ti.UI.FILL,
            height: Ti.UI.FILL
        });
    
        var messageLabel = Ti.UI.createLabel({
            color: '#000',
            font: {
                fontSize: 30
            },
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE,
            text: 'Message View ' + i
        });
        container.add(messageLabel);
    
        allViews.push(container);
    }
    
    var TiFadingScrollableView = require('TiFadingScrollableView');
    var scrollableView = TiFadingScrollableView.createScrollableView({
        parent: self,
        views: allViews
    });
    self.add(scrollableView);
    
    self.open();
```
        