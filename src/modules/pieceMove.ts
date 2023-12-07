/// <reference path="../../node_modules/minigame-api-typings/index.d.ts" />
import Piece from "../models/Piece";
import { EventName, Direction } from "../typings/index";
import event from "./event";
import pieces from "./pieces";

interface Traversedirection {
    row: 0 | 1 | -1,
    column: 0 | 1 | -1
}

const traversedirection: Record<Direction, Traversedirection> = {
    [Direction.RIGHT]: {
        row: 0,
        column: 1
    },
    [Direction.LEFT]: {
        row: 0,
        column: -1
    },
    [Direction.UP]: {
        row: -1,
        column: 0
    },
    [Direction.DOWN]: {
        row: 1,
        column: 0
    }
}

const movePiece = function (pieceList: (Piece|null)[][], row: number, column: number, direction: Traversedirection) {
    movedIndexs.push(`${row},${column}`);
    const curPiece = pieceList[row][column];
    if (!curPiece) {
        return pieceList;
    }
    let index = 0;
    let rowIndex: number;
    let columnIndex: number;
    let nextPiece: Piece | null;
    do {
        index++;
        rowIndex = row + index * direction.row;
        columnIndex = column + index * direction.column;
        // 找到本棋子在direction方向的下一个不是null（空格子）的棋子
        nextPiece = pieceList[rowIndex]?.[columnIndex];
    } while (nextPiece === null);
    if (nextPiece && nextPiece.getValue() === curPiece.getValue()) {
        // 数字相同则合并
        pieces.mergePieces([row, column], [rowIndex, columnIndex]);
        return pieces.getPieces();
    } else if (row !== rowIndex - direction.row || column !== columnIndex - direction.column) {
        // 是墙或数字不相同，否则移动到前一个位置
        pieces.movePieceTo([row, column], [rowIndex - direction.row, columnIndex - direction.column]);
        return pieces.getPieces();
    }
    return pieceList;
}

const movePieceIfPossible = function (pieceList: (Piece|null)[][], row: number, column: number, direction: Traversedirection) {
    const nextPiece = pieceList[row + direction.row]?.[column + direction.column];
    if (typeof nextPiece !== 'undefined') {
        // 若本格在direction方向的下一格不是undefined（墙），则先要移动下一格的棋子
        pieceList = movePieceIfPossible(pieceList, row + direction.row, column + direction.column, direction);
    }
    return movePiece(pieceList, row, column, direction);
}

let movedIndexs: string[] = [];

export default {
    init() {
        event.on(EventName["INTERFACE.SWIPE"], (direction: Direction) => {
            let pieceList = pieces.getPieces();
            for (let rowIndex = 0; rowIndex < pieceList.length; rowIndex++) {
                const row = pieceList[rowIndex];
                for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
                    if (!movedIndexs.includes(`${rowIndex},${columnIndex}`)) {
                        pieceList = movePieceIfPossible(pieceList, rowIndex, columnIndex, traversedirection[direction]);
                    }
                }
            }
            movedIndexs = [];
            pieces.generatePiece();
        });
    }
}
