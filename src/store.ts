import Store from './utils/shared-state';
import WordRepository from './utils/models/word-repo';


export type GlobalStateType = 'word-repo';
const globalStore = new Store<GlobalStateType>();
globalStore.createState<WordRepository>('word-repo', new WordRepository([]));

export default globalStore;