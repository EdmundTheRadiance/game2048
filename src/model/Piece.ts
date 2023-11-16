export default class Piece {
    value: number; // 棋子的数字
    constructor(v: number) {
        this.value = v;
    }
    getValue(): number {
        return this.value;
    }
}