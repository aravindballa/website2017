import React from 'react';
import Link from 'gatsby-link';

const Projects = ({ data }) => (
  <div className="projects-wrap">
    <h1>Projects</h1>
    <p>I love building things. </p>

    {data.allMarkdownRemark.edges.map(post => (
      <div>
        <Link
          key={post.node.id}
          to={post.node.frontmatter.path}>
          {post.node.frontmatter.title}
        </Link>
        <br />
      </div>
    ))}
  </div>
)

export const pageQuery = graphql`
  query ProjectsQuery {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            title
            path
          }
        }
      }
    }
  } 
`

export default Projects
