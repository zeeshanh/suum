import React, {Component} from 'react';
import CollectibleFront from './CollectibleFront';
import CollectibleBack from './CollectibleBack';

class Profile extends Component {
  // constructor(props) {
  //   super(props)
  // }

  componentWillMount() {

  }

  render() {
    return (
      <div>
      <p>My address: {this.props.address}</p>
        <div>
          {this.props.collectibles.length > 0 ? this.props.collectibles.map((collectibleArr, i) => {
            return <CollectibleFront key={i} image={collectibleArr[3]} collectible={collectibleArr}/>
          }) : "Loading..."}
        </div>

      </div>
    );
  }
}

export default Profile
