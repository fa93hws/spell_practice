import bindthis from '../decorators/bindthis';

import { IComparable, IWordDetail } from '../interfaces'

export default class WordItemModel implements IWordDetail, IComparable<string> {
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

  @bindthis public compareTo(spell: string): number {
    this.numTried++;
    let result: number = 0;
    if (this.spell.toLocaleLowerCase() > spell.toLocaleLowerCase())
      result = 1;
    else if (this.spell.toLocaleLowerCase() < spell.toLocaleLowerCase())
      result = -1;
    // const result = this.spell.toLowerCase() === spell.toLowerCase();
    if (result === 0) this.numCorrect++;
    return result;
  }
}