import React from 'react';
import styles from './ProductList.css';
import { Card, Col, Row } from 'antd';
import { connect } from 'dva';
import { Menu, Dropdown, Button, Icon, message } from 'antd';
import { Pagination } from 'antd';
import { Spin } from 'antd';

const onChange = (page) => {
  console.log(page);
  this.setState({
    current: page,
  });
}

function handleButtonClick(e) {
  message.info('Click on left button.');
  console.log('click left button', e);
}

function handleMenuClick(e) {
  message.info('Click on menu item.');
  window.location = e.key
  console.log('click', e);
}

const sortOptions = (productList) => {
  if (productList.products === undefined) {
    return (<Menu onClick={handleMenuClick}>
      <Menu.Item key="0">
        <a href="http://www.alipay.com/">1st menu item</a>
      </Menu.Item>          </Menu>)
  }
  return (
    <Menu onClick={handleMenuClick}>
      {productList.products.sortOptions.map((sortOption, i) =>
        <Menu.Item key={sortOption.restURL}>{sortOption.label}</Menu.Item>
      )}
    </Menu>
  )

}




function ProductList({ dispatch, productList, loading }) {
  return (

    <div className={styles.normal}>
      {loading ?
        <div className="example-spin">
          <Spin />
        </div>
        :
        <div>
          <div>
            <Dropdown.Button onClick={handleButtonClick} overlay={sortOptions(productList)} style={{ marginLeft: '8.33333333%' }}>
              Sort Options
          </Dropdown.Button>
          </div>
          {
            productList.products === undefined ?
              null
              :
              <Row>
                {productList.products.productList.map((productItem, i) =>
                  <Col style={{ width: 240, padding: 0  }} xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                    <Card title="Card title" bordered={false}>
                      <div className="custom-image">
                        <img alt="example" width="100%" src={productItem.images[0]} />
                      </div>
                      <div className="custom-card">
                        <h3>{productItem.brandName}</h3>
                        <p>{productItem.productName}</p>
                        <p className="product-price">Retail Price: $ {productItem.priceRetail}</p>
                        <p className="product-price">Sales Price : $ {productItem.priceCurrent}</p>
                        <p className="product-price">Saving for : $ {productItem.discount}</p>
                      </div>
                    </Card>
                  </Col>
                )}
              </Row>
          }
          <Row>
            <Pagination current={3} onChange={onChange} total={50} style={{ marginLeft: '8.33333333%' }} />
          </Row>
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