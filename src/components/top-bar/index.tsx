import React from 'react';
import AppBar from '@material-ui/core/AppBar';

import styles from './styles.less';

const TopBar = () => (
  <AppBar color="primary" position="static">
    <h1 className={styles.title}>
      Spell Practice
    </h1>
  </AppBar>
);

export default TopBar;