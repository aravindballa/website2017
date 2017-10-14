import React from 'react';
import Link from 'gatsby-link';
import Avatar from 'material-ui/Avatar';

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
    <Link to="/page-2/">Go to page 2</Link>
  </div>
)

export default IndexPage
