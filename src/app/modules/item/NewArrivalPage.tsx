import React, {FC, useState} from 'react'
import {useSelector} from 'react-redux'
import {RootState} from '../../../setup'
import {PageTitle} from '../../../system/layout/core'
import {ItemState} from './redux/ItemRedux'

const NewArrivalPage: FC = () => {
  const itemState: ItemState = useSelector((state: RootState) => state.item)
  const [load, setLoad] = useState(false)
  const [createPrice, setCreatePrice] = useState('')
  const [createIsDepartment, setCreateIsDepartment] = useState(false)
  const [updateId, setUpdateId] = useState(0)
  const [updatePrice, setUpdatePrice] = useState('')
  const [updateIsDepartment, setUpdateIsDepartment] = useState(false)
  return (
    <>
      <PageTitle breadcrumbs={[]}>{`商品上架`}</PageTitle>
      <div
        className='content d-flex flex-column flex-column-fluid'
        id='kt_content'
        data-select2-id='select2-data-kt_content'
      >
        {/* begin::Post */}
        <div
          className='post d-flex flex-column-fluid'
          id='kt_post'
          data-select2-id='select2-data-kt_post'
        >
          {/* begin::Container */}
          <div
            id='kt_content_container'
            className='container-xxl'
            data-select2-id='select2-data-kt_content_container'
          >
            {/* begin::Form */}
            <form id='add_product_form' className='form d-flex flex-column'>
              {/* begin:: Main row*/}
              <div className='d-flex flex-column gap-7 gap-lg-10'>
                <div
                  data-kt-swapper='true'
                  data-kt-swapper-mode='prepend'
                  data-kt-swapper-parent="{default: '#kt_content_container'}"
                  className='page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0'
                ></div>
                {/* begin::Media */}
                <div className='card card-flush py-4'>
                  <div className='card-header'>
                    <div className='card-title'>
                      <h2>商品圖片</h2>
                    </div>
                  </div>
                  <div className='card-body pt-0'>
                    <div className='fv-row mb-2'>
                      <div className='dropzone' id='add_product_media'>
                        <div className='dz-message needsclick'>
                          <i className='bi bi-file-earmark-arrow-up text-primary fs-3x'></i>
                          <div className='ms-4'>
                            <h3 className='fs-5 fw-bolder text-gray-900 mb-1'>
                              將圖片拖移到此或點擊此處上傳照片
                            </h3>
                            <span className='fs-7 fw-bold text-gray-400'>最多可上傳3張照片</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='text-muted fs-7'>設定商品圖片</div>
                  </div>
                </div>
                {/* end::Media */}
                {/* begin::Product */}
                <div className='card card-flush py-4'>
                  <div className='card-header'>
                    <div className='card-title'>
                      <h2>商品設定</h2>
                    </div>
                  </div>
                  {/*begin::Product Name*/}
                  <div className='card-body pt-0'>
                    <div className='mb-10 fv-row'>
                      <label className='required form-label'>商品名稱</label>
                      <input
                        type='text'
                        name='title'
                        className='form-control mb-2'
                        placeholder='Product Title'
                        value=''
                      />
                    </div>
                    {/* end::Product Name */}
                    {/* begin::Product Price */}
                    <div className='mb-10 fv-row'>
                      <label className='required form-label'>商品價格</label>
                      <input
                        type='text'
                        name='price'
                        className='form-control mb-2'
                        placeholder='Product price'
                        value=''
                      />
                    </div>
                    {/* end::Product Price */}
                    {/* begin::Product Category*/}
                    <div className='mb-10 fv-row'>
                      <label className='form-label'>商品類(系)別</label>
                      <select
                        className='form-select mb-2'
                        data-control='select2'
                        data-allow-clear='true'
                      >
                        <option disabled selected hidden>
                          choose category of the book
                        </option>
                        <option value='0'>目前寫死的</option>
                        <option value='1'>資工系</option>
                        <option value='3'>11115</option>
                        <option value='4'>電子系</option>
                      </select>
                      <div className='text-muted fs-7 mb-7'>Add product to a category.</div>
                    </div>
                    {/* end::Product Category */}
                    {/* begin::Product Tag */}
                    <div className='mb-10 fv-row'>
                      <label className='form-label d-block'>商品標籤</label>
                      <input
                        id='add_product_tags'
                        name='add_product_tags'
                        placeholder='Add tags to a product'
                        className='form-control mb-2'
                        value=''
                      />
                    </div>
                    {/* end::Product Tag */}
                  </div>
                </div>
                {/* end::Product */}
                {/* begin:: Button */}
                <div className='d-flex justify-content-end'>
                  <a href='../dashboard' id='add_product_cancel' className='btn btn-light me-5'>
                    返回
                  </a>
                  <button type='submit' id='add_product_submit' className='btn btn-primary'>
                    <span className='indicator-label'>建立商品</span>
                    <span className='indicator-progress'>
                      Please wait...
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  </button>
                </div>
                {/* end::Button*/}
              </div>
              {/* end::Main row*/}
            </form>
            {/* end::Form */}
          </div>
          {/* end::Container */}
        </div>
        {/* end::Post */}
      </div>
    </>
  )
}
export default NewArrivalPage
