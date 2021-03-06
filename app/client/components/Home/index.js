import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

const Home = () => (
  <Link to={{ pathname: '/megasena', query: { page: 1 } }}>
    <button type="button" className="btn btn-lg btn-success">
      Megasena
    </button>
  </Link>
);

export default Relay.createContainer(Home, {
  fragments: {},
});
