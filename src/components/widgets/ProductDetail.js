import React from 'react';
import styles from './ProductDetail.css';
import { connect } from 'dva';
import { Spin, Button } from 'antd';
import { Card, Col, Row } from 'antd';
import { Carousel } from 'antd';
import ReactImageFallback from "react-image-fallback";
import { Breadcrumb } from 'antd';


function showCarousel(productDetail){
  return (
    <Carousel>
      {
        productDetail.productAuxiliaryMedias.map((image, i) => (
          <div>
            <ReactImageFallback
              src={image.imageZoomUrl}
              fallbackImage={require('../../assets/yay.jpg')}
              initialImage={require('../../assets/loading.gif')}
              alt="Product Image"
              className={styles.productImage} />
          </div>
        )
        )
        }
    </Carousel>)
}

function showProductPrice(price){

}

function showBreakCrumb(productInfo){
  return (
  <Breadcrumb>{
    productInfo.breadcrumbs.map((item,i) => (
      <Breadcrumb.Item><a href={item.url}>{item.name}</a></Breadcrumb.Item>
    ))
  }
  </Breadcrumb>

)
}

function preCheckProductDetailInfo(productDetailInfo){ 
  if (productDetailInfo.success === undefined || productDetailInfo.result === undefined || productDetailInfo.result.productInfo === undefined){
    return  undefined
  }
  if (productDetailInfo.success === false){
    return 'error'
  }
  return productDetailInfo.result.productInfo
}

function preCheckPriceInfo(priceInfo){
  return priceInfo.success === undefined || priceInfo.result === undefined || priceInfo.result === undefined ? 
        undefined : priceInfo.success ===false ? 
          'error' : priceInfo.result
}


function ProductDetail({ productDetailInfo,priceInfo, loading }) {
  const productInfo = preCheckProductDetailInfo(productDetailInfo)
  const price = preCheckPriceInfo(priceInfo)
  if (productInfo === 'error'){
    return  <div><h1>Error on product detail request</h1></div>
  }
  if (productInfo === undefined){
    return  <Spin />
  }
  return (
    <div className={styles.normal}>
      {
        loading ? <Spin /> :
          <div className={styles.productDetails}>
            {
                <Row gutter={24}>
                  {showBreakCrumb(productInfo)}
                  <Col span={6} >
                    {showCarousel(productInfo)}
                  </Col>
                  <Col span={18}>
                    <h1>{productInfo.brandName}  </h1>
                    <b>SKU: #{productInfo.skuInfo.skuId}</b>

                    <h1>{productInfo.productName}</h1>
                    <p>{productInfo.productDescription}</p>
                    <li className="warranty_1">{
                    productInfo.warrantyItems.map((warrantyItem,id) => (
                      <img 
                           src={warrantyItem.imagePath}
                           />
                    ))
                  }
                    </li>
                    <div>
                      <p className={styles.productNormalPrice}>{price.retailPrice.label} :  $ {price.retailPrice.amount}</p>
                      <p className={styles.productNormalPrice}>{price.savingPrice.label} : $ {price.savingPrice.savingAmount}</p>
                      <p className={styles.productPrice}>{price.ourPrice.label} : $ {price.ourPrice.amount}</p>
                    </div>
                    <p><Button type="primary">ADD TO CART</Button></p>
                  </Col>
                </Row>
            }
          </div>
      }
    </div>

  );
}

const mapStateToProps = (state) => ({
  productDetailInfo: state.productDetail.productDetail,
  priceInfo: state.productDetail.price,
  loading: state.loading.models.productDetail
})


export default connect(mapStateToProps)(ProductDetail);
