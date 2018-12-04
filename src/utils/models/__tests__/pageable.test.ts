import { Pageable } from '../pageable';

class Foo extends Pageable<number> {}

describe('pageable', () => {
  it('paging', () => {
    const items = new Array(100).fill(0).map((_, idx) => idx + 1);
    const instance = new Foo();
    instance.items = items;
    expect(instance.getDisplayedItems(-1, 1)).toEqual([]);
    expect(instance.getDisplayedItems(2, -1)).toEqual([]);
    expect(instance.getDisplayedItems(0, 1)).toEqual([]);
    expect(instance.getDisplayedItems(1, 1)).toEqual([1]);
    expect(instance.getDisplayedItems(1, 0)).toEqual([]);
    expect(instance.getDisplayedItems(11, 10)).toEqual([]);
    expect(instance.getDisplayedItems(2, 4)).toEqual([5, 6, 7, 8]);
  });
});