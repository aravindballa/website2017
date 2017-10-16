import React from 'react'
import Link from 'gatsby-link'
import Chip from 'material-ui/Chip'
import Code from 'material-ui/svg-icons/action/code'
import Launch from 'material-ui/svg-icons/action/launch'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'
import { blueGrey300 } from 'material-ui/styles/colors'

const handleClick = url => {
  window.open(url)
}

const Projects = ({ data }) => (
  <div className="projects-wrap">
    <h1>Projects</h1>
    <p>
      I love building things. These are the stuff I built. <br />Some for fun.
      Some for productivity!
    </p>

    {data.allMarkdownRemark.edges.map(post => (
      <div className="proj" key={post.node.id}>
        <h2>
          <Link to={post.node.frontmatter.path}>
            {post.node.frontmatter.title}
          </Link>
        </h2>
        <div className="chip">
          {post.node.frontmatter.technologies.split(', ').map((tech, i) => (
            <Chip style={{ margin: 4 }} key={i}>
              {tech}
            </Chip>
          ))}
        </div>
        <p>{post.node.frontmatter.desc}</p>
        <div className="actions">
          {post.node.frontmatter.source ? (
            <IconButton
              tooltip="Code"
              onClick={() => handleClick(post.node.frontmatter.source)}
            >
              <Code color={blueGrey300} />
            </IconButton>
          ) : (
            <span />
          )}
          {post.node.frontmatter.link ? (
            <IconButton
              tooltip="Open"
              onClick={() => handleClick(post.node.frontmatter.link)}
            >
              <Launch color={blueGrey300} />
            </IconButton>
          ) : (
            <span />
          )}
        </div>
        <Divider />
      </div>
    ))}

    <p>
      <i>
        Follow me on{' '}
        <a href="https://github.com/aravindballa" target="_blank">
          Github
        </a>{' '}
        for a complete list of repos and to know what I am working on right now.
      </i>
    </p>
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
            technologies
            source
            link
            desc
          }
        }
      }
    }
  }
`

export default Projects
