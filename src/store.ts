import Store from './utils/shared-state';
import { WordListModel } from './utils/models/word-list';
import wordApis from './utils/api/word-api';

export type GlobalStateType = 'word-list';
const globalStore = new Store<GlobalStateType>();
globalStore.createState<WordListModel>('word-list', new WordListModel([]));

// export const refreshList = () => new Promise((resolve, reject) => {
//   const [, setList] = globalStore.useState<WordListModel>('word-list');
//   wordApis.loadList().then(list => {
//     setList(list);
//     resolve();
//   }).catch(reject);
// });

export default globalStore;