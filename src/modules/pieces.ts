import { GENERATE_4_RATE } from "../config";
import Piece from "../models/Piece";

const rows = 4;
const cols = 4;
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
    }
}