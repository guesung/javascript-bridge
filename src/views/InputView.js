const { Console } = require('@woowacourse/mission-utils');
const { INPUT_MESSAGE, GAME_COMMAND } = require('../lib/constants.js');
const InputParser = require('../helpers/InputParser.js');
const InputValidator = require('../helpers/InputValidator.js');
const { retryUntilSuccess } = require('../lib/utils.js');

/**
 * 사용자로부터 입력을 받는 역할을 한다.
 */
const InputView = {
  /**
   * 다리의 길이를 입력받는다.
   */
  async readBridgeSize() {
    return retryUntilSuccess(async () => {
      const rawBridgeSize = await Console.readLineAsync(INPUT_MESSAGE.bridgeSize);
      const bridgeSize = InputParser.parseBridgeSize(rawBridgeSize);
      InputValidator.validateBridgeSize(bridgeSize);

      return bridgeSize;
    });
  },

  /**
   * 사용자가 이동할 칸을 입력받는다.
   */
  async readMoving() {
    return retryUntilSuccess(async () => {
      const moving = await Console.readLineAsync(INPUT_MESSAGE.move);
      InputValidator.validateMoving(moving);
      return moving;
    });
  },

  /**
   * 사용자가 게임을 다시 시도할지 종료할지 여부를 입력받는다.
   */
  async readGameCommand() {
    return retryUntilSuccess(async () => {
      const rawGameCommand = await Console.readLineAsync(INPUT_MESSAGE.retry);
      InputValidator.validateGameCommand(rawGameCommand);
      const isRetry = rawGameCommand === GAME_COMMAND.retry;
      return isRetry;
    });
  },
};

module.exports = InputView;
