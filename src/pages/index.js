import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import getLCImage from '../utils/lcImage';
import { getRandomTailwindGradient } from '../utils/getRandomTailwindGradient';

const HomePage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const siteDescription = data.site.siteMetadata.description;

  return (
    <>
      <Layout location={location} title={siteTitle} description={siteDescription}>
        <SEO />
        <p>
          Hi 👋 I am Software Developer working remotely from Hyderabad, India. I love JS and CSS
          💛. I like to <Link to="/projects">build stuff</Link>, document the process and share the
          knowledge I gain.
        </p>
        <p>
          I currently work 👨🏻‍💻 at{' '}
          <a href="https://paperpile.com/?welcome" target="_blank" rel="noreferrer noopener">
            Paperpile
          </a>{' '}
          where we are building tools – Paperpile and{' '}
          <a href="https://bibguru.com/" target="_blank" rel="noreferrer noopener">
            BibGuru
          </a>
          , which are used by thousands of scientists and students for research from all over the
          world.
        </p>
        <h2>Few things I've wrote recently</h2>
        <p>As I said, I like to share what I've learnt. So I (try to) write frequently.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-6">
          {data.allMdx.edges.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug;
            return (
              <div
                className="text-base hover:bg-gray-200 dark:hover:bg-gray-800 px-6 pt-4 rounded"
                key={node.fields.slug}
              >
                <Link to={node.fields.slug}>
                  {node.frontmatter.banner ? (
                    <Img
                      className="rounded-md bg-cover h-32 -mb-4"
                      sizes={node.frontmatter.banner.childImageSharp.fluid}
                    />
                  ) : (
                    <div
                      className={`rounded-md bg-cover h-32 w-full ${getRandomTailwindGradient()}`}
                    />
                  )}
                </Link>
                <h3>
                  <Link className="text-headings" to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              </div>
            );
          })}
          <div className="text-base px-6 pt-4">
            <Link to="/writings">
              <h3>👉 All the things I wrote</h3>
            </Link>
          </div>
        </div>
        <h2>You know about the podcast, right?</h2>
        <p>
          Brittik and I host a podcast where we talk about technology, startups and all the things
          we love about. It's called <a href="https://learningcurve.dev">Learning Curve Podcast</a>
        </p>
        {data.allAnchorEpisode.edges.map(({ node }) => (
          <div>
            <a href={`https://learningcurve.dev/${node.itunes.episode}`}>
              <img
                className="w-72 rounded mb-0"
                src={getLCImage(
                  node.itunes.episode,
                  node.title,
                  node.pubDate,
                  node.itunes.duration
                )}
              />
              <span className="text-sm">Latest - </span>
              {node.title}
            </a>
          </div>
        ))}
        <h2>Speaking</h2>
        <p>I speak at meetups and conferences on topics that I'm excited about.</p>
        <ul>
          <li>
            <a href="https://www.youtube.com/watch?v=8XP0pxofYbQ">
              Jun 2020: Building a Second brain (Remote)
            </a>
          </li>
          <li>
            <a href="https://www.meetup.com/vue-hyderabad/events/268288016/">
              Feb 2020: Taking power back to CSS
            </a>
          </li>
          <li>
            <Link to="/talks/devfest-19/">Oct 2019: Build Blazing Fast Portfolios</Link>
          </li>
          <li>
            <a href="https://www.meetup.com/coderplex/events/263195332/">
              Jul 2019: Build Websites with Gatsby JS
            </a>
          </li>
          <li>
            <a href="https://www.meetup.com/vue-hyderabad/events/268288016/">
              Apr 2018: React vs Vue
            </a>
          </li>
        </ul>
        <h2>And More...</h2>
        <p>
          I started posting videos on{' '}
          <a href="https://www.youtube.com/channel/UC2y7GYWCZtXApu6iQmlmFnw">YouTube</a> lately and
          enjoying the process of it. Watch and subscribe if you like them.
        </p>
        <p>
          Also, I post a few unfinished and work in progress thoughts at{' '}
          <a href="https://notes.aravindballa.com">notes.aravindballa.com</a> like{' '}
          <a href="https://notes.aravindballa.com/writing/">this one</a> about writing.
        </p>
        <ul>
          <li>
            <a href="https://twitter.com/aravindballa">Twitter</a>
          </li>
          <li>
            <a href="https://github.com/aravindballa">Github</a>
          </li>
        </ul>
      </Layout>
    </>
  );
};

export default HomePage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { ne: false }, type: { eq: "article" } } }
      limit: 3
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            banner {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
    allAnchorEpisode(sort: { order: DESC, fields: isoDate }, limit: 1) {
      edges {
        node {
          id
          title
          pubDate
          itunes {
            duration
            episode
          }
        }
      }
    }
  }
`;
