import React from 'react';
import { connect } from 'dva';
import styles from './Navigations.css';

function Navigations() {
  return (
    <div className={styles.normal}>
      Route Component: Navigations
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Navigations);
