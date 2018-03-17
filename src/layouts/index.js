import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import { orange700 } from 'material-ui/styles/colors'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Nav from '../components/Nav'
import Footer from '../components/Footer'

import './index.scss'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: orange700
  },
});


const TemplateWrapper = ({ children }) => (
  <div>
    <div>
      <MuiThemeProvider muiTheme={muiTheme}>
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
