import React from 'react';
import styled from 'styled-components';
import { colors } from '../utils/theme';

const StyledWrapper = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
  max-width: 420px;
  padding: 16px;
  background-color: ${colors.gray700};
  border-radius: 8px;
  border: 1px solid ${colors.text};
  box-shadow: 29px 24px 47px -35px rgba(0, 0, 0, 0.75);

  p {
    margin-bottom: 16px;
    color: ${colors.text};
    font-size: 16px;
    text-align: left;
  }

  button {
    border: 0;
    padding: 0;
    margin: 0;
    background-color: transparent;
    cursor: pointer;
    color: ${colors.green};
    font-size: 16px;
  }
`;

export default () => {
  const [swUpdated, setSwUpdated] = React.useState(false);

  React.useEffect(() => {
    if (window.localStorage) {
      console.log(window.localStorage.getItem('sw-updated'));
      setSwUpdated(JSON.parse(window.localStorage.getItem('sw-updated') || 'false'));
    }
  }, []);

  return swUpdated ? (
    <StyledWrapper>
      <p>This website has been updated. Please refresh to get the new version! ✨</p>
      <button
        onClick={() => {
          window.location.reload(true);
          if (window.localStorage) {
            window.localStorage.setItem('sw-updated', 'false');
            setSwUpdated(false);
          }
        }}
      >
        Refresh
      </button>
    </StyledWrapper>
  ) : null;
};
