import styled from 'styled-components';
import { rhythm, scale } from '../../utils/typography';
import { colors } from '../../utils/theme';

export const StyledDate = styled.p`
  ${scale(-1 / 5)};
  display: block;
  margin-bottom: ${rhythm(1)};
  margin-top: ${rhythm(-1)};
  color: ${colors.blue};
`;

export const StyledNextPrev = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  a {
    color: ${colors.yellow};
  }
`;

export const StyledTech = styled.div`
  span {
    margin-right: 10px;
    border: 1px solid ${colors.purple};
    padding: 4px 8px;
    border-radius: 10px;
    color: ${colors.purple};

    &:hover {
      color: magenta;
      border-color: magenta;
    }
  }
`;
