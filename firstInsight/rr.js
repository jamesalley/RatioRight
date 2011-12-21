YUI().use('node','event', function (Y) {
    Y.config.doc.ontouchmove = function(e) { 
        //e.preventDefault();
    };
    
    /**
     *  Ratio-based content scaling to fit most devices
     *
     *  How it works:
     *  We need to figure out a ratio between the actual browser env and the design.
     *  In this case, the intended relationhip in the designs goes like this:
     *  We have a 692px high design. 
     *  Our master container is set to 10px per em by default.
     *  That's 1-to-69.2, or 0.01445087
     *  In other words, the font size of the master container, in pixels, 
     *  should be 0.01445087 * the body height.
     */

    var LANDSCAPE_FONT_SIZE_RATIO = 0.01445087;
        PORTRAIT_FONT_SIZE_RATIO = 0.01054852;
    
    // set up window change stuff including setting height of master container
    var WINDOW_CHANGE_EVENT = ('onorientationchange' in Y.config.win) ? 'orientationchange':'resize';
    this._windowChange = function() {
        var win = Y.config.win,
            bodyHeight = win.innerHeight,
            calculatedOrientation = (parseInt(win.innerWidth) > parseInt(bodyHeight)) ? 'landscape':'portrait',
            fontSize = (calculatedOrientation == 'landscape') ? bodyHeight*LANDSCAPE_FONT_SIZE_RATIO : bodyHeight*PORTRAIT_FONT_SIZE_RATIO;
        Y.one('.master').setStyle('height',bodyHeight);
        Y.one('.master').setStyle('font-size',fontSize+'px');
    }
    Y.on(WINDOW_CHANGE_EVENT,this._windowChange, Y.config.win, this);
    this._windowChange();
    
    // tools interactions
    Y.one('.tools .prefs').on('click',function(){
        alert('Preferences icon was clicked.');
    },this);
    
});
