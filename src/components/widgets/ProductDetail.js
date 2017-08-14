import React from 'react';
import styles from './ProductDetail.css';
import { connect } from 'dva';
import { Spin } from 'antd';
import { Card, Col, Row } from 'antd';
import { Carousel } from 'antd';


const showDefault = (e)=>{
  console.log(e);
  console.log(e);
  
}

function ProductDetail({productDetail, loading}) {
  return (
    <div className={styles.normal}>
      {
        loading ? <Spin /> :
        <div id="product-details">
          {
            !productDetail.success?null:
            <Row gutter={24}>
              <Col span={6} >
                  <Carousel>
                    <div><img src={productDetail.result.productInfo.productLargeUrl} onError={showDefault(this)}/></div>
                    <div><img src={productDetail.result.productInfo.productLargeUrl} onError={showDefault(this)}/></div>
                    <div><h3>3</h3></div>
                    <div><h3>4</h3></div>
                  </Carousel>
                  {/* <div className="additional-images">
                      <a href="{#images.imageSet.largeImage.srcValue}" rel="lightbox[slides]" title="{#product.productName}">
                          <img src={productDetail.result.productInfo.productLargeUrl} onerror='/static/yay.44dd3333.jpg'/>
                      </a>
                  </div> */}
              </Col>
              <Col span={18}>
              <h1>{productDetail.result.productInfo.brandName} - {productDetail.result.productInfo.productName} </h1>
              <p>{productDetail.result.productInfo.productDescription}</p>
              <div id="product-price">
                          <p>Our Price :  $ {productDetail.result.productInfo.skuInfo.ourPrice}</p>
                          <p>List Price : $ {productDetail.result.productInfo.skuInfo.listPrice}</p>
                          <p>Saving Desct : {productDetail.result.productInfo.skuInfo.savingsDesc}</p>
              </div>
              <input type="submit" name="submit" value="Add to Cart" />
              <b>SKU: #{productDetail.result.productInfo.skuInfo.skuId}</b>
              </Col>
            </Row>
          }
        </div>
      }
      </div>
      
  );
}

const mapStateToProps = (state) => ({
  productDetail: state.productDetail,
  loading: state.loading.models.productDetail
})


export default connect(mapStateToProps)(ProductDetail);
