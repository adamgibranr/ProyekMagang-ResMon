import React, { useState } from 'react'
import NetworkGauge from '../Components/NetworkGauge'
import NetworkLineChart from '../Components/NetworkLineChart'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

function NetworkInfoPage() {

  const  {mac_address} = useParams();

  const [netSpeedArray, setNetSpeedArray] = useState(null);
  const [ipAddress, setIpAddress] = useState(null);
  const [macAddress, setMacAddress] = useState(null);

  useEffect(() => {
    axios.get("/api/computers/device-resources/"+mac_address).then((response) => {
      let device_resources = response.data.data.device_resources;
      setNetSpeedArray(device_resources.slice(-60).map((resource, index=60) => 
        ({
            time : index+1, x: JSON.parse(resource.net_io_counters).bytes_sent_speed, y: JSON.parse(resource.net_io_counters).bytes_recv_speed
        })
      ));
      setIpAddress(response.data.data.ip_address);
      setMacAddress(response.data.data.mac_address);
    });
}, []);

  return (
    <div>
        <div className="main_container">
            <div className="info_list">
              <div className='label'>
                <h3>IP Address :</h3>
                <h3>MAC Address :</h3>
              </div>
              <div className='output'>
                <h3><b>{ipAddress}</b></h3>
                <h3><b>{macAddress}</b></h3>
              </div>

            </div>
            <div className="info_gauge">
                <NetworkGauge />
            </div>
        </div>
        <div className="line_chart">
            <NetworkLineChart netDataSpeed = {netSpeedArray}/>
        </div>
    </div>
  )
}

export default NetworkInfoPage