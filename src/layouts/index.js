import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Nav from '../components/Nav'
import Footer from '../components/Footer'

import './index.scss'

const TemplateWrapper = ({ children }) => (
  <div>
    <div>
      <MuiThemeProvider>
        <div>
          <Nav />
          <div className="container">{children()}</div>
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
