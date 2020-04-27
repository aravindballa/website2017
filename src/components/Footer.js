import React from 'react';
import styled from 'styled-components';
import { scale } from '../utils/typography';
import { colors } from '../utils/theme';

const StyledFooter = styled.footer`
  text-align: center;
  opacity: 0.4;
  color: ${colors.inverseBg};
  ${scale(-0.5)}
  a {
    color: ${colors.inverseBg};
  }
`;

const Footer = () => (
  <StyledFooter>
    <p>
      Copyright whenever. This site is{' '}
      <a href="https://github.com/aravindballa/website2017" target="_blank">
        opensource
      </a>
      .
      <br />
      <a href="mailto:bsaaravind+website@gmail.com" rel="me">
        mail
      </a>{' '}
      |{' '}
      <a href="https://twitter.com/aravindballa" rel="me">
        twitter
      </a>{' '}
      | <a href="https://aravindballa.com/rss.xml">rss</a>
    </p>
  </StyledFooter>
);

export default Footer;
