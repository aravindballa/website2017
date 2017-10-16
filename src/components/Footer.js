import React from 'react'
import { blueGrey100 } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'

const styles = {
  foo: {
    paddingTop: 20,
    paddingBottom: 20,
    fontFamily: 'Roboto',
    fontWeight: 200,
    textAlign: 'center',
    background: blueGrey100,
    marginTop: 40,
  },
  links: {
    marginRight: 15,
    cursor: 'pointer',
  },
}

const currentYear = new Date().getFullYear()

const social_links = [
  {
    title: 'Twitter',
    location: '/img/twitter.png',
    url: 'http://twitter.com/aravind_bad',
  },
  {
    title: 'Facebook',
    location: '/img/fb.png',
    url: 'https://facebook.com/aravindballa19',
  },
  {
    title: 'Instagram',
    location: '/img/instagram.png',
    url: 'http://instagram.com/aravindballa',
  },
  {
    title: 'Github',
    location: '/img/github.png',
    url: 'http://github.com/aravindballa',
  },
  {
    title: 'Linkedin',
    location: '/img/linkedin.png',
    url: 'https://www.linkedin.com/in/aravindballa',
  },
  {
    title: 'Mail',
    location: '/img/mail.png',
    url: 'mailto:bsaaravind@gmail.com',
  },
]

const Footer = () => (
  <footer style={styles.foo}>
    {social_links.map((link, id) => (
      <a href={link.url} target="_blank" key={id}>
        <img
          src={link.location}
          alt={link.title}
          width="30px"
          style={styles.links}
        />
      </a>
    ))}
    <p>&copy; Aravind Balla. {currentYear}.</p>
  </footer>
)

export default Footer
