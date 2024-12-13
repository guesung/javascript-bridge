/* eslint-disable no-await-in-loop */
const BridgeGame = require('./BridgeGame.js');
const BridgeMaker = require('./BridgeMaker.js');
const BridgeRandomNumberGenerator = require('./BridgeRandomNumberGenerator.js');
const InputView = require('./views/InputView.js');
const OutputView = require('./views/OutputView.js');

class App {
  async play() {
    OutputView.printStart();
    const bridgeSize = await InputView.readBridgeSize();
    const bridge = BridgeMaker.makeBridge(bridgeSize, BridgeRandomNumberGenerator.generate);
    const bridgeGame = new BridgeGame(bridge);

    while (1) {
      const moving = await InputView.readMoving();

      bridgeGame.move(moving);

      OutputView.printMap(bridgeGame.getMatchedResult());

      if (bridgeGame.checkFinished()) {
        if (bridgeGame.checkSuccess()) {
          OutputView.printResult(true, bridgeGame.tryCount);
          break;
        } else {
          const retry = await InputView.readGameCommand();
          if (retry) bridgeGame.retry();
          else {
            OutputView.printResult(false, bridgeGame.tryCount);
            break;
          }
        }
      }
    }
  }
}

module.exports = App;
