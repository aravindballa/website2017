import { css } from 'styled-components';

export const colors = {
  background: 'var(--background, #151515)',
  text: 'var(--text, #D7D7D7)',
  headings: 'var(--headings, #FFFFFF)',
  red: 'var(--red, #E94040)',
  blue: 'var(--blue, #67BBEF)',
  green: 'var(--green, #67D3BE)',
  purple: 'var(--purple, #8A65AA)',
  yellow: 'var(--yellow, #F5BF32)',
  palered: 'var(--palered, #EB697F)',
  gray700: 'var(--gray700, #242424)',
  gray500: 'var(--gray500, #4F4F4F)',
  inverseBg: 'var(--inverse-bg, #fff)',
};

export const themeVariables = css`
  :root {
    --red: #e94040;
    --blue: #67bbef;
    --green: #67d3be;
    --purple: #8a65aa;
    --yellow: #f5bf32;
    --palered: #eb697f;
  }
  .theme-dark {
    --background: #151515;
    --text: #d7d7d7;
    --headings: #ffffff;
    --gray700: #242424;
    --gray500: #4f4f4f;
    --inverse-bg: #fff;
  }
  .theme-light {
    --background: #fff;
    --text: #151515;
    --headings: #000;
    --gray700: #f4f4f4;
    --gray500: #4f4f4f;
    --inverse-bg: #000;
  }
`;
