import React from 'react'
import Link from 'gatsby-link'

const Projects = ({data}) => (
  <div>
    <h1>Projects</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>

    {data.allMarkdownRemark.edges.map(post => (
      <Link
        key={post.node.id}
        to={post.node.frontmatter.path}>
        {post.node.frontmatter.title}
      </Link>
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
