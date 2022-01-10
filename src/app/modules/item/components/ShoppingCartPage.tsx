import {Modal} from 'bootstrap'
import React, {FC, useState} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {toast} from 'react-toastify'
import {EZSVG} from '../../../../system/helpers'
import {PageTitle} from '../../../../system/layout/core'
import {RootState} from '../../../../setup'
import {ItemState} from '../../item/redux/ItemRedux'
import {CartState, actions} from '../redux/CartRedux'
import {dispatch} from '../../../../setup/redux/Store'
import {ItemModel} from '../redux/ItemModel'
import {UserModel} from '../../auth/redux/AuthModel'
import * as AuthRedux from '../../auth/redux/AuthRedux'
import {CartType} from '../redux/CartRedux'
import getItemAPI from '../API/GetItemAPI'
import createOrderAPI from '../../order/API/CreateOrderAPI'

const ShoppingCartPage: FC = () => {
  const CartState: CartState = useSelector((state: RootState) => state.cart)
  const itemState: ItemState = useSelector((state: RootState) => state.item)
  const authState: AuthRedux.IAuthState = useSelector<RootState>(
    ({auth}) => auth,
    shallowEqual
  ) as AuthRedux.IAuthState
  const user: UserModel = authState.auth?.user as UserModel
  const history = useHistory()
  const [loadUser, setLoadUser] = useState(false)
  const [userBanned, setUserBanned] = useState(false)
  const [loadItems, setLoadItems] = useState(false)
  const [search, setSearch] = useState('')
  const [checkedCount, setCheckedCount] = useState(0)
  const [checkedItems, setCheckedItems] = useState([] as ItemModel[])
  const [allItems, setAllItems] = useState([] as ItemModel[])
  const [searchItems, setSearchItems] = useState([] as ItemModel[])
  const [updateItemId, setUpdateItemId] = useState(0)
  const [updateQuantity, setUpdateQuantity] = useState(0)

  if (!loadUser) {
    let banned = user.role === -1
    setUserBanned(banned)
    setLoadUser(true)
  }

  if (!loadItems && CartState.Carts.length > 0) {
    setLoadItems(true)
    //透過購物車內itemID取得該商品的詳細資料
    CartState.Carts.forEach(async (element) => {
      const result = await getItemAPI(element.itemId)
      if ('id' in result) {
        allItems.push(result)
        setAllItems([...allItems])
        setSearchItems([...allItems])
      }
    })
  }
  searchItems.sort((a: ItemModel, b: ItemModel) => {
    return a.owner.id - b.owner.id
  })

  // 取得購買數量
  const getBuyQuantity = (itemId: number) => {
    let item = CartState.Carts.find((element) => element.itemId === itemId)
    if (item) {
      return item.quantity
    } else {
      return 0
    }
  }

  //顯示搜尋結果
  const filterSearch = (keyWord: string) => {
    let item = allItems
    setSearch(keyWord)
    if (search.length > 0) {
      setSearchItems(item.filter((item) => item.name.includes(keyWord)))
    } else {
      setSearchItems(item)
    }
  }

  const calculatePrice = (price: number | undefined, quantity: number) => {
    if (!price) {
      price = 0
    }
    let result = price * quantity
    return result
  }

  const getTotalPrice = () => {
    let totalPrice = 0
    checkedItems.forEach((item) => {
      let buyQuantity = getBuyQuantity(item.id)
      totalPrice += calculatePrice(item.price, buyQuantity)
    })
    return totalPrice
  }

  //勾選商品時判斷是否為同一賣家和將被勾選的商品另外存一個陣列並顯示
  const checkItem = (item: ItemModel, checked: boolean) => {
    let items = checkedItems
    if (item && checked) {
      if (checkedCount !== 0 && item.owner.id !== items[0].owner.id) {
        const el = document.getElementById('product' + item.id) as HTMLInputElement
        if (el) {
          el.checked = false
        }
        toast.warn('不可加入不同賣家的商品！')
      } else {
        items.push(item)
        setCheckedItems(items)
        setCheckedCount(checkedCount + 1)
      }
    } else if (item && !checked) {
      if (checkedItems.indexOf(item) !== -1) {
        items.splice(checkedItems.indexOf(item), 1)
        setCheckedItems(items)
        setCheckedCount(checkedCount - 1)
      }
    }
  }

  const openUpdateModal = (id: number, quantity: number) => {
    let item = itemState.items.find((item) => item.id === id)
    if (item) {
      setUpdateItemId(id)
      setUpdateQuantity(quantity)
      new Modal('#updateModal').show()
    }
  }

  const deleteItem = (item: ItemModel) => {
    dispatch(actions.deleteCartItem(item.id))
    let items = allItems
    let checked = checkedItems
    let searched = allItems
    items.splice(items.indexOf(item), 1)
    checked.splice(checked.indexOf(item), 1)
    if (search.length > 0) {
      searched = searchItems
      searched.splice(searched.indexOf(item), 1)
    }
    setCheckedItems(checked)
    setAllItems(items)
    setSearchItems(searched)
    toast.success(`已從購物車刪除商品：${item.name}`)
  }

  const modifyItem = async () => {
    const item = await getItemAPI(updateItemId)
    if ('id' in item) {
      if (item.quantity >= updateQuantity) {
        dispatch(actions.updateCartItem(updateItemId, updateQuantity))
        toast.success(
          <span>
            已修改商品：{item.name}
            <br />
            下訂數量為{updateQuantity}個
          </span>
        )
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

  //根據是否被ban顯示按鈕
  const btnOrderShow = () => {
    if (userBanned) {
      return (
        <button
          type='button'
          className='btn btn-danger'
          onClick={() => {
            toast.error(
              <span>
                目前為封鎖狀態，因此無法建立訂單
                <br />
                請至帳戶資訊總覽頁面查看封鎖期限
              </span>
            )
          }}
        >
          封鎖中
        </button>
      )
    } else {
      return (
        <button type='button' className='btn btn-success' onClick={(e) => postOrder()}>
          建立訂單
        </button>
      )
    }
  }

  const postOrder = async () => {
    if (checkedCount > 0) {
      let orderItem = [] as CartType[]
      checkedItems.forEach((item) => {
        orderItem.push({itemId: item.id, quantity: getBuyQuantity(item.id)})
      })
      const result = await createOrderAPI(checkedItems[0].owner.id, orderItem)
      if ('id' in result) {
        toast.success('訂單已成立')
        checkedItems.forEach((item) => {
          dispatch(actions.deleteCartItem(item.id))
        })
        history.push(`/account/order/${result.id}`)
      } else {
        toast.error(`建立失敗：${result.message}`)
      }
    }
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>{`我的購物車`}</PageTitle>
      <div className='col-12'>
        <div className='card card-flush py-4'>
          <div className='card-header'>
            <div className='card-title'>
              <h2>勾選下訂商品</h2>
            </div>
          </div>
          <div className='card-body pt-0 pb-1'>
            <div className='d-flex flex-column gap-10'>
              <div>
                <label className='form-label'>將商品加入至此筆訂單</label>
                <div
                  className='d-flex flex-wrap gap-4 border border-dashed rounded p-6 mb-5'
                  id='edit_order_selected_products'
                >
                  {checkedCount === 0 ? (
                    <span className='text-muted'>已勾選之商品會顯示在此處</span>
                  ) : (
                    checkedItems.map((item) => (
                      <div
                        key={item.id}
                        className='d-flex align-items-center border border-dashed rounded p-3 bg-white'
                      >
                        <img
                          className='symbol symbol-50px '
                          src={
                            item.images[0]
                              ? item.images[0].photo
                              : '/media/icons/duotune/ecommerce/ecm005.svg'
                          }
                          alt=''
                          height='auto'
                          width='50px'
                          background-position='center'
                        ></img>

                        <div className='ms-5'>
                          <span className='text-gray-800 fs-5 fw-bolder'>{item.name}</span>
                          <div className='d-flex flex-wrap gap-3'>
                            <div className='text-muted fs-7'>{item.owner.name}</div>
                            <div className='fw-bold fs-7'>
                              單價: $
                              <span data-kt-ecommerce-edit-order-filter='price'>{item.price}</span>
                              <br />
                              <span data-kt-ecommerce-edit-order-filter='quantity'>
                                購買數量：{getBuyQuantity(item.id)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className='fw-bolder fs-4'>
                  訂單總金額:　$<span id='edit_order_total_price'>{getTotalPrice()}</span>
                </div>
              </div>
              <div className='separator'></div>
              <div className='d-flex align-items-center position-relative mb-n7'>
                <span className='svg-icon svg-icon-1 position-absolute ms-4'>
                  <EZSVG
                    path='/media/icons/duotune/general/gen021.svg'
                    className='svg-icon svg-icon-2x'
                  />
                </span>
                <input
                  type='text'
                  data-kt-ecommerce-edit-order-filter='search'
                  className='form-control form-control-solid w-100 ps-14'
                  placeholder='Search Products By Name'
                  value={search}
                  onChange={(e) => filterSearch(e.target.value)}
                />
              </div>
              {/* <!--begin::Table--> */}
              <div className='dataTables_wrapper dt-bootstrap4 no-footer'>
                <div className='table-responsive'>
                  <div className='dataTables_scroll'>
                    <div
                      className='dataTables_scrollBody'
                      style={{
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: '400px',
                        width: '100%',
                      }}
                    >
                      <table
                        className='table align-middle table-row-dashed fs-6 gy-5'
                        id='edit_order_product_table'
                      >
                        <thead
                          style={{
                            position: 'sticky',
                            backgroundColor: 'white',
                            zIndex: 1,
                            top: '0',
                            boxShadow: 'inset 1px 1px #ffffff, 0 1px #000000',
                          }}
                        >
                          <tr className='text-start text-gray-400 fw-bolder fs-7 gs-0'>
                            <th className='w-25px pe-2'></th>
                            <th className=''>產品資訊</th>
                            <th className='min-w-70px text-center'>購買數量</th>
                            <th className='min-w-70px text-center'>剩餘數量</th>
                            <th className='min-w-150px text-center'>操作</th>
                          </tr>
                        </thead>
                        <tbody className='fw-bold text-gray-600'>
                          {searchItems.map((item) => (
                            <tr key={item.id}>
                              <td>
                                <div className='form-check form-check-sm form-check-custom form-check-solid'>
                                  <input
                                    id={'product' + item.id.toString()}
                                    className='form-check-input'
                                    type='checkbox'
                                    value='1'
                                    checked={checkedItems.indexOf(item) !== -1}
                                    onChange={(e) => checkItem(item, e.target.checked)}
                                  />
                                </div>
                              </td>
                              {/* <!--begin::Product=--> */}
                              <td>
                                <div
                                  className='d-flex align-items-center'
                                  data-kt-ecommerce-edit-order-filter='product'
                                  data-kt-ecommerce-edit-order-id={item.id}
                                >
                                  <img
                                    className='symbol symbol-50px '
                                    src={
                                      item.images[0]
                                        ? item.images[0].photo
                                        : '/media/icons/duotune/ecommerce/ecm005.svg'
                                    }
                                    alt=''
                                    height='auto'
                                    width='50px'
                                    background-position='center'
                                  ></img>
                                  <div className='ms-5'>
                                    <span className='text-gray-800 fs-5 fw-bolder'>
                                      {item.name}
                                    </span>
                                    <div className='d-flex flex-wrap gap-3'>
                                      <div className='text-muted fs-7'>{item.owner.name}</div>
                                      <div className='fw-bold fs-7'>
                                        單價: $
                                        <span data-kt-ecommerce-edit-order-filter='price'>
                                          {item.price}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              {/* <!--end::Product=--> */}
                              <td className='text-center' data-order='19'>
                                <span className='fw-bolder '>{getBuyQuantity(item.id)}</span>
                              </td>
                              <td className='text-center' data-order='19'>
                                <span className='fw-bolder '>{item.quantity}</span>
                              </td>
                              <td className='text-center'>
                                <button
                                  className='btn btn-primary btn-sm mx-2'
                                  onClick={() => openUpdateModal(item.id, getBuyQuantity(item.id))}
                                >
                                  <i className='bi bi-pencil-square fs-5'></i>修改數量
                                </button>
                                <button
                                  className='btn btn-danger btn-sm mx-2'
                                  onClick={() => deleteItem(item)}
                                >
                                  <i className='bi bi-trash-fill fs-5'></i>刪除
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!--end::Card header--> */}
          <div className='text-end mt-5 me-5'>{btnOrderShow()}</div>
        </div>
      </div>
      {/* begin::修改數量的modal */}
      <div className='modal fade' tabIndex={-1} id='updateModal'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>修改商品數量</h5>
              <div
                className='btn btn-icon btn-sm btn-active-light-primary ms-2'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                <EZSVG
                  path='/media/icons/duotune/arrows/arr061.svg'
                  className='svg-icon svg-icon-2x'
                />
              </div>
            </div>
            <div className='modal-body'>
              <div className='row'>
                <div className='col-12 mt-4'>
                  <label className='form-check-label' htmlFor={`updateQuentity`}>
                    商品數量
                  </label>
                  <input
                    id='updateQuentity'
                    value={updateQuantity}
                    min={1}
                    type='number'
                    className='form-control mt-1'
                    onChange={(e) => setUpdateQuantity(parseInt(e.target.value))}
                  ></input>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                id='updateModalCancel'
                type='button'
                className='btn btn-light'
                data-bs-dismiss='modal'
              >
                取消
              </button>
              <button type='button' className='btn btn-primary' onClick={(e) => modifyItem()}>
                修改
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* end::修改數量的modal */}
    </>
  )
}

export default ShoppingCartPage
