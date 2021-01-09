const combinations = ['teal:blue', 'red:yellow', 'red:orange', 'green:teal'];
const lightVariant = '500';
const darkVariant = '700';

const getRandomTailwindGradient = () => {
  const [color1, color2] = combinations[Math.floor(Math.random() * combinations.length)].split(':');

  return `bg-gradient-to-br from-${color1}-${lightVariant} to-${color2}-${lightVariant} dark:from-${color1}-${darkVariant} dark:to-${color2}-${darkVariant}`;
};

const colorsToNotPurge = () =>
  combinations.reduce((prev, curr) => {
    const colorNames = curr.split(':');
    const lightClasses = [
      `from-${colorNames[0]}-${lightVariant}`,
      `from-${colorNames[1]}-${lightVariant}`,
    ];
    const darkClasses = [
      `from-${colorNames[0]}-${darkVariant}`,
      `from-${colorNames[1]}-${darkVariant}`,
    ];
    return [...prev, ...lightClasses, ...darkClasses];
  }, []);

module.exports = {
  colorsToNotPurge,
  getRandomTailwindGradient,
};
