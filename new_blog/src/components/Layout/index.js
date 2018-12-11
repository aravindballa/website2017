import React from 'react'
import { Link } from 'gatsby'

import { rhythm, scale } from '../../utils/typography';
import { StyledLayout, StyledCrumb, GlobalStyle } from './styles';

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1>
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <StyledCrumb>
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            <span>{title}</span>
            <span>{'/'}</span>
            <span>{location.pathname.replace(/\//, '')}</span>
          </Link>
        </StyledCrumb>
      )
    }
    return (
      <StyledLayout>
        <GlobalStyle />
        {header}
        {children}
      </StyledLayout>
    )
  }
}

export default Layout
