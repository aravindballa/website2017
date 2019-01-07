const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(sort: { 
              fields: [frontmatter___date], order: DESC },
              limit: 1000,
              filter: {frontmatter: { published: { ne: false } }}
             ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    published
                    type
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges;

        posts.forEach((post, index) => {
          let previous = index === posts.length - 1 ? null : posts[index + 1].node;
          let next = index === 0 ? null : posts[index - 1].node;
          // Post in writings should not show up in projects and vice-versa
          if (previous && previous.frontmatter.type !== post.node.frontmatter.type) {
            previous = null;
          }
          if (next && next.frontmatter.type !== post.node.frontmatter.type) {
            next = null;
          }

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          })
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
