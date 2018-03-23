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
      <div>
        <div>
          {this.props.collectibles.length > 0 ? this.props.collectibles.map((collectibleArr, i) => {
            return <CollectibleFront key={i} image={collectibleArr[2]} />
          }) : "Loading..."}
        </div>
        <div>
          {this.props.collectibles.length > 0 ? <CollectibleBack videoURL={this.props.collectibles[0][3]} title={this.props.collectibles[0][0]} description={this.props.collectibles[0][1]} />: "Loading..."}
        </div>
      </div>
    );
  }
}

export default Home
