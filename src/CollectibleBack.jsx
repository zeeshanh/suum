import React, {Component} from 'react';
import Popup from 'react-popup';

class CollectibleBack extends Component {
   constructor(props) {
    super(props)

    console.log(this.props);
  }

  componentWillMount() {
  }

  giftCollectible(event){
      console.log("clicked");
      Popup.alert('I am alert, nice to meet you');
  }

  sellCollectible(event){

  }

  buyCollectible(event){
    console.log(this.props.location.state);
    var collectibleInstance = this.props.location.state.collectibleInstance;
    var account= this.props.location.state.account;
    return collectibleInstance.buyCollectible( this.props.location.state.collectible[0], 
      {value: this.state.web3.toWei(this.props.location.state.collectible[5],"wei"), from: account})
         .then((result) => {
           console.log(result);
        })
  }

  render() {
    return (
      <div className="collectible-back">
        {this.props.location.state.collectible[4] ?
          <iframe width="600" height="450" src={this.props.location.state.collectible[4]}></iframe> :
          <img src={this.props.location.state.collectible[3]} height="375" width="275" alt="Missing..."></img>
        }
        <p className="collectible-title">{this.props.location.state.collectible[1]}</p>
        <div className="collectible-info">
          <p>Price: {this.props.location.state.collectible[5].toString()}</p>
          <p>ID: {this.props.location.state.collectible[0].toString()}</p>
          {
            // <p>Owner: {this.props.location.state.collectible[6]}</p>
          }
          <p>Owner: Nate</p>
        </div>
        <p>{this.props.location.state.collectible[2]}</p>


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
