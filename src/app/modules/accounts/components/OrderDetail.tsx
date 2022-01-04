/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useState} from 'react'
import {Link, match} from 'react-router-dom'
import {toast} from 'react-toastify'
import {KTSVG, toAbsoluteUrl} from '../../../../system/helpers'
import {PageLink, PageTitle} from '../../../../system/layout/core'
import {toSlimDateString} from '../../../utils/DateUtil'
import getAuthOrderAPI from '../../order/API/GetAuthOrderAPI'
import {OrderModel} from '../../order/redux/OrderModel'

interface Props {
  match: match<{id: string}>
}

// 麵包屑導航
const BreadCrumbs: Array<PageLink> = [
  {
    title: '歷史訂單記錄',
    path: '/account/orders',
    isSeparator: false,
    isActive: false,
  },
]

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
      <PageTitle breadcrumbs={BreadCrumbs}>{`訂單資訊`}</PageTitle>
      <div className='post d-flex flex-column-fluid' id='kt_post'>
        <div id='kt_content_container' className='container-xxl'>
          <div className='d-flex flex-column gap-7 gap-lg-10'>
            <div className='d-flex flex-column flex-xl-row gap-7 gap-lg-10'>
              <div className='card card-flush py-4 flex-row-fluid'>
                <div className='card-header'>
                  <div className='card-title'>
                    <h2>訂單資訊</h2>
                  </div>
                </div>
                <div className='card-body pt-0'>
                  <table className='table align-middle table-row-bordered mb-0 fs-6 gy-5 min-w-300px'>
                    <tbody className='fw-bold text-gray-600'>
                      <tr>
                        <td className=''>
                          <div className='d-flex align-items-center'>
                            <span className='svg-icon svg-icon-2 me-2'>
                              <KTSVG
                                path='/media/icons/duotune/files/fil002.svg'
                                className='svg-icon-4 me-1'
                              />
                            </span>
                            下訂日期
                          </div>
                        </td>
                        <td className='fw-bolder'>
                          {toSlimDateString(new Date(orderData.created_at))}
                        </td>
                      </tr>
                      <tr>
                        <td className='text-muted'>
                          <div className='d-flex align-items-center'>
                            <span className='svg-icon svg-icon-2 me-2'>
                              <KTSVG
                                path='/media/icons/duotune/communication/com006.svg'
                                className='svg-icon-4 me-1'
                              />
                            </span>
                            狀態
                          </div>
                        </td>
                        <td className='fw-bolder'>
                          {orderData.status === 2 ? (
                            <span className='badge badge-info'>已完成</span>
                          ) : orderData.status === 1 ? (
                            <span className='badge badge-success'>已付款</span>
                          ) : (
                            <span className='badge badge-danger'>已下單</span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className='text-muted'>
                          <div className='d-flex align-items-center'>
                            <span className='svg-icon svg-icon-2 me-2'>
                              <KTSVG
                                path='/media/icons/duotune/finance/fin008.svg'
                                className='svg-icon-4 me-1'
                              />
                            </span>
                            總金額
                          </div>
                        </td>
                        <td className='fw-bolder'>${orderData.total_price}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='card card-flush py-4 flex-row-fluid'>
                <div className='card-header'>
                  <div className='card-title'>
                    <h2>買家資訊</h2>
                  </div>
                </div>
                <div className='card-body pt-0'>
                  <table className='table align-middle table-row-bordered mb-0 fs-6 gy-5 min-w-300px'>
                    <tbody className='fw-bold text-gray-600'>
                      <tr>
                        <td className='text-muted'>
                          <div className='d-flex align-items-center'>
                            <span className='svg-icon svg-icon-2 me-2'>
                              <KTSVG
                                path='/media/icons/duotune/communication/com006.svg'
                                className='svg-icon-4 me-1'
                              />
                            </span>
                            名稱
                          </div>
                        </td>
                        <td className='fw-bolder'>
                          <div className='d-flex align-items-center'>
                            <Link to='#' className='text-gray-600 text-hover-primary'>
                              {orderData.user?.name}
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className='text-muted'>
                          <div className='d-flex align-items-center'>
                            <span className='svg-icon svg-icon-2 me-2'>
                              <KTSVG
                                path='/media/icons/duotune/communication/com011.svg'
                                className='svg-icon-4 me-1'
                              />
                            </span>
                            信箱
                          </div>
                        </td>
                        <td className='fw-bolder'>
                          <a
                            href='../../demo1/dist/apps/user-management/users/view.html'
                            className='text-gray-600 text-hover-primary'
                          >
                            {orderData.user?.email}
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className='text-muted'>
                          <div className='d-flex align-items-center'>
                            <span className='svg-icon svg-icon-2 me-2'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                              >
                                <path
                                  d='M5 20H19V21C19 21.6 18.6 22 18 22H6C5.4 22 5 21.6 5 21V20ZM19 3C19 2.4 18.6 2 18 2H6C5.4 2 5 2.4 5 3V4H19V3Z'
                                  fill='black'
                                />
                                <path opacity='0.3' d='M19 4H5V20H19V4Z' fill='black' />
                              </svg>
                            </span>
                            手機
                          </div>
                        </td>
                        <td className='fw-bolder'>{orderData.user?.phone}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='card card-flush py-4 flex-row-fluid'>
                <div className='card-header'>
                  <div className='card-title'>
                    <h2>賣家資訊</h2>
                  </div>
                </div>
                <div className='card-body pt-0'>
                  <table className='table align-middle table-row-bordered mb-0 fs-6 gy-5 min-w-300px'>
                    <tbody className='fw-bold text-gray-600'>
                      <tr>
                        <td className='text-muted'>
                          <div className='d-flex align-items-center'>
                            <span className='svg-icon svg-icon-2 me-2'>
                              <KTSVG
                                path='/media/icons/duotune/communication/com006.svg'
                                className='svg-icon-4 me-1'
                              />
                            </span>
                            名稱
                          </div>
                        </td>
                        <td className='fw-bolder '>
                          <div className='d-flex align-items-center'>
                            <Link to='#' className='text-gray-600 text-hover-primary'>
                              {orderData.merchant?.name}
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className='text-muted'>
                          <div className='d-flex align-items-center'>
                            <span className='svg-icon svg-icon-2 me-2'>
                              <KTSVG
                                path='/media/icons/duotune/communication/com011.svg'
                                className='svg-icon-4 me-1'
                              />
                            </span>
                            信箱
                          </div>
                        </td>
                        <td className='fw-bolder '>
                          <a
                            href='../../demo1/dist/apps/user-management/users/view.html'
                            className='text-gray-600 text-hover-primary'
                          >
                            {orderData.merchant?.email}
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className='text-muted'>
                          <div className='d-flex align-items-center'>
                            <span className='svg-icon svg-icon-2 me-2'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                              >
                                <path
                                  d='M5 20H19V21C19 21.6 18.6 22 18 22H6C5.4 22 5 21.6 5 21V20ZM19 3C19 2.4 18.6 2 18 2H6C5.4 2 5 2.4 5 3V4H19V3Z'
                                  fill='black'
                                />
                                <path opacity='0.3' d='M19 4H5V20H19V4Z' fill='black' />
                              </svg>
                            </span>
                            手機
                          </div>
                        </td>
                        <td className='fw-bolder '>{orderData.merchant?.phone}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className=' fade show active'>
              <div className='d-flex flex-column gap-7 gap-lg-10'>
                <div className='card card-flush py-4 flex-row-fluid overflow-hidden'>
                  <div className='card-header'>
                    <div className='card-title'>
                      <h2>訂購內容</h2>
                    </div>
                  </div>
                  <div className='card-body pt-0'>
                    <div className='table-responsive'>
                      <table className='table align-middle table-row-dashed fs-6 gy-5 mb-0'>
                        <thead>
                          <tr className='text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0'>
                            <th className='min-w-175px'>商品</th>
                            <th className='min-w-70px '>數量</th>
                            <th className='min-w-100px '>單價</th>
                            <th className='min-w-100px '>總計</th>
                          </tr>
                        </thead>
                        <tbody className='fw-bold text-gray-600'>
                          {orderData.order_items?.map((orderItem) => (
                            <tr key={orderItem.id}>
                              <td>
                                <div className='d-flex align-items-center'>
                                  <Link to='#' className='symbol symbol-50px'>
                                    <img
                                      alt={orderItem.item.name}
                                      className='symbol-label'
                                      src={
                                        orderItem?.item?.images[0]
                                          ? `data:image/jpeg;base64,${orderItem.item.images[0].photo}`
                                          : toAbsoluteUrl(
                                              '/media/icons/duotune/ecommerce/ecm005.svg'
                                            )
                                      }
                                    />
                                  </Link>
                                  <div className='ms-5'>
                                    <Link
                                      to='#'
                                      className='fw-bolder text-gray-600 text-hover-primary'
                                    >
                                      {orderItem.item.name}
                                    </Link>
                                  </div>
                                </div>
                              </td>
                              <td>{orderItem.quantity}</td>
                              <td>{orderItem.price / orderItem.quantity}</td>
                              <td>${orderItem.price}</td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan={3} className='fs-3 text-dark fw-boldest text-end'>
                              總計
                            </td>
                            <td className='text-dark fs-3 fw-boldest'>${orderData.total_price}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderDetail
