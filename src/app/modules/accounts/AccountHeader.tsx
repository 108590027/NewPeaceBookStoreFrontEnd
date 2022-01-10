/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {EZSVG} from '../../../system/helpers'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../setup'
import {UserModel} from '../auth/redux/AuthModel'
import {CategoryState} from '../category/redux/CategoryRedux'
import getUserAPI from '../auth/API/GetUserAPI'

const AccountHeader: React.FC = () => {
  const location = useLocation()
  const user: UserModel = useSelector<RootState>(
    ({auth}) => auth.auth?.user,
    shallowEqual
  ) as UserModel
  const categoryState: CategoryState = useSelector<RootState>(
    ({category}) => category,
    shallowEqual
  ) as CategoryState
  const major = categoryState.categories.find((c) => c.id === user.major)
  if (user) {
    if (user.rate === undefined) {
      getUserAPI(user.id)
    }
  }

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
          <div className='me-7 mb-4'>
            <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
              <span
                className='symbol-label bg-light-danger text-danger fw-bolder'
                style={{fontSize: '3rem'}}
              >
                {user?.name[0]}
              </span>
            </div>
          </div>

          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-2'>
                  <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                    {user.name}
                  </a>
                </div>

                <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                  <a
                    href={`/category/${major?.id}`}
                    className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                  >
                    <EZSVG
                      path='/media/icons/duotune/communication/com006.svg'
                      className='svg-icon-4 me-1'
                    />
                    {major?.name}
                  </a>
                  <a
                    href={`mailto:${user.email}`}
                    className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                  >
                    <EZSVG
                      path='/media/icons/duotune/communication/com011.svg'
                      className='svg-icon-4 me-1'
                    />
                    {user.email}
                  </a>
                </div>
              </div>
            </div>

            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
                <div className='d-flex flex-wrap'>
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <div className='fs-2 fw-bolder'>{user.totalBuyOrders || 0}筆</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>買入</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <div className='fs-2 fw-bolder'>{user.totalSellOrders || 0}筆</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>賣出</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <div className='fs-2 fw-bolder'>{user.rate ? `${user.rate * 20}%` : '-'}</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>評價</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='d-flex overflow-auto h-55px'>
          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/account/overview' && 'active')
                }
                to='/account/overview'
              >
                總覽
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/account/settings' && 'active')
                }
                to='/account/settings'
              >
                修改個人資訊
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/account/comments' && 'active')
                }
                to='/account/comments'
              >
                評論
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/account/items' && 'active')
                }
                to='/account/items'
              >
                商品
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/account/orders' && 'active')
                }
                to='/account/orders'
              >
                訂單記錄
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/account/analytic' && 'active')
                }
                to='/account/analytic'
              >
                統計
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export {AccountHeader}
