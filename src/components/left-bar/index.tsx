import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withRouter, RouteComponentProps, NavLink } from 'react-router-dom';

import styles from './styles.less';

enum ERoutes { wordList, practice, report, about }
const routePaths = new Map([
  [ERoutes.wordList,'/words'],
  [ERoutes.practice, '/practice'],
  [ERoutes.report, '/report'],
  [ERoutes.about, '/']
]);
const routeLabels = new Map([
  [ERoutes.wordList,'Word List'],
  [ERoutes.practice, 'Practice'],
  [ERoutes.report, 'Report'],
  [ERoutes.about, 'About']
])
function findActiveItemByPath(pathname: string): ERoutes | undefined {
  if (pathname === '/') return ERoutes.about;
  for(let [k, v] of routePaths) {
    if (pathname.startsWith(v)) return k;
  }
  return undefined;
}
function getActiveClass(activeRoute: ERoutes | undefined, route: ERoutes) {
  return activeRoute === route ? styles.active : '';
}

const Item = ({ route, activeRoute }: {
  route: ERoutes, activeRoute: ERoutes | undefined
}) => (
  <li>
    <NavLink
      className={styles.link}
      to={routePaths.get(route)!}
    >
      <MenuItem
        component="span"
        className={getActiveClass(activeRoute, route)}
      >
        {routeLabels.get(route)}
      </MenuItem>
    </NavLink>
  </li>
);

function LeftBar(props: RouteComponentProps) {
  const [activeRoute, setActiveRoute] = useState<ERoutes | undefined>(undefined);
  useEffect(() => {
    setActiveRoute(findActiveItemByPath(props.location.pathname));
  }, [props.location.pathname])

  return (
    <aside className={styles.container}>
      <Paper square className={styles.paper}>
        <MenuList>
          <Item activeRoute={activeRoute} route={ERoutes.wordList} />
          <Item activeRoute={activeRoute} route={ERoutes.practice} />
          <Item activeRoute={activeRoute} route={ERoutes.report} />
          <Item activeRoute={activeRoute} route={ERoutes.about} />
        </MenuList>
      </Paper>
    </aside>
  );
}

export default withRouter(LeftBar);