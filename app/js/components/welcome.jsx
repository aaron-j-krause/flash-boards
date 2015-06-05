'use strict';

var React = require('react');
var Link = require('react-router').Link

// /*
// Initial view, links to signup and signin.
// */


module.exports = React.createClass({
  render: function() {
    return (
      <main>
        <div className='welcome'>
          <h1>Welcome to flash boards!</h1>
          <ul className="nav-list">
            <li>
              <Link to="signin">Sign In</Link>
            </li>
            <li>
              <Link to="signup">Sign Up</Link>
            </li>
          </ul>
        </div>
      </main>
    );
  }
});
