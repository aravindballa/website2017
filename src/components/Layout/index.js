import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';

import Footer from '../Footer';
import mdxComponents from '../Mdx/Mdx';
import { AravindBalla } from '../Icons';
import UpdatePrompt from '../UpdatePrompt';
import DarkModeToggle from '../DarkModeToggle';

import '../../styles/tailwind.css';

const renderBreadcrumb = (pathname) => {
  // TODO: refactor this!

  if (pathname.match(/projects/)) {
    return (
      <Link className="nav-item" to={'/projects'}>
        projects
      </Link>
    );
  } else if (pathname.match(/writings/)) {
    return (
      <Link className="nav-item" to={'/writings'}>
        writings
      </Link>
    );
  } else if (pathname.match(/talks/)) {
    return (
      <Link className="nav-item" to={'/'}>
        talks
      </Link>
    );
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
    render={(data) => {
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
          <h2>
            <span>
              <Link className="nav-item" to={'/'}>
                {title}
              </Link>
            </span>
            <span>{' / '}</span>
            <span className="capitalize">{renderBreadcrumb(location.pathname)}</span>
          </h2>
        );
      }

      return (
        <React.Fragment>
          <div className="mx-auto p-8 layout">
            <div className="flex justify-between mb-8">
              {header}
              <DarkModeToggle />
            </div>
            <MDXProvider components={mdxComponents}>
              <React.Fragment>{children}</React.Fragment>
            </MDXProvider>
          </div>
          <Footer />
          <UpdatePrompt />
        </React.Fragment>
      );
    }}
  />
);

export default Layout;
