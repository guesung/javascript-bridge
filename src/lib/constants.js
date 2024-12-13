const INPUT_MESSAGE = {
  bridgeSize: '다리의 길이를 입력해주세요.\n',
  move: `이동할 칸을 선택해주세요. (위: U, 아래: D)\n`,
  retry: `게임을 다시 시도할지 여부를 입력해주세요. (재시도: R, 종료: Q)\n`,
};

const OUTPUT_MESSAGE = {
  start: '다리 건너기 게임을 시작합니다.\n',
  ex2: () => `\n결과: `,
  ex3: () => `\n결과: `,
};

const MOVING = {
  up: 'U',
  down: 'D',
};

const GAME_COMMAND = {
  retry: 'R',
  quit: 'Q',
};

const ERROR_MESSAGE_DEFAULT = '[ERROR]';
const ERROR_MESSAGE = {
  bridgeSize: `${ERROR_MESSAGE_DEFAULT} 다리 길이는 3부터 20 사이의 숫자여야 합니다.`,
  moving: `${ERROR_MESSAGE_DEFAULT} ${MOVING.up} 혹은 ${MOVING.down}를 입력해주세요.`,
  gameCommand: `${ERROR_MESSAGE_DEFAULT} ${GAME_COMMAND.retry} 혹은 ${GAME_COMMAND.quit}를 입력해주세요.`,
};

const SEPARATER = ',';

module.exports = {
  INPUT_MESSAGE,
  OUTPUT_MESSAGE,
  ERROR_MESSAGE_DEFAULT,
  ERROR_MESSAGE,
  MOVING,
  GAME_COMMAND,
};
