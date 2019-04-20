import React from 'react';

export default ({ keywords = ['nature', 'food'], altText = null }) => (
  <img
    src={`https://source.unsplash.com/random/800x600/?${keywords.join(',')}`}
    alt={altText | 'post hero image'}
    style={{ minHeight: 400 }}
  />
);
