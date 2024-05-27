import React from 'react'
import "../App.css"
import { NavLink, Outlet } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import logo from "../assets/logo_inka.png"
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const Sidebar = () => {

  const {mac_address} = useParams();

  const [compId, setCompId] = useState(null);
  const [deviceName, setDeviceName] = useState(null);
  const [ipAddress, setIpAddress] = useState(null);
  const [macAddress, setMacAddress] = useState(null);

  useEffect(() => {
    axios.get("/api/computers/device-resources/"+mac_address).then((response) => {
      setCompId(response.data.data.id);
      setDeviceName(response.data.data.device_name);
      setIpAddress(response.data.data.ip_address);
      setMacAddress(response.data.data.mac_address);
    });
  }, []);


  const SidebarData = [
    {
        title: "CPU",
        link: `viewDevice/${mac_address}/cpu`
    },
    {
        title: "Memory",
        link: `viewDevice/${mac_address}/memory`
    },
    {
        title: "Disk",
        link: `viewDevice/${mac_address}/disk`
    },
    {
        title: "Network",
        link: `viewDevice/${mac_address}/network`
    }
  ];

  const SidebarDataB = [
    {
        title: "KOMPUTER",
        link: `/home`
    },
  ];

  return (
    <div>
      <nav className="Navbar">
        <div className='upper'>
          <img src={logo} alt="" className='logo'/>
          <div className="title">
            <h1>Resource Monitor</h1>
          </div>
  
          <ul>
            <li><b>{deviceName}</b></li>
            <li><b>{ipAddress}</b></li>
            <li><b>{macAddress}</b></li>
          </ul>
  
        </div>
        {/*   
        <div className='lower'>
  
          <NavLink to='/home'>Device List</NavLink>
  
        </div> */}
      </nav>

      <div className="container-fluid p-0">
        <aside className="Sidebar">
          <ul className="SidebarList">
            {SidebarData.map((val, key)=> {
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
          <ul className="SidebarListB">
            {SidebarDataB.map((val, key)=> {
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
          <Outlet/>
        </main>
      </div>
    </div>
  )
}

export default Sidebar