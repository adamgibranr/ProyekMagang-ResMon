import React from "react";
import Chart from "react-apexcharts";

const options = {
  chart: {
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      dataLabels: {
        name: {
          offsetY: 20,
          color: "black",
          formatter: function () {
            return ["CPU Usage"];
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

function CPUGauge ({cpuData}) {

  const series = [Number(cpuData)]; // Percentage value to display

    return (
      <div>
        <h3 style={{textAlign: 'center'}}>Penggunaan CPU Runtime</h3>
        <Chart options={options} series={series} type="radialBar" width="400" />
      </div>
    )
}
export default CPUGauge