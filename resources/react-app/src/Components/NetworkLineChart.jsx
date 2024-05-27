import React, { Component } from 'react'
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import ColoredBoxLabel from './ColouredBoxLabel';

function NetworkLineChart({netDataSpeed}) {

    return (
      <div>
        <h3 style={{textAlign: 'center'}}>Throughput Jaringan</h3>
        <AreaChart width={1500} height={500} data={netDataSpeed} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Area type="monotone" dataKey="x" stroke="#8884d8" fill='green'/>
            <Area type="monotone" dataKey="y" stroke="#8784d9" fill='blue'/>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="time" type="number" domain={[1, 60]}/>
            <YAxis type="number" />
            <Tooltip />
        </AreaChart>
        <div className='colour-indicator'>
          <ColoredBoxLabel color={'green'} label="Sent Speed (MBps)" />
          <ColoredBoxLabel color={'blue'} label="Receive Speed (MBps)" />
        </div>
      </div>
    )
}
export default NetworkLineChart