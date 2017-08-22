import React from 'react';
import styles from './Header.css';
import { connect } from 'dva';

import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import { Spin } from 'antd';
import { withCookies, Cookies } from 'react-cookie';

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

function handleLogout(){

}


function Header({ dispatch, category, location, loading, cookies,user }) {
  const firstname = cookies.get("firstname")
  const lastname = cookies.get("lastname")
  let logined = false;
  firstname !== undefined && lastname !== undefined ? logined = true : logined == false
  return (
    < div className={styles.normal}>
      {loading ? <Spin /> :
        <Menu
          selectedKeys={[location.pathname]}
          mode="horizontal"
          theme="dark"
        >
          <Menu.Item key="/logo">
            <img data-feo-orig-src="/images/ashford/footer-logo.png" src="http://2.shrd.zh.ashford.com.edgekey.net/q/n/EoxwZLesA.webp" width="121" height="41" alt="页脚徽标" />
          </Menu.Item>
          {renderCategoryitem(category.navigation)}

          <Menu.Item key="/antd">
            <a href="https://ant.design/docs/react/introduce" target="_blank" className={styles.highlightText}>ANtd Doc</a>
          </Menu.Item>
          {
            logined ? (
              <Menu.Item key="login" style={{ 'float': 'right' }}>
                Welcome {firstname} {lastname} ! <Link onClick={()=>{dispatch({ type: 'users/logout'})}} activeClassName="active" >logout</Link>
              </Menu.Item>
            )
              : (
                <Menu.Item key="login" style={{ 'float': 'right' }}>
                  <Link to={'/login/'} activeClassName="active">{logined ? 'Welcome ' + firstname + ' ' + lastname + '! ' : 'login'}</Link>
                </Menu.Item>
              )
          }

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
  user: state.users,
  loading: state.loading.models.category
})

export default withCookies(connect(mapStateToProps)(Header));

