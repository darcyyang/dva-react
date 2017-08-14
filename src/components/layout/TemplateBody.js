import React from 'react';
import styles from './TemplateBody.css';
import ASHHeader from '../global/Header';
import ASHFooter from '../global/Footer';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

function TemplateBody({ children, location }) {
  return (
    <Layout>
      <Header><ASHHeader location={location}/></Header>
      <Layout style={{ padding: '0 24px 24px' }}>
        {children}
      </Layout>
      <Footer><ASHFooter/></Footer>
    </Layout>
  );
}

export default TemplateBody;
