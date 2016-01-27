$(function(){

  // Init Canvas
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  // // set 300x300
  canvas.width = 300;
  canvas.height = 300;

  // draw a square
  ctx.fillRect(0,0, canvas.width, canvas.height);
});
