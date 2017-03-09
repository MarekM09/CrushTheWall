var ballX = 375;
var ballY = 300;
var ballSpeedX = 5;
var ballSpeedY = 5;

const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 60;
var paddleX = 325;

var canvas, canvasContext;

function updateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  // var mouseY = evt.clientY - rect.top - root.scrollTop;

  paddleX = mouseX - PADDLE_WIDTH / 2;
}

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  var framePerSecond = 30;
  setInterval(updateAll, 1000/framePerSecond);

  canvas.addEventListener('mousemove', updateMousePos);
}

function updateAll() { 
  moveAll();
  drawAll();
}

function ballReset() {
  ballX = canvas.width/2;
  ballY = canvas.height/2;
}

function moveAll() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if(ballX > canvas.width - 10) {  //right
    ballSpeedX *= -1;
  } else if(ballX < 10) {  //left
    ballSpeedX *= -1;
  }

  if(ballY > canvas.height - 10) {  //bottom
    ballReset();
    //ballSpeedY *= -1;
  } else if(ballY < 10) {  //top
    ballSpeedY *= -1;
  }

  var paddleTopEdgeY = canvas.height - PADDLE_DIST_FROM_EDGE;
  var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
  var paddleLeftEdgeX = paddleX;
  var paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH ;

  if( ballY > paddleTopEdgeY &&
      ballY < paddleBottomEdgeY &&
      ballX > paddleLeftEdgeX &&
      ballX < paddleRightEdgeX) {
    ballSpeedY *= -1;

    var centerOfPaddleX = paddleX + PADDLE_WIDTH / 2;
    var ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
    ballSpeedX = ballDistFromPaddleCenterX * 0.3;
  }
}

function drawAll() {
  colorRect(0, 0, canvas.width, canvas.height, 'black');  
  colorCircle(ballX, ballY, 10, 'white');
  colorRect(paddleX, canvas.height - PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH, PADDLE_THICKNESS, 'white');
}

function colorRect(topLeft, topRight, boxWidth, boxHeight, filColor) {
  canvasContext.fillStyle = filColor;
  canvasContext.fillRect(topLeft, topRight, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
  canvasContext.fill();
}