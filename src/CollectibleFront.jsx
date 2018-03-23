import React, {Component} from 'react'

class CollectibleFront extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {

  }

  render() {
    return (
      <div className="CollectibleFront">
        <img src={this.props.collectible.image} height="375" width="275"></img>
      </div>
    );
  }
}

export default CollectibleFront
