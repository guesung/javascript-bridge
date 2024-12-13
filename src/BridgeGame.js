const { MOVING, MATCH } = require('./lib/constants.js');

/**
 * 다리 건너기 게임을 관리하는 클래스
 */
class BridgeGame {
  #bridge;
  #movedPositions;
  #tryCount;

  constructor(bridge) {
    this.#bridge = bridge;
    this.#movedPositions = [];
    this.#tryCount = 1;
  }

  get tryCount() {
    return this.#tryCount;
  }

  /**
   * 사용자가 칸을 이동할 때 사용하는 메서드
   * <p>
   * 이동을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  move(position) {
    this.#movedPositions.push(position);
  }

  checkFinished() {
    return this.#movedPositions.length === this.#bridge.length;
  }

  checkSuccess() {
    const { upMatch, downMatch } = this.getMatchedResult();

    return upMatch.every((it) => it !== MATCH.inCorrect) && downMatch.every((it) => it !== MATCH.inCorrect);
  }

  getMatchedResult() {
    return {
      upMatch: this.#getMatch(MOVING.up),
      downMatch: this.#getMatch(MOVING.down),
    };
  }

  #getMatch(moving) {
    return this.#movedPositions.map((position, index) => {
      if (position !== moving) return MATCH.none;
      if (this.#bridge[index] === moving) return MATCH.correct;
      return MATCH.inCorrect;
    });
  }

  /**
   * 사용자가 게임을 다시 시도할 때 사용하는 메서드
   * <p>
   * 재시작을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  retry() {
    this.#movedPositions = [];
    this.#tryCount += 1;
  }
}

module.exports = BridgeGame;
