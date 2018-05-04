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
      <div className="collectible-back">
        {this.props.location.state.collectible[4] ?
          <iframe width="600" height="450" src={this.props.location.state.collectible[4]}></iframe> :
          <img src={this.props.location.state.collectible[3]} height="375" width="275" alt="Missing..."></img>
        }
        <p className="collectible-title">{this.props.location.state.collectible[1]}</p>
        <div className="buy-sell-buttons">

          <div className="buy collectible-button">
          <button onClick={this.buyCollectible.bind(this)}>
            Buy
          </button>
          </div>

          <div className="sell collectible-button">
          <button onClick={this.sellCollectible.bind(this)}>
            Sell
          </button>
          </div>

          <div className="gift collectible-button">
          <button onClick={this.giftCollectible.bind(this)}>
            Gift
          </button>
          </div>

          <div className="download collectible-button">
          <button onClick={this.giftCollectible.bind(this)}>
            Download
          </button>
          </div>

          <div className="remix collectible-button">
          <button onClick={this.giftCollectible.bind(this)}>
            Remix
          </button>
          </div>

        </div>
        <div className="collectible-info">
          <p>Price: {this.props.location.state.collectible[5].toString()}</p>
          <p>ID: {this.props.location.state.collectible[0].toString()}</p>
          {
            // <p>Owner: {this.props.location.state.collectible[6]}</p>
          }
          <p>Owner: Nate</p>
        </div>
        <p>{this.props.location.state.collectible[2]}</p>




      </div>


    );
  }
}

export default CollectibleBack
