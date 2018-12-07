import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import styles from './styles.less';

export default function NotFoundPage() {
  return (
    <main>
      <Typography
          variant="h2"
          component="h1"
        >
          Error 404
      </Typography>
      <Divider />
      <Paper component="article" className={styles.body}>

        <Typography component="p" variant="body1">
          There is nothing here
        </Typography>
      </Paper>
    </main>
  );
}