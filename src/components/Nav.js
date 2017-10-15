import React from 'react';
import { AppBar, FlatButton } from 'material-ui';
import Link from 'gatsby-link';

const styles = {
  rightMenu: {
    padding: 'auto auto',
    color: 'white'
  },
  appBar: {
    backgroundColor: '#FF822E'
  }
};

function handleWritingsClick() {
  window.open('https://medium.com/@aravindballa/latest', '_blank');
};

function handleProjectsClick() {
  window.open('/projects/');
}

const rightMenuItems = (
  <div>
    <Link to='/projects/'><FlatButton style={styles.rightMenu} label="Projects" /></Link>
    <FlatButton style={styles.rightMenu} label="Writings" onClick={handleWritingsClick} />
  </div>
);

const Nav = ({ pathToPage }) => (
  <AppBar
    title={<Link to="/"><img src="/img/logo-white.png" alt="" height="40px" style={{ margin: 10 }} /></Link>}
    style={styles.appBar}
    zDepth={0}
    iconElementRight={rightMenuItems}
  />
);

export default Nav;