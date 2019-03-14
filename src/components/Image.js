import React from 'react';
import styled from 'styled-components';
import { scale } from '../utils/typography';
import Img from 'gatsby-image';

const Image = () => <Img sizes={post.frontmatter.banner.childImageSharp.fluid} />;

export default Image;
