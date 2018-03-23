import React, {Component} from 'react';
import Popup from 'react-popup';

class CollectibleBack extends Component {
   //constructor(props) {
    // super(props)
  // }

  componentWillMount() {

  }

  giftCollectible(event){
      console.log("clicked");
      Popup.alert('I am alert, nice to meet you');
  }

  sellCollectible(event){

  }

  buyCollectible(event){

  }

  render() {
    return (
      <div className="CollectibleBack">
        <img src={this.props.location.state.collectible[3]} height="375" width="275" alt="Missing..."></img>
        <p>{this.props.location.state.collectible[4]}</p>
        <p>{this.props.location.state.collectible[1]}</p>
        <p>{this.props.location.state.collectible[2]}</p>
        <p>{this.props.location.state.collectible[5].toString()}</p>
        <p>{this.props.location.state.collectible[0].toString()}</p>
        <p>{this.props.location.state.collectible[6]}</p>

        <div className="gift">
        <button onClick={this.giftCollectible.bind(this)}>
          Gift
        </button>
        </div>

        <div className="buy">
        <button onClick={this.buyCollectible.bind(this)}>
          Buy
        </button>
        </div>

        <div className="sell">
        <button onClick={this.sellCollectible.bind(this)}>
          Sell
        </button>
        </div>

      </div>

      
    );
  }
}

export default CollectibleBack
