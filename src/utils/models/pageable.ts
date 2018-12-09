export interface IPageable<T> {
  items: T[];
  length: number;
  
  getPagedItems: (page: number, limit: number) => T[];
}

export function getPagedItems<T>(items: T[], page: number, limit: number) {
  if (page <= 0 || limit <= 0) return [];
  const start = (page - 1) * limit;
  if (start >= items.length) return [];
  return items.slice(start, limit + start);
}