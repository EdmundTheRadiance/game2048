import { PieceMergeAnimationData } from "../typings/index";
import Piece from "./Piece";
import PieceDraw from "./PieceDraw";
import {
    animateTime,
} from "../config";

export default class PieceMergeDraw extends PieceDraw {
    isAnimating: boolean = false;
    animationData: PieceMergeAnimationData
    process: number;
    startTime: number;
    constructor(piece: Piece | null, animationData: PieceMergeAnimationData) {
        if (!piece) {
            return;
        }
        super(piece);
        this.process = 0;
        this.startTime = Date.now();
        this.animationData = animationData;
        this.isAnimating = true;
    };
    draw(col: number, row: number, gridSize: number, ctx: CanvasRenderingContext2D) {
        let xIndex: number;
        let yIndex: number;
        if (this.isAnimating) {
            const { from, to } = this.animationData;
            const deltaTime = Date.now() - this.startTime;
            this.process = Math.min(deltaTime / animateTime, 1);
            xIndex = (to[1] - from[1]) * this.process + from[1];
            yIndex = (to[0] - from[0]) * this.process + from[0];

            super.draw(xIndex, yIndex, gridSize, ctx, this.animationData.sourcePiece);
            super.draw(
                this.animationData.to[1],
                this.animationData.to[0],
                gridSize,
                ctx,
                this.animationData.targetPiece);
        } else {
            xIndex = col;
            yIndex = row;
        }
        super.draw(xIndex, yIndex, gridSize, ctx);
        if (this.process === 1) {
            this.isAnimating = false;
        }
    }
}