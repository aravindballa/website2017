import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { colors } from '../utils/theme';

export const StyledLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;

const StyledFeatPost = styled.div`
  padding: 16px;
  border: 1px solid ${colors.background};
  background-color: ${colors.gray700};
  border-radius: 8px;

  &:hover {
    border-color: ${colors.text};
  }

  h3 {
    margin: 8px 0;
  }
  p {
    margin: 8px 0;
  }
`;

const Tag = styled.div`
  font-size: 16px;
  background-color: ${colors.purple};
  display: inline;
  padding: 4px 8px;
  border-radius: 4px;
`;

const FeaturedPost = ({ link, children }) => (
  <StyledLink to={link}>
    <StyledFeatPost>
      <Tag>featured</Tag>
      {children}
    </StyledFeatPost>
  </StyledLink>
);

export default FeaturedPost;
