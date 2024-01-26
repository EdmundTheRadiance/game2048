import piecesProxy from "./pieces";
import { 
    boardSize,
    cornerRadius,
    gap,
    checkerboardBackgroundColor,
    emptyGridBackgroundColor
} from "../config";
import PieceDraw from "../models/PieceDraw";
import score from "./score";
import event from "./event";
import { EventName } from "../typings/index";
import gameItem from "./gameItem";

const buttonWidth = 100;
const buttonHeight = 100;

export default {
    init(ctx: CanvasRenderingContext2D) {
        event.on(EventName["INTERFACE.CLICK"], ({ x, y }: { x: number, y: number }) => {
            const items = gameItem.getItems();
            const buttonX = (boardSize - buttonWidth * items.length) / 2;
            const buttonY = ctx.canvas.height - buttonHeight - 40;
            if (x > buttonX && x < buttonX + buttonWidth * items.length && y > buttonY && y < buttonY + buttonHeight) {
                event.trigger(EventName["GAMEITEM.CLICK"], Math.floor((x - buttonX) / buttonWidth));
            } else if (x > 0 && x < boardSize && y > 0 && y < boardSize) {
                const pieces = piecesProxy.getPieces();
                const gridSize = (boardSize - gap) / pieces.length - gap; // 格子大小
                const position = [0, 0];
                position[1] = pieces.findIndex((_piece, i) => x > (gridSize + gap) * i && x < (gridSize + gap) * (i + 1));
                position[0] = pieces[0].findIndex((_piece, i) => y > (gridSize + gap) * i && y < (gridSize + gap) * (i + 1));
                pieces[position[0]][position[1]] && event.trigger(EventName["PIECE.CLICK"], position);
            }
        });
    },
    drawCheckerboard(ctx: CanvasRenderingContext2D) {
        const pieces = piecesProxy.getPieces();
        const gridSize = (boardSize - gap) / pieces.length - gap; // 格子大小
        // 绘制棋盘背景
        ctx.fillStyle = checkerboardBackgroundColor;
        ctx.fillRect(0, 0, boardSize, boardSize);

        // 绘制棋盘格子
        ctx.fillStyle = emptyGridBackgroundColor;

        for (let row = 0; row < pieces.length; row++) {
            for (let col = 0; col < pieces[0].length; col++) {
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
    drawScore(ctx: CanvasRenderingContext2D) {
        ctx.font = '20px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(`分数：${score.getScore()}`, boardSize / 2, boardSize + 20);
    },
    // 绘制道具
    drawProps(ctx: CanvasRenderingContext2D) {
        const items = gameItem.getItems();
        const buttonX = (boardSize - buttonWidth * items.length) / 2;
        const buttonY = ctx.canvas.height - buttonHeight - 40;
        items.forEach(item => {
            item.draw(buttonX, buttonY, buttonWidth, buttonHeight, ctx);
        });
    }
}