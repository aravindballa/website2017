import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Nav from '../components/Nav';
import Footer from '../components/Footer';

import './index.scss';

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Aravind Balla"
      meta={[
        { name: 'description', content: 'Personal website of web developer Aravind Balla.' },
        { name: 'keywords', content: 'aravind, aravindballa, web, web developer, saiaravind, designer, thinker, developer' },
      ]}
    >
    </Helmet>
    <div>
      <MuiThemeProvider>
        <div>
          <Nav />
          <div className="container">
            {children()}
          </div>
          <Footer />
        </div>
      </MuiThemeProvider>
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
