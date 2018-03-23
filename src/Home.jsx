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
      <div className="collectibles-container">
          {this.props.collectibles.length > 0 ? this.props.collectibles.map((collectibleArr, i) => {
            return <CollectibleFront key={i} image={collectibleArr[3]} collectible={collectibleArr}/>
          }) : "Loading..."}
      </div>
    );
  }
}

export default Home
