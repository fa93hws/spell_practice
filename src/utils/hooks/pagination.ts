import { useState } from 'react';

export default function usePagination(initPage: number = 1, initLimit: number = 10) {
  const [page, setPage] = useState(initPage);
  const [limit, setLimit] = useState(initLimit);
  return { page, setPage, limit, setLimit };
}