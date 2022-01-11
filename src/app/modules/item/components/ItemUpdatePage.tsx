import React, {FC, useState} from 'react'
import {useSelector} from 'react-redux'
import {match, useHistory} from 'react-router-dom'
import {toast} from 'react-toastify'
import {ItemState} from '../../item/redux/ItemRedux'
import {IAuthState} from '../../auth/redux/AuthRedux'
import {RootState} from '../../../../setup'
import {PageTitle} from '../../../../system/layout/core'
import getCategoriesAPI from '../../category/API/GetCategoriesAPI'
import {CategoryState} from '../../category/redux/CategoryRedux'
import updateItemAPI from '../API/UpdateItemAPI'
import getItemAPI from '../API/GetItemAPI'

interface Props {
  match: match<{id: string}>
}

const ItemUpdatePage: FC<Props> = (props) => {
  const [load, setLoad] = useState(false)
  const [onSubmit, setOnSubmit] = useState(false)
  const [currentId, setCurrentId] = useState(0)
  const [createName, setCreateName] = useState('')
  const [createDescription, setCreateDescription] = useState('')
  const [createPrice, setCreatePrice] = useState(0)
  const [createQuantity, setCreateQuantity] = useState(0)
  const [createISBN, setCreateISBN] = useState('')
  const [createDepartment, setCreateDepartment] = useState(0)
  const history = useHistory()
  const categoryState: CategoryState = useSelector((state: RootState) => state.category)
  const userState: IAuthState = useSelector((state: RootState) => state.auth)
  const itemState: ItemState = useSelector((state: RootState) => state.item)
  const item = itemState.items.find((item) => item.id === currentId)
  if (item) {
    if (userState.auth?.user?.id !== item?.owner.id) {
      if (userState.auth?.user?.role !== 1) {
        history.push(`/item/${item.id}`)
      }
    }
  }

  if (parseInt(props.match.params.id) !== currentId) {
    // 當route的分類ID變動時，必須進行更新
    setCurrentId(parseInt(props.match.params.id))
    ;(async () => {
      const result = await getItemAPI(parseInt(props.match.params.id))
      if ('id' in result) {
        setCreateName(result.name)
        setCreateDescription(result.description)
        setCreatePrice(result.price)
        setCreateQuantity(result.quantity)
        setCreateISBN(result.ISBN)
        setCreateDepartment(result.category.id)
      }
    })()
  }

  if (!load && currentId !== 0) {
    setLoad(true)
  }

  const createItem = () => {
    if (createPrice <= 0) {
      toast.warn('輸入的價格異常')
      return
    }
    if (createQuantity <= 0) {
      toast.warn('輸入的數量異常')
      return
    }
    if (createName === '') {
      toast.warn('請輸入名稱等資訊！')
      return
    }

    setOnSubmit(true)
    setTimeout(async () => {
      const result = await updateItemAPI(
        currentId,
        createName,
        createDescription,
        createISBN,
        createDepartment,
        createPrice,
        createQuantity
      )
      if ('id' in result) {
        toast.success('修改成功！')
        history.push(`/item/${result.id}`)
      } else {
        toast.error(`修改失敗：${result.message}`)
      }
      setOnSubmit(false)
    }, 500)
  }

  if (!load) {
    setLoad(true)
    ;(async () => {
      const categories = await getCategoriesAPI()
      if (!('message' in categories)) {
        setCreateDepartment(categories[0].id)
      }
    })()
  }
  return (
    <>
      <PageTitle breadcrumbs={[]}>{`商品上架`}</PageTitle>
      <div className='container-xxl'>
        <div className='d-flex flex-column gap-7 gap-lg-10'>
          <div
            data-kt-swapper='true'
            data-kt-swapper-mode='prepend'
            data-kt-swapper-parent="{default: '#kt_content_container'}"
            className='page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0'
          ></div>
          <div className='card card-flush py-4'>
            <div className='card-header'>
              <div className='card-title'>
                <h2>商品設定</h2>
              </div>
            </div>
            <div className='card-body pt-0'>
              <div className='mb-10 fv-row'>
                <label className='required form-label'>商品名稱</label>
                <input
                  type='text'
                  className='form-control mb-2'
                  placeholder='商品名稱'
                  value={createName}
                  onChange={(e) => setCreateName(e.target.value)}
                />
              </div>
              <div className='mb-10 fv-row'>
                <label className='required form-label'>單價</label>
                <input
                  type='number'
                  className='form-control mb-2'
                  placeholder='價格'
                  min='0'
                  value={createPrice}
                  onChange={(e) => setCreatePrice(parseInt(e.target.value))}
                />
              </div>
              <div className='mb-10 fv-row'>
                <label className='required form-label'>數量</label>
                <input
                  type='number'
                  className='form-control mb-2'
                  placeholder='數量'
                  min='0'
                  value={createQuantity}
                  onChange={(e) => setCreateQuantity(parseInt(e.target.value))}
                />
              </div>
              <div className='mb-10 fv-row'>
                <label className='form-label'>ISBN</label>
                <input
                  className='form-control mb-2'
                  placeholder='ISBN'
                  value={createISBN}
                  onChange={(e) => setCreateISBN(e.target.value)}
                />
              </div>
              <div className='mb-10 fv-row'>
                <label className='required form-label'>簡介</label>
                <textarea
                  rows={10}
                  className='form-control mb-2'
                  placeholder='簡介'
                  value={createDescription}
                  style={{
                    resize: 'none',
                  }}
                  onChange={(e) => setCreateDescription(e.target.value)}
                />
              </div>
              <div className='mb-10 fv-row'>
                <label className='required form-label'>商品類(系)別</label>
                <select
                  className='form-select mb-2'
                  value={createDepartment}
                  onChange={(e) => setCreateDepartment(parseInt(e.target.value))}
                >
                  {categoryState.categories.map((category, i) =>
                    category.is_department ? (
                      <option key={`category${i}`} value={category.id}>
                        {category.name}
                      </option>
                    ) : (
                      <></>
                    )
                  )}
                </select>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-end'>
            <button className='btn btn-primary' disabled={onSubmit} onClick={createItem}>
              {onSubmit ? (
                <span className='indicator-label'>
                  請稍候
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              ) : (
                <span className='indicator-label'>修改商品</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default ItemUpdatePage
