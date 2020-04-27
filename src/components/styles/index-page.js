import styled from 'styled-components';
import { rhythm, scale } from '../../utils/typography';
import { colors } from '../../utils/theme';

export const StyledIndex = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;

  h1 {
    ${scale(1.5)}
    margin: 0 0 2rem 0;
  }

  strong {
    color: white;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: space-around;
    animation-name: fadeIn;
    animation-duration: 0.5s;
    p {
      margin-bottom: ${rhythm(1.5)};
      margin-top: 0;
      text-align: center;
      text-transform: italicise;
    }
  }

  div.homepage-content {
    * {
      text-align: left;
    }
    h3 {
      margin: 2rem 0 1rem 0;
    }
    p {
      margin: 0 0 1rem 0;
    }
  }
`;
