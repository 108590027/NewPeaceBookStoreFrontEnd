/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'
import {useSelector} from 'react-redux'
import {Link, match, Redirect, Route, Switch, useLocation} from 'react-router-dom'
import {RootState} from '../../../../setup'
import {KTSVG} from '../../../../system/helpers'
import {PageLink, PageTitle} from '../../../../system/layout/core'
import getUserAPI from '../../auth/API/GetUserAPI'
import {IAuthState} from '../../auth/redux/AuthRedux'
import {CategoryState} from '../../category/redux/CategoryRedux'
import AdminUserBanRecords from './AdminUserBanRecords'
import {AdminUserEditProfile} from './AdminUserEditProfile'

interface Props {
  match: match<{id: string}>
}

const AdminUserPage: FC<Props> = (props) => {
  const location = useLocation()
  const userState: IAuthState = useSelector((state: RootState) => state.auth)
  const categoryState: CategoryState = useSelector((state: RootState) => state.category)
  const [load, setLoad] = useState(false)
  if (isNaN(props.match.params.id as any)) {
    window.location.href = '/admin/users'
  }
  if (!load) {
    setLoad(true)
    getUserAPI(parseInt(props.match.params.id))
  }
  const user = userState.users.find((u) => u.id === parseInt(props.match.params.id))
  const BreadCrumbs: Array<PageLink> = [
    {
      title: '會員列表',
      path: '/admin/users',
      isSeparator: false,
      isActive: false,
    },
  ]
  const major = categoryState.categories.find((c) => c.id === (user?.major ? user.major : 1))

  return (
    <>
      <PageTitle breadcrumbs={BreadCrumbs}>{`會員管理－${
        user?.name || `UserID:${props.match.params.id}`
      }`}</PageTitle>

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
                      {user?.name}
                    </a>
                    {user?.phone_verify !== null ? (
                      <a href='#'>
                        <KTSVG
                          path='/media/icons/duotune/general/gen026.svg'
                          className='svg-icon-1 svg-icon-primary'
                        />
                      </a>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                    <a
                      href='#'
                      className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                    >
                      <KTSVG
                        path='/media/icons/duotune/communication/com006.svg'
                        className='svg-icon-4 me-1'
                      />
                      {major?.name}
                    </a>
                    <a
                      href='#'
                      className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                    >
                      <KTSVG
                        path='/media/icons/duotune/communication/com011.svg'
                        className='svg-icon-4 me-1'
                      />
                      {user?.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className='d-flex flex-wrap flex-stack'>
                <div className='d-flex flex-column flex-grow-1 pe-8'>
                  <div className='d-flex flex-wrap'>
                    <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                      <div className='d-flex align-items-center'>
                        <div className='fs-2 fw-bolder'>
                          {user?.totalBuyOrders ? user.totalBuyOrders : 0}筆
                        </div>
                      </div>

                      <div className='fw-bold fs-6 text-gray-400'>買入</div>
                    </div>

                    <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                      <div className='d-flex align-items-center'>
                        <div className='fs-2 fw-bolder'>
                          {user?.totalSellOrders ? user.totalSellOrders : 0}筆
                        </div>
                      </div>

                      <div className='fw-bold fs-6 text-gray-400'>賣出</div>
                    </div>

                    <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                      <div className='d-flex align-items-center'>
                        <div className='fs-2 fw-bolder'>{user?.rate ? `${user?.rate}%` : '-'}</div>
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
                    (location.pathname === `/admin/user/${user?.id}` && 'active')
                  }
                  to={`/admin/user/${user?.id}`}
                >
                  修改會員資訊
                </Link>
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === `/admin/user/${user?.id}/bannedRecord` && 'active')
                  }
                  to={`/admin/user/${user?.id}/bannedRecord`}
                >
                  封鎖紀錄
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Switch>
        <Route path='/admin/user/:id/bannedRecord'>
          <AdminUserBanRecords user={user} />
        </Route>
        <Route path='/admin/user/:id'>
          <AdminUserEditProfile user={user} />
        </Route>
        <Redirect to={`/admin/user/${user?.id}`} />
      </Switch>
    </>
  )
}

export default AdminUserPage
