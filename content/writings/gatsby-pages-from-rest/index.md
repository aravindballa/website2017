---
title: 'Build pages in Gatsby from Rest API'
date: '2021-02-26'
type: 'article'
published: false
description: 'It\'s not that hard. We just have to hook into gatsby-node.'
tags: 'gatsby, gatsbyjs, advanced gatsby, rest api, graphql, gatsby-source-api'
---

TL;DR

```js
exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  // Fetch the posts from Notion

  const allPosts = await getAllPostsFromAPI();
  for (const post of allPosts) {
    const blocks = await getPostContentBlocks(post);
    createPage({
      path: `writings/${post.Slug}`,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        slug: `writings/${post.Slug}`,
        blocks,
      },
    });
  }
};

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions;

  const allPosts = await getAllPostsFromAPI();
  for (const post of allPosts) {
    // create node for graphql
    const node = {
      id: `${post.Slug}`,
      parent: `__SOURCE__`,
      internal: {
        type: `APIPost`,
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
```
