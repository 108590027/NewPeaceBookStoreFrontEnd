import React, {useState} from 'react'
import ReactApexChart from 'react-apexcharts'
import {toChartDateString} from '../../../../utils/DateUtil'
import getAnalyticInformationAPI, {
  AnalyticResponse,
} from '../../../auth/API/GetAnalyticInformationAPI'

export function Analytic() {
  const [data, setData] = useState<AnalyticResponse>()
  if (!data) {
    setTimeout(async () => {
      const result = await getAnalyticInformationAPI()
      if (!('message' in result)) {
        setData({...result})
      }
    })
  }

  const dateArr = [new Date(), new Date(), new Date(), new Date(), new Date()]
  const chartOptions = {
    chart: {
      height: 350,
      type: 'area' as 'area',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth' as 'smooth',
    },
    title: {
      text: `${'標題'}`,
      align: 'left' as 'left',
    },
    xaxis: {
      labels: {
        formatter: (value: string, timestamp: number): string => {
          return toChartDateString(new Date(value))
        },
      },
      categories: dateArr,
    },
    tooltip: {
      x: {
        format: 'yy/MM/dd HH:mm',
      },
    },
  }
  const lines = [
    {
      name: `lines title`,
      data: [1, 2, 3, 4, 5],
    },
  ]
  console.log(data)
  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body border-top p-9'>
        <div className='row mb-6'>
          <ReactApexChart options={chartOptions} series={lines} type='area' height={600} />

          <div className='col-lg-8'>
            <div className='row'>
              <div className='col-lg-6 fv-row'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
