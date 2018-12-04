import { WordListModel } from '../models/word-list';

class WordApis {
  private storageKey = 'word-list';

  public saveToStorage = (list: WordListModel) => new Promise((resolve, reject) => {
    try {
      const arr = list.toStorageFormat();
      localStorage.setItem(this.storageKey, JSON.stringify(arr));
      resolve();
    } catch { reject(); }
  });

  public loadList: () => Promise<WordListModel> = () => new Promise((resolve, reject) => {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw === null) return reject('list is not initialized')
      const arr = JSON.parse(raw);
      const list = WordListModel.retrieveFromStorageFormat(arr);
      resolve(list);
    } catch { reject('error in loading list') }
  })
}
const wordApis = new WordApis();
export default wordApis;