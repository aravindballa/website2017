import styled from 'styled-components';
import { rhythm } from '../../utils/typography';
import { colors } from '../../utils/theme';

export const StyledProject = styled.div`
  animation-name: fadeIn;
  animation-duration: 0.5s;
  margin-bottom: ${rhythm(1 / 2)};
  h3 {
    margin-bottom: ${rhythm(1 / 4)};
  }

  small {
    color: ${colors.blue};
  }
`;

export const StyledArticle = styled.div`
  animation-name: fadeIn;
  animation-duration: 0.5s;
  h3 {
    margin-bottom: ${rhythm(1 / 4)};
  }
  p {
    margin-bottom: 0;
  }
  small {
    color: ${colors.blue};
    margin-bottom: ${rhythm(1 / 2)};
  }
`;

export const StyledSummary = styled.p`
  color: ${colors.palered};
`;
