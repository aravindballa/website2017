const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC },
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
  )

  if (result.errors) {
    console.log(result.errors);
    throw result.errors;
  }

  const posts = result.data.allMdx.edges;
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
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        slug: post.node.fields.slug,
        previous,
        next
      },
    });
  });
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: { $components: path.resolve(__dirname, 'src/components') },
    },
  })
}
