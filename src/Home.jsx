import React, {Component} from 'react';
import CollectibleFront from './CollectibleFront';
import CollectibleBack from './CollectibleBack';

class Home extends Component {
  // constructor(props) {
  //   super(props)
  // }

  componentWillMount() {

  }

  render() {
    return (
      <div className="home-container">
      <h2>Featured</h2>
      <div className="collectibles-stream">
        <div className="collectibles-container">
            {this.props.collectibles.length > 0 ? this.props.collectibles.map((collectibleArr, i) => {
              return <CollectibleFront key={i} image={collectibleArr[3]} collectible={collectibleArr}/>
            }) : "Loading..."}
        </div>
      </div>
      <h2>Newest</h2>
      <div className="collectibles-stream">
        <div className="collectibles-container">
            {this.props.collectibles.length > 0 ? this.props.collectibles.map((collectibleArr, i) => {
              return <CollectibleFront key={i} image={collectibleArr[3]} collectible={collectibleArr}/>
            }) : "Loading..."}
        </div>
      </div>
      <h2>Other</h2>
      <div className="collectibles-stream">
        <div className="collectibles-container">
            {this.props.collectibles.length > 0 ? this.props.collectibles.map((collectibleArr, i) => {
              return <CollectibleFront key={i} image={collectibleArr[3]} collectible={collectibleArr}/>
            }) : "Loading..."}
        </div>
      </div>
      </div>
    );
  }
}

export default Home
