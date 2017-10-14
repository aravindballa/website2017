import React from 'react';
import Link from 'gatsby-link';
import Avatar from 'material-ui/Avatar';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const IndexPage = () => (
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
    <section className="section-wrap">
      <h3>Latest Projects</h3>
      <Card className="project-card">
        <CardHeader
          title="Title"
          subtitle="Subtitle"
        />
        <CardText>
          Project Description
        </CardText>
        <CardActions>
          <FlatButton label="Like" />
          <FlatButton label="Github" />
        </CardActions>
      </Card>
      <Link to="/projects/" className="see-all">All projects &gt;</Link>
    </section>
    <section className="section-wrap">
      <h3>Latest Writings</h3>
      <Card className="project-card">
        <CardHeader
          title="Article"
          subtitle="Subtitle"
        />
        <CardText>
          Description
        </CardText>
        <CardActions>
          <FlatButton label="Read More" />
        </CardActions>
      </Card>
      <a href="http://medium.com/@aravindballa/" className="see-all">All writings &gt;</a>
    </section>

  </div>
)

export default IndexPage
