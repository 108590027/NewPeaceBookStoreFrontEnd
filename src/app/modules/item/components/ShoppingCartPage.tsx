import React, {FC, useState} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {PageTitle} from '../../../../system/layout/core'
import {Link} from 'react-router-dom'
import {RootState} from '../../../../setup'
import {CartState} from '../redux/CartRedux'
import {UserModel} from '../../auth/redux/AuthModel'

const ShoppingCartPage: FC = () => {
  //let items = window.localStorage.get('')
  let userid = 0
  const user: UserModel = useSelector<RootState>(
    ({auth}) => auth.auth?.user,
    shallowEqual
  ) as UserModel
  return (
    <>
      <PageTitle breadcrumbs={[]}>{`我的購物車`}</PageTitle>
      <div className='col-12'>
        <h5>{`賣家名稱：${user?.name}`}</h5>
      </div>
      <div className='card card-xxl-stretch mb-5 mb-xxl-8 table-responsive'>
        <div className='table-responsive'>
          <table className='table table-hover table-rounded table-striped gy-4 gs-7 text-center align-middle'>
            <thead>
              <tr className='fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200'>
                <th>名稱</th>
                <th>分類</th>
                <th>數量</th>
                <th>價格</th>
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
                  <a className='btn btn-primary btn-sm' href='#'>
                    <i className='bi bi-file-text fs-5'></i>詳細
                  </a>
                  <button className='btn btn-danger btn-sm mx-2'>
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
                  <a className='btn btn-primary btn-sm' href='#'>
                    <i className='bi bi-file-text fs-5'></i>詳細
                  </a>
                  <button className='btn btn-danger btn-sm mx-2'>
                    <i className='bi bi-trash-fill fs-5'></i>刪除
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ShoppingCartPage
