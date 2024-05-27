import React from 'react'
import "../App.css"
import CPUGauge from '../Components/CPUGauge'
import CPULineChart from '../Components/CPULineChart'
import {SidebarData} from '../Components/SidebarData'
import { NavLink } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CPUInfoPage() {

    const {mac_address} = useParams();

    const initCpuCoreArray = [
      {time: 1, x: [0, 0, 0]},
      {time: 2, x: [0, 0, 0]},
      {time: 3, x: [0, 0, 0]},
      {time: 4, x: [0, 0, 0]},
    ];


    const [cpuCores, setCpuCores] = useState(null);
    const [cpuThread, setCpuThread] = useState(null);
    const [cpuBaseFreq, setCpuBaseFreq] = useState(null);
    // const [cpuRunFreq, setCpuRunFreq] = useState(null);
    const [cpuRuntime, setCpuRuntime] = useState(null);
    const [cpuRuntimeArray, setCpuRuntimeArray] = useState(null);
    const [cpuCoreArray, setCpuCoreArray] = useState(initCpuCoreArray);
  
    useEffect(() => {
      axios.get("/api/computers/device-resources/"+mac_address).then((response) => {
        let device_resources = response.data.data.device_resources;
        setCpuCores(JSON.parse(device_resources[device_resources.length - 1].cpu_info).physical_cores);
        setCpuThread(JSON.parse(device_resources[device_resources.length - 1].cpu_info).total_cores);
        // setCpuRunFreq(JSON.parse(device_resources[device_resources.length - 1].cpu_info).cpu_runfreq);
        setCpuBaseFreq(JSON.parse(device_resources[device_resources.length - 1].cpu_info).processor_speed);
        setCpuRuntime(JSON.parse(device_resources[device_resources.length - 1].cpu_info).total_cpu_usage);
        setCpuRuntimeArray(device_resources.slice(-60).map((resource, index=60) => ({time : index+1, uv: JSON.parse(resource.cpu_info).total_cpu_usage})));
        setCpuCoreArray(device_resources.slice(-60).map((resource, index=60) => ({time : index+1, x: JSON.parse(resource.cpu_info).cpu_usage_per_core})));

        console.log(cpuCores)

      });

      console.log(cpuCores)
    }, []);

    const transformedCpuCoreArray = cpuCoreArray.map(entry => {
      const newObj = { time: entry.time };
      entry.x.forEach((value, index) => {
        newObj[`y${index + 1}`] = value;
      });
      return newObj;
    });



  return (
    <div>
        <div className="main_container">
            <div className="info_list">
                <div className='label'>
                    <h3>Jumlah Inti CPU : </h3>
                    <h3>Jumlah Thread : </h3>
                    <h3>Kecepatan Dasar CPU : </h3>
                    <h3>Kecepatan Runtime CPU : </h3>
                </div>
                <div className='output'>
                    <h3><b>{cpuCores} Cores</b></h3>
                    <h3><b>{cpuThread} Thread</b></h3>
                    <h3><b>{cpuBaseFreq} GHz</b></h3>
                    <h3><b>{cpuRuntime} %</b></h3>
                </div>
            </div>
            <div className="info_gauge">
                <CPUGauge cpuData={cpuRuntime}/>
            </div>
        </div>
        <div className="line_chart">
            <CPULineChart cpuData={cpuRuntimeArray} cpuCoreData={transformedCpuCoreArray}/>
        </div>
    </div>
  )

}

export default CPUInfoPage