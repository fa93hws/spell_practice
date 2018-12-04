import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import wordApis from '@/utils/api/word-api';
import { WordItemModel } from '@/utils/models/word-item';
import { WordListModel } from '@/utils/models/word-list';
import useTextInput from '@/utils/hooks/text-input';
import globalStore from '@/store';
import ListTable from './list-table';
import styles from './styles.less';

function AddWordSection() {
  const [text, setText] = useTextInput('');
  const [list, setList] = globalStore.useState<WordListModel>('word-list');

  function addWords() {
    const newWords = text.split('\r').join('').split('\n').map(s => new WordItemModel(s));
    list.addWords(newWords);
    setList(new WordListModel(list.items));
    wordApis.saveToStorage(list);
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
        className={styles.title}
      >
          Word List
      </Typography>
      <Paper className={styles.body}>
        <AddWordSection />
        <ListTable />
      </Paper>
    </main>
  );
}