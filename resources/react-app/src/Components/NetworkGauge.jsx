import React from "react";
import Chart from "react-apexcharts";

const sentData = [10];
const recvData = [20]; // Percentage value to display
const optionsForSent = {
  chart: {
    height: 350,
    width: 350,
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      dataLabels: {
        name: {
          offsetY: 20,
          color: "black",
          formatter: function () {
            return ["Sent Through"];
          }
        },
        value: {
          color: "blue",
          offsetY: -30,
          fontSize: "25px"
        }
      }
    }
  }
};

const optionsForRecv = {
  chart: {
    height: 350,
    width: 350,
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      dataLabels: {
        name: {
          offsetY: 20,
          color: "black",
          formatter: function () {
            return ["Recv Through"];
          }
        },
        value: {
          color: "blue",
          offsetY: -30,
          fontSize: "25px"
        }
      }
    }
  }
};

function NetworkGauge () {
    return (
      <div>
        <h3 style={{textAlign: 'center'}}>Throughput Jaringan Runtime</h3>
        <div className='network-gauge'>
          <div>
        <Chart options={optionsForSent} series={sentData} type="radialBar" width="400" />
          </div>
          <div>
        <Chart options={optionsForRecv} series={recvData} type="radialBar" width="400" />
          </div>
        </div>
      </div>
    )
}
export default NetworkGauge