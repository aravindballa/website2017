import React from 'react';
import { blueGrey100 } from 'material-ui/styles/colors';

const styles = {
  foo: {
    paddingTop: 20,
    paddingBottom: 20,
    fontFamily: 'Roboto',
    fontWeight: 200,
    textAlign: 'center',
    background: blueGrey100,
    marginTop: 40
  }
};

const currentYear = new Date().getFullYear();

const Footer = () => (
  <footer style={styles.foo}>
    <p>
      &copy; Aravind Balla. {currentYear}.
    </p>
  </footer>
);

export default Footer;
