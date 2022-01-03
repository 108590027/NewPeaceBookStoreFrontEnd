import {Modal} from 'bootstrap'
import React, {FC, useState} from 'react'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import {RootState} from '../../../setup'
import {KTSVG} from '../../../system/helpers'
import {PageTitle} from '../../../system/layout/core'
import {ErrorResponse} from '../errors/ErrorDataTypes'
import getUsersAPI from '../admin/API/GetUsersAPI'

const NewArrivalPage: FC = () => {
  const numberStyle = {mozAppearance: 'textfield'}
  return (
    <>
      <h1>商品上架頁！</h1>
      <hr></hr>
      <form>
        <p>
          <label htmlFor='upload'>上傳圖片：</label>
          <input type='button' name='upload' value='選擇檔案' id='uploadBtn'></input>
        </p>
        <p>
          <label htmlFor='title'>商品名稱：</label>
          <input type='text' name='title' id='titleInput'></input>
        </p>
        <p>
          <label htmlFor='description'>商品敘述：</label>
          <input type='text' name='description' id='descriptionInput'></input>
        </p>
        <p>
          <label htmlFor='price'>商品價格：</label>
          <input type='number' name='price' id='priceInput'></input>
        </p>
        <p>
          <label htmlFor='tag'>標籤：</label>
          <input type='text' name='tag' id='tagInput'></input>
        </p>
        <p>
          <label htmlFor='category'>系別：</label>
          <select name='category' id='categoryInput'>
            <option value='1'>test1</option>
            <option value='2'>test2</option>
          </select>
        </p>
      </form>
    </>
  )
}
export default NewArrivalPage
