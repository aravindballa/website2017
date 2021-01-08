require('dotenv').config();

const fetchRoamResearch = require('fetch-roamresearch').default;
const fs = require('fs-extra');

const TAG_KEY = 'Tags';
const TAG_VALUE = 'blog-publish';
const SLUG_KEY = 'Slug';

const CONTENT_DIR = './content/writings';

const mdForBlock = (block, indent = '') => {
  let res = block.string;

  if (block.heading && block.heading === 1) {
    res = '# ' + res;
  }
  if (block.heading && block.heading === 2) {
    res = '## ' + res;
  }
  if (block.heading && block.heading === 3) {
    res = '### ' + res;
  }

  if (block.children) {
    block.children.forEach((child) => {
      const resForBlock = mdForBlock(child, `${indent}  `);

      res += `\n${indent} ${resForBlock}`;
    });
  }

  return res;
};

const getMdForRoamBlock = (block) => {
  let res = `---
title: '${block.frontmatter.Title}'
date: '${block.frontmatter.Date}'
type: 'article'
description: '${block.frontmatter.Description}'
---`;

  if (block.node.children) {
    block.node.children.forEach((block) => {
      if (block.string.match(/(.*):: (.*)/)) return;
      const resForBlock = mdForBlock(block);
      res += `\n\n${resForBlock}`;
    });
  }

  return res;
};

(async () => {
  const ROAM_URL = `https://roamresearch.com/#/app/${process.env.ROAM_DATABASE}`;
  const ROAM_EMAIL = process.env.ROAM_EMAIL;
  const ROAM_PASSWORD = process.env.ROAM_PASSWORD;

  const graph = await fetchRoamResearch(ROAM_URL, {
    email: ROAM_EMAIL,
    password: ROAM_PASSWORD,
  });

  const validNodes = [];
  for (const node of graph) {
    const frontmatter = {};
    if (node.children && node.children.length) {
      for (const block of node.children) {
        if (block.string) {
          const attrMatch = block.string.match(/(.*):: (.*)/);
          if (attrMatch) frontmatter[attrMatch[1]] = attrMatch[2];
        }
      }
      if (frontmatter[TAG_KEY] && frontmatter[TAG_KEY].includes(`#${TAG_VALUE}`)) {
        validNodes.push({ node, frontmatter });
      }
    }
  }

  for (const validNode of validNodes) {
    const content = getMdForRoamBlock(validNode);

    fs.ensureDirSync(`${CONTENT_DIR}/${validNode.frontmatter[SLUG_KEY]}`);
    console.log('writing file', `${validNode.frontmatter[SLUG_KEY]}.mdx`);
    fs.writeFileSync(`${CONTENT_DIR}/${validNode.frontmatter[SLUG_KEY]}/index.mdx`, content);
  }
})();
