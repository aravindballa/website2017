import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { colors } from '../utils/theme';

export const StyledLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;

const FeaturedPost = ({ link, children }) => (
  <Link className="hover:no-underline text-foreground hover:text-headings" to={link}>
    <div className="p-4 bg-gray-800 border rounded-md border-background hover:border-foreground">
      <div className="text-sm inline-block py-1 px-2 rounded bg-purple-800 text-purple-300">featured</div>
      {children}
    </div>
  </Link>
);

export default FeaturedPost;
