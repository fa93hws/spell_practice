import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import styles from './styles.less';

export default function Home() {
  return (
    <main>
      <Typography
        variant="h2"
        gutterBottom
        component="h1"
      >
        About
      </Typography>
      <Divider />
      <Paper component="article" className={styles.container}>
        <section>
          <Typography component="p" variant="body1">
            It is designed to improve the spelling.
            Fill the words that you are not familiar with into the word list and practice!
          </Typography>
        </section>
      </Paper>
    </main>
  );
}