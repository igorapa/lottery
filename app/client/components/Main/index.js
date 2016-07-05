import React, { PropTypes } from 'react';
import Relay from 'react-relay';

const Main = props => (
  <div className="container">
    {props.children}
  </div>
);

Main.propTypes = {
  children: PropTypes.element,
};

export default Relay.createContainer(Main, {
  fragments: {},
});
