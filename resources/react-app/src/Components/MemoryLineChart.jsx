import React, { Component } from 'react'
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import ColoredBoxLabel from './ColouredBoxLabel';

function MemoryLineChart({memoryData}) {
    return (
      <div>
        <h3 style={{textAlign: 'center'}}>Penggunaan Memory</h3>
        <AreaChart width={1500} height={500} data={memoryData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill='blue'/>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="time" type="number" domain={[1, 60]}/>
            <YAxis type="number" domain={[0, 100]}/>
            <Tooltip />
        </AreaChart>
        <div className='colour-indicator'>
          <ColoredBoxLabel color={'blue'} label="Utilisasi RAM (%)" />
        </div>
      </div>
    )
}
export default MemoryLineChart