import React, {Component} from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import Collection from '../build/contracts/Collection.json'
import Collectible from '../build/contracts/Collectible.json'
import getWeb3 from './utils/getWeb3'
import CreateCollectible from './CreateCollectible'
import { Link, Route, Switch } from 'react-router-dom';
// react-dom (what we'll use here)



import CollectibleFront from './CollectibleFront';
import CollectibleBack from './CollectibleBack';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      collectibleInstance:null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3.then(results => {
      this.setState({web3: results.web3})

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    }).catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    const collection = contract(Collection)
    const collectible = contract(Collectible)

    simpleStorage.setProvider(this.state.web3.currentProvider)
    collection.setProvider(this.state.web3.currentProvider)
    collectible.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance
    var collectionInstance
    var collectibleInstance

    // // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {

      collection.deployed().then((instance) => {
        collectionInstance = instance

        this.setState({collectionInstance: instance})

        // return collectionInstance._createCol("Dino", "Dinosaur collectible", 50, "https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/AllosaurusLayers_vvi6q7.jpg", {from: accounts[0]})
      // }).then((result) => {
        collectionInstance._createCol("Innerbloom", "Innerbloom by Rufus du Sol", "https://images.genius.com/a7476d42435ba6e34c7015fcb635cca6.1000x1000x1.jpg", "https://www.youtube.com/watch?v=IA1liCmUsAM", 10, {from:accounts[0]})

        //return collectionInstance.Collectibles.call(accounts[0])
      }).then((result) => {
        this.state.collectionInstance.getCollectiblesLength()
      }).then((result) => {
        console.log("Length of Collectibles:", result)
      })

      collectible.deployed().then((instance) => {
        collectibleInstance = instance

        return collectibleInstance.balanceOf.call(accounts[0])
      }).then((result) => {
        console.log(result.c[0]);
      })

    })

  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">SUUM</a>
        </nav>


        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Smart Contract Example</h2>
              <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
              <p>Try changing the value stored on
                <strong>line 59</strong>
                of App.js.</p>
              <p>The stored value is: {this.state.storageValue}</p>
              <button>Create New Collectible</button>
              <Route path='/create' render={() => (
                <CreateCollectible{...this.state}/>
              )}/>
            </div>
          </div>
          <div></div>
        </main>
      </div>
    );
  }
}

export default App
