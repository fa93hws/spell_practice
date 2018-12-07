import { IWordDetail } from '@/containers/word-list/list-table';
import { IPracticeWord } from '@/containers/practice';

import bindthis from '@/utils/decorators/bindthis';

export class WordItemModel implements IWordDetail, IPracticeWord {
  constructor(
    public spell: string,
    public numTried: number = 0,
    public numCorrect: number = 0,
    // yyyy-mm-dd
    public timeAdded: string = (new Date()).toISOString().split('T')[0]
  ) {}

  public get numWrong() { return this.numTried - this.numCorrect }
  public get accuracy(): number {
    if (this.numTried === 0) return 0;
    else return this.numCorrect / this.numTried;
  }

  public clone(): WordItemModel {
    return new WordItemModel(this.spell, this.numTried, this.numCorrect, this.timeAdded);
  }

  @bindthis public compare(spell: string): boolean {
    this.numTried++;
    const result = this.spell.toLowerCase() === spell.toLowerCase();
    if (result) this.numCorrect++;
    return result;    
  }
}