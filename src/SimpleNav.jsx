import React, {Component} from 'react'
import {Link} from 'react-router-dom';

// const SimpleNav = (props) => (
//  <ul>
//    {props.items.map((item, index) => (<li key={index}><Link to={item.url}>{item.text}</Link></li>))}
//  </ul>
// );


class SimpleNav extends Component {
  render() {
    return (
      <div className="simple-navbar">
      <ul className="simple-navbar">
        <div className="navbar-left">
          <li className="navbar-item" id="logo"><img className="logo-image" src={this.props.items[0].image}></img></li>
          <li className="navbar-item logo-text"><Link to="/">SUUM</Link></li>
          <li className="navbar-item"><Link to="/marketplace">Marketplace</Link></li>
        </div>
        <div className="navbar-right">
          {this.props.items.map((item, index) => (<li className="navbar-item" key={index}><Link to={item.url? item.url: ""}>{item.text}</Link></li>))}
        </div>
      </ul>
      </div>
    )
  }
}

export default SimpleNav;
