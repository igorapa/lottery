import React from 'react';
import Relay from 'react-relay';

class Main extends React.Component {
  render() {
    console.log('main');
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
}

export default Relay.createContainer(Main, {
  fragments: {},
});
