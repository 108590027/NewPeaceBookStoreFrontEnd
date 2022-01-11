import React, {useState} from 'react'
import ReactApexChart from 'react-apexcharts'
import {toChartDateString} from '../../../../../system/helpers/DateUtil'
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

  const dayValue: number[] = new Array(30).fill(0)
  const dateTemp: number[] = []
  for (let k = 0; k < 30; k++) {
    dateTemp[k] = k + 1
  }

  data?.data.buyOrders.forEach((element, i) => {
    const date = new Date(element.created_at.replace('T', ' ')).getDate()
    dayValue[date - 1] += element.total_price
  })

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
      categories: dateTemp,
    },
    tooltip: {
      x: {
        format: 'YY/MM/dd HH:mm',
      },
    },
  }
  const lines = [
    {
      name: `lines title`,
      data: [] as number[],
    },
  ]
  if (data) {
    lines[0].data = dayValue
  }

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
