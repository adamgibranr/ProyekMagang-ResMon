import React, { useState } from 'react'
import MemoryGauge from '../Components/MemoryGauge'
import MemoryLineChart from '../Components/MemoryLineChart'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function MemoryInfoPage() {

    const {mac_address} = useParams();

    const[memTotal, setMemTotal] = useState(null);
    const[memUsed, setMemUsed] = useState(null);
    const[memAvailable, setMemAvailable] = useState(null);
    const[memPercentage, setMemPercentage] = useState(null);
    const[memPercentageArray, setMemPercentageArray] = useState(null);


    useEffect(() => {
        axios.get("/api/computers/device-resources/"+mac_address).then((response) => {
          let device_resources = response.data.data.device_resources;
          setMemTotal(parseFloat((JSON.parse(device_resources[device_resources.length - 1].memory_info).total_memory).toFixed(1)));
          setMemUsed(parseFloat((JSON.parse(device_resources[device_resources.length - 1].memory_info).used_memory).toFixed(1)));
          setMemAvailable(parseFloat((JSON.parse(device_resources[device_resources.length - 1].memory_info).available_memory).toFixed(1)));
          setMemPercentage(JSON.parse(device_resources[device_resources.length - 1].memory_info).memory_percentage);
          setMemPercentageArray(device_resources.slice(-60).map((resource, index=60) => ({time : index+1, uv: JSON.parse(resource.memory_info).memory_percentage})));
  
        });
    }, []);


  return (
    <div>
        <div className="main_container">
            <div className="info_list">
                <div className='label'>
                    <h3>Jumlah Memori Total : </h3>
                    <h3>Jumlah Memori Digunakan : </h3>
                    <h3>Jumlah Memori Tersedia : </h3>
                </div>
                <div className='output'>
                    <h3><b>{memTotal} GB</b></h3>
                    <h3><b>{memUsed} GB</b></h3>
                    <h3><b>{memAvailable} GB</b></h3>

                </div>

            </div>
            <div className="info_gauge">
                <MemoryGauge memoryData = {memPercentage}/>
            </div>
        </div>
        <div className="line_chart">
            <MemoryLineChart memoryData = {memPercentageArray}/>
        </div>
    </div>
  )
}

export default MemoryInfoPage