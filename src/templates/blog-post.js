import React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Img from 'gatsby-image';

import Bio from '../components/Bio';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import {
  StyledDate,
  StyledNextPrev,
  StyledTech,
  StyledPost,
  StyledImgCaption,
} from '../components/styles/post';
import { rhythm, scale } from '../utils/typography';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx;
    const { previous, next } = this.props.pageContext;

    return (
      <Layout location={this.props.location}>
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
          {post.frontmatter.banner && <Img sizes={post.frontmatter.banner.childImageSharp.fluid} />}
          {post.frontmatter.bannercaption && (
            <StyledImgCaption>{post.frontmatter.bannercaption}</StyledImgCaption>
          )}
          <MDXRenderer>{post.body}</MDXRenderer>
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
      }
      fields {
        slug
      }
    }
  }
`;
