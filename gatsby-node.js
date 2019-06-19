const path = require('path');
const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const { createFilePath } = require('gatsby-source-filesystem');
const { createFileNode: baseCreateFileNode } = require('gatsby-source-filesystem/create-file-node');

const postToImage = require('./src/social-cards/screenshot');

async function createFileNode(path, createNode, createNodeId, parentNodeId) {
  const fileNode = await baseCreateFileNode(path, createNodeId);
  fileNode.parent = parentNodeId;
  createNode(fileNode, {
    name: `gatsby-source-filesystem`,
  });
  return fileNode;
}

let browser = null;

exports.onPreInit = async () => {
  // Launch a Puppeteer browser at the start of the build
  browser = await puppeteer.launch({ headless: true });
};

exports.onPostBuild = async () => {
  // Close the browser at the end
  await browser.close();
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
          filter: { frontmatter: { published: { ne: false } } }
        ) {
          edges {
            node {
              parent {
                ... on File {
                  name
                  sourceInstanceName
                }
              }
              fields {
                slug
              }
              frontmatter {
                title
                published
                type
              }
              code {
                scope
              }
            }
          }
        }
      }
    `
  );

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
        next,
      },
    });
  });
};

exports.onCreateNode = async ({ node, actions, getNode, store, createNodeId }) => {
  const { createNodeField, createNode } = actions;

  const program = store.getState().program;
  // We need to store our generated images somewhere that persists
  // between builds, so let's use Gatsby's cache.
  const CACHE_DIR = path.resolve(`${program.directory}/.cache/social/`);
  await fs.ensureDir(CACHE_DIR);

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
    createNodeField({
      name: 'banner',
      node,
      value: node.frontmatter.banner,
    });

    try {
      // Generate our image from the node
      const ogImage = await postToImage(CACHE_DIR, browser, node);
      // Create the file node for the image
      const ogImageNode = await createFileNode(ogImage, createNode, createNodeId, node.id);
      // Attach the image to our Mdx node
      createNodeField({
        name: 'socialImage___NODE',
        node,
        value: ogImageNode.id,
      });
    } catch (e) {
      console.log(e);
    }
  }
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: { $components: path.resolve(__dirname, 'src/components') },
    },
  });
};
