import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../../components/Layout';
import { StyledSummary, StyledProject } from '../../components/styles/projects';
import SEO from '../../components/SEO';
import FeaturedPost from '../../components/FeaturedPost';

class WritingsIndex extends React.Component {
  render() {
    const { data } = this.props;
    const posts = data.allMdx.edges;

    return (
      <Layout location={this.props.location}>
        <SEO frontmatter={{ title: 'Writings', slug: '/writings' }} />
        {posts
          .filter(({ node }) => node.frontmatter.featured)
          .map(({ node }) => (
            <FeaturedPost key={node.fields.slug} link={node.fields.slug}>
              <h3>{node.frontmatter.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </FeaturedPost>
          ))}
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
    allMdx(
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
            title
            published
            featured
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
