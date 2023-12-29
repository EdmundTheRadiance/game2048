const Piece = require("../dist/models/Piece").default;

const deepCloneObject = function (obj) {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const clone = Object.create(Object.getPrototypeOf(obj), descriptors);
  return clone;
}

const numberToPieces = function (numbers) {
  const pieceList = [];
  numbers.forEach(row => {
    pieceList.push(row.map(piece => {
      if (typeof piece === 'number') {
        return new Piece(piece);
      } else if (piece instanceof Piece) {
        return deepCloneObject(piece);
      } else {
        return null;
      }
    }));
  });
  return pieceList;
}

module.exports = {
  deepCloneObject,
  numberToPieces
}