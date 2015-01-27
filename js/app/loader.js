/**
 * Provides requestAnimationFrame in a cross browser way.
 * @author paulirish / http://paulirish.com/
 * https://gist.github.com/838785
 */
if ( !window.requestAnimationFrame ) {
    window.requestAnimationFrame = ( function() {

        return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

            window.setTimeout( callback, 1000 / 30 );

        };

    } )();
}

var canvas = document.getElementById('scene');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;

var circle = function(color, r) {
    ctx.fillStyle = color;
    
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, 2 * Math.PI, true);
    ctx.closePath();
    
    ctx.fill();
}

var i = 0;
var redraw = function() {
    ctx.save();
        
    // paint bg
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, w, h);
       
    // set origin to center
    ctx.translate(w / 2, h / 2);
    
    // draw sun
    circle('red', 40);
    circle('white', 20);
    
    // rotate + move along x
    ctx.rotate(i / 20);
    ctx.translate(80, 0);
    
    // draw planet
    circle('red', 20);
    
    ctx.rotate(i / 90);
    ctx.translate(35, 0);
    
    circle('red', 5);
    
    ctx.restore();
    
    i++;
    
    window.requestAnimationFrame(redraw);
};

window.requestAnimationFrame(redraw);