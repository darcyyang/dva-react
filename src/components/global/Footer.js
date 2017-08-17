import React from 'react';
import styles from './Footer.css';

function Footer() {
  return (
    <div className={styles.normal}>
      <div className="new-footer">
        <div className="new-footer-inner">
          <div className="new-footer-nav-wrapper col-sm-12 col-xs-12">
            <p>
              <img width="100%" height="35" src={require('../../assets/footerSep.png')} className="af-sep-hor" />
            </p>
            <h1>Ashford Luxury Watches</h1>
            <p style={{ color: 'white' }}>Watches for sale at Ashford.com are shipped with a reputation for integrity and superiority in the world of luxury watches. We at Ashford.com strive to make your purchase – whether it is for a watch on clearance or of an authentic luxury watch - as simple and hassle free as possible. We stock many different luxury watch brands such as the classic Movado Watches, as well as a huge selection of leading brands like Calvin Klein, Seiko, Fossil, Balmain, and many more!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
