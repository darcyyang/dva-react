import React from 'react';
import styles from './SearchBox.css';
import { Menu, Icon} from 'antd';

function SearchBox() {
  return (

      <Menu.Item key="/search" style={{'float':'right'}}>
        <a href="#">searchbox here</a>
      </Menu.Item>
  );
}

export default SearchBox;
