//
//  ANIMATION
//

function logoAnimation() {
 var self = this;

 // Grab utils
 self.utils = require('./utils');

 // Init canvas
 self.initCanvas();

 // Draw Loop
 (function drawFrame () {
            self.utils.getAnimationFrame();                          // X-Browser support for requrestAnimationFrame method
            window.requestAnimationFrame(drawFrame, canvas);         // Request Animation Frame tells the browser that we are ready to paint a new frame
            self.ctx.clearRect(0, 0, canvas.width, canvas.height);   // Clear the canvas so we can render the next frame

     // Frequncy Variables for generating color wave
     var redFreq = 0.1,
              greenFreq = 0.2,
              blueFreq = 0.3,
         tick = Date.now()/250;  // use the time in ms as a ticker

     // RGB for Background Color
     var redA   = Math.sin(redFreq*tick + 0) * 127 + 128,
         greenA = Math.sin(greenFreq*tick + 2) * 127 + 128,
         blueA  = Math.sin(blueFreq*tick + 4) * 127 + 128;

     // RGB for Inner Color
     var redB   = Math.sin(redFreq*tick/2 + 0) * 127 + 128,
         greenB = Math.sin(greenFreq*tick/2 + 4) * 127 + 128,
         blueB  = Math.sin(blueFreq*tick/2 + 8) * 127 + 128;

     var coords = [(tick * 15) % 300, (tick * 15) % 300];

     // Draw the logo with our two new colors
     self.draw(self.RGB2Color(redA, greenA, blueA), self.RGB2Color(redB, greenB, blueB), coords);
    }());
};


// Init Canvas elm, set contex and size

logoAnimation.prototype.initCanvas = function() {
 var self = this;

 // Init Canvas
 self.canvas = document.getElementById('canvas');
 self.ctx = canvas.getContext('2d');

 // set 300x300
 self.canvas.width = 300;
 self.canvas.height = 300;

 // Get canvas center point
 self.centerX = canvas.width / 2;
 self.centerY = canvas.height / 2;
 self.radius = canvas.width / 2;
};


// Draw logo each frame

logoAnimation.prototype.draw = function(colorBg, colorStroke, coords) {
 var self = this;

 // Base Circle
 self.ctx.beginPath();
 self.ctx.arc(self.centerX + coords[0], self.centerY, self.radius, 0, 2 * Math.PI, false);
 self.ctx.fillStyle = colorBg || '#333';
 self.ctx.fill();

 // Outline Circle
 self.ctx.beginPath();
 self.ctx.arc(self.centerX, coords[1], self.radius - 30, 0, 2 * Math.PI, false);
 self.ctx.lineWidth = 10;
 self.ctx.strokeStyle = colorStroke || '#fff';
 self.ctx.stroke();

 // Stret lines
 self.ctx.lineWidth = 13;

 // N/S 1
 self.ctx.beginPath();
 self.ctx.moveTo(80, 52);
 self.ctx.lineTo(80, coords[0]);
 self.ctx.stroke();

 // N/S 2
 self.ctx.beginPath();
 self.ctx.moveTo(190, 40);
 self.ctx.lineTo(190, coords[0]);
 self.ctx.stroke();

 // E/W 1
 self.ctx.beginPath();
 self.ctx.moveTo(30, 120);
 self.ctx.lineTo(270, coords[1]);
 self.ctx.stroke();

 // E/W 2
 self.ctx.beginPath();
 self.ctx.moveTo(65, 235);
 self.ctx.lineTo(coords[0], 235);
 self.ctx.stroke();

 // SW/NE
 self.ctx.beginPath();
 self.ctx.moveTo(105, 260);
 self.ctx.lineTo(225, coords[1]);
 self.ctx.stroke();
};


// Helpers

logoAnimation.prototype.RGB2Color = function (r,g,b) {
 var self = this;
 return '#' + self.byte2Hex(r) + self.byte2Hex(g) + self.byte2Hex(b);
}

logoAnimation.prototype.byte2Hex = function (n) {
 var self = this;
 var nybHexString = "0123456789ABCDEF";
 return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

module.exports = new logoAnimation();
