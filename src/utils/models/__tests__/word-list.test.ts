import * as Mock from 'mockjs';

import { WordItemModel } from '../word-item';
import { WordListModel, StorageFormatType } from '../word-list';

function getDemoList(len: number, wordGenerator: () => string) {
  return new Array(len).fill(0).map(() =>
    new WordItemModel(wordGenerator())
  );
}

describe('word-list', () => {
  it('constructor', () => {
    const words = getDemoList(10, Mock.Random.word);
    const list = new WordListModel(words);
    expect(words).toEqual(list.items);
  });

  it('has word', () => {
    const wordGenerator = () => Mock.Random.word(5, 6);
    const words = getDemoList(100, wordGenerator);
    const list = new WordListModel(words);
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
    const list = new WordListModel(words);
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
    const list = new WordListModel(words);
    const out = list.toStorageFormat();
    words.forEach((w, idx) => {
      expect(out[idx]).toEqual([w.spell, w.numTried, w.numWrong, w.timeAdded]);
    });
  });

  it('read storage', () => {
    const raw: ReadonlyArray<StorageFormatType> = [
      ['aaa', 10, 0, '1980-07-08'],
      ['bbb', 20, 1, '2018-09-12']
    ];
    const list = WordListModel.retrieveFromStorageFormat(raw);
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
    const list = new WordListModel(words);
    list.StableSort('spell', 'desc');
    for (let i = 1; i < list.length; i++)
      expect(list.items[i].spell >= list.items[i-1].spell).toEqual(true);
    list.StableSort('timeAdded', 'asc');
    for (let i = 1; i < list.length; i++)
      expect(list.items[i].timeAdded <= list.items[i-1].timeAdded).toEqual(true);
    list.StableSort('accuracy', 'desc');
    for (let i = 1; i < list.length; i++)
      expect(list.items[i].accuracy >= list.items[i].accuracy).toEqual(true);
  });
});