// ### Featured

// [How Remote work changed me](/writings/how-remote-work-changed-me/)

// ### Personal Favourites

// - [Fetching things at once](/writings/fetching-things-at-once)

import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../../components/Layout';
import { StyledSummary, StyledArticle } from '../../components/styles/projects';
import SEO from '../../components/SEO';

class WritingsIndex extends React.Component {
  render() {
    const { data } = this.props;
    const posts = data.allMdx.edges;

    return (
      <Layout location={this.props.location}>
        <SEO frontmatter={{ title: 'Writings', slug: '/writings' }} />
        <h2>Featured</h2>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <StyledArticle key={node.fields.slug}>
              <h3>
                <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                <small>Read -></small>
              </Link>
            </StyledArticle>
          );
        })}
      </Layout>
    );
  }
}

export default WritingsIndex;

export const pageQuery = graphql`
  query {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { published: { ne: false }, type: { eq: "article" }, featured: { eq: true } }
      }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            published
          }
        }
      }
    }
  }
`;
