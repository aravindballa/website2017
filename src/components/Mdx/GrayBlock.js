import React from 'react';
import styled from 'styled-components';
import { colors } from '../../utils/theme';

const StyledGrayBlock = styled.div`
  padding: 24px;
  font-size: 0.9em;
  border-radius: 8px;
  background-color: ${colors.gray700};
  margin-bottom: 1.666rem;

  p:last-child {
    margin: 0;
  }
`;

export default (props) => <StyledGrayBlock {...props} />;
