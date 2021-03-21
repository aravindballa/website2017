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
        <div className="text-blue text-sm">Last edited on {post.frontmatter.date}</div>
        {post.frontmatter.technologies && (
          <div className="text-sm mt-4 inline-flex gap-2">
            <span>Tech used -</span>
            {post.frontmatter.technologies.split(',').map((tech, i) => (
              <span className="border rounded border-purple-300 px-1" key={`${tech.trim()}-${i}`}>
                {tech.trim()}
              </span>
            ))}
          </div>
        )}
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

        <Bio />

        <Subscribe />

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
  query BlogPostById($slug: String!) {
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
