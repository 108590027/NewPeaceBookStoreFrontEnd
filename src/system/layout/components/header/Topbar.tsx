import clsx from 'clsx'
import React, {FC} from 'react'
import {Link} from 'react-router-dom'
import {shallowEqual, useSelector} from 'react-redux'
import {UserModel} from '../../../../app/modules/auth/redux/AuthModel'
import {RootState} from '../../../../setup'
import {KTSVG} from '../../../helpers'
import {HeaderNotificationsMenu, HeaderUserMenu, QuickLinks} from '../../../partials'
import {CartState} from '../../../../app/modules/item/redux/CartRedux'
import {useLayout} from '../../core'

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px',
  toolbarButtonIconSizeClass = 'svg-icon-1'

const Topbar: FC = () => {
  const {config} = useLayout()
  const user: UserModel = useSelector<RootState>(
    ({auth}) => auth.auth?.user,
    shallowEqual
  ) as UserModel
  const CartState: CartState = useSelector((state: RootState) => state.cart)

  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>
      {/* Search */}
      {/* <div className={clsx('d-flex align-items-stretch', toolbarButtonMarginClass)}>
        <Search />
      </div> */}

      {/* NOTIFICATIONS */}
      <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
        {/* begin::Menu- wrapper */}
        <div
          className={clsx(
            'btn btn-icon btn-active-light-primary position-relative',
            toolbarButtonHeightClass
          )}
        >
          <Link to={'/item/newarrival'}>
            <KTSVG
              path='/media/icons/duotune/arrows/arr013.svg'
              className={toolbarButtonIconSizeClass}
            />
          </Link>
        </div>
        <HeaderNotificationsMenu />
        {/* end::Menu wrapper */}
      </div>

      {/* SHOPPING CART */}
      <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
        <div
          className={clsx(
            'btn btn-icon btn-active-light-primary position-relative',
            toolbarButtonHeightClass
          )}
        >
          <Link to={'/item/shoppingcart'}>
            <KTSVG
              path='/media/icons/duotune/ecommerce/ecm001.svg'
              className={toolbarButtonIconSizeClass}
            />
          </Link>
          <span className='menu-badge'></span>
        </div>
      </div>

      {/* User */}
      <div
        className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
        id='kt_header_user_menu_toggle'
      >
        <div
          className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          data-kt-menu-flip='bottom'
        >
          <span className='symbol-label bg-light-danger text-danger fs-1 fw-bolder'>
            {user?.name[0]}
          </span>
        </div>
        <HeaderUserMenu />
      </div>

      {config.header.left === 'menu' && (
        <div className='d-flex align-items-center d-lg-none ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
            id='kt_header_menu_mobile_toggle'
          >
            <KTSVG path='/media/icons/duotune/text/txt001.svg' className='svg-icon-1' />
          </div>
        </div>
      )}
    </div>
  )
}

export {Topbar}
