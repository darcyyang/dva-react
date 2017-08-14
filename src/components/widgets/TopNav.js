import React from 'react';
import styles from './TopNav.css';
import { Menu, Icon} from 'antd';
import { Link } from 'dva/router';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function TopNav() {
  // const SubMenu = Menu.SubMenu;
  // const MenuItemGroup = Menu.ItemGroup;

  return (
       <SubMenu title={<span><Icon type="setting" />Navigation Three - Submenu</span>}>
          <MenuItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
  );
}

export default TopNav;
