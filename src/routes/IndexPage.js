import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import Template from '../components/layout/TemplateBody'
import { Carousel } from 'antd';
import ReactImageFallback from "react-image-fallback";


function IndexPage({ location }) {
  return (
   <Template location={location}> 
    <div className={styles.normal}>
        <Carousel className={styles.imageSlide}>
             <div>
              <ReactImageFallback
                src='http://www.ashford.com/images/promos/2013/February/desktop-shorthero-primary-08-14-HE-EN.jpg'
                fallbackImage={require('../assets/yay.jpg')}
                initialImage={require('../assets/loading.gif')}
                alt="Product Image1"
                />
              </div>
              <div>
                <ReactImageFallback
                src='http://www.ashford.com/images/promos/2013/February/desktop-shorthero-primary-08-14-HE-EN.jpg'
                fallbackImage={require('../assets/yay.jpg')}
                initialImage={require('../assets/loading.gif')}
                alt="Product Image2"
                />
              </div>
      </Carousel>
    </div>
  </Template>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
