import React, {Component} from 'react'
import Collection from '../build/contracts/Collection.json'
import Collectible from '../build/contracts/Collectible.json'
import getWeb3 from './utils/getWeb3'
import CreateCollectible from './CreateCollectible'
import {Link, Route, Switch} from 'react-router-dom';
import Profile from './Profile'
import {Navbar, Nav, NavItem, NavBrand} from 'react-bootstrap';
import NavBar from './Navbar';
import SimpleNav from './SimpleNav';
// react-dom (what we'll use here)

import CollectibleFront from './CollectibleFront';
import CollectibleBack from './CollectibleBack';
import Home from './Home';
import * as abiVar from './colAbi.js';

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
      collectionInstance:null,
      collectibleInstance:null,
      colToOwner:null,
      myCollectibles:[],
      account:"",
      colAbi:null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3.then(results => {
      console.log('WEB3', results.web3)
      this.setState({web3: results.web3,
                })

      // Instantiate contract once web3 provided.
      //this.instantiateContract()
      this.rinkeby()
    }).catch(() => {
      console.log('Error finding web3.')
    })
  }

  rinkeby(){
    

    this.state.web3.eth.getAccounts((error, accounts) => {
      this.setState({account:accounts[0]})

      console.log(accounts);

    const abi = abiVar.abi;
    const address = '0xdb4d60b0d3f76ce0f2e30fa8f4a2962687b9dd75'
    const Eth = require('ethjs-query')
    const EthContract = require('ethjs-contract')
    const BN = require('bn.js')

    const eth = new Eth(this.state.web3.currentProvider)
    const contract = new EthContract(eth)

    const collectible = contract(abi)
    const collectibleInstance = collectible.at(address)

    this.setState({collectibleInstance:collectibleInstance});

    var collectiblePromises = []
    var localCollectibles = []

    console.log("here")

    return collectibleInstance.getCollectiblesLength().then((result) => {
        console.log(result[0].toString());
        var lengthOfCollectibles = result[0].toString();

        for (var i = 0; i < lengthOfCollectibles; i++) {
          var localPromise = collectibleInstance.getCollectibleByIndex(i)
          collectiblePromises.push(localPromise);
        }

      return collectibleInstance.getCollectibleByIndex(0);
      }).then(result => {
        localCollectibles.push(result)
        return Promise.all(collectiblePromises)
      }).then(values => {
        console.log("vals...", values)
        this.setState({collectibles: values})

        var mine= values.filter(function(col){
          return col[6] == accounts[0];
        });

        console.log(mine);
        this.setState({myCollectibles: mine})
    })
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
    const collection = contract(Collection)
    const collectible = contract(Collectible)

    collection.setProvider(this.state.web3.currentProvider)
    collectible.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var collectionInstance
    var collectibleInstance
    var localCollectibles = [];
    var collectiblePromises = [];

    // // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.setState({account:accounts[0]})
      console.log(accounts);
      collection.deployed().then((instance) => {
        console.log("DEPOLYED")
        collectionInstance = instance
        this.setState({collectionInstance: instance})

        //collectionInstance._createCol("Innerbloom", "Innerbloom by Rufus du Sol", "https://www.allthingsgomusic.com/wp-content/uploads/2015/11/rufus-du-sol-innerbloom-e1447974459586.jpg", "https://www.youtube.com/embed/IA1liCmUsAM", 1, {from:accounts[0]})

        return collectionInstance.collectibleToOwner.call(0)
      }).then((result) => {
        console.log(result);
        return collectionInstance._createCol("Busy Earnin", "Busy Earnin by Jungle", "https://images.genius.com/e64c86234196aea00f6fe89923861476.1000x1000x1.jpg", "https://www.youtube.com/watch?v=BcsfftwLUf0", 10, 50, "Zeeshan",{from: accounts[0]})
         //return collectionInstance._createCol("Innerbloom", "Innerbloom by Rufus du Sol", "https://images.genius.com/a7476d42435ba6e34c7015fcb635cca6.1000x1000x1.jpg", "https://www.youtube.com/watch?v=IA1liCmUsAM", 10, {from: accounts[0]})
       }).then((result) =>{
         return collectionInstance.collectibles.call(0)
      }).then((result) => {
        console.log('TEST')
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

        var mine= values.filter(function(col){
          return col[6] == accounts[0];
        });

        console.log(mine);
        this.setState({myCollectibles: mine})

      })

      collectible.deployed().then((instance) => {
        collectibleInstance = instance
         this.setState({collectibleInstance: instance})
        
        })

     // })

    })

  }


  render() {

    var simpleNavItems = [
      {url: "/", text: "SUUM"},
      {url: "/", text: "Marketplace"},
      {url: "/create", text: "Create Collectible"},
      {url: "/profile", text: "My Collectibles"},
    ]

     // var navbar = {};
     //  navbar.brand =
     //    {linkTo: "/", text: "SUUM"};
     //  navbar.links = [
     //  {linkTo: "/", text: "SUUM"},
     //  {linkTo: "/create", text: "Create Collectible"},
     //  {linkTo: "/profile", text: "My Collectibles"},
     //  ];

    return (

      <div className="App">
        <SimpleNav items={simpleNavItems} />
        {
         //  <NavBar {...navbar} />
        }
        <main className="container">
          <div id = "popupContainer"></div>
          <Switch>
            <Route exact path='/' render={() => (<Home collectibles={this.state.collectibles} collectibleInstance={this.state.collectibleInstance} account={this.state.account}/>)}/>
            <Route path='/create' render={() => (<CreateCollectible{...this.state}/>)}/>
            <Route path='/collectible' component={CollectibleBack}/>
            <Route path = '/profile' render ={() => (<Profile collectibles={this.state.myCollectibles} address = {this.state.account}/>)}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App
