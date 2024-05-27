import React from 'react'
import { Component } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import logo from "../assets/logo_inka.png"
export const withNavigation = (Component) => {
    return (props) => <Component {...props} navigate={useNavigate()} />;
};
export const withParams = (Component) => {
    return (props) => <Component {...props} params={useParams()} />;
};

class EditDevicePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          id: "",
          device_name: "",
          ip_address: "",
          mac_address: "",

          idInfo: "",
          device_nameInfo: "",
          ip_addressInfo: "",
          mac_addressInfo: "",

          errors: {},
          isLoading: false,
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
        if (this.state.isLoading) return;
        this.setState({
          errors: {},
          isLoading: true,
        });
        axios
          .put("/api/computers/" + this.state.id, {
            device_name: this.state.device_name,
            ip_address: this.state.ip_address,
            mac_address: this.state.mac_address,
          })
          .then((response) => this.props.navigate("/home"))
          .catch((error) => this.setState({ errors: error.response.data.errors }))
          .finally(() => this.setState({ isLoading: false }));
    };

    componentDidMount() {
        this.setState({ isLoading: true });
        axios
          .get("/api/computers/" + this.props.params.id)
          .then((response) => {
            this.setState({ id: response.data.data.id });
            this.setState({ device_name: response.data.data.device_name });
            this.setState({ ip_address: response.data.data.ip_address });
            this.setState({ mac_address: response.data.data.mac_address });

            this.setState({ idInfo: response.data.data.id });
            this.setState({ device_nameInfo: response.data.data.device_name });
            this.setState({ ip_addressInfo: response.data.data.ip_address });
            this.setState({ mac_addressInfo: response.data.data.mac_address });
          })
          .finally(() => this.setState({ isLoading: false }));
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
                    <h3 style={{textAlign: 'center'}}>EDIT PERANGKAT</h3>
                    <div className='info-list'>
                        <h5>Informasi Perangkat</h5>
                        <div className='edit-info'>
                            <h5>Nama Perangkat :</h5>
                            <h5>{this.state.device_nameInfo}</h5>
                        </div>
                        <div className='edit-info'>
                            <h5>IP address :</h5>
                            <h5>{this.state.ip_addressInfo}</h5>
                        </div>
                        <div className='edit-info'>
                            <h5>MAC address :</h5>
                            <h5>{this.state.mac_addressInfo}</h5>
                        </div>
            
                    </div>
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

// function EditDevicePage() {
//   return (
//     <div className="content_container">
//         <h3 style={{textAlign: 'center'}}>EDIT PERANGKAT</h3>
//         <div className='info-list'>
//             <h5>Info Perangkat</h5>
//             <h5>Nama Perangkat :</h5>
//             <h5>IP address :</h5>
//             <h5>MAC address :</h5>

//         </div>
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
//             <button>
//                 BATAL
//             </button>
//             <button type='submit'>
//                 SIMPAN
//             </button>
//         </div>
//     </div>
//   )
// }

export default withParams(withNavigation(EditDevicePage))