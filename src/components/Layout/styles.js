import styled, { createGlobalStyle } from 'styled-components';
import { rhythm, scale } from '../../utils/typography';
import { colors } from '../../utils/theme';

/**
 * Global styles are placed here instead of gatsby-browser.js
 * beacuse, we make use of the power of styled-components
 * and can change the theme easyly.
 */
export const GlobalStyle = createGlobalStyle`
  body {
    background: ${colors.background};
    color: ${colors.text};
  }

  h1,h2,h3 {
    color: ${colors.headings};
      a {
      box-shadow: none;
      text-decoration: none;
      color: inherit;

      &:hover: {
        text-decoration: none;
      }
    }
  }

  a {
    color: ${colors.headings};
    text-decoration: none;

    &:hover {
      color: ${colors.text};
      text-decoration: underline;
      text-decoration-color: ${colors.red};
    }
  }

  hr {
    background: gray;
  }

  .gh-card-wrap {
    text-align: center;
    iframe {
      margin: 0;
    }
  }

  blockquote {
    background: #111;
    border-left: 4px solid #eee;
    padding-left: 20px;
    font-size: 1.2em;
    font-style: italic;
  }
`;

export const StyledLayout = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(24)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
`;

export const StyledCrumb = styled.h2`
  a {
    box-shadow: none;
    text-decoration: none;
    color: inherit;
  }

  span {
    text-transform: capitalize;
    margin-right: ${rhythm(1 / 4)};
  }
`;
