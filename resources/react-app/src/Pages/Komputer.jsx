import React from 'react'
import {Link} from 'react-router-dom'
import pc_icon from "../assets/pc_icon.png"
import add_pc_icon from "../assets/add_icon.jpg"
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { Component } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/logo_inka.png"
export const withNavigation = (Component) => {
  return (props) => <Component {...props} navigate={useNavigate()} />;
};

class Komputer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      computers: [],
      currentComputer: [],
      SidebarDataB : [
        {
            title: "KOMPUTER",
            link: `/home`
        },
      ],
    };
  }
  fetchComputers() {
    axios
      .get('/api/computers')
      .then((response) => this.setState({ computers: response.data.data }));
  }
  componentDidMount() {
    this.fetchComputers();
  }

  deleteComputer = (event) => {
    if (!window.confirm('Are you sure you want to delete this device?')) {
      return;
    }
    axios.delete(`/api/computers/${event.target.value}`)
      .then(response => this.fetchComputers())
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
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
  
        {/* <div className='lower'>
  
          <NavLink to='/home'>Device List</NavLink>
  
        </div> */}
        </nav>
        <div className='container-fluid p-0'>
          <aside className="Sidebar">
            <ul className="SidebarListB">
              {this.state.SidebarDataB.map((val, key)=> {
                return (
                  <li 
                    key={key} 
                    className="row"
                    onClick={() => {
                      window.location.pathname = val.link;
                    }}
                  >
                    <div>
                      {val.title}
                    </div>
                    <NavLink to={val.link}></NavLink>
                  </li>
                )
              })}
            </ul>
          </aside>
          <main>
          <div className='content_container'>
              <h3 style={{textAlign: 'center'}}>DAFTAR PERANGKAT</h3>
              <div className='list_container'>
                <div className='columns'>
                  {this.state.computers.map((computer)=> (
                    <div className='column' key={computer.id}>
                      <NavLink 
                      to={`/viewDevice/${computer.mac_address}`}>
                        <img src={pc_icon} alt="" className='pc-icon'/>
                      </NavLink>
                      <h6>{computer.device_name}</h6>
                      <h6>{computer.ip_address}</h6>
                      <h6>{computer.mac_address}</h6>
                      <footer className='card-footer'>
                        <NavLink 
                        to={`/editDevice/${computer.id}`}
                        type="button"
                        className="card-footer-item">
                          EDIT
                        </NavLink>
                        <button 
                        value={computer.id}
                        onClick={this.deleteComputer}
                        type="button"
                        className="card-footer-item"
                        >
                          HAPUS
                        </button>
                      </footer>
                    </div>
                  ))}
                  <div className='add_column'>
      
                    <NavLink to="/addDevice">
                      <img src={add_pc_icon} alt="" className='add-pc-icon'/>
                    </NavLink>
                    <h6>TAMBAH PERANGKAT</h6>
                    
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )

  }
}

export default withNavigation(Komputer)