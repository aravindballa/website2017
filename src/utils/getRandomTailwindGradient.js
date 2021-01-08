const getRandomTailwindGradient = () => {
  const combinations = ['teal:blue', 'red:yellow', 'red:orange', 'green:teal'];
  const [color1, color2] = combinations[Math.floor(Math.random() * combinations.length)].split(':');

  return `bg-gradient-to-br from-${color1}-500 to-${color2}-500 dark:from-${color1}-700 dark:to-${color2}-700`;
};

export default getRandomTailwindGradient;
