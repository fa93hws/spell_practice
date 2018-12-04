import { IWordDetail } from '@/containers/word-list/list-table';
import bindthis from '../decorators/bindthis';
import { Pageable } from './pageable';
import { WordItemModel } from "./word-item";

export type StorageFormatType = [string, number, number, string];

export class WordListModel extends Pageable<WordItemModel> {
  constructor(public items: WordItemModel[]) {
    super();
  };
  public get length() {
    return this.items.length;
  }
  static retrieveFromStorageFormat(raw: ReadonlyArray<StorageFormatType>): WordListModel {
    const words = raw.map(r => new WordItemModel(...r));
    return new WordListModel(words);
  }

  @bindthis public hasWord(spell: string) {
    return this.items.findIndex(i => i.spell === spell) > -1;
  }

  @bindthis public addWord(word: WordItemModel) {
    // console.log(word.spell, this.hasWord(word.spell))
    if (!this.hasWord(word.spell) && word.spell !== '')
      this.items.push(word);
  }
  @bindthis public addWords(words: WordItemModel[]) {    
    words.forEach(this.addWord);
  }

  // return an array fo [spell, numTried, numCorrect, timeAdded]
  @bindthis public toStorageFormat(): ReadonlyArray<StorageFormatType> {
    return this.items.map(w =>
      <StorageFormatType>[w.spell, w.numTried, w.numCorrect, w.timeAdded]
    );
  }

  @bindthis private desc(a: IWordDetail, b: IWordDetail, orderBy: keyof IWordDetail) {
    if (b[orderBy] < a[orderBy]) return 1;
    else if (b[orderBy] > a[orderBy]) return -1;
    else return 0;
  }
  @bindthis public StableSort(orderBy: keyof IWordDetail, order: 'asc' | 'desc') {
    this.items = (this.items.map((e, i) => [e, i]) as Array<[WordItemModel, number]>)
    .sort((a, b) => {
      let compareResult = this.desc(a[0], b[0], orderBy);
      if (compareResult === 0) compareResult = a[1] - b[1];
      if (order === 'asc') return -compareResult;
      else return compareResult
    }).map(e => e[0]);
  }
}
