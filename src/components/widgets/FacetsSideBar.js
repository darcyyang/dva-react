import React from 'react';
import styles from './FacetsSideBar.css';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import { Spin, Alert } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Checkbox } from 'antd';

function selectFacet(dispatch,url){
  dispatch(routerRedux.push('/category/'+url));
  
}

function FacetsSideBar({ dispatch, productList, loading }) {
  return (
    <div className={styles.normal}>
      {loading ?
        <Spin tip="Loading...">
        </Spin>
        :
        <Menu
          style={{ width: 200 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
        >
          {
            productList.facetGroups === undefined ?null:
              productList.facetGroups.map((facetGroup, index) => {
                return <SubMenu key={facetGroup.facetName} title={facetGroup.facetName}>
                  {
                    facetGroup.facetValues.map((facet, index) => {
                      return <Menu.Item key={facet.restURL}><Checkbox onChange={()=>{selectFacet(dispatch,facet.restURL)}} checked={facet.selected}>{facet.label} -{facet.selected} ({facet.count})</Checkbox></Menu.Item>
                    })
                  }
                </SubMenu>
              })
          }
        </Menu>
      }
    </div>
  );
}

const mapStateToProps = (state) => ({
  productList: state.productList,
  loading: state.loading.models.productList
})

export default connect(mapStateToProps)(FacetsSideBar);
