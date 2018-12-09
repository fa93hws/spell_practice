import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

import wordApis from '@/utils/api/word-api';
import WordRepository from '@/utils/models/word-repo';
import usePagination from '@/utils/hooks/pagination';
import globalStore from '@/store';
import styles from './styles.less';

import { IWordRepository, IWordDetail } from '@/utils/interfaces';

interface ITableContext {
  order: 'asc' | 'desc';
  orderBy: keyof IWordDetail;
}
const TableContext = createContext<ITableContext>({
  orderBy: 'spell',
  order: 'desc'
});

const columns = [
  { id: 'spell', numeric: false, label: 'Word' },
  { id: 'numTried', numeric: true, label: 'Number of tries' },
  { id: 'accuracy', numeric: true, label: 'Accuracy(%)' },
  { id: 'timeAdded', numeric: false, label: 'Added at\r\n(yyyy-mm-dd)' },
];

function WordTableHead({
  createSortHandler,
}: {
  createSortHandler: (id: keyof IWordDetail) => void;
}) {
  const { order, orderBy } = useContext(TableContext);
  // const indeterminate = useMemo(() => {
  //   return selected.length > 0 && selected.length < words.length
  // }, [selected, words]);

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={false}
            // checked={numSelected === rowCount}
            // onChange={onSelectAllClick}
          />
        </TableCell>
        {
          columns.map(column => (
            <TableCell
              key={column.id}
              numeric={column.numeric}
              padding='default'
              sortDirection={orderBy === column.id ? order : false}
            >
              <Tooltip
                title="Sort"
                placement="bottom"
                enterDelay={300}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  onClick={() => createSortHandler(column.id as keyof IWordDetail)}
                >
                  {column.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          )
        )
      }
      </TableRow>
    </TableHead>
  );
}

export default function WordTable() {
  // const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'desc' | 'asc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof IWordDetail>('spell');
  const { page, setPage, limit, setLimit } = usePagination();
  const [repo, setRepo] = globalStore.useState<IWordRepository>('word-repo');
  
  // mounted
  useEffect(() => {
    wordApis.loadRepo().then(repo => {
      repo.stableSort(orderBy, order);
      setRepo(repo);
    }).catch(console.error);
  }, []);

  // reordering
  useEffect(() => {
    repo.stableSort(orderBy, order);
    setRepo(new WordRepository(repo.items));
  }, [order, orderBy]);

  const displayedWords = useMemo(() => {
    return repo.getPagedItems(page, limit);
  }, [page, limit, repo]);

  function sortHandler(sortBy: keyof IWordDetail) {
    if (orderBy === sortBy)
      setOrder(order === 'desc' ? 'asc' : 'desc');
    else {
      setOrder('asc');
      setOrderBy(sortBy);
    }
  }

  return (
    <TableContext.Provider
      value={{order, orderBy}}
    >
      <section className={styles.listSection}>
        <Table>
          <WordTableHead
            createSortHandler={sortHandler}
          />
          <TableBody>
          {
            displayedWords.map(w => (
              <TableRow
                hover
                role="checkbox"
                key={w.spell}
              >
                <TableCell padding="checkbox">
                  <Checkbox checked={false} />
                </TableCell>
                <TableCell>{w.spell}</TableCell>
                <TableCell numeric>{w.numTried}</TableCell>
                <TableCell numeric>{(w.accuracy * 100).toFixed(2)}</TableCell>
                <TableCell numeric>{w.timeAdded}</TableCell>
              </TableRow>
            ))
          }
          </TableBody>
        </Table>
        <TablePagination
          page={page-1}
          component="div"
          rowsPerPage={limit}
          count={repo.length}
          rowsPerPageOptions={[10, 20]}
          onChangePage={(ev: any, page: number) => {setPage(page + 1)}}
          onChangeRowsPerPage={(ev: any) => setLimit(ev.target.value)}
        />
      </section>
    </TableContext.Provider>
  );
}