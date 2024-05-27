import React from 'react'
import {useNavigate} from 'react-router-dom'
import { Component } from 'react';
import logo from "../assets/logo_inka.png"
import { NavLink } from 'react-router-dom';
export const withNavigation = (Component) => {
    return (props) => <Component {...props} navigate={useNavigate()} />;
};

class AddDevicePage extends Component {

    // navigate = useNavigate();
    constructor(props) {
        super(props);
        this.state = {
          device_name: "",
          ip_address: "",
          mac_address: "",
          errors: {},
        };
        // this.handleDeviceNameChange = this.handleDeviceNameChange.bind(this);
        // this.handleIpAddressChange = this.handleIpAddressChange.bind(this);
        // this.handleMacAddressChange = this.handleMacAddressChange.bind(this);
    }

    // handleDeviceNameChange(event) {
    //     this.setState({ device_name: event.target.value });
    // }
    // handleIpAddressChange(event) {
    //     this.setState({ ip_address: event.target.value });
    // }
    // handleMacAddressChange(event) {
    //     this.setState({ mac_address: event.target.value });
    // }
    handleSubmit = (event) => {
        event.preventDefault();
        axios
          .post("/api/computers", {
            device_name: this.state.device_name,
            ip_address: this.state.ip_address,
            mac_address: this.state.mac_address,
          })
        // .post("/api/computers", {
        //     device_name: 'qwerty',
        //     ip_address: '123',
        //     mac_address: 'fff',
        //   })
          .then((response) => this.props.navigate("/home"))
          .catch((error) => this.setState({ errors: error.response.data.errors }));
    };
    
    handleCancel = () => {
        this.props.navigate("/home");
    };


    errorMessage(field) {
        return (
          <div className="text-red-600 mt-1">
            {this.state.errors?.[field]?.map((message, index) => {
              return <div key={index}>{message}</div>;
            })}
          </div>
        );
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
  
                    <div className='lower'>
            
                    <NavLink to='/home'>Device List</NavLink>
            
                    </div>
                </nav>

                <div className="content_container">
                    <h3 style={{textAlign: 'center'}}>TAMBAH PERANGKAT</h3>
                    <div className='form-container'>
                        <form onSubmit={this.handleSubmit}>
                            <label>Nama perangkat : 
                                <input type='text' id='device_name'  name="device_name"  onChange={(e) => this.setState({ device_name: e.target.value })}/>
                            </label>
                            <label>IP address : 
                                <input type='text' id='ip_address' name="ip_address"  onChange={(e) => this.setState({ ip_address: e.target.value })}/>
                            </label>
                            <label>MAC address : 
                                <input type='text' id='mac_address' name="mac_address"  onChange={(e) => this.setState({ mac_address: e.target.value })}/>
                            </label>
                            <div className='button-container'>
                                <button onClick={this.handleCancel}>
                                    BATAL
                                </button>
                                <button type='submit'>
                                    SIMPAN
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

// function AddDevicePage() {
//     const navigate = useNavigate();

//     const handleCancel = () => {
//         navigate('/home');
//     };

//   return (
//     <div className="content_container">
//         <h3 style={{textAlign: 'center'}}>TAMBAH PERANGKAT</h3>
//         <div className='form-container'>
//             <form>
//                 <label>Nama perangkat : 
//                     <input/>
//                 </label>
//                 <label>MAC address : 
//                     <input/>
//                 </label>
//                 <label>IP address : 
//                     <input/>
//                 </label>
//             </form>
//         </div>
//         <div className='button-container'>
//             <button onClick={handleCancel}>
//                 BATAL
//             </button>
//             <button type='submit'>
//                 SIMPAN
//             </button>
//         </div>
//     </div>
//   )
// }

export default withNavigation(AddDevicePage)