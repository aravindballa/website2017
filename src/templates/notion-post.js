import React from 'react';
import Layout from '../components/Layout';

import { NotionRenderer } from 'react-notion';

export default function DefaultLayout({ children, pageContext, location }) {
  return (
    <Layout location={location}>
      <div className="flex-1">
        <NotionRenderer blockMap={pageContext.blocks} />
      </div>
    </Layout>
  );
}
