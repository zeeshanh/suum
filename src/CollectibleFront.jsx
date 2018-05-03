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
      <div className = "collectibleView">
      <Link to={{pathname: '/collectible', state:{collectible: this.props.collectible}}} >
        <img className="collectible-front" src={this.props.image} border-radius="25px" height="375" width="275" alt="Missing..."></img>
      </Link>
      <div className = "collectible-details">
        <div className = "collectible-Name">
        Name: {this.props.collectible[1]}
        </div>

        <div className = "collectible_price">
          Price: {this.props.collectible[5].toString()}
          </div>

        <div className = "collectible_quantity">
          Quantity: {this.props.collectible[7].toString()}
          </div>
      </div>
      </div>
    );
  }
}

export default CollectibleFront
