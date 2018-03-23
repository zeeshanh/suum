import React, {Component} from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import Collection from '../build/contracts/Collection.json'
import Collectible from '../build/contracts/Collectible.json'
import getWeb3 from './utils/getWeb3'
import CreateCollectible from './CreateCollectible'
import {Link, Route, Switch} from 'react-router-dom';
// react-dom (what we'll use here)

import CollectibleFront from './CollectibleFront';
import CollectibleBack from './CollectibleBack';
import Home from './Home';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      collectibles: [],
      storageValue: 0,
      web3: null,
      collectionInstance: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3.then(results => {
      console.log('WEB3', results.web3)
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
    var localCollectibles = [];
    var collectiblePromises = [];

    // // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {

      collection.deployed().then((instance) => {
        console.log("DEPOLYED")
        collectionInstance = instance

        this.setState({collectionInstance: instance})
        // return collectionInstance._createCol("Test", "Busy Earnin by Jungle", "https://images.genius.com/a7476d42435ba6e34c7015fcb635cca6.1000x1000x1.jpg", "https://www.youtube.com/watch?v=BcsfftwLUf0", 10, {from: accounts[0]})

      }).then((result) => {
        return collectionInstance.getCollectiblesLength()
      }).then((result) => {
        console.log('Huh..')
        var lengthOfCollectibles = result.c[0];
        for (var i = 0; i < lengthOfCollectibles; i++) {
          var localPromise = collectionInstance.getCollectibleByIndex(i)
          collectiblePromises.push(localPromise);
        }
        return collectionInstance.getCollectibleByIndex(0);
      }).then(result => {
        localCollectibles.push(result)
        return Promise.all(collectiblePromises)
      }).then(values => {
        console.log("vals...", values)
        this.setState({collectibles: values})
      })

      collectible.deployed().then((instance) => {
        collectibleInstance = instance
        return collectibleInstance.balanceOf.call(accounts[0])
      }).then((result) => {
        // console.log(result);
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
          <Switch>
            <Route exact path='/' render={() => (<Home collectibles={this.state.collectibles}/>)}/>
            <Route path='/create' render={() => (<CreateCollectible{...this.state}/>)}/>
            <Route path='/collectible' component={CollectibleBack}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App
