import React from 'react';
import { Card, Col, Row } from 'antd';
import { connect } from 'dva';
import { Menu, Dropdown, Button, Icon, message } from 'antd';
import { Pagination } from 'antd';
import { Spin } from 'antd';
import ReactImageFallback from "react-image-fallback";
import styles from './ProductList.css';
import { routerRedux } from 'dva/router';
import { addQuery, removeQuery } from '../../utils/queryRouter';


function viewProductDetail(dispatch, url) {
  console.log('view product detail action')
  dispatch(routerRedux.push('/products/' + url));
}

function totalPageCount(productCount, pageSize) {
  const pages = parseInt(productCount / pageSize)
  if (pages == 0)
    return 1
  else
    return pages
}



const sortOptions = (productList) => {
  if (productList.products === undefined) {
    return (
      <Menu>
        <Menu.Item key="0">
          <a href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
      </Menu>)
  }
  return (
    <Menu>
      {productList.products.sortOptions.map((sortOption, i) =>
        <Menu.Item key={sortOption.restURL}><a href={'/category/' + sortOption.restURL}>{sortOption.label}</a></Menu.Item>
      )}
    </Menu>
  )

}



function ProductList({ dispatch, productList, loading }) {
  
  return (

    <div className={styles.normal}>
      {loading ?
        <div className={styles.exampleSpin}>
          <Spin />
        </div>
        :
        <div>
        {
          productList.products === undefined? 'Loading Error' :
            <div>
            <Row>
            <Col className={styles.sortby}>
              <Dropdown.Button overlay={sortOptions(productList)} style={{ marginLeft: '8.33333333%' }}>
                Sort Options
          </Dropdown.Button>
            </Col>
            <Col className={styles.pagnation}>
              <Pagination 
                className={styles.topPagination}
                pageSize={productList.products.pageSize}
                current={productList.products.currentPage}
                total={productList.products.productCount}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                style={{ marginLeft: '8.33333333%' }} 
                onChange={(page, pageSize)=>{addQuery({ currentPage: page })}}/>
            </Col>
          </Row>
          {
            productList.products === undefined ?
              null
              :
              <Row>
                {productList.products.productList.map((productItem, i) =>
                  <Col style={{ width: 240, padding: 0 }} xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                    <Card title={productItem.brandName} bordered={true} className={styles.antcard}>
                      <div>
                        <ReactImageFallback
                          src={productItem.images[0]}
                          fallbackImage={require('../../assets/yay.jpg')}
                          initialImage={require('../../assets/loading.gif')}
                          alt="cool image should be here"
                          className={styles.productListImage} />
                      </div>
                      <div className="custom-card">
                        <h3>{productItem.brandName}</h3>
                        <p>{productItem.productName}</p>
                        <p className="product-price">Retail Price: $ {productItem.priceRetail}</p>
                        <p className="product-price">Sales Price : $ {productItem.priceCurrent}</p>
                        <p className="product-price">Saving for : $ {productItem.discount}</p>
                        <Button className={styles.viewDetail} onClick={() => viewProductDetail(dispatch, productItem.restURL)}>View Detail</Button>
                      </div>
                    </Card>
                  </Col>
                )}
              </Row>
          }
          <Row>
            <Pagination pageSize={productList.products.pageSize}
              current={productList.products.currentPage}
              total={productList.products.productCount}
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
              style={{ marginLeft: '8.33333333%' }} 
              onChange={(page, pageSize)=>{addQuery({ currentPage: page })}}
              />
          </Row>
          </div>
        }
       
        </div>
      }
    </div>
  );
}
const mapStateToProps = (state) => ({
  productList: state.productList,
  loading: state.loading.models.productList
})

export default connect(mapStateToProps)(ProductList);