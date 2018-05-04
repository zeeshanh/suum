import React from 'react'

class CreateCollectible extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {Name: '',
                  desc:'',
                  price: 0,
                  imgLink: '',
                  quantity:0,
                  creator: ''};

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleCreatorChange = this.handleCreatorChange.bind(this);

  }

  handleQuantityChange(event){
    this.setState({quantity:event.target.value});
  }

  handleNameChange(event) {
    this.setState({Name: event.target.value});
  }

  handleDescChange(event) {
    this.setState({desc: event.target.value});
  }

  handlePriceChange(event) {
    this.setState({price: event.target.value});
  }

  handleContentChange(event) {
    this.setState({imgLink: event.target.value});
  }

  handleCreatorChange(event){
    this.setState({creator: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.creator === "" || this.state.Name === "" || this.state.desc === "" || this.state.price === "" || this.state.imgLink === ""|| isNaN(this.state.price) || isNaN(this.state.quantity)){
          alert("Invalid input format");
        }
    else{
      const onEth = Number(1000000000000);
      this.props.web3.eth.getAccounts((error, accounts) => {
        console.log(accounts);
      this.props.collectibleInstance._createCol(this.state.Name,this.state.desc, this.state.imgLink, "", Number(this.state.price)*onEth, this.state.quantity, this.state.creator,{from: accounts[0]});
      window.location = '/profile'
      })
    }
  }

  render() {
    return (
      <div className="create-collectible-container">
      <div className="create-collectible-form">
      <h2> Create New Collectible: </h2>
      <form onSubmit={this.handleSubmit}>
        <div className="create-collectible-field">
          Creator:
          <br/>
          <input className="create-collectible-input" type="text" value={this.state.Creator} onChange={this.handleCreatorChange} />
        </div>
        <div className="create-collectible-field">
          <br/>
          Name:
          <br/>
          <input className="create-collectible-input" type="text" value={this.state.Name} onChange={this.handleNameChange} />
          <br/>
        </div>
        <div className="create-collectible-field">
          Description:
          <input className="create-collectible-input" type="text" value={this.state.desc} onChange={this.handleDescChange} />
          <br/>
        </div>
        <div className="create-collectible-field">
          Price:
          <input className="create-collectible-input" type="text" value={this.state.price} onChange={this.handlePriceChange} />
        </div>
          <div className="create-collectible-field">
          <br/>
          Image URL :
          <input className="create-collectible-input" type="text" value={this.state.imgLink} onChange={this.handleContentChange} />

        <br/>
          </div>
        <div className="create-collectible-field">
          Quantity:
          <input className="create-collectible-input" type="text" value={this.state.quantity} onChange={this.handleQuantityChange}/>
          <br/>
          </div>

        <input className="large-submit-button" type="submit" value="Create" />
      </form>
      </div>
      </div>
    );
  }
}

export default CreateCollectible;
