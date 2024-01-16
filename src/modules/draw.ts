import piecesProxy from "./pieces";
import { 
    boardSize,
    cornerRadius,
    gap,
    checkerboardBackgroundColor,
    emptyGridBackgroundColor
} from "../config";
import PieceDraw from "../models/PieceDraw";

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
                (piece instanceof PieceDraw ? piece : new PieceDraw(piece)).draw(col, row, gridSize, ctx);
            }
        }
    },
}