import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import 'bootstrap/dist/css/bootstrap.min.css';

class HomeRoute extends Relay.Route {
  static routeName = 'Home';
  static queries = {
    viewer: (Component) => Relay.QL`
      query MainQuery {
        viewer {
          ${Component.getFragment('viewer')}
        }
      }
    `
  }
}

ReactDOM.render(
  <Relay.RootContainer
    Component={Main}
    route={new HomeRoute()}
  />,
  document.getElementById('app')
);
