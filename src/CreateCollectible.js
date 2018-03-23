import React from 'react'

class CreateCollectible extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {Name: '',
                  desc:'',
                  price: 0,
                  imgLink: ''};

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

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

  handleSubmit(event) {
    if (this.state.Name == "" || this.state.desc == "" || this.state.price == "" || this.state.imgLink ==""|| isNaN(this.state.price)){
          alert("Invalid input format");
        }
    //alert('A name was submitted: ' + this.state.value);
    else{
      event.preventDefault();
      this.props.web3.eth.getAccounts((error, accounts) => {
      this.props.collectionInstance._createCol(this.state.Name,this.state.desc, this.state.imgLink, "", this.state.price, {from: accounts[0]});
      })
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          Name:
          <input type="text" value={this.state.Name} onChange={this.handleNameChange} />
          <br/>
          Description:
          <input type="text" value={this.state.desc} onChange={this.handleDescChange} />
          <br/>
          Price:
          <input type="text" value={this.state.price} onChange={this.handlePriceChange} />
          <br/>
          Content :
          <input type="text" value={this.state.imgLink} onChange={this.handleContentChange} />
        <br/>
        <input type="submit" value="Create" />
      </form>
    );
  }
}

export default CreateCollectible;