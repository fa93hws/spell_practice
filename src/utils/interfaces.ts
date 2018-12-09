import WordItemModel from "./models/word-item";
import { IPageable } from './models/pageable';

export interface ISaveable {
  saveToStorage: () => void;
}

export interface IHasRemovableWords {
  removeWord: (spell: string) => void;
}

export interface ICanAddWords {
  addWords: (words: WordItemModel[]) => void;
}

export interface IWordDetail {
  spell: string;
  numTried: number;
  numCorrect: number;
  // 0 - 100
  accuracy: number;
  // yyyy-mm-dd
  timeAdded: string;
  // selected: boolean;
}

export interface IComparable<T> {
  compareTo: (val: T) => number;
}

export interface IPracticeList extends IHasRemovableWords, ISaveable {
  pickRandomly: () => IWordDetail & IComparable<string>;
  words: WordItemModel[];
}

export interface IWordRepository extends IHasRemovableWords, ISaveable, IPageable<WordItemModel>, ICanAddWords {
  generateRandomList: (count: number) => IPracticeList;
  stableSort: (orderBy: keyof IWordDetail, order: 'asc'|'desc') => void;
}

export type StorageFormatType = [string, number, number, string];