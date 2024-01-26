import './libs/weapp-adapter';
import draw from "./dist/modules/draw";
import gameState from "./dist/modules/gameState";
import interaction from "./dist/modules/interaction";
import pieceMove from "./dist/modules/pieceMove";
import score from "./dist/modules/score";
import gameItem from "./dist/modules/gameItem";

function loop() {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw.drawCheckerboard(ctx);
  draw.drawPieces(ctx);
  draw.drawScore(ctx);
  draw.drawProps(ctx);
  window.requestAnimationFrame(loop)
}

function init(params) {
  const ctx = canvas.getContext('2d');
  draw.drawCheckerboard(ctx);
  gameState.start();
  pieceMove.init();
  interaction.init();
  score.init();
  draw.init(ctx);
  gameItem.init(ctx);
  window.requestAnimationFrame(loop)
}

init();