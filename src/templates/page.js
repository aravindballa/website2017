import React from 'react';
import Layout from '../components/Layout';

export default function DefaultLayout({ children, pageContext, location }) {
  return (
    <Layout location={location}>
      <div className="flex-1">{children}</div>
    </Layout>
  );
}
