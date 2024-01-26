/// <reference path="../../node_modules/minigame-api-typings/index.d.ts" />
import Piece from "../models/Piece";
import { EventName } from "../typings/index";
import event from "./event";

let score = 0;

export default {
    init() {
        score = 0;
        event.on(EventName["PIECES.MERGE"], (sourcePiece: Piece, targetPiece: Piece) => {
            score += sourcePiece.getValue() + targetPiece.getValue();
        });
        event.on(EventName["GAMESTATE.EXIT_START"], () => {
            score = 0;
        });
    },
    getScore() {
        return score;
    }
}
