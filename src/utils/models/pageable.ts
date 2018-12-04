import bindthis from "../decorators/bindthis";

export interface IPageable<T> {
  items: T[];
  length: number;
  
  getDisplayedItems: (page: number, limit: number) => T[];
}

export abstract class Pageable<T> implements IPageable<T> {
  public items: T[] = [];
  public get length() { return this.items.length; }

  @bindthis public getDisplayedItems(page: number, limit: number): T[] {
    if (page <= 0 || limit <= 0) return [];
    const start = (page - 1) * limit;
    if (start >= this.length) return [];
    return this.items.slice(start, limit + start);
  }
}