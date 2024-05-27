import React, { Component } from 'react'
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';
import ColoredBoxLabel from './ColouredBoxLabel';

function DiskLineChart({diskDataSpeed, diskPartition}) {

  const dataKeys = Object.keys(diskPartition[0]).filter(key => key !== 'time');

  const colors = [
    "#80ff40", "#ffbf40", "#ff8040", "#ff4040",
    "#bf4080", "#bf40bf", "#8040bf", "#4040bf"
  ];

    return (
      <div className='line-chart_container'>
        <div>
        <h3 style={{textAlign: 'center'}}>Transfer Data</h3>
        <AreaChart width={800} height={500} data={diskDataSpeed} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Area type="monotone" dataKey="x" stroke="#green" fill='green'/>
            <Area type="monotone" dataKey="y" stroke="#blue" fill='blue'/>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="time" type="number" domain={[1, 60]}/>
            <YAxis type="number" />
            <Tooltip />
        </AreaChart>
        <div className='colour-indicator'>
          <ColoredBoxLabel color={'green'} label="Write Speed (MBps)" />
          <ColoredBoxLabel color={'blue'} label="Read Speed (MBps)" />
        </div>
        </div>
        <div>
        <h3 style={{textAlign: 'center'}}>Utilisasi Partisi</h3>
        <LineChart width={800} height={500} 
            data={diskPartition}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            {Object.keys(diskPartition[0].x).map((disk, index) => (
              <Line key={index} type="monotone" dataKey={`x.${disk}`} stroke={colors[index % colors.length]} dot={false} strokeWidth={2} />
            ))}
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="time" type="number" domain={[1, 60]}/>
            <YAxis type="number" domain={[0, 100]}/>
            <Tooltip />
        </LineChart>
        <div className='colour-indicator'>
          {Object.keys(diskPartition[0].x).map((disk, index) => (
             <ColoredBoxLabel color={colors[index % colors.length]} label={`${disk}`} />
          ))}
        </div>
      </div>
      </div>
    )
}
export default DiskLineChart