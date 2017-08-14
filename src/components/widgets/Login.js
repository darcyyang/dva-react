import React from 'react';
import styles from './Login.css';
import { Menu, Icon} from 'antd';

function Login() {
  return (
      <Menu.Item key="/login" style={{'float':'right'}}>
        <a href="#">login</a>
      </Menu.Item>
  );
}

export default Login;
