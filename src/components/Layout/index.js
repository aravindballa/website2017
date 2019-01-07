import React from 'react';
import { Link } from 'gatsby';

import Footer from '../Footer';
import { StyledLayout, StyledCrumb, GlobalStyle } from './styles';

const renderBreadcrumb = pathname => {
  if (pathname.match(/projects/)) {
    return <Link to={'/projects'}>projects</Link>;
  } else if (pathname.match(/writings/)) {
    return <Link to={'/writings'}>writings</Link>;
  } else {
    return '';
  }
};

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;
    let header;

    if (location.pathname === rootPath) {
      header = (
        <h1>
          <Link to={'/'}>{title}</Link>
        </h1>
      );
    } else {
      header = (
        <StyledCrumb>
          <span>
            <Link to={'/'}>{title}</Link>
          </span>
          <span>{'/'}</span>
          <span>{renderBreadcrumb(location.pathname)}</span>
        </StyledCrumb>
      );
    }
    return (
      <React.Fragment>
        <StyledLayout>
          <GlobalStyle />
          {header}
          {children}
        </StyledLayout>
        {location.pathname !== rootPath && <Footer />}
      </React.Fragment>
    );
  }
}

export default Layout;
