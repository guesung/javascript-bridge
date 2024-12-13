const MissionUtils = require('@woowacourse/mission-utils');
const App = require('../src/App');
const BridgeMaker = require('../src/BridgeMaker');
const { ERROR_MESSAGE } = require('../src/lib/constants.js');

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();
  numbers.reduce((acc, number) => acc.mockReturnValueOnce(number), MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

const getOutput = (logSpy) => [...logSpy.mock.calls].join('');

const expectLogContains = (received, logs) => {
  logs.forEach((log) => {
    expect(received).toEqual(expect.stringContaining(log));
  });
};

const INPUTS_FOR_END = ['3', 'U', 'U', 'U', 'Q'];

const runException = async (inputs, errorMessage) => {
  mockQuestions([...inputs, ...INPUTS_FOR_END]);
  const logSpy = getLogSpy();
  const app = new App();

  await app.play();

  expectLogContains(getOutput(logSpy), [errorMessage]);
};

const expectBridgeOrder = (received, upside, downside) => {
  const upsideIndex = received.indexOf(upside);
  const downsideIndex = received.indexOf(downside);

  expect(upsideIndex).toBeLessThan(downsideIndex);
};

describe('다리 건너기 테스트', () => {
  test('다리 생성 테스트', () => {
    const randomNumbers = ['1', '0', '0'];
    const mockGenerator = randomNumbers.reduce((acc, number) => acc.mockReturnValueOnce(number), jest.fn());
    const bridge = BridgeMaker.makeBridge(3, mockGenerator);
    expect(bridge).toEqual(['U', 'D', 'D']);
  });

  test('기능 테스트', async () => {
    const logSpy = getLogSpy();
    mockRandoms(['1', '0', '1']);
    mockQuestions(['3', 'U', 'D', 'U']);
    const app = new App();
    await app.play();
    const log = getOutput(logSpy);
    expectLogContains(log, [
      '최종 게임 결과',
      '[ O |   | O ]',
      '[   | O |   ]',
      '게임 성공 여부: 성공',
      '총 시도한 횟수: 1',
    ]);
    expectBridgeOrder(log, '[ O |   | O ]', '[   | O |   ]');
  });

  test('다리 길이에 3이상 20이하의 숫자가 입력되지 않을 경우 예외 처리한다.', async () => {
    await runException(['a'], ERROR_MESSAGE.bridgeSize);
    await runException(['1'], ERROR_MESSAGE.bridgeSize);
    await runException(['21'], ERROR_MESSAGE.bridgeSize);
  });

  test('이동할 칸에 U 혹은 D가 입력되지 않을 경우 예외 처리한다.', async () => {
    await runException(['3', 'u'], ERROR_MESSAGE.moving);
    await runException(['3', 'd'], ERROR_MESSAGE.moving);
    await runException(['3', 'UP'], ERROR_MESSAGE.moving);
    await runException(['3', 'Down'], ERROR_MESSAGE.moving);
  });

  test('게임 재시작/종료 여부에 R 혹은 D가 입력되지 않을 경우 예외 처리한다.', async () => {
    await runException(['3', 'U', 'U', 'D', 'r'], ERROR_MESSAGE.gameCommand);
    await runException(['3', 'U', 'U', 'D', 'd'], ERROR_MESSAGE.gameCommand);
    await runException(['3', 'U', 'U', 'D', 'Retry'], ERROR_MESSAGE.gameCommand);
    await runException(['3', 'U', 'U', 'D', 'Done'], ERROR_MESSAGE.gameCommand);
  });
});
