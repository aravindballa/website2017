import React from 'react';
import styled, { css } from 'styled-components';

import { colors } from '../../utils/theme';

const StyledFrame = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${colors.background};
  color: ${colors.text};
  display: flex;
  flex-direction: column;
`;

const StyledFooter = styled.div`
  height: 150px;
  padding: 0 36px;
  h1 {
    margin: 0;
  }
  p {
    margin: 12px 0 0 0;
  }
  pre {
    margin: 0;
  }
`;

const OBSScene = () => {
  return (
    <StyledFrame>
      <div
        css={`
          flex: 1;
        `}
      ></div>
      <StyledFooter>
        <h1>Adding dark mode toggle to my website</h1>
        <pre>github.com/aravindballa/website2017</pre>
        <p>@aravindballa | {new Date().toDateString()} </p>
      </StyledFooter>
    </StyledFrame>
  );
};

export default OBSScene;
