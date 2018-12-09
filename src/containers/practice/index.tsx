import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import useTextInput from '@/utils/hooks/text-input';
import { assertNull, assertUndefined } from '@/utils/throw-error';
import voice from '@/assets/js/responsivevoice';
import wordApis from '@/utils/api/word-api';
import styles from './styles.less';

import { IWordDetail, IComparable, IPracticeList, IWordRepository } from '@/utils/interfaces';

type IPracticeWord = IComparable<string> & IWordDetail

function PracticeList({ list }: { list: IPracticeList }) {
  const [word, setWord] = useState<IPracticeWord>(list.words[0]);
  const [totalCount, setTotalCount] = useState(0);
  const [numCorrect, setNumCorrect] = useState(0);
  const [spell, setSpell, setSpellDirectly] = useTextInput('');
  const [explanation, setExplanation] = useState('');
  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  // register shortcuts
  useEffect(() => {
    function handler(ev: KeyboardEvent) {
      if (ev.key !== 'Enter') return;
      // ctrl + enter, show answer
      if (ev.ctrlKey && !ev.altKey) showAnswer();
      // alt + enter, read again
      if (ev.altKey && ! ev.ctrlKey) voice.speak(word.spell, 'US English Female');
    }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [word.spell]);
  
  // read the word
  useEffect(() => {
    setTimeout(() => voice.speak(word.spell, 'US English Female'));
    return () => list.saveToStorage();
  }, [word, word.numTried, list]);

  // end of hooks
  assertUndefined(word, 'word', 'list can not be empty');

  function showAnswer() {
    setIsAnswerShown(true);
    word.compareTo('');
    wordApis.getTranslation(word.spell).then(setExplanation).catch(err => {
      console.error(err);
      setExplanation('Error in getting translation');
    });
  }

  function nextWord() {
    assertNull(list, 'list');
    setIsWrong(false);
    setIsAnswerShown(false);
    setExplanation('');
    setSpellDirectly('');
    const newWord = list!.pickRandomly();
    setWord(newWord);
    setTotalCount(totalCount + 1);
  }
  // handle submit
  function onKeyPress(ev: React.KeyboardEvent<HTMLInputElement>) {
    if (ev.key !== 'Enter' || ev.ctrlKey || ev.altKey) return;
    setSpellDirectly('');
    if (word.compareTo(spell) === 0) {
      nextWord();
      if (isAnswerShown) word.numCorrect--;
      else if (!isWrong) setNumCorrect(numCorrect + 1)
    }
    else if (isWrong === false) setIsWrong(true);
  }

  // handle removing
  function onRemoveClicked() {
    assertNull(list, 'list');
    list!.removeWord(word.spell);
    nextWord();
  }

  return (
    <React.Fragment>
      <Typography variant="body1" component="p">
        Accuracy: {numCorrect} out of {totalCount}
      </Typography>
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
          {explanation===''?'...':`(${explanation})`}
        </Typography>
      </div>
    </React.Fragment>
  );
}

function PracticeForm({ repo }: { repo: IWordRepository }) {
  const [list, setList] = useState<IPracticeList | null>(null);

  // generate list on mounted
  useEffect(() => {
    setList(repo.generateRandomList(20));
  }, []);

  return (
    <section className={styles.form}>
    {
      list === null?
      null:
      <PracticeList list={list}/>
    }
    </section>
  );
}

export default function PracticePage() {
  const [repo, setRepo] = useState<IWordRepository | null>(null);
  useEffect(() => {
    wordApis.loadRepo().then(setRepo).catch(console.error);
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
          repo === null ?
          null:
          <PracticeForm repo={repo} />
        }
      </Paper>
    </main>
  );
}