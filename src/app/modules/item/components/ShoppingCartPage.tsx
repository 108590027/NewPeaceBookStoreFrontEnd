import React, {FC, useState} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {PageTitle} from '../../../../system/layout/core'
import {RootState} from '../../../../setup'
import {ItemState} from '../../item/redux/ItemRedux'
import {CartState, actions} from '../redux/CartRedux'
import getItemAPI from '../API/GetItemsAPI'
import {UserModel} from '../../auth/redux/AuthModel'

const ShoppingCartPage: FC = () => {
  const CartState: CartState = useSelector((state: RootState) => state.cart)
  const itemState: ItemState = useSelector((state: RootState) => state.item)
  const [load, setLoad] = useState(false)
  const [currentId, setCurrentId] = useState(0)

  const user: UserModel = useSelector<RootState>(
    ({auth}) => auth.auth?.user,
    shallowEqual
  ) as UserModel

  const getInfo = (itemId: number) => {
    let item = itemState.items.find((item) => item.id === itemId)
    return item
  }

  const calculatePrice = (price: number | undefined, quantity: number) => {
    if (!price) {
      price = 0
    }
    return price * quantity
  }

  const deleteItem = (id: number) => {
    //actions.deleteCartItem(id)
  }

  const modifyItem = (id: number) => {
    //actions.updateCartItem(id,3)
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>{`我的購物車`}</PageTitle>
      <div className='col-12'>
        <h5>{`賣家名稱：${user?.name}`}</h5>
        <div className='card card-xxl-stretch mb-5 mb-xxl-8'>
          <div className='table-responsive'>
            <table className='table table-hover table-rounded table-striped gy-4 gs-7 text-center align-middle'>
              <thead>
                <tr className='fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200'>
                  <th>名稱</th>
                  <th>數量</th>
                  <th>單價</th>
                  <th>總計</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2020</td>
                  <td>買</td>
                  <td>100</td>
                  <td>100</td>
                  <td>
                    <button className='btn btn-primary btn-sm mx-2' onClick={() => modifyItem(0)}>
                      <i className='bi bi-pencil-square fs-5'></i>修改數量
                    </button>
                    <button className='btn btn-danger btn-sm mx-2' onClick={() => deleteItem(0)}>
                      <i className='bi bi-trash-fill fs-5'></i>刪除
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2021</td>
                  <td>賣</td>
                  <td>100</td>
                  <td>100</td>
                  <td>
                    <button className='btn btn-primary btn-sm mx-2' onClick={() => modifyItem(1)}>
                      <i className='bi bi-pencil-square fs-5'></i>修改數量
                    </button>
                    <button className='btn btn-danger btn-sm mx-2' onClick={() => deleteItem(1)}>
                      <i className='bi bi-trash-fill fs-5'></i>刪除
                    </button>
                  </td>
                </tr>
                {CartState.Carts.map((item) => (
                  <tr>
                    <td>{item.itemId}</td>
                    <td>{item.quantity}</td>
                    <td>{getInfo(item.itemId)?.price}</td>
                    <td>{calculatePrice(getInfo(item.itemId)?.price, item.quantity)}</td>
                    <td>
                      <button
                        className='btn btn-primary btn-sm mx-2'
                        onClick={() => modifyItem(item.itemId)}
                      >
                        <i className='bi bi-pencil-square fs-5'></i>修改數量
                      </button>
                      <button
                        className='btn btn-danger btn-sm mx-2'
                        onClick={() => deleteItem(item.itemId)}
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
        <div className='d-flex justify-content-end mt-8'>
          <button className='btn btn-primary'>
            <span className='indicator-label '>下訂</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default ShoppingCartPage
