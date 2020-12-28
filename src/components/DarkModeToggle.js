import React from 'react';
import { Helmet } from 'react-helmet';
import useDarkMode from 'use-dark-mode';

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false, {
    classNameDark: 'dark',
    classNameLight: 'light',
    storageKey: 'darkMode',
    minify: true,
  });

  return (
    <>
      <Helmet>
        <meta name="twitter:widgets:theme" content={darkMode.value ? 'dark' : 'light'} />
      </Helmet>
      <div className="btn-theme-toggle cursor-pointer outline-none pt-6" onClick={darkMode.toggle}>
        {darkMode.value ? '☀️' : '🌙'}
      </div>
    </>
  );
};

export default DarkModeToggle;
