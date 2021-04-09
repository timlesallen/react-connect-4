import { isConnect4, performMove } from './board-ops';

test('finds connect 4', () => {
  const horizontal = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0]
  ];
  const notHorizontal = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0]
  ];
  const vertical = [
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ];
  const notVertical = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ];
  const notVertical2 = [
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0]
  ];
  const diagonal = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ];
  const otherDiagonal = [
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ];
  const notDiagonal = [
    [1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ];
  const notDiagonal2 = [
    [0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ];
  const lowerLHSDiagonal = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0]
  ];
  const lowerRHSDiagonal = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0]
  ];
  const weird = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 2, 1, 1, 2],
    [2, 0, 0, 2, 1, 2, 1],
    [1, 2, 1, 2, 1, 1, 1]
  ];
  const moreWeird = [
    [2, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 2, 0, 0, 0],
    [2, 0, 0, 1, 0, 0, 0],
    [2, 2, 2, 1, 1, 1, 0],
    [2, 1, 1, 1, 2, 1, 0]
  ];
  expect(isConnect4(horizontal)).toBe(true);
  expect(isConnect4(notHorizontal)).toBe(false);
  expect(isConnect4(vertical)).toBe(true);
  expect(isConnect4(notVertical)).toBe(false);
  expect(isConnect4(notVertical2)).toBe(false);
  expect(isConnect4(diagonal)).toBe(true);
  expect(isConnect4(otherDiagonal)).toBe(true);
  expect(isConnect4(notDiagonal)).toBe(false);
  expect(isConnect4(notDiagonal2)).toBe(false);
  expect(isConnect4(lowerLHSDiagonal)).toBe(true);
  expect(isConnect4(lowerRHSDiagonal)).toBe(true);
  expect(isConnect4(weird)).toBe(false);
  expect(isConnect4(moreWeird)).toBe(false);
});

test('performMove()', () => {
  const board = [
    [2, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 2, 1, 1, 2],
    [2, 0, 0, 2, 1, 2, 1],
    [1, 2, 1, 2, 1, 1, 1]
  ];
  expect(performMove(board)).toBe(false);
});
