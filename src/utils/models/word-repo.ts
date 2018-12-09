import WordItemModel from './word-item';
import WordListModel from './word-list';
import bindthis from '../decorators/bindthis';
import { getPagedItems } from './pageable';
import wordApis from '../api/word-api';

import {
  IWordDetail,
  IWordRepository,
  StorageFormatType
} from '../interfaces';

export default class WordRepository implements IWordRepository {
  static retrieveFromStorageFormat(raw: ReadonlyArray<StorageFormatType>): WordRepository {
    const words = raw.map(r => new WordItemModel(...r));
    return new WordRepository(words);
  }

  constructor(public items: WordItemModel[]) {}

  public get length() { return this.items.length; }

  // pagination
  @bindthis public getPagedItems(page: number, limit: number) {
    return getPagedItems(this.items, page, limit);
  }

  @bindthis public hasWord(spell: string) {
    return this.items.findIndex(i => i.spell === spell) > -1;
  }

  @bindthis private addWord(word: WordItemModel) {
    // console.log(word.spell, this.hasWord(word.spell))
    if (!this.hasWord(word.spell) && word.spell !== '')
      this.items.push(word);
  }
  @bindthis public addWords(words: WordItemModel[]) {
    words.forEach(this.addWord);
  }
  @bindthis public removeWord(spell: string) {
    this.items = this.items.filter(w => w.spell !== spell);
  }
  // return an array fo [spell, numTried, numCorrect, timeAdded]
  @bindthis private toStorageFormat(): ReadonlyArray<StorageFormatType> {
    return this.items.map(w =>
      <StorageFormatType>[w.spell, w.numTried, w.numCorrect, w.timeAdded]
    );
  }
  @bindthis public saveToStorage(): void {
    wordApis.saveToStorage(this.toStorageFormat());
  }

  @bindthis private desc(a: IWordDetail, b: IWordDetail, orderBy: keyof IWordDetail) {
    if (b[orderBy] < a[orderBy]) return 1;
    else if (b[orderBy] > a[orderBy]) return -1;
    else return 0;
  }
  @bindthis public stableSort(orderBy: keyof IWordDetail, order: 'asc' | 'desc') {
    this.items = (this.items.map((e, i) => [e, i]) as Array<[WordItemModel, number]>)
    .sort((a, b) => {
      let compareResult = this.desc(a[0], b[0], orderBy);
      if (compareResult === 0) compareResult = a[1] - b[1];
      if (order === 'asc') return compareResult;
      else return -compareResult
    }).map(e => e[0]);
  }
  @bindthis public generateRandomList(count: number): WordListModel {
    let wordList: WordItemModel[] = Array.from(this.items);
    let counter = this.length;
    while(counter > 0) {
      const idx = Math.floor(Math.random() * counter);
      counter--;
      // swap
      let temp = wordList[counter];
      wordList[counter] = wordList[idx];
      wordList[idx] = temp;
    }
    if (count < this.length)
      wordList = wordList.slice(0, count);
    return new WordListModel(wordList, this);
  }
}
