const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// ゲームオブジェクトの生成
const ball = new Circle(canvas.width / 2, canvas.height - 50, 10, "red");
const paddle = new Shape(canvas.width / 2 - 50, canvas.height - 30, 100, 10, "blue");
const gameEvent = new GameEvent();
const score = new TextObj(20, 40, "スコア: 0");

ball.dx = 2;
ball.dy = 2;

const blocks = [];
const numRows = 5;
const numCols = 10;
const blockWidth = canvas.width / numCols;
const blockHeight = 20;
let gameoverflag = false;
let clearflag = false;

for (let i = 0; i < numRows; i++) {
  for (let j = 0; j < numCols; j++) {
    blocks.push(new Shape(j * blockWidth, i * blockHeight, blockWidth, blockHeight, "green"));
  }
}

let scoreCount = 0;

// ゲームオブジェクトの描画
function draw() {
  if (!gameoverflag && !clearflag) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw(ctx);
    paddle.draw(ctx);
    blocks.forEach(block => block.draw(ctx));
    score.draw(ctx);
  } else if (gameoverflag && !clearflag) {
    const gameovertext = new TextObj(canvas.width/2, canvas.height/2, "GAMEOVER")
    const scoretext = new TextObj(canvas.width/2, canvas.height/2+100, `スコア:${scoreCount}`)
    gameovertext.draw(ctx);
    scoretext.draw(ctx);
  } else if (!gameoverflag && clearflag) {
    const gameovertext = new TextObj(canvas.width/2, canvas.height/2, "クリア！")
    const scoretext = new TextObj(canvas.width/2, canvas.height/2+100, `スコア:${scoreCount}`)
    gameovertext.draw(ctx);
    scoretext.draw(ctx);
  }
}

// ゲームオブジェクトの更新
function update() {
  if (gameEvent.isDown("ArrowLeft")) {
    if (!(paddle.x < 0)) {
      paddle.move(-5, 0);
    }
  }

  if (gameEvent.isDown("ArrowRight")) {
    if (!(paddle.x > canvas.width - paddle.width)) {
      paddle.move(5, 0);
    }
  }

  if (ball.x < ball.radius || ball.x > canvas.width - ball.radius) {
    ball.dx *= -1;
  }

  if (ball.y < ball.radius) {
    ball.dy *= -1;
  }

  if (ball.y > canvas.height) {
    gameoverflag = true;
  }

  if (ball.collidesWith(paddle)) {
    ball.dy *= -1;
  }

  ball.move(ball.dx, ball.dy);

  blocks.forEach(block => {
    if (ball.collidesWith(block)) {
      scoreCount++;
      score.text = `スコア: ${scoreCount}`;
      block.destroy();
      ball.move(0, 5);
      if (score <= 50) {setTimeout(()=>{clearflag=true}, 1000);}
    }
  });

  if (ball.y < 0) {
    ball.move(0, 5);
  }
}

// ゲームループ
function loop() {
  update();
  draw();
}

setInterval(loop, 1000 / 60);