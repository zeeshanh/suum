import React, {Component} from 'react';

class CollectibleFront extends Component {
  // constructor(props) {
  //   super(props)
  // }

  componentWillMount() {

  }

  render() {
    return (
      <div className="CollectibleFront">
        <img src={this.props.image} height="375" width="275" alt="Missing..."></img>
      </div>
    );
  }
}

export default CollectibleFront
