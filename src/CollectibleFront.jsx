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
        <img className="collectible-front" src={this.props.image} border-radius="25px" height="375" width="275" alt="Missing..."></img>
      </Link>
    );
  }
}

export default CollectibleFront
