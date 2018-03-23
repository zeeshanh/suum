import React, {Component} from 'react';

class CollectibleBack extends Component {
  // constructor(props) {
  //   super(props)
  // }

  componentWillMount() {

  }

  render() {
    return (
      <div className="collectible-back">
        {this.props.location.state.collectible[4] ?
          <iframe width="600" height="450" src={this.props.location.state.collectible[4]}></iframe> :
          <img src={this.props.location.state.collectible[3]} height="375" width="275" alt="Missing..."></img>
        }
        <p className="collectible-title">{this.props.location.state.collectible[1]}</p>
        <div className="collectible-info">
          <p>Price: {this.props.location.state.collectible[5].toString()}</p>
          <p>ID: {this.props.location.state.collectible[0].toString()}</p>
          {
            // <p>Owner: {this.props.location.state.collectible[6]}</p>
          }
          <p>Owner: Nate</p>
        </div>
        <p>{this.props.location.state.collectible[2]}</p>
      </div>
    );
  }
}

export default CollectibleBack
