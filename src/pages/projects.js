import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';
import { StyledProject, StyledSummary } from '../components/styles/projects';
import SEO from '../components/SEO';

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const posts = data.allMdx.edges;

    return (
      <Layout location={this.props.location}>
        <SEO frontmatter={{ title: 'Projects', slug: '/projects' }} />
        <p>
          I love building things. 👷 These are the stuff I built. <br />
          Some for fun. 🤸🏻‍♂️ Some for productivity! 👨🏻‍💻
        </p>
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
          <i>Follow me on </i>
          <a href="https://github.com/aravindballa" target="_blank">
            Github
          </a>{' '}
          <i>
            for a complete list of repos and to know what I am working on right now. Also, checkout
            my developer story at{' '}
          </i>
          <a href="https://stackoverflow.com/story/aravindballa" target="_blank">
            Stack Overflow
          </a>
          <i>.</i>
        </StyledSummary>
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { ne: false }, type: { eq: null } } }
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
