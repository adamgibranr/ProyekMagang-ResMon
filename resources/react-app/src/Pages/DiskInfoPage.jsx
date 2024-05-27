import React from 'react'
import DiskGauge from '../Components/DiskGauge'
import DiskLineChart from '../Components/DiskLineChart'
import {SidebarData} from '../Components/SidebarData'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'

function DiskInfoPage() {

    const {mac_address} = useParams();

    const initDiskPartitionArray = [
      {time: 1, x: {disk1: 0, disk2: 0}},
      {time: 2, x: {disk1: 0, disk2: 0}},
      {time: 3, x: {disk1: 0, disk2: 0}},
      {time: 4, x: {disk1: 0, disk2: 0}},
    ];

    const[diskSpeedArray, setDiskSpeedArray] = useState(null);
    const[diskPartitionArray, setDiskPartitionArray] =useState(initDiskPartitionArray);
    const[totalDiskSize, setTotalDiskSize] = useState(null)
    const[usedDiskSize, setUsedDiskSize] = useState(null)
    const[availableDiskSize, setAvailableDiskSize] = useState(null)
    const[totalDiskPercentage, setTotalDiskPercentage] = useState(null)


    useEffect(() => {
        axios.get("/api/computers/device-resources/"+mac_address).then((response) => {
          let device_resources = response.data.data.device_resources;

          console.log(
            JSON.parse(device_resources[device_resources.length - 1].disk_info)
          )

          const parsedDiskInfoJson = JSON.parse(device_resources[device_resources.length - 1].disk_info)

          let disk_total = 0
          let disk_used = 0
          let disk_available = 0


          for (const disk in parsedDiskInfoJson) {
            disk_total += parsedDiskInfoJson[disk].total_space
            disk_used += parsedDiskInfoJson[disk].used_space
            disk_available += parsedDiskInfoJson[disk].free_space
          }

          let disk_percentage = (disk_used/disk_total)*100

          console.log(
            disk_percentage
          )

          setDiskSpeedArray(device_resources.slice(-60).map((resource, index=60) => 
            ({
                time : index+1, x: JSON.parse(resource.disk_io_counters).write_speed, y: JSON.parse(resource.disk_io_counters).read_speed
            })
          ));
          setDiskPartitionArray(device_resources.slice(-60).map((resource, index=60) => 
            ({
                time : index+1, x: Object.fromEntries(
                  Object.entries(JSON.parse(resource.disk_info)).map(([key, value]) => [key, value.usage_percentage])
                )
            })
          ))
          setTotalDiskSize(parseFloat(disk_total).toFixed(1))
          setUsedDiskSize(parseFloat(disk_used).toFixed(1))
          setAvailableDiskSize(parseFloat(disk_available).toFixed(1))
          setTotalDiskPercentage(parseFloat(disk_percentage).toFixed(1))
        });

        

    }, []);


  return (
    <div>
        <div className="main_container">
            <div className="info_list">
              <div className='label'>
                <h3>Jumlah Penyimpanan Total : </h3>
                <h3>Jumlah Penyimpanan Digunakan : </h3>
                <h3>Jumlah Penyimpanan Tersedia : </h3>
              </div>
              <div className='output'>
                <h3><b>{totalDiskSize} GB</b></h3>
                <h3><b>{usedDiskSize} GB</b></h3>
                <h3><b>{availableDiskSize} GB</b></h3>
              </div>
            </div>
            <div className="info_gauge">
                <DiskGauge diskPercentage = {totalDiskPercentage}/>
            </div>
        </div>
        <div className="line_chart">
            <DiskLineChart diskDataSpeed={diskSpeedArray} diskPartition={diskPartitionArray}/>
        </div>
    </div>
  )
}

export default DiskInfoPage