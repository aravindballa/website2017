import React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Img from 'gatsby-image';

import Bio from '../components/Bio';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import Subscribe from '../components/Subscribe';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx;
    const { previous, next } = this.props.pageContext;

    return (
      <Layout location={this.props.location}>
        <SEO isBlogPost frontmatter={{ ...post.frontmatter, slug: post.fields.slug }} />
        <h1>{post.frontmatter.title}</h1>
        <div className="text-blue text-sm">Sent on {post.frontmatter.date}</div>

        <div className={`my-4 ${post.frontmatter.bannerFullWidth ? 'full-width' : ''}`}>
          {post.frontmatter.banner && (
            <Img className="rounded-md" fluid={post.frontmatter.banner.childImageSharp.fluid} />
          )}
          {post.frontmatter.bannercaption && (
            <div className="opacity-40 text-xs mt-1">
              <i>{post.frontmatter.bannercaption}</i>
            </div>
          )}
        </div>
        <MDXRenderer>{post.body}</MDXRenderer>

        <div className="mt-8">
          <Subscribe />
        </div>

        <div className="flex justify-between">
          <div>
            {previous && (
              <Link
                className="text-yellow dark:text-yellow hover:text-yellow dark:hover:text-yellow"
                to={previous.fields.slug}
                rel="prev"
              >
                ← {previous.frontmatter.title}
              </Link>
            )}
          </div>
          <div>
            {next && (
              <Link
                className="text-yellow dark:text-yellow hover:text-yellow dark:hover:text-yellow"
                to={next.fields.slug}
                rel="next"
              >
                {next.frontmatter.title} →
              </Link>
            )}
          </div>
        </div>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query HackLetterById($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      parent {
        ... on File {
          sourceInstanceName
        }
      }
      excerpt
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        technologies
        banner {
          childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
        bannercaption
        bannerFullWidth
      }
      fields {
        slug
      }
    }
  }
`;
