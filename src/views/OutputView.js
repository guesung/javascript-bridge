const { Console } = require('@woowacourse/mission-utils');
const { OUTPUT_MESSAGE } = require('../lib/constants.js');

/**
 * 사용자에게 게임 진행 상황과 결과를 출력하는 역할을 한다.
 */
const OutputView = {
  printStart() {
    Console.print(OUTPUT_MESSAGE.start);
  },
  /**
   * 현재까지 이동한 다리의 상태를 정해진 형식에 맞춰 출력한다.
   * <p>
   * 출력을 위해 필요한 메서드의 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  printMap({ upMatch, downMatch }) {
    const upMatchOutput = OutputView.getMapOutput(upMatch);
    const downMatchOutput = OutputView.getMapOutput(downMatch);

    Console.print(upMatchOutput);
    Console.print(downMatchOutput);
  },

  getMapOutput(match) {
    return `[ ${match.join(' | ')} ]`;
  },

  /**
   * 게임의 최종 결과를 정해진 형식에 맞춰 출력한다.
   * <p>
   * 출력을 위해 필요한 메서드의 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  printResult(matchResult, isSuccess, tryCount) {
    Console.print('최종 게임 결과');
    OutputView.printMap(matchResult);

    if (isSuccess) Console.print('게임 성공 여부: 성공');
    else Console.print('게임 성공 여부: 실패');
    Console.print(`총 시도한 횟수: ${tryCount}`);
  },
};

module.exports = OutputView;
