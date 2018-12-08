import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import useTextInput from '@/utils/hooks/text-input';
import voice from '@/assets/js/responsivevoice';
import wordApis from '@/utils/api/word-api';
import styles from './styles.less';

export interface IPracticeWord {
  spell: string;
  numTried: number;
  numCorrect: number;
  accuracy: number;

  compare: (spell: string) => boolean;
}
export interface IPracticeList {
  pickRandomly: () => IPracticeWord;
  saveToStorage: () => void;
  removeWord: (spell: string) => void;
}

function PracticeForm({ list }: { list: IPracticeList }) {
  const [word, setWord] = useState<IPracticeWord>(list.pickRandomly());
  const [spell, setSpell, setSpellDirectly] = useTextInput('');
  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  // register shortcuts
  useEffect(() => {
    function handler(ev: KeyboardEvent) {
      if (ev.key !== 'Enter') return;
      // ctrl + enter, show answer
      if (ev.ctrlKey) showAnswer();
      // alt + enter, read again
      if (ev.altKey) voice.speak(word.spell, 'US English Male');
    }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [word.spell]);

  // read the word
  useEffect(() => {
    voice.speak(word.spell, 'US English Male');
  }, [word, word.numTried]);

  function showAnswer() {
    setIsAnswerShown(true);
    word.compare('');
  }
  function nextWord() {
    setIsWrong(false);
    setIsAnswerShown(false);
    setWord(list.pickRandomly());      
  }
  // handle submit
  function onKeyPress(ev: React.KeyboardEvent<HTMLInputElement>) {
    if (ev.key !== 'Enter' || ev.ctrlKey || ev.altKey) return;
    setSpellDirectly('');
    if (word.compare(spell)) {
      nextWord();
      if (isAnswerShown) word.numCorrect--;
    }
    else setIsWrong(true);
    setTimeout(list.saveToStorage);
  }

  // handle removing
  function onRemoveClicked() {
    list.removeWord(word.spell);
    nextWord();
    setTimeout(list.saveToStorage);
  }

  return (
    <section className={styles.form}>
      {/* <Fab size="small" color="primary">
        <PlayIcon />
      </Fab> */}
      <div className={styles.spellInputWrapper}>
        <Typography
          variant="body2"
          component="span"
          className={styles.spellInstruction}
        >
          The word spelled correctly is
        </Typography>
        <TextField
          autoFocus
          value={spell}
          error={isWrong}
          spellCheck={false}
          onChange={setSpell}
          onKeyPress={onKeyPress}
        />
      </div>

      <div className={styles.toolBar}>
        <Button
          color="primary"
          variant="contained"
          onClick={onRemoveClicked}
        >
          Remove
        </Button>
        <Typography
          component="span"
          variant="body1"
        >
          Accuracy: {(word.accuracy * 100).toFixed(2)}% (Tried {word.numTried} times)
        </Typography>
        <Typography
          component="span"
          variant="body1"
          className={styles.answer+' ' + (isAnswerShown?styles.show:'')}
        >
          {word.spell.toLowerCase()}
        </Typography>
      </div>
    </section>
  );
}

export default function PracticePage() {
  const [list, setList] = useState<IPracticeList | null>(null);
  useEffect(() => {
    wordApis.loadList().then(setList).catch(console.error);
  }, []);

  return (
    <main>
      <Typography
        variant="h2"
        gutterBottom
        component="h1"
      >
        Practice
      </Typography>
      <Divider />
      <Paper
        component="article"
        className={styles.body}
      >
        <section className={styles.instruction}>
          <Typography variant="h6" component="h2">
            Shortcuts
          </Typography>
          <Typography
            component="p"
            variant="caption"
          >
            Enter = Confirm the spelling;<br/>
            Alt + Enter = Play Again; <br/>
            Ctrl + Enter = Show Answer; <br/>
          </Typography>
        </section>
        <Divider />
        {
          list === null ?
          null:
          <PracticeForm list={list} />
        }
      </Paper>
    </main>
  );
}