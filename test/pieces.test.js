const mockPiecesInit = require("./mock-modules/pieces");
mockPiecesInit();

const pieces = require("../dist/modules/pieces");
const Piece = require("../dist/models/Piece").default;
const utils = require("./utils");

describe('test module pieces', () => {
  it('test getPieces', () => {
    const pieceList = [
      [8, 4, 4, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    pieces.setPieces(utils.numberToPieces(pieceList));

    const getPiecesResult = pieces.getPieces();
    pieceList.forEach((row, rowIndex) => {
      row.forEach((piece, columnIndex) => {
        if (piece === null) {
          expect(getPiecesResult[rowIndex][columnIndex]).toBe(null);
        } else {
          expect(getPiecesResult[rowIndex][columnIndex]).toBeInstanceOf(Piece);
          expect(getPiecesResult[rowIndex][columnIndex].getValue()).toBe(piece);
        }
      });
    });
    pieces.clear();
  });

  it('test generatePiece', () => {
    pieces.generatePiece();
    const getPiecesResult = pieces.getPieces();
    let pieceCount = 0;
    getPiecesResult.forEach((row, rowIndex) => {
      row.forEach((piece, columnIndex) => {
        if (piece !== null) {
          pieceCount++;
          const value = getPiecesResult[rowIndex][columnIndex].getValue();
          expect(value === 2 || value === 4).toBe(true);
        }
      });
    });
    expect(pieceCount).toBe(1);
    pieces.clear();
  });

  it('test movePieceTo', () => {
    const pieceList = [
      [8, 4, 4, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    pieces.setPieces(utils.numberToPieces(pieceList));

    pieces.movePieceTo([0, 0], [3, 0]);
    const getPiecesResult = pieces.getPieces();
    getPiecesResult.forEach((row, rowIndex) => {
      row.forEach((piece, columnIndex) => {
        if (rowIndex === 0 && [1, 2].includes(columnIndex)) {
          // 第0行1，2列为4
          expect(piece.getValue()).toBe(4);
        } else if (rowIndex === 3 && columnIndex === 0) {
          // 第3行0列为8
          expect(piece.getValue()).toBe(8);
        } else {
          // 其余为Null
          expect(piece).toBe(null);
        }
      });
    });
    pieces.clear();
  });

  it('test mergePieces', () => {
    const pieceList = [
      [8, 4, 4, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    pieces.setPieces(utils.numberToPieces(pieceList));

    pieces.mergePieces([0, 1], [0, 2]);
    const getPiecesResult = pieces.getPieces();
    getPiecesResult.forEach((row, rowIndex) => {
      row.forEach((piece, columnIndex) => {
        if (rowIndex === 0 && [0, 2].includes(columnIndex)) {
          // 第0行0，2列为8
          expect(piece.getValue()).toBe(8);
        } else {
          // 其余为Null
          expect(piece).toBe(null);
        }
      });
    });
    pieces.clear();
  });
});