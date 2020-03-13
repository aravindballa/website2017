import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';

import Footer from '../Footer';
import mdxComponents from '../Mdx';
import { StyledLayout, StyledCrumb, GlobalStyle } from './styles';
import { AravindBalla } from '../Icons';
import UpdatePrompt from '../UpdatePrompt';

const renderBreadcrumb = pathname => {
  // TODO: refactor this!
  if (pathname.match(/projects/)) {
    return <Link to={'/projects'}>projects</Link>;
  } else if (pathname.match(/writings/)) {
    return <Link to={'/writings'}>writings</Link>;
  } else if (pathname.match(/talks/)) {
    return <Link to={'/'}>talks</Link>;
  } else {
    return '';
  }
};

const Layout = ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => {
      const title = data.site.siteMetadata.title;
      const rootPath = `${__PATH_PREFIX__}/`;
      let header;
      if (location && location.pathname === rootPath) {
        header = (
          <h1>
            <Link to={'/'}>
              <AravindBalla />
            </Link>
            <span style={{ display: 'none' }}>{title}</span>
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
          <StyledLayout isIndex={location.pathname === rootPath}>
            <GlobalStyle />
            {header}
            <MDXProvider components={mdxComponents}>
              <React.Fragment>{children}</React.Fragment>
            </MDXProvider>
          </StyledLayout>
          {location.pathname !== rootPath && <Footer />}
          <UpdatePrompt />
        </React.Fragment>
      );
    }}
  />
);

export default Layout;
