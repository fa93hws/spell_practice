import bindthis from '../decorators/bindthis';
import WordItemModel from './word-item';

import { IPracticeList, IWordRepository } from '../interfaces';

export default class WordListModel implements IPracticeList {
  constructor(public words: WordItemModel[], public repo: IWordRepository) {}

  @bindthis public pickRandomly(): WordItemModel {
    const idx = Math.floor(Math.random() * this.words.length);
    // console.log(idx);
    return this.words[idx];
  }
  @bindthis public removeWord(spell: string): void {
    this.words = this.words.filter(w => w.spell !== spell);
    this.repo.removeWord(spell);
    setTimeout(this.repo.saveToStorage);
  }
  @bindthis public saveToStorage(): void {
    setTimeout(this.repo.saveToStorage);
  }
}
