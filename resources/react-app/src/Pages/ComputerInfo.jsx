import React from 'react'
import Sidebar from '../Components/Sidebar'
import CPUInfoPage from './CPUInfoPage'
import DiskInfoPage from './DiskInfoPage'

function ComputerInfo() {
  return (
    <div className='App'>
        <CPUInfoPage/>
        <DiskInfoPage/>
    </div>
  )
}

export default ComputerInfo