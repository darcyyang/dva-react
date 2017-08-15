import React from 'react';
import styles from './Header.css';
import { connect } from 'dva';

import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import { Spin } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;



function renderCategoryitem(category) {
  if (category !== undefined && category.length > 0) {
    return (
      category.map((item, index) => {
        return (
          <SubMenu title={item.label} key={item.label} onTitleClick={() => { window.location = '/category/' + item.restURL }}>
            {
              item.subCategories !== undefined && item.subCategories !== "" && item.subCategories.length > 0 && item.subCategories[0].catItems.length > 0 ?
                item.subCategories[0].catItems.map((item, index) => {
                  return (
                    <Menu.Item key={item.label}>
                      <Link to={'/category/' + item.restURL} activeClassName="active"> {item.label}</Link>
                    </Menu.Item>
                  )
                }
                )
                : null
            }
          </SubMenu>
        )
      }
      )
    )
  }
  return null
}



function Header({ dispatch, category, location, loading }) {

  return (
    < div >
      {loading ? <Spin /> :
        <Menu
          selectedKeys={[location.pathname]}
          mode="horizontal"
          theme="dark"
        >
          {renderCategoryitem(category.navigation)}

          <Menu.Item key="/antd">
            <a href="https://ant.design/docs/react/introduce" target="_blank">ANtd Doc</a>
          </Menu.Item>
          <Menu.Item key="login" style={{ 'float': 'right' }}>
            <Link to={'/login/'} activeClassName="active">login</Link>
          </Menu.Item>
          <Menu.Item key="search" style={{ 'float': 'right' }}>
            <Link to={'/search/'} activeClassName="active">searchbox here</Link>
          </Menu.Item>
        </Menu>
      }
    </div >
  );
}

const mapStateToProps = (state) => ({
  category: state.category,
  loading: state.loading.models.category
})

export default connect(mapStateToProps)(Header);

