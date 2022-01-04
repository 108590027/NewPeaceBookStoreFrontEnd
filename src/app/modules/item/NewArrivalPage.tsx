import React, {FC, useState} from 'react'
import {PageTitle} from '../../../system/layout/core'

const NewArrivalPage: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>{`商品上架`}</PageTitle>

      <div className='mx-auto row g-6 g-xl-9 mb-6 mb-xl-9 col-9'>
        <form>
          <p>
            <label htmlFor='upload'>上傳圖片：</label>
            <input
              type='file'
              name='upload'
              id='uploadBtn'
              accept='image/*'
              multiple
              className='form-control'
            ></input>
          </p>
          <p>
            <label htmlFor='title'>商品名稱：</label>
            <input type='text' name='title' id='titleInput' className='form-control mt-1'></input>
          </p>
          <p>
            <label htmlFor='description'>商品敘述：</label>
            <input
              type='text'
              name='description'
              id='descriptionInput'
              className='form-control mt-1'
            ></input>
          </p>
          <p>
            <label htmlFor='price'>商品價格：</label>
            <input
              type='number'
              name='price'
              id='priceInput'
              className='form-control mt-1'
              style={{
                appearance: 'textfield',
                MozAppearance: 'textfield',
                WebkitAppearance: 'textfield',
              }}
            ></input>
          </p>
          <p>
            <label htmlFor='tag'>標籤(以逗點分隔(暫定?)&最多100字元)：</label>
            <textarea
              name='tag'
              id='tagInput'
              className='form-control mt-1'
              maxLength={100}
              style={{
                height: '6em',
                flexWrap: 'wrap',
                resize: 'none',
              }}
            ></textarea>
          </p>
          <p>
            <label htmlFor='category'>分類：</label>
            <select name='category' id='categoryInput' className='form-select-sm mt-1'>
              <option value='1'>test1</option>
              <option value='2'>test2</option>
            </select>
          </p>
          <div className='d-flex justify-content-center'>
            <input type='reset' value='清除' className=' btn btn-danger'></input>
            <input type='submit' value='建立商品' className='mx-10 btn btn-success'></input>
          </div>
        </form>
      </div>
    </>
  )
}
export default NewArrivalPage
