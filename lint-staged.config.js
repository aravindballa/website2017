module.exports = {
  linters: {
    '*.js': ['eslint'],
    '*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)': [
      'prettier --trailing-comma es5 --single-quote --write',
      'git add',
    ],
  },
};
