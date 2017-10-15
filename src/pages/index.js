import React from 'react';
import Link from 'gatsby-link';
import Avatar from 'material-ui/Avatar';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import { blueGrey500 } from 'material-ui/styles/colors';

const IndexPage = ({ data }) => (
  <div>
    <div className="toprect"></div>
    <div className="row">
      <Avatar
        alt="Aravind Balla"
        src="https://avatars1.githubusercontent.com/u/8036315?v=4&s=460"
        style={{
          height: 160,
          width: 160,
          marginTop: 50
        }}
      />
    </div>
    <div className="row">
      <div className="title">
        <h1>Aravind Balla</h1>
        {/* TODO: replace with a component. */}
        <p>Developer</p>
        <div className="content">
          <p>I try to move mountains and do magic with code. I keep experimenting things and love to share my experiences. When not coding, I travel.</p>
        </div>
      </div>
    </div>
    <div className="section-wrap">
      <h3>Latest Projects</h3>
      <div className="index-projects">
        {data.allMarkdownRemark.edges.map(post => (
          <Card className="project-card" key={post.node.id}>
            <CardHeader
              title={post.node.frontmatter.title}
              subtitle={post.node.frontmatter.technologies}
            />
            <CardText>
              {post.node.frontmatter.desc}
            </CardText>
            <CardActions>
              <Link to={post.node.frontmatter.path}>
                <FlatButton
                  label="Read More"
                  primary={true}
                  fullWidth={true}
                />
              </Link>
            </CardActions>
          </Card>
        ))}
      </div>

      <Link to="/projects/" className="see-all">All projects <KeyboardArrowRight color="lightgray" /></Link>
    </div>
    <div className="section-wrap">
      <h3>Latest Writings</h3>
      <div className="index-projects">
        {data.allMediumPost.edges.map(post => (
          <Card className="project-card" key={post.node.id}>
            <CardHeader
              title={post.node.title}
            />
            <CardText>
              {post.node.virtuals.subtitle}
            </CardText>
            <CardActions>
              <a href={"https://medium.com/code-lore/" + post.node.uniqueSlug}>
                <FlatButton
                  label="Read More"
                  primary={true}
                  fullWidth={true}
                />
              </a>
            </CardActions>
          </Card>
        ))}
      </div>
      <a href="https://medium.com/@aravindballa/latest" className="see-all">All writings <KeyboardArrowRight color="lightgray" /></a>
    </div>

  </div>
)

export const pageIndexQuery = graphql`
query ProjectsPostsIndexQuery {
  allMediumPost(sort: { fields: [createdAt], order: DESC }, limit: 3) {
    edges {
      node {
        id
        title
        uniqueSlug
        virtuals {
          subtitle
        }
        author {
          name
        }
      }
    }
  }
  allMarkdownRemark(limit: 3) {
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

export default IndexPage
