import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { createHashHistory } from 'history';
import useRelay from 'react-router-relay';
import { Router, applyRouterMiddleware, useRouterHistory } from 'react-router';
import routes from './configs/routes';
import 'bootstrap/dist/css/bootstrap.min.css';

const history = useRouterHistory(createHashHistory)({ queryKey: false });
ReactDOM.render(
  <Router
    history={history}
    routes={routes}
    render={applyRouterMiddleware(useRelay)}
    environment={Relay.Store}
  />,
  document.getElementById('app')
);
