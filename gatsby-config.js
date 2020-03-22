const { normalizeUrl } = require('./src/utils/helpers');

module.exports = {
  siteMetadata: {
    title: 'Aravind Balla',
    author: 'Aravind Balla',
    image: 'https://aravindballa.com/avatar.jpg',
    description: 'Discoveries and rants of a developer while developing stuff',
    siteUrl: 'https://aravindballa.com/',
    social: {
      twitter: 'aravindballa',
    },
    organization: {
      name: 'Aravind Balla',
      url: 'https://aravindballa.com',
      logo: 'https://aravindballa.com/logo.png',
    },
  },
  pathPrefix: '/',
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: 'content',
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        defaultLayouts: {
          default: require.resolve('./src/templates/page.js'),
        },
        gatsbyRemarkPlugins: [
          { resolve: 'gatsby-remark-copy-linked-files' },
          {
            resolve: `gatsby-remark-images`,
            options: {
              backgroundColor: '#141414',
              maxWidth: 590,
              quality: 100,
            },
          },
          {
            resolve: require.resolve('./plugins/remark-embedder'),
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          { resolve: 'gatsby-remark-smartypants' },
          { resolve: 'gatsby-remark-embedder' },
        ],
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-65268954-3`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Aravind Balla`,
        short_name: `AB`,
        start_url: `/`,
        background_color: `#151515`,
        theme_color: `#d7d7d7`,
        display: `minimal-ui`,
        icon: `src/assets/logo.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: normalizeUrl(site.siteMetadata.siteUrl + edge.node.fields.slug),
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                });
              });
            },
            query: `
              {
                allMdx(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: {frontmatter: { published: { ne: false } }}
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Aravindballa RSS Feed',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges.map(edge => {
            return {
              url: normalizeUrl(site.siteMetadata.siteUrl + edge.node.path),
              changefreq: `daily`,
              priority: 0.7,
            };
          }),
      },
    },
    `gatsby-plugin-netlify-cache`,
  ],
};
