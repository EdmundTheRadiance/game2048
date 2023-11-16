import Piece from "../model/Piece";

const rows = 4;
const cols = 4;
const pieces: (Piece|null)[][] = Array.from({ length: rows }, () => Array(cols).fill(null));
pieces[3] = [new Piece(2), new Piece(32), new Piece(128), new Piece(1024)];

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
    }
}