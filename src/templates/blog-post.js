import React from 'react';
import { Link, graphql } from 'gatsby';
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { withMDXScope } from 'gatsby-mdx/context'

import Bio from '../components/Bio';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import { StyledDate, StyledNextPrev, StyledTech, StyledPost } from '../components/styles/post';
import { rhythm, scale } from '../utils/typography';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx;
    const { previous, next } = this.props.pageContext;

    console.log(this.props);

    return (
      <Layout location={location}>
        <SEO isBlogPost frontmatter={{ ...post.frontmatter, slug: post.fields.slug }} />
        <h1>{post.frontmatter.title}</h1>
        <StyledDate>{post.frontmatter.date}</StyledDate>
        {post.frontmatter.technologies && (
          <StyledTech>
            Tech used -{' '}
            {post.frontmatter.technologies.split(',').map((tech, i) => (
              <span key={`${tech.trim()}-${i}`}>{tech.trim()}</span>
            ))}
          </StyledTech>
        )}
        <StyledPost>
          <MDXRenderer>{post.code.body}</MDXRenderer>
        </StyledPost>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />

        <StyledNextPrev>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </StyledNextPrev>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostById($slug: String!) {
    mdx(fields: {slug: { eq: $slug }}) {
      id
      excerpt
      code {
        body
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        technologies
      }
      fields {
        slug
      }
    }
  }
`;
