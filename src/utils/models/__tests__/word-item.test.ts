import * as Mock from 'mockjs';

import WordItemModel from '../word-item';

describe('word-item', () => {
  it('constructor', () => {
    const spell = Mock.Random.word();
    const word = new WordItemModel(spell);
    const today = (new Date()).toISOString().split('T')[0];
    expect(word.spell).toEqual(spell);
    expect(word.numTried).toEqual(0);
    expect(word.numCorrect).toEqual(0);
    expect(word.numWrong).toEqual(0);
    expect(word.timeAdded).toEqual(today);
  });

  it('calculation of numWrong', () => {
    const numCorrect = Mock.Random.natural();
    const numTried = Mock.Random.natural(numCorrect);
    const word = new WordItemModel('test', numTried, numCorrect);
    expect(word.numWrong).toEqual(numTried - numCorrect);
  });
});