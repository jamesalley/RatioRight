YUI.add('ratioRight', function(Y) {

    function RatioRightPlugin(config) {
        RatioRightPlugin.superclass.constructor.apply(this, arguments);
    }
    RatioRightPlugin.NAME = 'ratioRightPlugin';
    RatioRightPlugin.NS = 'ratioRight';
    //RatioRightPlugin.ATTRS = {};
    
    Y.extend(RatioRightPlugin, Y.Plugin.Base, {
                
        initializer: function(conf) {
            this.conf = conf;
            this.host = this.get('host');
            this.WINDOW_CHANGE_EVENT = ('onorientationchange' in Y.config.win) ? 'orientationchange':'resize';
            this.LANDSCAPE_FONT_SIZE_RATIO = 1/(conf.referenceHeight/10);
            this.PORTRAIT_FONT_SIZE_RATIO = 1/(conf.referenceWidth/10);
            this.referenceOrientation = (conf.referenceWidth>conf.referenceHeight) ? 'landscape':'portrait';
            this.locked = conf.locked;
            
            Y.on(this.WINDOW_CHANGE_EVENT,this._windowChange, Y.config.win, this);
            this.host.get('parentNode').setStyle('font-size','10px');
            this._windowChange();
        },

        destructor: function() {
            Y.config.win.detatch(this.WINDOW_CHANGE_EVENT,this._windowChange);
        },
        
        _windowChange: function() {
            var win = Y.config.win,
                winWidth = win.innerWidth,
                winHeight = win.innerHeight,
                viewportWidth = winWidth,
                viewportHeight = winHeight,
                targetWidth,
                targetHeight;
            Y.log('RatioRight: ' + viewportWidth + 'x' + viewportHeight);
            //console.log(win);

            // If parent node is not BODY, use the dimensions of the parent instead of window.
            if (this.host.get('parentNode').get('tagName') != 'BODY') {
                viewportWidth = this.host.get('parentNode').get('clientWidth');
                viewportHeight = this.host.get('parentNode').get('clientHeight');
            }

            var calculatedOrientation = (parseInt(viewportWidth) > parseInt(viewportHeight)) ? 'landscape':'portrait',
                fontSize = (calculatedOrientation == 'landscape') ? viewportHeight*this.LANDSCAPE_FONT_SIZE_RATIO : viewportHeight*this.PORTRAIT_FONT_SIZE_RATIO;
            
            // If design's aspect ratio is locked regardless of device orientation
            if (this.locked && calculatedOrientation != this.referenceOrientation) {
                if (calculatedOrientation === 'portrait') {
                    // Locked, landscape reference design in a portait window; thus limit the height.
                    // Solve for the height that matches the design reference ratio
                    targetHeight = parseInt(viewportWidth*this.conf.referenceHeight/this.conf.referenceWidth);
                    fontSize = targetHeight*this.LANDSCAPE_FONT_SIZE_RATIO;
                    this.host.setStyle('height',targetHeight);
                    this.host.setStyle('width','');
                } else {
                    // Locked, portrait reference design in a landscape window; thus limit the width.
                    // Solve for the width that matches the design reference ratio
                    targetWidth = parseInt(viewportHeight*this.conf.referenceWidth/this.conf.referenceHeight);
                    fontSize = viewportHeight*this.PORTRAIT_FONT_SIZE_RATIO;
                    this.host.setStyle('height',viewportHeight);
                    this.host.setStyle('width',targetWidth);
                }
            }
            // applies to all other cases
            else {
                this.host.setStyle('height',viewportHeight);
            }
            // applies to all cases
            this.host.setStyle('font-size',fontSize+'px');
        }
        
    });

    Y.RatioRightPlugin = RatioRightPlugin;

}, '1.0.0', {
    requires: ['node', 'event', 'plugin']
});


