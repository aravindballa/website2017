import styled from 'styled-components';
import { rhythm } from '../../utils/typography';
import { colors } from '../../utils/theme';

export const StyledProject = styled.div`
  margin-bottom: ${rhythm(1 / 2)};
  h3 {
    margin-bottom: ${rhythm(1 / 4)};
  }
  small {
    color: ${colors.blue};
  }
`;

export const StyledSummary = styled.p`
  color: ${colors.palered};
`;
