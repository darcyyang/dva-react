import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import Template from '../components/layout/TemplateBody'
import Facets from '../components/widgets/FacetsSideBar';
import ProductList from '../components/widgets/ProductList'
import { Layout } from 'antd';
const {Sider, Content } = Layout;

function Category({ dispatch, location }) {
  return (
    <Template location={location}>
      <Layout>
        <Sider><Facets /></Sider>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}><ProductList /></Content>
      </Layout>
    </Template>
  );
}

Category.propTypes = {
};

export default connect()(Category);
