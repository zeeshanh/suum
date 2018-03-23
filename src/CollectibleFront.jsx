import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';

class CollectibleFront extends Component {
  // constructor(props) {
  //   super(props)
  // }

  componentWillMount() {

  }

  render() {
    return (
      <Link to={{pathname: '/collectible', state:{collectible: this.props.collectible}}} >
      <div className="CollectibleFront">
        <img src={this.props.image} height="375" width="275" alt="Missing..."></img>
      </div>
      </Link>
    );
  }
}

export default CollectibleFront
