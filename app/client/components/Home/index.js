import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

class Home extends React.Component {
  render() {
    console.log('Home');
    return (
      <Link {...this.props} to="/megasena" activeClassName="btn btn-success">
        Megasena
      </Link>
    );
  }
}

export default Relay.createContainer(Home, {
  fragments: {},
});
