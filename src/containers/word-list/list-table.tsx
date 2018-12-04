import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

import wordApis from '@/utils/api/word-api';
import usePagination from '@/utils/hooks/pagination';
import { WordListModel } from '@/utils/models/word-list';
import globalStore from '@/store';
import styles from './styles.less';

export interface IWordDetail {
  spell: string;
  numTried: number;
  // 0 - 100
  accuracy: number;
  // yyyy-mm-dd
  timeAdded: string;
}

interface ITableContext {
  selected: string[];
  displayedWords: IWordDetail[];
  order: 'asc' | 'desc';
  orderBy: keyof IWordDetail;
}
const TableContext = createContext<ITableContext>({
  selected: [],
  displayedWords: [],
  orderBy: 'spell',
  order: 'desc'
});

function desc(a: IWordDetail, b: IWordDetail, orderBy: keyof IWordDetail) {
  if (b[orderBy] < a[orderBy]) return -1;
  else if (b[orderBy] > a[orderBy]) return 1;
  else return 0;
}
function stableSort(array: IWordDetail[][], cmp: (a: IWordDetail, b: IWordDetail) => number) {
  return (array.map((el, index) => [el, index]) as Array<[IWordDetail, number]>)
  .sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    else return a[1] - b[1];
  }).map(el => el[0]);
}
function getSorting(order: 'desc' | 'asc', orderBy: keyof IWordDetail) {
  return order === 'desc' ?
  (a: IWordDetail, b: IWordDetail) => desc(a, b, orderBy) :
  (a: IWordDetail, b: IWordDetail) => -desc(a, b, orderBy);
}

const columns = [
  { id: 'spell', numeric: false, label: 'Word' },
  { id: 'numTried', numeric: true, label: 'Number of tried' },
  { id: 'accuracy', numeric: true, label: 'Accuracy(%)' },
  { id: 'timeAdded', numeric: false, label: 'Added at(yyyy-mm-dd)' },
];

function WordTableHead({
  createSortHandler
}: {
  createSortHandler: (id: keyof IWordDetail) => void;
}) {
  const { selected, displayedWords, order, orderBy } = useContext(TableContext);
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
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'desc' | 'asc'>('desc');
  const [orderBy, setOrderBy] = useState<keyof IWordDetail>('spell');
  const { page, setPage, limit, setLimit } = usePagination(2, 10);
  const [list, setList] = globalStore.useState<WordListModel>('word-list');

  const displayedWords = useMemo(() => {
    return list.getDisplayedItems(page, limit);
  }, [page, limit, list, list.items]);
  
  useEffect(() => {
    wordApis.loadList().then(list => {
      setList(list);
    }).catch(console.error);
  }, []);

  return (
    <TableContext.Provider
      value={{
        selected,
        displayedWords,
        order,
        orderBy
      }}
    >
      <section className={styles.listSection}>
        <Table>
          <WordTableHead
            createSortHandler={() => {}}
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
                <TableCell component="th" scope="row" padding="none">
                  {w.spell}
                </TableCell>
                <TableCell numeric>{w.numTried}</TableCell>
                <TableCell numeric>{w.accuracy}</TableCell>
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
          count={Math.ceil(list.length/limit)}
          rowsPerPageOptions={[10, 20]}
          // onChangePage={() => {}}
          onChangePage={(ev: any, page: number) => {
            setPage(page + 1)
            // console.log(ev, page)
          }}
          onChangeRowsPerPage={(ev: any) => setLimit(ev.target.value)}
        />
      </section>
    </TableContext.Provider>
  );
}