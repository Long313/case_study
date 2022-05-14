let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");
let music = document.getElementById("audio-2");
let gameOverElement = document.querySelector(".game-over");
let youWinElement = document.querySelector(".game-win");
let btnPlayAgain = document.getElementById("btn-play-again");
let scoreElement = document.getElementById("score");
let result = document.getElementById("result");
var ball = {
  x: 10,
  y: canvas.height - 50,
  dX: 3,
  dY: 3,
  radius: 7,
};
var isGameOver = false; //điều kiện dừng game
let paddle = {
  width: 100,
  height: 10,
  x: 0,
  y: canvas.height - 30,
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
  x: 15,
  y: 30,
  margin: 20,
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
        ball.x >= b.x && // quả bóng sẽ nằm ở giữa viên gạch
        ball.x <= b.x + b.w &&
        ball.y - ball.radius <= b.y + b.h &&
        ball.y + ball.radius >= b.y
      ) {
        ball.dY = -ball.dY;
        b.isBroken = true;
        count++;
        result.innerText = "ĐIỂM CỦA BẠN: " + count;
      }
      if (count == array.length) {
        youWin();
      }
    }
  });
}
// hàm đê thay đổi vị trí bóng
function changePosition() {
  if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= canvas.width) {
    ball.dX = -ball.dX;
  }
  if (ball.y - ball.radius <= 0) {
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
    ball.x - ball.radius >= paddle.x &&
    ball.x + ball.radius <= paddle.x + paddle.width &&
    ball.y + ball.radius >= paddle.y
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
  } else if (paddle.x + paddle.width > canvas.width) {
    paddle.x = canvas.width - paddle.width;
  }
}
// hàm để tiếp tục game
function continueGame() {
  // điều kiện để tiếp tục game
  if (ball.y + ball.radius > canvas.height) {
    isGameOver = true;
  }
}
var count = 0;
// hàm hiển thị thông báo khi thắng game
function youWin() {
  music.pause();
  // canvas.pause();
  youWinElement.style.display = "flex";
  canvas.innerHTML =
    '<audio autoplay src="./audio/Tieng-game-thang.mp3"></audio>';
  clearInterval(interval);
}
var interval = setInterval(play, 10);
// hàm để chạy game
function play() {
  if (!isGameOver) {
    context.clearRect(0, 0, canvas.width, canvas.height); // xoá hình trước
    drawBall(); // vẽ bóng
    drawPaddle(); // vẽ thanh chắn
    brokenBrick(); // hàm để xác định tình trạng viên gạch
    drawBrick(); //vẽ gạch
    changePosition(); // toạ độ của bóng thay đổi khi chạm vào trái,phải,trên
    ballCollidePaddle(); // bóng bật lại khi chạm vào thanh chắn
    updatePosition(); // cập nhật vị trí quả bóng mỗi khi thay đổi toạ độ
    updatePaddlePosition(); // di chuyển thanh chắn qua trái và phải
    continueGame();
  } else {
    gameOver();
  }
}
// hàm để hiển thị thông báo khi thua game
function gameOver() {
  music.pause();
  gameOverElement.style.display = "flex";
  canvas.innerHTML =
    '<audio autoplay src="./audio/Tieng-game-thua.mp3"></audio>';
  scoreElement.innerText = count;
  clearInterval(interval);
}
btnPlayAgain.addEventListener("click", function () {
  window.location.reload();
});
