import React from 'react';
import styles from './Products.css';

import Template from '../components/layout/TemplateBody'
import ProductDetail from '../components/widgets/ProductDetail'
import { Layout } from 'antd';
const { Content } = Layout;

function Products({ location }) {
  return (
    <Template location={location}>
      <Layout style={{marginTop: 20}}>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}><ProductDetail /></Content>
      </Layout>
    </Template>
  );
}


export default Products;



