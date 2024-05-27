import React from 'react'
import { Component } from 'react'
import "../App.css"
import logo from "../assets/logo_inka.png"
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import axios from 'axios'
export const withNavigation = (Component) => {
  return (props) => <Component {...props} navigate={useNavigate()} />;
};
export const withParams = (Component) => {
  return (props) => <Component {...props} params={useParams()} />;
};

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      device_name: "",
      ip_address: "",
      mac_address: "",

      errors: {},
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get("/api/computers/" + 2)
      .then((response) => {
        this.setState({ id: response.data.data.id });
        this.setState({ device_name: response.data.data.device_name });
        this.setState({ ip_address: response.data.data.ip_address });
        this.setState({ mac_address: response.data.data.mac_address });
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    return (
      <nav className="Navbar">
        <div className='upper'>
          <img src={logo} alt="" className='logo'/>
  
          <div className="title">
            <h1>Resource Monitor</h1>
          </div>
  
          <ul>
            <li>{this.state.device_name}</li>
            <li>{this.state.ip_address}</li>
            <li>{this.state.mac_address}</li>
          </ul>
  
        </div>
  
        <div className='lower'>
  
          <NavLink to='/home'>Device List</NavLink>
  
        </div>
      </nav>
    )
  }
}

export default withParams(Navbar)