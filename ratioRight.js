YUI.add('ratioRight', function(Y) {

    function RatioRightPlugin(config) {
        RatioRightPlugin.superclass.constructor.apply(this, arguments);
    }
    RatioRightPlugin.NAME = 'ratioRightPlugin';
    RatioRightPlugin.NS = 'ratioRight';
    //RatioRightPlugin.ATTRS = {};
    
    Y.extend(RatioRightPlugin, Y.Plugin.Base, {
                
        initializer: function(conf) {
            this.host = this.get('host');
            this.WINDOW_CHANGE_EVENT = ('onorientationchange' in Y.config.win) ? 'orientationchange':'resize';
            this.LANDSCAPE_FONT_SIZE_RATIO = 1/(conf.referenceHeight/10),
            this.PORTRAIT_FONT_SIZE_RATIO = 1/(conf.referenceWidth/10);
            
            Y.on(this.WINDOW_CHANGE_EVENT,this._windowChange, Y.config.win, this);
            this.host.get('parentNode').setStyle('font-size','10px');
            this._windowChange();
        },

        destructor: function() {
            Y.config.win.detatch(this.WINDOW_CHANGE_EVENT,this._windowChange)
        },
        
        _windowChange: function() {
            var win = Y.config.win,
                winHeight = win.innerHeight,
                calculatedOrientation = (parseInt(win.innerWidth) > parseInt(winHeight)) ? 'landscape':'portrait',
                fontSize = (calculatedOrientation == 'landscape') ? winHeight*this.LANDSCAPE_FONT_SIZE_RATIO : winHeight*this.PORTRAIT_FONT_SIZE_RATIO;
            this.host.setStyle('height',winHeight);
            this.host.setStyle('font-size',fontSize+'px');
        }
        
    });

    Y.RatioRightPlugin = RatioRightPlugin;

}, '1.0.0', {
    requires: ['node', 'event', 'plugin']
});


