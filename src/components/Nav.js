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
  window.open('https://medium.com/@aravindballa', '_blank');
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

const Nav = () => (
  <AppBar
    style={styles.appBar}
    zDepth={0}
    iconElementRight={rightMenuItems}
  />
);

export default Nav;