import * as Mock from 'mockjs';

import WordItemModel from '../word-item';
import WordRepository from '../word-repo';

import { StorageFormatType } from '../../interfaces';

function getDemoList(len: number, wordGenerator: () => string) {
  return new Array(len).fill(0).map(() =>
    new WordItemModel(wordGenerator())
  );
}

describe('word-list', () => {
  it('constructor', () => {
    const words = getDemoList(10, Mock.Random.word);
    const list = new WordRepository(words);
    expect(words).toEqual(list.items);
  });

  it('has word', () => {
    const wordGenerator = () => Mock.Random.word(5, 6);
    const words = getDemoList(100, wordGenerator);
    const list = new WordRepository(words);
    words.forEach(w => {
      expect(list.hasWord(w.spell)).toEqual(true);
    });
    for (let i = 0; i < 100; i ++)
      expect(list.hasWord(Mock.Random.word(1, 3))).toEqual(false);
  });

  it('add words', () => {
    const origLen = Mock.Random.natural(10, 100);
    const wordGenerator = () => Mock.Random.word(5, 6);
    const words = getDemoList(origLen, wordGenerator);
    const list = new WordRepository(words);
    const newSpells = new Array(100).fill(0).map(() =>
      Mock.Random.word(1, 3)
    );
    let newWords = Array.from(newSpells).map(s => new WordItemModel(s));
    // ignore duplicated
    const addedLen = Array.from(new Set(newSpells)).length;
    newWords = newWords.concat(list.items);
    list.addWords(newWords);
    expect(list.length).toEqual(origLen + addedLen);
  });

  it('to storage', () => {
    const words = getDemoList(100, Mock.Random.word);
    const list = new WordRepository(words);
    // toStorageFormat is private
    const out = (list as any).toStorageFormat();
    words.forEach((w, idx) => {
      expect(out[idx]).toEqual([w.spell, w.numTried, w.numWrong, w.timeAdded]);
    });
  });

  it('read storage', () => {
    const raw: ReadonlyArray<StorageFormatType> = [
      ['aaa', 10, 0, '1980-07-08'],
      ['bbb', 20, 1, '2018-09-12']
    ];
    const list = WordRepository.retrieveFromStorageFormat(raw);
    expect(list.items[0].spell).toEqual('aaa');
    expect(list.items[1].spell).toEqual('bbb');
  });

  it('sort', () => {
    const words = new Array(20).fill(0).map(() => 
      new WordItemModel(
        Mock.Random.word(),
        Mock.Random.natural(),
        Mock.Random.natural(),
        Mock.Random.date('yyyy-mm-dd')
      )
    );
    const list = new WordRepository(words);
    list.stableSort('spell', 'desc');
    for (let i = 1; i < list.length; i++)
      expect(list.items[i].spell <= list.items[i-1].spell).toEqual(true);
    list.stableSort('timeAdded', 'asc');
    for (let i = 1; i < list.length; i++)
      expect(list.items[i].timeAdded >= list.items[i-1].timeAdded).toEqual(true);
    list.stableSort('accuracy', 'desc');
    for (let i = 1; i < list.length; i++)
      expect(list.items[i].accuracy <= list.items[i].accuracy).toEqual(true);
  });

  it('generate random list', () => {
    const spell = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    const words = spell.map(s => new WordItemModel(s));
    const repo = new WordRepository(words);
    let list = repo.generateRandomList(20);
    expect(list.words.length).toEqual(spell.length);
    spell.forEach(s => {
      expect(list.words.findIndex(w => w.spell === s)).toBeGreaterThanOrEqual(0);
    });

    list = repo.generateRandomList(2);
    expect(list.words.length).toEqual(2);
  });
});