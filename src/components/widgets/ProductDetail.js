import React from 'react';
import styles from './ProductDetail.css';
import { connect } from 'dva';
import { Spin ,Button} from 'antd';
import { Card, Col, Row } from 'antd';
import { Carousel } from 'antd';
import ReactImageFallback from "react-image-fallback";



function ProductDetail({productDetail, loading}) {
  return (
    <div className={styles.normal}>
      {
        loading ? <Spin /> :
        <div className={styles.productDetails}>
          {
            !productDetail.success?
            <div><h1>Error on product detail request</h1></div>
            :
            <Row gutter={24}>
              <Col span={6} >
                  <Carousel>
                    <div> <ReactImageFallback
                          src={productDetail.result.productInfo.productLargeUrl}
                          fallbackImage="/static/yay.44dd3333.jpg"
                          initialImage="/static/yay.44dd3333.jpg"
                          alt="cool image should be here"
                          className={styles.productImage} /></div>
                    <div><ReactImageFallback
                          src={productDetail.result.productInfo.productLargeUrl}
                          fallbackImage="/static/yay.44dd3333.jpg"
                          initialImage="/static/yay.44dd3333.jpg"
                          alt="cool image should be here"
                          className={styles.productImage} /></div>
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
              <div className={styles.productPrice}>
                          <p>Our Price :  $ {productDetail.result.productInfo.skuInfo.ourPrice}</p>
                          <p>List Price : $ {productDetail.result.productInfo.skuInfo.listPrice}</p>
                          <p>Saving Desct : {productDetail.result.productInfo.skuInfo.savingsDesc}</p>
              </div>
              <p><Button type="primary">ADD TO CART</Button></p>
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
