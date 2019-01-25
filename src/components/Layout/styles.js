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
    .github-card {
      .card {
        margin: 0 auto;
        max-width: 400px;
        border-radius: 5px;
        border: 1px solid #ddd;
        .main {
          border-bottom: 1px solid #666;
          padding: 0 10px;
          .user {
            display: flex;
            .avatar {
              margin: 10px;
              border-radius: 50%;
              border: 2px solid #fff;
            }
            .user-details {
              margin: 10px;
              h3 {
                margin: 10px 0px;
              }
              p {
                margin: 0;
              }
            }

          }
        }
        .stats {
          padding: 0 10px;
          margin: 10px;
          text-align: right;
          .summary {
            font-size: 0.9em;
          }
        }
      }
      .card-caption {
        text-align: center;
        font-size: 0.8em;
        font-weight: 200;
        margin: 0;
        a {
          color: #ccc;

        }
      }
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
