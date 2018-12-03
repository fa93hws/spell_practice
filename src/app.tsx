import React, { Fragment, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import TopBar from './components/top-bar';
import LeftBar from './components/left-bar';
import Home from './containers/home';
import './assets/css/global.less';

export default function App() {
  useEffect(() => {
    document.title = "Spell Practice"
  }, []);

  return (
    <Fragment>
      <TopBar />
      <div className="global__body">
        <LeftBar />
        <div className="global__main">
          <Switch>
            <Route exact path="/" component={Home}/>
          </Switch>
        </div>
      </div>
    </Fragment>
  );
}
