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
      <ul className="simple-navbar">
        {this.props.items.map((item, index) => (<li key={index}><Link to={item.url}>{item.text}</Link></li>))}
      </ul>
    )
  }
}

export default SimpleNav;
