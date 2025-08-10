export const rollDice = (sides: number = 6): number => {
  return Math.floor(Math.random() * sides) + 1;
};
