import React from 'react';
import styles from './Header.css';
import { connect } from 'dva';
import TopNav from "../widgets/TopNav"
import Login from '../widgets/Login'
import SearchBox from '../widgets/SearchBox'

import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import { Spin } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function digestNavigationData(rawNavigation) {
  if (rawNavigation.navigation !== undefined && rawNavigation.navigation !== "") {
    // const category = JSON.parse(rawNavigation.navigation);
    return rawNavigation.navigation;
  } else {
    return [];
  }
}

function renderSubItem(item) {
  if (item.subCategories !== undefined && item.subCategories !== "" && item.subCategories.length > 0 && item.subCategories[0].catItems.length > 0) {
    return (
      item.subCategories[0].catItems.map((item, index) => {
        return (
          <Menu.Item key={item.label}>
            <Link to={'/category/' + item.restURL} activeClassName="active"> {item.label}</Link>
          </Menu.Item>
        )
      }
      )
    )
  }
  else {
    return null
  }

}

function renderCategoryitem(category) {
  // let listItems = <div></div>
  if (category !== undefined && category.length > 0) {
    return (
      category.map((item, index) => {
        return (
          <SubMenu title={item.categoryName} key={item.categoryName} onTitleClick={() => { window.location = '/#/category/' + item.restURL }}>
            {
              renderSubItem(item)
            }
          </SubMenu>
        )
      }
      )
    )
  }
  return null
}

function showLoading(loading) {
  if (loading) {
    return <Spin />
  }
  return null
}



function Header({ dispatch, category, location, loading }) {
  // const categorySource = digestNavigationData(category)
  console.log('loading ' + loading)

  return (

    < div >

      {showLoading(loading)}
      {console.log(location.pathname)}

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
    </div >
  );
}

const mapStateToProps = (state) => ({
  category: state.category,
  loading: state.loading.models.category
})

export default connect(mapStateToProps)(Header);

