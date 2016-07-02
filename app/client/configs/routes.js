import React from 'react';
import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';

import Main from '../components/Main';
import Home from '../components/Home';
import Megasena from '../components/Megasena';
import ViewerQueries from '../queries/ViewerQueries';

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={Home} />
    <Route path="megasena" component={Megasena} queries={ViewerQueries} />
  </Route>
);
