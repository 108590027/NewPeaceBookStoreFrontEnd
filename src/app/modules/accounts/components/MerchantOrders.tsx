import React, {useState} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {RootState} from '../../../../setup'
import {PageLink, PageTitle} from '../../../../system/layout/core'
import {toDateString} from '../../../../system/helpers/DateUtil'
import {IAuthState} from '../../auth/redux/AuthRedux'
import getAuthOrdersAPI from '../../order/API/GetAuthOrdersAPI'
import getMerchantOrdersAPI from '../../order/API/GetMerchantOrdersAPI'
import {OrderModel} from '../../order/redux/OrderModel'

// 麵包屑導航
const BreadCrumbs: Array<PageLink> = []

const MerchantOrders = () => {
  const authState: IAuthState = useSelector<RootState>(({auth}) => auth, shallowEqual) as IAuthState
  const [load, setLoad] = useState(false)
  const [orders, setOrders] = useState<OrderModel[]>([])
  const [loadState, setLoadState] = useState(false)
  if (authState.auth?.user) {
    if (orders.length === 0 && !loadState) {
      setLoadState(true)
      getAuthOrdersAPI()
    }
  }
  if (!load) {
    setLoad(true)
    ;(async () => {
      const result = await getMerchantOrdersAPI()
      if (!('message' in result)) {
        setOrders([...result])
      }
    })()
  }
  return (
    <>
      <PageTitle breadcrumbs={BreadCrumbs}>{`管理商店訂單`}</PageTitle>
      <div className='col-12'>
        <div className={`card card-xxl-stretch mb-5 mb-xxl-8 table-responsive`}>
          <div className='table-responsive'>
            <table className='table table-hover table-rounded table-striped gy-4 gs-7 text-center align-middle'>
              <thead>
                <tr className='fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200'>
                  <th>時間</th>
                  <th>狀態</th>
                  <th>總價</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{toDateString(new Date(order.created_at))}</td>
                    <td>
                      {order.status === 2 ? (
                        <span className='badge badge-info'>已完成</span>
                      ) : order.status === 1 ? (
                        <span className='badge badge-success'>已付款</span>
                      ) : (
                        <span className='badge badge-danger'>已下單</span>
                      )}
                    </td>
                    <td>{order.total_price}</td>
                    <td>
                      <Link
                        className='btn btn-primary btn-sm'
                        to={`/account/MerchantOrder/${order.id}`}
                      >
                        <i className='bi bi-file-text fs-5'></i>詳細
                      </Link>
                    </td>
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

export default MerchantOrders
