import React from 'react';
import styles from './index.scss';

class Main extends React.Component {
  render() {
    return (
      <div className="container">
        <form className="form-signin" _lpchecked="1">
          <h2 className="form-signin-heading">Please sign in</h2>
          <label for="inputEmail" className="sr-only">Email address</label>
          <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autofocus="" autocomplete="off" />
          <label for="inputPassword" className="sr-only">Password</label>
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" required="" autocomplete="off" />
          <div className="checkbox">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
      </div>
    );
  }
}

export default Main;

