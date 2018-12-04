import React from 'react';
import Typography from '@material-ui/core/Typography';

import styles from './styles.less';

export default function Home() {
  return (
    <main>
      <article>
        <section>
          <Typography
            variant="h2"
            gutterBottom
            component="h1"
            className={styles.title}
          >
            About
          </Typography>
          <Typography component="p" variant="body1">
            It is designed to improve the spelling.
            Fill the words that you are not familiar with into the word list and practice!
          </Typography>
        </section>
      </article>
    </main>
  );
}