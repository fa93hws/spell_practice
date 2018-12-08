import axios, { AxiosPromise } from 'axios';

import { WordListModel } from '../models/word-list';
import bindthis from '../decorators/bindthis';

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
  });

  @bindthis public getTranslation(spell: string): Promise<string> {
    const baseUrl = 'https://translation.googleapis.com/language/translate/v2';
    const key = 'AIzaSyDzQ2RlclpsegmxPfugrOC8QyGTtACaa3Q';
    const params = `q=${spell}&target=zh-CN&format=text&source=en&model=base&key=${key}`;
    return new Promise((resolve, reject) => {
      axios.post(`${baseUrl}?${params}`).then(res => {
        const { data = {} } = res.data;
        const { translations = [] } = data;
        const [ translation = {} ] = translations;
        const { translatedText = '' } = translation;
        if (translatedText !== '') resolve(translatedText);
        else throw new Error('Error in getting translation');
      }).catch(reject);
    });
    // return axios.post(`${baseUrl}?${params}`);
  }
}
const wordApis = new WordApis();
export default wordApis;