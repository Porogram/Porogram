import React from 'react';
import './head_nav.css';


class HeadNav extends Component {
  return (
    <nav className="navbar navbar-light">
        <a href="#"><img src="./favicon.png"/>LOL Stats</a>
    </nav>
    <div>
      <div>
        {this.props.children}
      </div>
    </div>

  );
}

export default HeadNav;
