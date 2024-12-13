/* eslint-disable no-await-in-loop */
const BridgeGame = require('./BridgeGame.js');
const BridgeMaker = require('./BridgeMaker.js');
const BridgeRandomNumberGenerator = require('./BridgeRandomNumberGenerator.js');
const InputView = require('./views/InputView.js');
const OutputView = require('./views/OutputView.js');

class App {
  #isDone;
  #bridgeGame;

  constructor() {
    this.#isDone = false;
  }

  async play() {
    OutputView.printStart();
    const bridgeSize = await InputView.readBridgeSize();
    const bridge = BridgeMaker.makeBridge(bridgeSize, BridgeRandomNumberGenerator.generate);
    this.#bridgeGame = new BridgeGame(bridge);

    await this.#start();
  }

  async #start() {
    while (!this.#isDone) {
      const moving = await InputView.readMoving();

      this.#bridgeGame.move(moving);

      OutputView.printMap(this.#bridgeGame.getMatchedResult());

      if (this.#bridgeGame.checkFinished()) {
        if (this.#bridgeGame.checkSuccess()) {
          OutputView.printResult(this.#bridgeGame.getMatchedResult(), true, this.#bridgeGame.tryCount);
          this.#isDone = true;
        } else {
          const isRetry = await InputView.readGameCommand();
          if (isRetry) this.#bridgeGame.retry();
          else {
            OutputView.printResult(this.#bridgeGame.getMatchedResult(), false, this.#bridgeGame.tryCount);
            this.#isDone = true;
          }
        }
      }
    }
  }
}

module.exports = App;
