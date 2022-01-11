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

  const dayBuyPrice: number[] = new Array(31).fill(0)
  const daySellPrice: number[] = new Array(31).fill(0)
  const starNumber: number[] = new Array(5).fill(0)
  const dateTemp: number[] = []
  for (let k = 0; k < 31; k++) {
    dateTemp[k] = k + 1
  }

  data?.data.buyOrders.forEach((element) => {
    const date = new Date(element.created_at.replace('T', ' ')).getDate()
    dayBuyPrice[date - 1] += element.total_price
  })
  data?.data.sellOrders.forEach((element) => {
    const date = new Date(element.created_at.replace('T', ' ')).getDate()
    daySellPrice[date - 1] += element.total_price
  })
  data?.data.rates.forEach((element, i) => {
    if (i === 0) {
      return
    }
    starNumber[i] = element
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
      text: `${'本月營收'}`,
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

  const chartOptions1 = {
    chart: {
      height: 350,
      type: 'bar' as 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth' as 'smooth',
    },
    title: {
      text: `${'評價數量'}`,
      align: 'left' as 'left',
    },
    xaxis: {
      categories: ['1星', '2星', '3星', '4星', '5星'],
    },
  }

  const lines = [
    {
      name: '買入',
      data: [] as number[],
    },
    {
      name: '賣出',
      data: [] as number[],
    },
  ]
  const bar = [
    {
      data: [] as number[],
    },
  ]
  if (data) {
    lines[0].data = dayBuyPrice
    lines[1].data = daySellPrice
    bar[0].data = starNumber
  }
  console.log(data)
  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body border-top p-9'>
        <div className='row mb-6'>
          <ReactApexChart options={chartOptions} series={lines} type='area' height={600} />
          <ReactApexChart options={chartOptions1} series={bar} type='bar' height={600} />
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
