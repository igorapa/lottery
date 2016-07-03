import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

class Home extends React.Component {
  render() {
    // console.log('Home');
    return (
      <Link to={{ pathname: '/megasena', query: { itemsPerPage: 1, page: 2 } }}>
        <button type="button" className="btn btn-lg btn-success">
          Megasena
        </button>
      </Link>
    );
  }
}

export default Relay.createContainer(Home, {
  fragments: {},
});
