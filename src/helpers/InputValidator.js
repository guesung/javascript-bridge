const { ERROR_MESSAGE, MOVING, GAME_COMMAND } = require('../lib/constants.js');

class InputValidator {
  static validateBridgeSize(bridgeSize) {
    if (Number.isInteger(bridgeSize) && bridgeSize >= 3 && bridgeSize <= 20) return;
    this.#throwError(ERROR_MESSAGE.bridgeSize);
  }

  static validateMoving(moving) {
    if (moving === MOVING.up || moving === MOVING.down) return;
    this.#throwError(ERROR_MESSAGE.moving);
  }

  static validateGameCommand(rawGameCommand) {
    if (rawGameCommand === GAME_COMMAND.retry || rawGameCommand === GAME_COMMAND.quit) return;
    this.#throwError(ERROR_MESSAGE.gameCommand);
  }

  static #throwError(message) {
    throw new Error(message);
  }
}

module.exports = InputValidator;
