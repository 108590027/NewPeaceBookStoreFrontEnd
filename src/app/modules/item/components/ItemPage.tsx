import React, {FC, useState} from 'react'
import {useSelector} from 'react-redux'
import {match} from 'react-router'
import {RootState} from '../../../../setup'
import {PageLink, PageTitle} from '../../../../system/layout/core'
import {ItemState} from '../../item/redux/ItemRedux'
import getItemAPI from '../API/GetItemsAPI'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import {KTSVG} from '../../../../system/helpers'
import {Link} from 'react-router-dom'
import SwiperCore, {Navigation} from 'swiper'
import * as CartRedux from '../redux/CartRedux'
import {toast} from 'react-toastify'
import {dispatch} from '../../../../setup/redux/Store'

// install Swiper modules
SwiperCore.use([Navigation])
const BreadCrumbs: Array<PageLink> = [
  {
    title: '商品頁面',
    path: '/item/:id',
    isSeparator: false,
    isActive: false,
  },
]
interface Props {
  match: match<{id: string}>
}

const ItemPage: FC<Props> = (props) => {
  const [load, setLoad] = useState(false)
  const [currentId, setCurrentId] = useState(0)
  const itemState: ItemState = useSelector((state: RootState) => state.item)
  const item = itemState.items.find((item) => item.id === currentId)
  const [itemCount, setItemCount] = useState(0)
  if (parseInt(props.match.params.id) !== currentId) {
    // 當route的分類ID變動時，必須進行更新
    setLoad(false)
    setCurrentId(parseInt(props.match.params.id))
  }
  if (!load && currentId !== 0) {
    setLoad(true)
    getItemAPI(currentId)
  }
  const addToCart = async () => {
    if (itemCount === 0) {
      toast.warn('請選擇商品數量')
      return
    }

    dispatch(CartRedux.actions.updateCartItem(item?.id as number, itemCount))
    toast.success('已加入購物車')
  }
  return (
    <>
      <PageTitle breadcrumbs={[]}>{`${item?.name}`}</PageTitle>
      <div className='card mb-5 mb-xl-10'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>{item?.name}</h3>
          </div>
        </div>
      </div>
      <div className='row g-5 gx-xxl-8'>
        <div className=' card-rounded mb-5 mb-xl-10 col-xxl-4'>
          <div className='text-center shadow mw-100'>
            {item?.images.map((image, i) => (
              <img src={image.photo} alt='' />
            ))}
          </div>
        </div>
        <div className='card mb-5 mb-xl-10 col-xxl-8'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h1 className='fw-bolder m-0'>{item?.name}</h1>
            </div>
          </div>
          <div className='card-body border-top p-9'>
            <h1 className='text-danger mb-3'>${item?.price}</h1>
          </div>
          <div className='card-body border-top p-9 row'>
            <h3 className='col-lg-4'>數量</h3>
            <input
              type='number'
              className='form-control form-control-solid col-lg-8'
              value={itemCount}
              onChange={(e) => setItemCount(parseInt(e.target.value))}
            />
          </div>
          <button className='btn btn-lg btn-primary w-100 mb-5' onClick={() => addToCart()}>
            加入購物車
          </button>
        </div>
      </div>
      <div className='card mb-5 mb-xl-10'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>賣家</h3>
          </div>
        </div>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>名稱</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>
                <Link to={`/admin/user/${item?.owner.id}`}>{item?.owner.name}</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='card mb-5 mb-xl-10'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>商品規格</h3>
          </div>
        </div>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>分類</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{item?.category.name}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>ISBN</label>
            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{item?.ISBN}</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>剩餘數量</label>
            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{item?.quantity}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='card mb-5 mb-xl-10'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>商品詳情</h3>
          </div>
        </div>
        <div className='card-body border-top p-9'>{item?.description}</div>
      </div>
    </>
  )
}
export default ItemPage
