
module.exports = function init() {
  const deepCloneObject = function (obj) {
    const descriptors = Object.getOwnPropertyDescriptors(obj);
    const clone = Object.create(Object.getPrototypeOf(obj), descriptors);
    return clone;
  }

  jest.mock('../../dist/modules/pieces', () => {
    const Piece = require("../../dist/models/Piece");
    const config = require("../../dist/config");
    const originalModule = jest.requireActual('../../dist/modules/pieces');
    const pieceList = [];
    const mockedModule = {
      setPieces: (_pieceList) => {
        _pieceList.forEach((row, rowIndex) => {
          !pieceList[rowIndex] && (pieceList[rowIndex] = []);
          pieceList[rowIndex].splice(0, row.length, ...row.map(piece => piece ? deepCloneObject(piece) : null));
        })
      },
      clear: () => {
        pieceList.forEach(row => {
          row.splice(0, row.length, ...Array(row.length).fill(null));
        })
      }
    };
    for (let key in originalModule.default) {
      if (typeof originalModule.default[key] === 'function') {
        const funcStr = originalModule.default[key].toString();
        const argsStr = funcStr.match(/\(([^()]*)\)/)[1];
        mockedModule[key] = new Function(
          ['pieces', 'deepCloneObject', 'Piece_1', 'config_1'].concat(argsStr.split(',')),
          funcStr.replaceAll(/^[^{]+{|}$/g, '')
        ).bind(null, pieceList, deepCloneObject, Piece, config);
      }
    }
    return mockedModule;
  });
}