// Initialize game board
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

// Define game elements
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  width: 80,
  height: 10,
  speed: 10
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speedX: 5,
  speedY: 5
};

// Handle user input
document.addEventListener('keydown', event => {
  if (event.code === 'ArrowLeft') {
    paddle.x -= paddle.speed;
  }
  if (event.code === 'ArrowRight') {
    paddle.x += paddle.speed;
  }
});

// Create game loop
setInterval(() => {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw paddle
  ctx.fillStyle = '#000';
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  
  // Draw ball
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
  ctx.fillStyle = '#f00';
  ctx.fill();
  
  // Update ball position
  ball.x += ball.speedX;
  ball.y += ball.speedY;
  
  // Detect collisions
  if (ball.x < ball.radius || ball.x > canvas.width - ball.radius) {
    ball.speedX = -ball.speedX;
  }
  if (ball.y < ball.radius) {
    ball.speedY = -ball.speedY;
  }
  if (ball.y > canvas.height - ball.radius) {
    alert('Game over!');
    document.location.reload();
  }
  if (ball.x > paddle.x && ball.x < paddle.x + paddle.width && ball.y > paddle.y - paddle.height) {
    ball.speedY = -ball.speedY;
  }
}, 20);