module.exports = function init() {
  const mockFunc = jest.fn();
  jest.mock('../../dist/modules/gameState', () => {
    const originalModule = jest.requireActual('../../dist/modules/gameState').default;
    const { deepCloneObject } = require("../utils");
    return {
      state: deepCloneObject(originalModule.state),
      transitionTo: mockFunc
    }
  });
  return mockFunc;
}