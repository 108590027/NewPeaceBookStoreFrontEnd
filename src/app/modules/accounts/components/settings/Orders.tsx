import React, {useState} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {RootState} from '../../../../../setup'
import {toDateString} from '../../../../utils/DateUtil'
import {IAuthState} from '../../../auth/redux/AuthRedux'
import getAuthOrdersAPI from '../../../order/API/GetAuthOrdersAPI'
import {OrderState} from '../../../order/redux/OrderRedux'

export function Orders() {
  const authState: IAuthState = useSelector<RootState>(({auth}) => auth, shallowEqual) as IAuthState
  const orderState: OrderState = useSelector<RootState>(
    ({order}) => order,
    shallowEqual
  ) as OrderState
  const [loadState, setLoadState] = useState(false)
  const orders = orderState.orders.filter((order) => {
    return order.user_id === authState.auth?.user?.id
  })
  if (authState.auth?.user) {
    if (orders.length === 0 && !loadState) {
      setLoadState(true)
      getAuthOrdersAPI()
    }
  }
  return (
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
                    <Link className='btn btn-primary btn-sm' to={`/account/order/${order.id}`}>
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
  )
}
