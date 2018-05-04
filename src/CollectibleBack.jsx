import React, {Component} from 'react';
import Popup from 'react-popup';
//import Collectible from '../build/contracts/Collectible.json'
import getWeb3 from './utils/getWeb3'
import * as abiVar from './colAbi.js';
import $ from 'jquery'

class CollectibleBack extends Component {
   constructor(props) {
    super(props)

    const BN = require('bn.js')

    this.giftCollectible = this.giftCollectible.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.setPrice = this.setPrice.bind(this);
    this.feature = this.feature.bind(this);
    this.sell = this.sell.bind(this);
    this.showGift = this.showGift.bind(this);

    this.state = {
      price:0,
      giftAddress:"0x",
      collectibleInstance:null,
      web3:null,
      accounts: null,
      identity: this.props.location.state.collectible[0]
    }

    //console.log(this.props);
    getWeb3.then(results => {
      console.log('WEB3', results.web3)
      this.setState({web3: results.web3})

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    }).catch(() => {
      console.log('Error finding web3.')
    })


  }

  instantiateContract(){

    $("#price").hide();
    $("#gift").hide();

    this.state.web3.eth.getAccounts((error, accounts) => {
      this.setState({accounts:accounts})
       if(this.props.location.state.collectible[6]==this.state.accounts[0]){
          $(".buy").hide();
        }
        else{
          $(".sell").hide();
          $(".gift").hide();
        }
      })

    const abi = abiVar.abi;
    console.log(abi);
    //const contract = require('truffle-contract')
    ///const collectible = contract(Collectible)

   // collectible.setProvider(this.state.web3.currentProvider)

    //var collectibleInstance

     // collectible.deployed().then((instance) => {
     //    collectibleInstance = instance
     //     this.setState({collectibleInstance: instance})

     //    })

    const address = '0x931c8e7c452e6f4fe2118e8ab1b760e995d841fd'
    const Eth = require('ethjs-query')
    const EthContract = require('ethjs-contract')

    const eth = new Eth(this.state.web3.currentProvider)
    const contract = new EthContract(eth)

    const collectible = contract(abi)
    const collectibleInstance = collectible.at(address)

    this.setState({collectibleInstance:collectibleInstance})

    console.log(this.props.location.state.collectible[6]);
    console.log(this.state.accounts[0]);

  }

  componentWillMount() {
  }

  handleAddressChange(event) {
    this.setState({giftAddress: event.target.value});
  }

  handlePriceChange(event){
    this.setState({price: event.target.value});
  }

  giftCollectible(event){
      event.preventDefault();
      console.log("Gift to " + this.state.giftAddress);
      return this.state.collectibleInstance.gift(Number(this.state.identity), this.state.giftAddress, {from: this.state.accounts[0]});
  }

  setPrice(event){
    event.preventDefault();
    const onEth = Number(1000000000000);
      console.log("New price " + parseInt(this.state.price));
      return this.state.collectibleInstance.setPrice(Number(this.state.identity),Number(this.state.price)*onEth, {from: this.state.accounts[0]})
          .then((result) =>{
            console.log(result);
          })
  }

  buyCollectible(event){
    console.log(this.props.location.state);
    return this.state.collectibleInstance.buyCollectible( Number(this.state.identity),
      {value: this.state.web3.toWei(this.props.location.state.collectible[5],"wei"), from: this.state.accounts[0]})
         .then((result) => {
           console.log(result);
        })
  }

  feature(event){
    return this.state.collectibleInstance.feature(Number(this.state.identity),
      {value: this.state.web3.toWei(0.05,"ether"), from: this.state.accounts[0]})
       .then((result) => {
           console.log(result);
        })
     }

  sell(event){
    $("#price").toggle();
  }

  showGift(event){
    $("#gift").toggle();
  }

  render() {
    return (
      <div className="collectible-back">
      <div className="collectible-back-image">
        {this.props.location.state.collectible[4] ?
          <iframe width="600" height="450" src={this.props.location.state.collectible[4]}></iframe> :
          <img src={this.props.location.state.collectible[3]} height="375" width="275" alt="Missing..."></img>
        }
      </div>
      <div className="collectible-back-info">
        <p className="collectible-title">{this.props.location.state.collectible[1]}</p>
        <p className="collectible-creator-back">by {this.props.location.state.collectible[8]}</p>
        <div className="buy-sell-buttons">

          <div className="buy">
          <button className="collectible-button" onClick={this.buyCollectible.bind(this)}>
            Buy
          </button>
          </div>

          <div className="sell">
          <button className="collectible-button" onClick={this.sell.bind(this)}>
            Sell
          </button>
          </div>

          <div className="gift">
          <button className="collectible-button" onClick={this.showGift.bind(this)}>
            Gift
          </button>
          </div>

          <div className="download">
          <button className="collectible-button" onClick={this.giftCollectible.bind(this)}>
            Download
          </button>
          </div>

          <div className="remix">
          <button className="collectible-button" onClick={this.giftCollectible.bind(this)}>
            Remix
          </button>
          </div>

          <div className="feature">
          <button className="collectible-button" onClick={this.feature.bind(this)}>
            Feature
          </button>
          </div>

        </div>
        <div className="collectible-info">
          <p><b>Price:</b> {Number(this.props.location.state.collectible[5].toString())/Number(1000000000000)} ETH</p>
          <br/>
          {
            //<p>ID: {this.props.location.state.collectible[0].toString()}</p>

            // <p>Owner: {this.props.location.state.collectible[6]}</p>
          }
          <br/>
          <br/>
          <p><b>Owner:</b> {this.props.location.state.collectible[6]}</p>
        </div>
        <p>{this.props.location.state.collectible[2]}</p>

        <div id = "gift">
        <form onSubmit={this.giftCollectible.bind(this)}>
          <label>
            Receivers Address:
            <input type="text" value={this.state.giftAddress} onChange={this.handleAddressChange}/>
          </label>
          <input className="large-submit-button" type="submit" value="Gift" />
        </form>
        </div>

        <div id = "price">
        <form onSubmit={this.setPrice.bind(this)}>
          <label>
            New Price:
            <input type="text" value={this.state.price} onChange={this.handlePriceChange}/>
          </label>
          <input className="large-submit-button" type="submit" value="Set Price" />
        </form>
        </div>

      </div>
      </div>


    );
  }
}

export default CollectibleBack
