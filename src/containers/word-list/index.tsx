import React from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import WordItemModel from '@/utils/models/word-item';
import WordRepository from '@/utils/models/word-repo';
import useTextInput from '@/utils/hooks/text-input';
import globalStore from '@/store';
import ListTable from './list-table';
import styles from './styles.less';

import { IWordRepository } from '@/utils/interfaces';

function AddWordSection() {
  const [text, setText, setTextDirectly] = useTextInput('');
  const [repo, setRepo] = globalStore.useState<IWordRepository>('word-repo');

  function addWords() {
    const newWords = text.split('\r').join('').split('\n').map(s => new WordItemModel(s));
    repo.addWords(newWords);
    setRepo(new WordRepository(repo.items));
    repo.saveToStorage();
    setTextDirectly('');
  }

  return (
    <section className={styles.addSection}>
      <Typography component="h2" variant="h6" gutterBottom>
        Add New Words
      </Typography>
      <TextField
        rows="15"
        multiline
        value={text}
        onChange={setText}
        variant="outlined"
        helperText="words are separated by new line"
      />
      <Button
        color="primary"
        onClick={addWords}
        variant="contained"
        className={styles.button}
      >
        Add
      </Button>
    </section>
  );
}

export default function WordList() {
  return (
    <main>
      <Typography
        variant="h2"
        gutterBottom
        component="h1"
      >
          Word List
      </Typography>
      <Divider />
      <Paper className={styles.body}>
        <AddWordSection />
        <ListTable />
      </Paper>
    </main>
  );
}