import styled, { createGlobalStyle } from 'styled-components';
import { rhythm, scale } from '../../utils/typography';
import { colors } from '../../utils/theme';

export const GlobalStyle = createGlobalStyle`
  body {
    background: ${colors.background};
    color: ${colors.text};
  }

  h1,h2,h3 {
    color: ${colors.headings};
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
`

export const StyledLayout = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(24)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};

`
