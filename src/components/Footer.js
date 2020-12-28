import React from 'react';

const Footer = () => (
  <div className="text-center text-gray-500 dark:text-gray-500 text-xs">
    <p>
      Copyright whenever. This site is{' '}
      <a
        className="text-gray-500 dark:text-gray-500"
        href="https://github.com/aravindballa/website2017"
        target="_blank"
      >
        opensource
      </a>
      .
      <br />
      <a className="text-gray-500 dark:text-gray-500" href="mailto:hey+website@balla.dev" rel="me">
        mail
      </a>{' '}
      |{' '}
      <a
        className="text-gray-500 dark:text-gray-500"
        href="https://twitter.com/aravindballa"
        rel="me"
      >
        twitter
      </a>{' '}
      |{' '}
      <a className="text-gray-500 dark:text-gray-500" href="https://aravindballa.com/rss.xml">
        rss
      </a>
    </p>
  </div>
);

export default Footer;
