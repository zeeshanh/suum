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
        <p>{this.props.videoURL}</p>
        <p>{this.props.title}</p>
        <p>{this.props.description}</p>
      </div>
    );
  }
}

export default CollectibleBack
