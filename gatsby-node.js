const path = require('path');
const fs = require('fs-extra');
const crypto = require('crypto');
const { createFilePath } = require('gatsby-source-filesystem');

const { getAllNotionPosts, getNotionPostBlocks } = require('./lib/postsFromNotion');

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

  // Fetch the posts from Notion

  const notionPosts = await getAllNotionPosts();
  for (const post of notionPosts) {
    const blocks = await getNotionPostBlocks(post);
    createPage({
      path: `writings/${post.Slug}`,
      component: path.resolve(`./src/templates/notion-post.js`),
      context: {
        slug: `writings/${post.Slug}`,
        blocks,
      },
    });
  }
};

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions;

  const notionPosts = await getAllNotionPosts();
  for (const post of notionPosts) {
    // create node for graphql
    const node = {
      id: `${post.Slug}`,
      parent: `__SOURCE__`,
      internal: {
        type: `NotionPost`,
      },
      children: [],

      // Other fields that you want to query with graphQl
      slug: post.Slug,
      title: post.Name,
      date: post.Date,
      draft: post.Draft,
    };
    const contentDigest = crypto.createHash(`md5`).update(JSON.stringify(node)).digest(`hex`);
    node.internal.contentDigest = contentDigest;
    createNode(node);
  }
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
