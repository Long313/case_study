let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");
var ball = {
  x: 10,
  y: 280,
  dX: 3,
  dY: 3,
  radius: 7,
};
var isGameOver = false; //điều kiện dừng game
let paddle = {
  width: 100,
  height: 10,
  x: 0,
  y: canvas.height - 10,
  speed: 5,
  isMovingLeft: false,
  isMovingRight: false,
};
// hàm vẽ thanh chắn
function drawPaddle() {
  context.beginPath();
  context.fillStyle = "blue";
  context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  context.fill();
  context.closePath();
}
document.addEventListener("keyup", function (event) {
  if (event.keyCode == 37) {
    paddle.isMovingLeft = false;
  } else if (event.keyCode == 39) {
    paddle.isMovingRight = false;
  }
  // console.log(event);
});
document.addEventListener("keydown", function (event) {
  if (event.keyCode == 37) {
    paddle.isMovingLeft = true;
  } else if (event.keyCode == 39) {
    paddle.isMovingRight = true;
  }
  // console.log(event);
});
// hàm để vẽ bóng
function drawBall() {
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
  context.fillStyle = "red";
  context.fill();
  context.closePath();
}
var count = 0;
let brick = {
  x: 10,
  y: 20,
  margin: 15,
  w: 40,
  h: 10,
  row: 3,
  colum: 8,
};
let array = [];
for (let i = 0; i < brick.row; i++) {
  for (let j = 0; j < brick.colum; j++) {
    array.push({
      x: brick.x + j * (brick.margin + brick.w),
      y: brick.y + i * (brick.margin + brick.h),
      w: brick.w,
      h: brick.h,
      isBroken: false,
    });
  }
}
console.log(array);
// hàm vẽ gạch
function drawBrick() {
  array.forEach(function (b) {
    if (!b.isBroken) {
      context.beginPath();
      context.fillStyle = "orange";
      context.fillRect(b.x, b.y, b.w, b.h);
      context.closePath();
    }
  });
}
function brokenBrick() {
  array.forEach(function (b) {
    if (!b.isBroken) {
      if (
        ball.x >= b.x &&
        ball.x <= b.x + b.w &&
        ball.y - ball.radius <= b.y + b.h
      ) {
        ball.dY = -ball.dY;
        b.isBroken = true;
        count++;
        result.innerText = "Điểm của bạn: " + count;
      }
    }
  });
}
// hàm đê thay đổi vị trí bóng
function changePosition() {
  if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
    ball.dX = -ball.dX;
  }
  if (ball.y + ball.radius < 0) {
    ball.dY = -ball.dY;
  }
}
// hàm để cập nhật vị trí quả bóng khi thay đổi toạ độ
function updatePosition() {
  ball.x += ball.dX;
  ball.y += ball.dY;
}
// hàm để xử lý quả bóng bật lại khi chạm vào thanh chắn
function ballCollidePaddle() {
  if (
    ball.x + ball.radius >= paddle.x &&
    ball.x + ball.radius <= paddle.x + paddle.width &&
    ball.y + ball.radius >= canvas.height - paddle.height
  ) {
    ball.dY = -ball.dY;
  }
}
// hàm để thay đổi vị trí của thanh chắn khi nhấn nút trái phải
function updatePaddlePosition() {
  if (paddle.isMovingLeft) {
    paddle.x -= paddle.speed;
  } else if (paddle.isMovingRight) {
    paddle.x += paddle.speed;
  }
  if (paddle.x < 0) {
    paddle.x = 0;
  } else if (paddle.x > canvas.width - paddle.width) {
    paddle.x = canvas.width - paddle.width;
  }
}
// hàm để tiếp tục game
function continueGame() {
  // điều kiện để tiếp tục game
  if (ball.y > canvas.height - ball.radius) {
    isGameOver = true;
  }
}
// hàm để gọi những hàm khác, có điều kiện dừng game.
var count = 0;
let result = document.getElementById("result");
function stepsOfCreateGame() {
  if (count == array.length) {
    alert("Xin chúc mừng, bạn đã chiến thắng !!!");
  }
  if (!isGameOver) {
    context.clearRect(0, 0, canvas.width, canvas.height); // xoá hình trước
    drawBall(); // vẽ bóng
    drawPaddle(); // vẽ thanh chắn
    brokenBrick();
    drawBrick(); //vẽ gạch
    changePosition(); // toạ độ của bóng thay đổi khi chạm vào trái,phải,trên
    ballCollidePaddle(); // bóng bật lại khi chạm vào thanh chắn
    updatePosition(); // cập nhật vị trí quả bóng mỗi khi thay đổi toạ độ
    updatePaddlePosition(); // di chuyển thanh chắn qua trái và phải
    continueGame();
    requestAnimationFrame(stepsOfCreateGame); // như một hàm đệ quy, xử lý di chuyển mượt hơn so với dùng setInterval
  } else {
    alert("Game Over!"); // điều kiện để dừng game.
  }
}
stepsOfCreateGame();
// setInterval(stepOfCreategame,10);
