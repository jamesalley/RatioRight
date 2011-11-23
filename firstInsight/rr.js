YUI().use('node','event', function (Y) {
    Y.config.doc.ontouchmove = function(e) { 
        //e.preventDefault();
    };
    
    // control dynamic font sizing.
    // normally body is set to 10px; master container is set to 100%.
    // so an element set to 2em gets sized at 20px, 1.5 em is 15px equivalent. Simple.
    // but what we really want is dynamic font sizing, so that this works regardless of how we stretch the page.
    // so I need to figure out a ratio between the target and the intended.
    // in this case, the intended relationhip in the designs goes like this:
    //      I have a 692px high design. My body is set to 10px by default. that's 1-to-69.2, or 0.01445087
    //      In other words, the font size of the body, in pixels, should be 0.01445087 * the body height
    // So here we go...
    // Setting a ratio and adding relevant code to the _windowChange function
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
