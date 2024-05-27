import React, { Component } from 'react'
import {AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line, } from 'recharts';
import ColoredBoxLabel from './ColouredBoxLabel';

function CPULineChart({cpuData, cpuCoreData}) {

  const boxStyle = {
    width: '20px',
    height: '20px',
    backgroundColor: 'blue',
    display: 'inline-block',
    marginRight: '5px',
  };

  const dataKeys = Object.keys(cpuCoreData[0]).filter(key => key !== 'time');

  const colors = [
    "#80ff40", "#ffbf40", "#ff8040", "#ff4040",
    "#bf4080", "#bf40bf", "#8040bf", "#4040bf",
    "#4080bf", "#40bfbf", "#40bf80", "#40bf40",
    "#80bf40", "#bfbf40", "#bf8040", "#bf4040"
  ];

    return (
      <div className='cpu-line-chart'>
      <div>
        <h3 style={{textAlign: 'center'}}>Penggunaan CPU</h3>
        <AreaChart width={800} height={500} 
            data={cpuData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="blue" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="time" type="number" domain={[1, 60]}/>
            <YAxis type="number" domain={[0, 100]}/>
            <Tooltip />
        </AreaChart>
        <div className='colour-indicator'>
          <ColoredBoxLabel color={'blue'} label="Utilisasi CPU (%)" />
        </div>
      </div>
      <div>
        <h3 style={{textAlign: 'center'}}>Penggunaan Thread CPU</h3>
        <LineChart width={800} height={500} 
            data={cpuCoreData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            {dataKeys.map((key, index) => (
              <Line type="monotone" key={key} dataKey={key} stroke={colors[index % colors.length]} dot={false} strokeWidth={2}/>
            ))}
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="time" type="number" domain={[1, 60]}/>
            <YAxis type="number" domain={[0, 100]}/>
            <Tooltip />
        </LineChart>
        <div className='colour-indicator'>
          {dataKeys.map((key, index) => (
            <ColoredBoxLabel color={colors[index % colors.length]} label={`Thread ${index + 1}`}/>
          ))}
        </div>
      </div>
      </div>
    )
}
export default CPULineChart