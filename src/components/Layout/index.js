import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import { MDXProvider } from '@mdx-js/tag';

import Footer from '../Footer';
import mdxComponents from '../Mdx';
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
            <MDXProvider components={mdxComponents}>{children}</MDXProvider>
          </StyledLayout>
          {location.pathname !== rootPath && <Footer />}
        </React.Fragment>
      );
    }}
  />
);

export default Layout;
