const { Console } = require('@woowacourse/mission-utils');
const { INPUT_MESSAGE } = require('../lib/constants.js');

/**
 * 사용자로부터 입력을 받는 역할을 한다.
 */
const InputView = {
  /**
   * 다리의 길이를 입력받는다.
   */
  async readBridgeSize() {
    const rawBridgeSize = await Console.readLineAsync(INPUT_MESSAGE.bridgeSize);
    const bridgeSize = Number(rawBridgeSize);
    return bridgeSize;
  },

  /**
   * 사용자가 이동할 칸을 입력받는다.
   */
  async readMoving() {
    const moving = await Console.readLineAsync(INPUT_MESSAGE.move);
    return moving;
  },

  /**
   * 사용자가 게임을 다시 시도할지 종료할지 여부를 입력받는다.
   */
  async readGameCommand() {
    const rawRetry = await Console.readLineAsync(INPUT_MESSAGE.retry);
    const retry = rawRetry === 'R';
    return retry;
  },
};

module.exports = InputView;
