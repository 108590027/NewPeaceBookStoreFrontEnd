/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import getAuthAPI from '../../../../app/modules/auth/API/GetAuthAPI'
import {UserModel} from '../../../../app/modules/auth/redux/AuthModel'
import {IAuthState} from '../../../../app/modules/auth/redux/AuthRedux'
import getCategoriesAPI from '../../../../app/modules/category/API/GetCategoriesAPI'
import {CategoryState} from '../../../../app/modules/category/redux/CategoryRedux'
import {CartState} from '../../../../app/modules/item/redux/CartRedux'
import {RootState} from '../../../../setup'

const HeaderUserMenu: FC = () => {
  const categoryState: CategoryState = useSelector<RootState>(
    ({category}) => category,
    shallowEqual
  ) as CategoryState
  const authState: IAuthState = useSelector<RootState>(({auth}) => auth, shallowEqual) as IAuthState
  const CartState: CartState = useSelector((state: RootState) => state.cart)
  const user: UserModel = authState?.auth?.user as UserModel
  if (categoryState.lastUpdate <= Date.now() - 30000) {
    getCategoriesAPI()
  }
  if (authState.lastUpdate <= Date.now() - 30000) {
    getAuthAPI()
  }
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <span className='symbol-label bg-light-danger fs-1 text-danger fw-bolder'>
              {user?.name[0]}
            </span>
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>{user?.name}</div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
              {user?.email}
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>

      <div className='menu-item px-5'>
        <Link to={'/item/shoppingcart'} className='menu-link px-5'>
          我的購物車
          <span className='menu-badge'>
            <span className='badge badge-light-danger badge-circle fw-bolder fs-7'>
              {CartState.Carts.length}
            </span>
          </span>
        </Link>
      </div>

      <div className='menu-item px-5'>
        <Link to='/account/orders' className='menu-link px-5'>
          <span className='menu-text'>歷史訂單</span>
        </Link>
      </div>

      <div className='separator my-2'></div>

      <div className='menu-item px-5 my-1'>
        <Link to='/account/settings' className='menu-link px-5'>
          帳戶資訊
        </Link>
      </div>

      <div className='menu-item px-5'>
        <Link to='/logout' className='menu-link px-5'>
          登出
        </Link>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
