import { getPagedItems } from '../pageable';

describe('pageable', () => {
  it('paging', () => {
    const items = new Array(100).fill(0).map((_, idx) => idx + 1);
    expect(getPagedItems(items, -1, 1)).toEqual([]);
    expect(getPagedItems(items, 2, -1)).toEqual([]);
    expect(getPagedItems(items, 0, 1)).toEqual([]);
    expect(getPagedItems(items, 1, 1)).toEqual([1]);
    expect(getPagedItems(items, 1, 0)).toEqual([]);
    expect(getPagedItems(items, 11, 10)).toEqual([]);
    expect(getPagedItems(items, 2, 4)).toEqual([5, 6, 7, 8]);
  });
});