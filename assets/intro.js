let canvas = document.getElementById("my-canvas");
let context = canvas.getContext("2d");
let audio = document.getElementById("audio-1");
document.addEventListener("keydown", playMusic);
function playMusic() {
  audio.play();
  document.removeEventListener("keydown", playMusic);
}
let brick = {
  x: 0,
  y: 190,
  w: 80,
  h: 20,
  margin: 1,
  color: ["#B22222", "#FF3030", "#EE2C2C", "#CD2626", "#8B1A1A", "#FF3300"],
};
let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 2,
};
function drawBall(num) {
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius + num, 0, 2 * Math.PI);
  context.fillStyle = "#BA55D3";
  context.fill();
  context.closePath();
}
let size = 0;
function zoomBall() {
  context.clearRect(150, 100, 100, 100);
  drawBall(size);
  size++;
}
setInterval(zoomBall, 5);
function drawBrick(number, row, changeX) {
  for (let i = 0; i < number; i++) {
    if (i == 2 && row == 2) {
      continue;
    }
    let a = Math.floor(Math.random() * brick.color.length);
    // console.log(a);
    context.beginPath();
    context.fillStyle = brick.color[a];
    context.fillRect(
      brick.x + brick.margin * i + brick.w * i + changeX,
      brick.y + brick.margin * row + brick.h * row,
      brick.w,
      brick.h
    );
    context.closePath();
  }
}
drawBrick(2, 1, 0);
drawBrick(4, 2, 30);
drawBrick(5, 3, 0);
drawBrick(5, 4, 30);
