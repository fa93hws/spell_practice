import React from 'react';
import { NavLink } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import styles from './styles.less';

enum ERoutes { wordList, practice, report, about }
const routePaths = new Map([
  [ERoutes.wordList,'/words'],
  [ERoutes.practice, '/practice'],
  [ERoutes.about, '/']
]);
const routeLabels = new Map([
  [ERoutes.wordList,'Word List'],
  [ERoutes.practice, 'Practice'],
  [ERoutes.about, 'About']
]);

const Item = ({ route }: { route: ERoutes }) => (
  <li>
    <NavLink
      className={styles.link}
      to={routePaths.get(route)!}
      activeClassName={styles.active}
      exact={route===ERoutes.about? true: false}
    >
      <MenuItem component="span" className={styles.navItem}>
        {routeLabels.get(route)}
      </MenuItem>
    </NavLink>
  </li>
);

function LeftBar() {
  return (
    <aside className={styles.container}>
      <Paper square className={styles.paper}>
        <MenuList>
          <Item route={ERoutes.wordList} />
          <Item route={ERoutes.practice} />
          <Item route={ERoutes.about} />
        </MenuList>
      </Paper>
    </aside>
  );
}

export default LeftBar;