import React, {Component} from 'react';

class CollectibleBack extends Component {
  // constructor(props) {
  //   super(props)
  // }

  componentWillMount() {

  }

  render() {
    return (
      <div className="CollectibleBack">
        <img src={this.props.location.state.collectible[3]} height="375" width="275" alt="Missing..."></img>
        <p>{this.props.location.state.collectible[4]}</p>
        <p>{this.props.location.state.collectible[1]}</p>
        <p>{this.props.location.state.collectible[2]}</p>
      </div>
    );
  }
}

export default CollectibleBack
