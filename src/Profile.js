import React, {Component} from 'react';
import CollectibleFront from './CollectibleFront';
import CollectibleBack from './CollectibleBack';

class Profile extends Component {
  // constructor(props) {
  //   super(props)
  // }

  componentWillMount() {
  //  <p>My address: {this.props.address}</p>

  }

  render() {
    return (
      <div className="my-collectibles">

            {this.props.collectibles.length > 0 ? this.props.collectibles.map((collectibleArr, i) => {
              return <CollectibleFront key={i} image={collectibleArr[3]} collectible={collectibleArr}/>
            }) : "Loading..."}
      </div>
    );
  }
}

export default Profile
