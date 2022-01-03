/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useState} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {match} from 'react-router-dom'
import {toast} from 'react-toastify'
import getAuthOrderAPI from '../../order/API/GetAuthOrderAPI'
import {OrderModel} from '../../order/redux/OrderModel'

interface Props {
  match: match<{id: string}>
}

const OrderDetail: FC<Props> = (props: Props) => {
  const [orderId, setOrderId] = useState(0)
  const [orderData, setOrderData] = useState({} as OrderModel)
  if (orderId !== parseInt(props.match.params.id)) {
    setOrderId(parseInt(props.match.params.id))
    ;(async () => {
      const res = await getAuthOrderAPI(parseInt(props.match.params.id))
      if ('id' in res) {
        setOrderData(res)
      } else {
        toast.error(`訂單資料讀取失敗：${res.message}`)
      }
    })()
  }
  return (
    <>
      <div className='card mb-5 mb-xl-10' id='OrderDetail'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>詳細資訊</h3>
          </div>
        </div>

        <div className='card-body'>
          <div className='row mb-2'>
            <label className='col-lg-4 fw-bold text-muted'>購買時間</label>
            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{orderData.created_at}</span>
            </div>
          </div>
        </div>
        <div className='card-body'>
          <div className='row mb-2'>
            <label className='col-lg-4 fw-bold text-muted'>商店</label>
            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{orderData.merchant?.name}</span>
            </div>
          </div>
        </div>
        <div className='card-body'>
          <div className='row mb-2'>
            <label className='col-lg-4 fw-bold text-muted'>金額</label>
            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{orderData.total_price}</span>
            </div>
          </div>
        </div>
        <div className='card-body'>
          <div className='row mb-2'>
            <label className='col-lg-4 fw-bold text-muted'>狀態</label>
            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{orderData.status}</span>
            </div>
          </div>
        </div>
      </div>

      <div className='col-12'>
        <div className={`card card-xxl-stretch mb-5 mb-xxl-8 table-responsive`}>
          <div className='table-responsive'>
            <table className='table table-hover table-rounded table-striped gy-4 gs-7 text-center align-middle'>
              <thead>
                <tr className='fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200'>
                  <th>ID</th>
                  <th>名稱</th>
                  <th>數量</th>
                  <th>價格</th>
                </tr>
              </thead>
              <tbody>
                {orderData.order_items?.map((orderItem) => (
                  <tr key={orderItem.id}>
                    <td>{orderItem.id}</td>
                    <td>{orderItem.item.name}</td>
                    <td>{orderItem.quantity}</td>
                    <td>{orderItem.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderDetail
