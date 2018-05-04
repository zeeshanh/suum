import React, {Component} from 'react';
import CollectibleFront from './CollectibleFront';
import CollectibleBack from './CollectibleBack';

class Home extends Component {
  constructor(props) {
    super(props)




  }

  componentWillMount() {
  }

  render() {
    var featured = this.props.collectibles;
     featured= featured.filter(function(col){
        console.log("halfdhfdhkfs" + col[9]);
          return col[9] == true;

        });

     var reversed = this.props.collectibles.slice().reverse();

     console.log(reversed);

    return (
      <div className="home-container">
      <h2>Featured</h2>
      <div className="collectibles-stream">
        <div className="collectibles-container">

            {this.props.collectibles.length > 0 ? featured.map((collectibleArr, i) => {
              return <CollectibleFront key={i} image={collectibleArr[3]} collectible={collectibleArr}/>
            }) : "Loading..."}
        </div>
      </div>
      <h2>Newest</h2>
      <div className="collectibles-stream">
        <div className="collectibles-container">
            {this.props.collectibles.length > 0 ? reversed.map((collectibleArr, i) => {
              return <CollectibleFront key={i} image={collectibleArr[3]} collectible={collectibleArr}/>
            }) : "Loading..."}
        </div>
      </div>
    
      </div>
    );
  }
}

export default Home
