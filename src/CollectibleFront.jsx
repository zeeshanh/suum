import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';

class CollectibleFront extends Component {
  constructor(props) {
    super(props)

    console.log(this.props);
  }

  componentWillMount() {

  }

  render() {
    return (
      <div className = "collectibleView">
      <Link to={{pathname: '/collectible', state:{collectible: this.props.collectible, account: this.props.account}}} >
        <img className="collectible-front" src={this.props.image} border-radius="25px" height="375" width="275" alt="Missing..."></img>
      </Link>
      <div className = "collectible-details">
        <div className = "collectible-Name">
          {this.props.collectible[1]}
        </div>

        {
        // <div className = "collectible_price">
        //   Price: {Number(this.props.collectible[5].toString())/Number(1000000000000)}
        //   </div>
        }

        <div className = "collectible-creator">
          by {this.props.collectible[8].toString()}
          </div>
      </div>
      </div>
    );
  }
}

export default CollectibleFront
