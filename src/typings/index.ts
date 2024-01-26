import Piece from "../models/Piece";

export enum EventName {
    'GAMESTATE.EXIT_START',
    'GAMESTATE.ENTER_PAUSING',
    'GAMESTATE.EXIT_PAUSING',
    'INTERFACE.SWIPE',
    'INTERFACE.CLICK',
    'PIECES.MERGE',
    'GAMEITEM.CLICK',
    'PIECE.CLICK',
}

export enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
}

export interface PieceMoveAnimationData {
    from: [number, number],
    to: [number, number],
}

export interface PieceMergeAnimationData {
    from: [number, number],
    to: [number, number],
    sourcePiece: Piece,
    targetPiece: Piece,
}