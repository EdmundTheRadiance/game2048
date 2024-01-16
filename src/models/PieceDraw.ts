import Piece from "./Piece";
import {
    cornerRadius,
    gap,
    pieceTextColor,
    pieceTextSize,
    pieceColors,
} from "../config";

export default class PieceDraw extends Piece {
    constructor(piece: Piece | null) {
        if (!piece) {
            return;
        }
        super(piece.getValue());
    };
    draw(col: number, row: number, gridSize: number, ctx: CanvasRenderingContext2D, piece?: Piece) {
        const x = col * gridSize + (col + 1) * gap;
        const y = row * gridSize + (row + 1) * gap;
        const v = (piece || this).getValue();
        const pieceText = v.toString();
        
        // 绘制棋子圆角方形背景
        ctx.fillStyle = pieceColors[v] || pieceColors[2048];
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
        ctx.font = `bold ${pieceTextSize[v] || pieceTextSize[2048]}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(pieceText, x + gridSize / 2, y + gridSize / 2);
    }
}