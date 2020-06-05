import React from 'react';
import useDarkMode from 'use-dark-mode';
import styled from 'styled-components';
import { colors } from '../utils/theme';
import { rhythm } from '../utils/typography';

const StyledDarkMode = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: ${rhythm(1)};
    margin-top: ${rhythm(-0.75)};
    button {
        font-size: ${rhythm(0.7)};
        border-color: ${colors.inverseBg};
        border-width: 1px;
        border-style: solid;
        border-radius: ${rhythm(100)};
        color: ${colors.inverseBg};
        padding-left: ${rhythm(0.38)};
        padding-right: ${rhythm(0.38)};
        background-color: transparent;
    }
`;

const DarkModeToggle = () => {
  const darkMode = useDarkMode(
    false, 
    {
        classNameDark : 'theme-dark', 
        classNameLight : 'theme-light'
    });
  
  return (
    <StyledDarkMode>
      <button type="button" onClick={darkMode.toggle}>
        {darkMode.value ? "☀" : "☾" }
      </button>
    </StyledDarkMode>
  );
};

export default DarkModeToggle;