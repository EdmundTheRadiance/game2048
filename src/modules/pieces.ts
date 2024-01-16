import { COLUMN_NUM, GENERATE_4_RATE, ROW_NUM } from "../config";
import Piece from "../models/Piece";
import PieceMoveDraw from "../models/PieceMoveDraw";
import PieceMergeDraw from "../models/PieceMergeDraw";

const rows = ROW_NUM;
const cols = COLUMN_NUM;
const pieces: (Piece|null)[][] = Array.from({ length: rows }, () => Array(cols).fill(null));

const deepCloneObject = function<T> (obj: T): T {
    const descriptors = Object.getOwnPropertyDescriptors(obj);
    const clone = Object.create(Object.getPrototypeOf(obj), descriptors) as T;
    return clone;
}

export default {
    getPieces() {
        return pieces.map(e => e.map(piece => {
            if (piece === null) {
                return null;
            }
            return deepCloneObject(piece);
        }));
    },
    generatePiece() {
        const emptyList: [number, number][] = [];
        pieces.forEach((row, rowIndex) => {
            row.forEach((piece, colIndex) => {
                if (!piece) {
                    emptyList.push([rowIndex, colIndex])
                }
            });
        });
        const rand = ~~(Math.random() * emptyList.length);
        const position = emptyList[rand];
        pieces[position[0]][position[1]] = new Piece(Math.random() > GENERATE_4_RATE ? 2 : 4);
    },
    movePieceTo(fromPosition: [number, number], toPosition: [number, number]) {
        pieces[toPosition[0]][toPosition[1]] = new PieceMoveDraw(
            pieces[fromPosition[0]][fromPosition[1]], {
                from: fromPosition,
                to: toPosition
            }
        );
        pieces[fromPosition[0]][fromPosition[1]] = null;
    },
    mergePieces(fromPosition: [number, number], toPosition: [number, number]) {
        const sourcePiece = pieces[fromPosition[0]][fromPosition[1]];
        const targetPiece = pieces[toPosition[0]][toPosition[1]];
        if (!sourcePiece || !targetPiece) {
            return;
        }
        const targetPieceCopy = new Piece(targetPiece.getValue());
        targetPiece.addValue(sourcePiece.getValue() || 0);
        pieces[toPosition[0]][toPosition[1]] = new PieceMergeDraw(targetPiece, {
            from: fromPosition,
            to: toPosition,
            sourcePiece,
            targetPiece: targetPieceCopy
        });
        pieces[fromPosition[0]][fromPosition[1]] = null;
    },
}