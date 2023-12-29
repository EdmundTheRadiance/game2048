const mockPiecesInit = require("./mock-modules/pieces");
mockPiecesInit();
const mockGameStateInit = require("./mock-modules/gameState");
const mockedTransitionToFunc = mockGameStateInit();

const pieces = require("../dist/modules/pieces");
const pieceMove = require("../dist/modules/pieceMove").default;
const event = require("../dist/modules/event").default;
const { EventName, Direction } = require("../dist/typings/index");
const utils = require("./utils");
pieceMove.init();

describe('functional test', () => {
  it('one cell can`t merge twice', () => {
    const pieceList = [
      [null, 4, 2, 2],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    pieces.setPieces(utils.numberToPieces(pieceList));
    event.trigger(EventName["INTERFACE.SWIPE"], Direction.RIGHT);

    const getPiecesResult = pieces.getPieces();
    let pieceCount = 0;
    getPiecesResult.forEach((row, rowIndex) => {
      row.forEach((piece, columnIndex) => {
        if (rowIndex === 0 && [2, 3].includes(columnIndex)) {
          // 第0行2，3列为4
          expect(piece.getValue()).toBe(4);
        } else if (piece !== null) {
          pieceCount++;
          const value = getPiecesResult[rowIndex][columnIndex].getValue();
          expect(value === 2 || value === 4).toBe(true);
        }
      });
    });
    // 新生成了一个2或4的棋子
    expect(pieceCount).toBe(1);
    pieces.clear();
  });

  it('don\'t generate new piece when no piece move or merge', () => {
    const pieceList = [
      [null, 4, 2, 2],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    pieces.setPieces(utils.numberToPieces(pieceList));
    event.trigger(EventName["INTERFACE.SWIPE"], Direction.UP);

    const getPiecesResult = pieces.getPieces();
    getPiecesResult.forEach((row, rowIndex) => {
      row.forEach((piece, columnIndex) => {
        if (rowIndex === 0 && [2, 3].includes(columnIndex)) {
          // 第0行2，3列为2
          expect(piece.getValue()).toBe(2);
        } else if (rowIndex === 0 && columnIndex === 1) {
          // 第0行1列为4
          expect(piece.getValue()).toBe(4);
        } else {
          // 其余为Null
          expect(piece).toBe(null);
        }
      });
    });
    pieces.clear();
  });

  it('game end when no empty cell or no piece can merge', () => {
    const originalModule = jest.requireActual('../dist/modules/gameState');
    const pieceList = [
      [16, 32, 16, null],
      [8, 4, 8, 4],
      [4, 2, 4, 2],
      [2, 4, 2, 4],
    ];
    pieces.setPieces(utils.numberToPieces(pieceList));
    event.trigger(EventName["INTERFACE.SWIPE"], Direction.RIGHT);
    expect(mockedTransitionToFunc).toHaveBeenCalledTimes(1);
    expect(mockedTransitionToFunc.mock.calls[0][0]).toBe(originalModule.default.state.END);
    pieces.clear();
  });
});