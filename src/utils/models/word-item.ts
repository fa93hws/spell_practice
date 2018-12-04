import { IWordDetail } from '@/containers/word-list/list-table';

export class WordItemModel implements IWordDetail {
  constructor(
    public spell: string,
    public numTried: number = 0,
    public numCorrect: number = 0,
    // yyyy-mm-dd
    public timeAdded: string = (new Date()).toISOString().split('T')[0]
  ) {}

  public get numWrong() { return this.numTried - this.numCorrect }
  public get accuracy() {
    if (this.numTried === 0) return 0;
    else return Math.floor(this.numCorrect / this.numTried);
  }
}