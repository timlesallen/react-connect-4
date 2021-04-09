import computerMove from './computer-move';

test('gives a result', () => {
  const board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0]
  ];
  const result = computerMove(board);
  expect(result).toBeGreaterThanOrEqual(0);
  expect(result).toBeLessThanOrEqual(6);
});
