import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../../components/Layout';
import { StyledProject, StyledSummary } from '../../components/styles/projects';
import SEO from '../../components/SEO';

class WritingsIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const siteDescription = data.site.siteMetadata.description;
    const posts = data.allMarkdownRemark.edges;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO frontmatter={{ title: 'Writings', slug: '/writings' }} />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <StyledProject key={node.fields.slug}>
              <h3>
                <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </StyledProject>
          );
        })}
        <hr />
        <StyledSummary>
          <i>Reached the end. Checkout articles on </i>
          <a href="https://medium.com/@aravindballa" target="_blank">
            Medium
          </a>{' '}
          <i>or </i>
          <a href="https://dev.to/aravindballa" target="_blank">
            Dev.to
          </a>{' '}
          <i>that I wrote earlier.</i>
        </StyledSummary>
      </Layout>
    );
  }
}

export default WritingsIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { ne: false }, type: { eq: "article" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            published
          }
        }
      }
    }
  }
`;
