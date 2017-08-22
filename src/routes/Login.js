import React from 'react';
import { connect } from 'dva';
import styles from './Login.css';
import Template from '../components/layout/TemplateBody'
import LoginWidget from '../components/widgets/Login'


function Login() {
  return (
    <Template location={location}> 
    <div className={styles.normal}>
       <LoginWidget/>
    </div>
  </Template>
  );
}


export default Login;
