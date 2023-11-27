import './libs/weapp-adapter'
import draw from "./dist/modules/draw";
import gameState from "./dist/modules/gameState";

window.requestAnimationFrame(loop)


console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
console.log('https://developers.weixin.qq.com/minigame/dev/devtools/minicode.html')

function loop() {
  const ctx = canvas.getContext('2d')

  draw.drawCheckerboard(ctx);
  gameState.start();
  draw.drawPieces(ctx);

  // window.requestAnimationFrame(loop)
}
