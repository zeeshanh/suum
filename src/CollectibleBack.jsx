class CollectibleBack extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {

  }

  render() {
    return (
      <div className="CollectibleBack">
        <p>{this.props.collectible.videoURL}</p>
        <p>{this.props.collectible.title}</p>
        <p>{this.props.collectible.description}</p>
      </div>
    );
  }
}

export default CollectibleBack
