import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import SchemaOrg from './SchemaOrg';

import { normalizeUrl } from '../../utils/helpers';
import getShareImage from '../../social-cards/getShareImage';

const SEO = ({ postData, frontmatter = {}, postImage, isBlogPost }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
            description
            siteUrl
            image
            author
            organization {
              name
              url
              logo
            }
            social {
              twitter
            }
          }
        }
      }
    `}
    render={({ site: { siteMetadata: seo } }) => {
      const postMeta = frontmatter || postData.childMarkdownRemark.frontmatter || {};

      const title = postMeta.title || seo.title;
      const description = postMeta.description || seo.description;
      const url = postMeta.slug ? normalizeUrl(`${seo.siteUrl}${postMeta.slug}`) : seo.siteUrl;
      const datePublished = isBlogPost ? new Date(postMeta.date).toISOString() : false;
      const image = postImage
        ? normalizeUrl(`${seo.siteUrl}${postImage}`)
        : getShareImage({ title: title.replace(/\&/g, 'and') });

      return (
        <React.Fragment>
          <Helmet htmlAttributes={{ lang: 'en' }}>
            {/* General tags */}
            <title>{isBlogPost ? `${title} | ${seo.title}` : title}</title>
            <meta name="description" content={description} />
            <meta name="image" content={image} />

            {/* Webmentions */}
            <link rel="webmention" href="https://webmention.io/aravindballa.com/webmention" />
            <link rel="pingback" href="https://webmention.io/aravindballa.com/xmlrpc" />

            {/* OpenGraph tags */}
            <meta property="og:url" content={url} />
            {isBlogPost ? <meta property="og:type" content="article" /> : null}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={'@' + seo.social.twitter} />
            <meta name="twitter:creator" content={'@' + seo.social.twitter} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
          </Helmet>
          <SchemaOrg
            isBlogPost={isBlogPost}
            url={url}
            title={title}
            image={image}
            description={description}
            datePublished={datePublished}
            siteUrl={seo.siteUrl}
            author={seo.author}
            organization={seo.organization}
            defaultTitle={seo.title}
          />
        </React.Fragment>
      );
    }}
  />
);

SEO.propTypes = {
  isBlogPost: PropTypes.bool,
  postData: PropTypes.shape({
    childMarkdownRemark: PropTypes.shape({
      frontmatter: PropTypes.any,
      excerpt: PropTypes.any,
    }),
  }),
  postImage: PropTypes.string,
};

SEO.defaultProps = {
  isBlogPost: false,
  postData: { childMarkdownRemark: {} },
  postImage: null,
};

export default SEO;
