import piecesProxy from "./pieces";

// 定义棋盘的大小和格子数量
const boardSize = 375; // 棋盘大小
const cornerRadius = 5; // 圆角半径
const gap = 10; // 格子间隙
const checkerboardBackgroundColor = 'rgb(187, 171, 159)';
const emptyGridBackgroundColor = 'rgb(202, 190, 178)';
const pieceColors = {
    2: '#eee4da',
    4: '#ede0c8',
    8: '#f2b179',
    16: '#f59563',
    32: '#f67c5f',
    64: '#f65e3b',
    128: '#edcf72',
    256: '#edcc61',
    512: '#edc850',
    1024: '#edc53f',
    2048: '#edc22e',
}; // 从浅到深的颜色

const pieceTextColor = ['#776e65', '#f9f6f2'];

const pieceTextSize = {
    2: 45,
    4: 45,
    8: 45,
    16: 45,
    32: 45,
    64: 45,
    128: 35,
    256: 35,
    512: 35,
    1024: 25,
    2048: 25,
}; // 从浅到深的颜色

export default {
    drawCheckerboard(ctx: CanvasRenderingContext2D) {
        const pieces = piecesProxy.getPieces();
        const gridSize = (boardSize - gap) / pieces.length - gap; // 格子大小
        // 绘制棋盘背景
        ctx.fillStyle = checkerboardBackgroundColor;
        ctx.fillRect(0, 0, boardSize, boardSize);

        // 绘制棋盘格子
        ctx.fillStyle = emptyGridBackgroundColor;

        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                const x = col * gridSize + (col + 1) * gap;
                const y = row * gridSize + (row + 1) * gap;
                ctx.beginPath();
                ctx.moveTo(x + cornerRadius, y);
                ctx.lineTo(x + gridSize - cornerRadius, y);
                ctx.quadraticCurveTo(x + gridSize, y, x + gridSize, y + cornerRadius);
                ctx.lineTo(x + gridSize, y + gridSize - cornerRadius);
                ctx.quadraticCurveTo(x + gridSize, y + gridSize, x + gridSize - cornerRadius, y + gridSize);
                ctx.lineTo(x + cornerRadius, y + gridSize);
                ctx.quadraticCurveTo(x, y + gridSize, x, y + gridSize - cornerRadius);
                ctx.lineTo(x, y + cornerRadius);
                ctx.quadraticCurveTo(x, y, x + cornerRadius, y);
                ctx.closePath();
                ctx.fill();
            }
        }
    },
    drawPieces(ctx: CanvasRenderingContext2D) {
        const pieces = piecesProxy.getPieces();
        const gridSize = (boardSize - gap) / pieces.length - gap; // 格子大小

        for (let row = 0; row < pieces.length; row++) {
            for (let col = 0; col < pieces.length; col++) {
                const piece = pieces[row][col];
                if (!piece) {
                    continue;
                }
                const x = col * gridSize + (col + 1) * gap;
                const y = row * gridSize + (row + 1) * gap;
                const pieceText = piece.getValue().toString();
                
                // 绘制棋子圆角方形背景
                ctx.fillStyle = pieceColors[piece.getValue()] || pieceColors[2048];
                ctx.beginPath();
                ctx.moveTo(x + cornerRadius, y);
                ctx.lineTo(x + gridSize - cornerRadius, y);
                ctx.quadraticCurveTo(x + gridSize, y, x + gridSize, y + cornerRadius);
                ctx.lineTo(x + gridSize, y + gridSize - cornerRadius);
                ctx.quadraticCurveTo(x + gridSize, y + gridSize, x + gridSize - cornerRadius, y + gridSize);
                ctx.lineTo(x + cornerRadius, y + gridSize);
                ctx.quadraticCurveTo(x, y + gridSize, x, y + gridSize - cornerRadius);
                ctx.lineTo(x, y + cornerRadius);
                ctx.quadraticCurveTo(x, y, x + cornerRadius, y);
                ctx.closePath();
                ctx.fill();
                
                // 绘制棋子数字
                ctx.fillStyle = pieceTextColor[pieceText.length > 2 ? 1 : 0]; // 棋子数字颜色
                ctx.font = `bold ${pieceTextSize[piece.getValue()] || pieceTextSize[2048]}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(pieceText, x + gridSize / 2, y + gridSize / 2);
            }
        }
    }
}