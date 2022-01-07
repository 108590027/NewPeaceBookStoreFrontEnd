import {Modal} from 'bootstrap'
import React, {FC, useState} from 'react'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import {KTSVG} from '../../../../system/helpers'
import {PageTitle} from '../../../../system/layout/core'
import {RootState} from '../../../../setup'
import {ItemState} from '../../item/redux/ItemRedux'
import {CartState, actions} from '../redux/CartRedux'
import {dispatch} from '../../../../setup/redux/Store'
import getItemAPI from '../API/GetItemsAPI'

const ShoppingCartPage: FC = () => {
  const CartState: CartState = useSelector((state: RootState) => state.cart)
  const itemState: ItemState = useSelector((state: RootState) => state.item)
  const [updateItemId, setUpdateItemId] = useState(0)
  const [updateQuantity, setUpdateQuantity] = useState(0)
  var totalPrice = 0

  const getUserName = (itemId: number) => {
    let item = itemState.items.find((item) => item.id === itemId)
    return item?.owner.name
  }

  const getInfo = (itemId: number) => {
    let item = itemState.items.find((item) => item.id === itemId)
    return item
    /*let item = await getItemAPI(itemId)
    if ('id' in item) {
      setItemPrice(item.price)
      setItemName(item.owner.name)
    }*/
  }

  const calculatePrice = (price: number | undefined, quantity: number) => {
    if (!price) {
      price = 0
    }
    let result = price * quantity
    totalPrice += result
    return result
  }

  const openUpdateModal = (id: number, quantity: number) => {
    let item = itemState.items.find((item) => item.id === id)
    if (item) {
      setUpdateItemId(id)
      setUpdateQuantity(quantity)
      new Modal('#updateModal').show()
    }
  }

  const deleteItem = async (id: number) => {
    await dispatch(actions.deleteCartItem(id))
    toast.success('已刪除商品')
  }

  const modifyItem = async () => {
    const item = await getItemAPI(updateItemId)
    if ('id' in item) {
      if (item.quantity >= updateQuantity) {
        dispatch(actions.updateCartItem(updateItemId, updateQuantity))
        toast.success(`已修改商品：${item.name}下訂數量為${updateQuantity}個`)
        setUpdateQuantity(0)
        setUpdateItemId(0)
        document.getElementById('updateModalCancel')?.click()
      } else {
        toast.error(`下訂數量不可大於商品存貨數量(${item.quantity}個)`)
      }
    } else {
      toast.error(item)
    }
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>{`我的購物車`}</PageTitle>
      <div className='col-12'>
        <div className='card card-flush py-4'>
          {' '}
          <div className='card-header'>
            <div className='card-title'>
              <h2>勾選下訂商品</h2>
            </div>
          </div>{' '}
          <div className='card-body pt-0'>
            <div className='d-flex flex-column gap-10'>
              {' '}
              <div>
                {' '}
                <label className='form-label'>將商品加入至此筆訂單</label>{' '}
                {/* <!--begin::Selected products--> */}
                <div
                  className='d-flex flex-wrap gap-4 border border-dashed rounded p-6 mb-5'
                  id='edit_order_selected_products'
                >
                  <span className='text-muted'>已勾選之商品會顯示在此處</span>
                </div>
                {/* <!--begin::Selected products--> */}
                <div className='fw-bolder fs-4'>
                  Total Cost:$<span id='edit_order_total_price'>{totalPrice}</span>
                </div>
              </div>
              {/* <!--end::Input group--> */}
              {/* <!--begin::Separator--> */}
              <div className='separator'></div>
              {/* <!--end::Separator--> */}
              {/* <!--begin::Search products--> */}
              <div className='d-flex align-items-center position-relative mb-n7'>
                {/* <!--begin::Svg Icon | path: icons/duotune/general/gen021.svg--> */}
                <span className='svg-icon svg-icon-1 position-absolute ms-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                  >
                    <rect
                      opacity='0.5'
                      x='17.0365'
                      y='15.1223'
                      width='8.15546'
                      height='2'
                      rx='1'
                      transform='rotate(45 17.0365 15.1223)'
                      fill='black'
                    />
                    <path
                      d='M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z'
                      fill='black'
                    />
                  </svg>
                </span>
                {/* <!--end::Svg Icon--> */}
                <input
                  type='text'
                  data-kt-ecommerce-edit-order-filter='search'
                  className='form-control form-control-solid w-100 w-lg-50 ps-14'
                  placeholder='Search Products'
                />
              </div>
              {/* <!--end::Search products--> */}
              {/* <!--begin::Table--> */}
              <table
                className='table align-middle table-row-dashed fs-6 gy-5'
                id='edit_order_product_table'
              >
                {/* <!--begin::Table head--> */}
                <thead>
                  <tr className='text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0'>
                    <th className='w-25px pe-2'></th>
                    <th className='min-w-200px'>Product</th>
                    <th className='min-w-100px text-end pe-5'>Qty Remaining</th>
                  </tr>
                </thead>
                {/* <!--end::Table head--> */}
                {/* <!--begin::Table body--> */}
                <tbody className='fw-bold text-gray-600'>
                  {/* <!--begin::Table row--> */}
                  <tr>
                    {/* <!--begin::Checkbox--> */}
                    <td>
                      <div className='form-check form-check-sm form-check-custom form-check-solid'>
                        <input className='form-check-input' type='checkbox' value='1' />
                      </div>
                    </td>
                    {/* <!--end::Checkbox--> */}
                    {/* <!--begin::Product=--> */}
                    <td>
                      <div
                        className='d-flex align-items-center'
                        data-kt-ecommerce-edit-order-filter='product'
                        data-kt-ecommerce-edit-order-id='product_1'
                      >
                        {/* <!--begin::Thumbnail--> */}
                        <a
                          href='../../demo1/dist/apps/ecommerce/catalog/edit-product.html'
                          className='symbol symbol-50px'
                        >
                          <span
                            className='symbol-label'
                            style={{backgroundImage: `url('/media/logos/logo.png)'`}}
                          ></span>
                        </a>
                        {/* <!--end::Thumbnail--> */}
                        <div className='ms-5'>
                          {/* <!--begin::Title--> */}
                          <a
                            href='../../demo1/dist/apps/ecommerce/catalog/edit-product.html'
                            className='text-gray-800 text-hover-primary fs-5 fw-bolder'
                          >
                            Product 1
                          </a>
                          {/* <!--end::Title--> */}
                          <div className='d-flex flex-wrap gap-3'>
                            {/* <!--begin::Price--> */}
                            <div className='fw-bold fs-7'>
                              Price: $<span data-kt-ecommerce-edit-order-filter='price'>12.00</span>
                            </div>
                            {/* <!--end::Price--> */}
                            {/* <!--begin::SKU--> */}
                            <div className='text-muted fs-7'>SKU: 04456008</div>
                            {/* <!--end::SKU--> */}
                          </div>
                        </div>
                      </div>
                    </td>
                    {/* <!--end::Product=--> */}
                    {/* <!--begin::Qty=--> */}
                    <td className='text-end pe-5' data-order='19'>
                      <span className='fw-bolder ms-3'>19</span>
                    </td>
                    {/* <!--end::Qty=--> */}
                  </tr>
                  {/* <!--end::Table row--> */}
                  {/* <!--begin::Table row--> */}
                  <tr>
                    {/* <!--begin::Checkbox--> */}
                    <td>
                      <div className='form-check form-check-sm form-check-custom form-check-solid'>
                        <input className='form-check-input' type='checkbox' value='1' />
                      </div>
                    </td>
                    {/* <!--end::Checkbox--> */}
                    {/* <!--begin::Product=--> */}
                    <td>
                      <div
                        className='d-flex align-items-center'
                        data-kt-ecommerce-edit-order-filter='product'
                        data-kt-ecommerce-edit-order-id='product_2'
                      >
                        {/* <!--begin::Thumbnail--> */}
                        <a
                          href='../../demo1/dist/apps/ecommerce/catalog/edit-product.html'
                          className='symbol symbol-50px'
                        >
                          <span
                            className='symbol-label'
                            style={{backgroundImage: `url('/media/logos/logo.png)'`}}
                          ></span>
                        </a>
                        {/* <!--end::Thumbnail--> */}
                        <div className='ms-5'>
                          {/* <!--begin::Title--> */}
                          <a
                            href='../../demo1/dist/apps/ecommerce/catalog/edit-product.html'
                            className='text-gray-800 text-hover-primary fs-5 fw-bolder'
                          >
                            Product 2
                          </a>
                          {/* <!--end::Title--> */}
                          <div className='d-flex flex-wrap gap-3'>
                            {/* <!--begin::Price--> */}
                            <div className='fw-bold fs-7'>
                              Price: $
                              <span data-kt-ecommerce-edit-order-filter='price'>158.00</span>
                            </div>
                            {/* <!--end::Price--> */}
                            {/* <!--begin::SKU--> */}
                            <div className='text-muted fs-7'>SKU: 02593008</div>
                            {/* <!--end::SKU--> */}
                          </div>
                        </div>
                      </div>
                    </td>
                    {/* <!--end::Product=--> */}
                    {/* <!--begin::Qty=--> */}
                    <td className='text-end pe-5' data-order='44'>
                      <span className='fw-bolder ms-3'>44</span>
                    </td>
                    {/* <!--end::Qty=--> */}
                  </tr>
                  {/* <!--end::Table row--> */}
                </tbody>
                {/* <!--end::Table body--> */}
              </table>
              {/* <!--end::Table--> */}
            </div>
          </div>
          {/* <!--end::Card header--> */}
        </div>
      </div>
    </>
  )
}

export default ShoppingCartPage
