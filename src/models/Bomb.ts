import event from "../modules/event";
import pieces from "../modules/pieces";
import { EventName } from "../typings/index";
import GameItem from "./GameItem";

export default class Bomb extends GameItem {
    active: boolean = false;
    constructor() {
        super();
        this.image.src = 'assets/bomb.png';
        event.on(EventName["PIECE.CLICK"], (position: [number, number]) => {
            if (this.active) {
                pieces.removeOnePiece(position);
                this.active = false;
            }
        })
    };
    click() {
        this.active = !this.active;
    }
    draw(x: number, y: number, w: number, h: number, ctx: CanvasRenderingContext2D) {
        if (this.active) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x, y, w, h);
        }
        super.draw(x, y, w, h, ctx);
    }
}