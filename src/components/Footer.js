import React from 'react';
import styled from 'styled-components';
import { scale } from '../utils/typography';

const StyledFooter = styled.footer`
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  ${scale(-0.5)}
  a {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const Footer = () => (
  <StyledFooter>
    <p>
      Copyright whenever. This is site is{' '}
      <a href="https://github.com/aravindballa/website2017" target="_blank">
        opensource
      </a>
      .
      <br />
      <a href="mailto:bsaaravind+website@gmail.com">mail</a> |{' '}
      <a href="https://mobile.twitter.com/aravindballa">twitter</a> |{' '}
      <a href="https://aravindballa.com/rss.xml">rss</a>
    </p>
  </StyledFooter>
);

export default Footer;
