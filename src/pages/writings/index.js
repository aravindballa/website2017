import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import FeaturedPost from '../../components/FeaturedPost';
import getRandomTailwindGradient from '../../utils/getRandomTailwindGradient';

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-6">
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug;
            return (
              <div className="mt-4" key={node.fields.slug}>
                <Link to={node.fields.slug}>
                  {node.frontmatter.banner ? (
                    <Img
                      className="rounded-md bg-cover h-64"
                      sizes={node.frontmatter.banner.childImageSharp.fluid}
                    />
                  ) : (
                    <div
                      className={`rounded-md bg-cover h-64 w-full ${getRandomTailwindGradient()}`}
                    />
                  )}
                </Link>
                <h3>
                  <Link className="text-headings" to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              </div>
            );
          })}
        </div>
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
            banner {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`;
