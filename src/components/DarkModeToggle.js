import React from 'react';
import useDarkMode from 'use-dark-mode';
import styled from 'styled-components';
import { colors } from '../utils/theme';
import { rhythm } from '../utils/typography';

const StyledDarkMode = styled.button`
  border: 0;
  background: transparent;
  margin: 1.666rem 0 2rem 0;
  outline: none;
  cursor: pointer;
`;

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false, {
    classNameDark: 'theme-dark',
    classNameLight: 'theme-light',
    storageKey: 'darkMode',
    minify: true,
  });

  return (
    <StyledDarkMode className="btn-theme-toggle" onClick={darkMode.toggle}>
      {darkMode.value ? '☀️' : '🌙'}
    </StyledDarkMode>
  );
};

export default DarkModeToggle;
