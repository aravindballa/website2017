const fetch = require('node-fetch');

const NOTION_PAGE_ID = 'b1d2b5246224470f88ae1e8fc1fc5c2d';

const getNotionPostBlocks = async (post) => {
  const blocks = await fetch(`https://notion-api.splitbee.io/v1/page/${post.id}`).then((res) =>
    res.json()
  );

  return blocks;
};

const getAllNotionPosts = async () => {
  const posts = await (
    await fetch(`https://notion-api.splitbee.io/v1/table/${NOTION_PAGE_ID}`)
  ).json();

  return posts.filter((post) => post.Tags && post.Tags.includes('gatsby-source'));
};

module.exports = {
  getNotionPostBlocks,
  getAllNotionPosts,
};
