import React, {FC, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {match} from 'react-router'
import {RootState} from '../../../../setup'
import {PageLink, PageTitle} from '../../../../system/layout/core'
import {ItemState} from '../../item/redux/ItemRedux'
import getItemAPI from '../API/GetItemAPI'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Link} from 'react-router-dom'
import SwiperCore, {Navigation} from 'swiper'
import * as CartRedux from '../redux/CartRedux'
import * as ChatRedux from '../../chat/redux/ChatRedux'
import {toast} from 'react-toastify'
import {dispatch} from '../../../../setup/redux/Store'
import 'swiper/css/bundle'
import 'swiper/css'
import 'swiper/css/navigation'
import '../css/swiper.css'
import {IAuthState} from '../../auth/redux/AuthRedux'

// install Swiper modules
SwiperCore.use([Navigation])

const BreadCrumbs: Array<PageLink> = [
  {
    title: '商品頁面',
    path: '/',
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
  const userState: IAuthState = useSelector((state: RootState) => state.auth)
  const itemState: ItemState = useSelector((state: RootState) => state.item)
  const item = itemState.items.find((item) => item.id === currentId)
  const [itemCount, setItemCount] = useState(1)
  const history = useHistory()
  const authId = userState.auth?.user?.id as number
  const userId = item?.owner.id as number
  const redirectToChat = () => {
    if (authId === userId) {
      return
    }
    dispatch(ChatRedux.actions.newChat(authId, userId))
    history.push(`/chat#${userId}`)
  }

  if (parseInt(props.match.params.id) !== currentId) {
    // 當route的分類ID變動時，必須進行更新
    setLoad(false)
    setCurrentId(parseInt(props.match.params.id))
  }
  if (!load && currentId !== 0) {
    setLoad(true)
    getItemAPI(currentId)
  }

  const addToCart = async (quantity: number) => {
    if (itemCount === 0) {
      toast.warn('請選擇商品數量')
      return
    }
    if (itemCount > quantity) {
      toast.warn('商品數量不足')
      return
    }

    dispatch(CartRedux.actions.updateCartItem(item?.id as number, itemCount))
    toast.success('已加入購物車')
  }
  return (
    <>
      <PageTitle breadcrumbs={BreadCrumbs}>{`${item?.name}`}</PageTitle>

      <div className='row gy-5 g-xl-8'>
        <div className='col-xxl-4 '>
          <div className='card  mb-5 mb-xl-10 text-center mw-100'>
            {item?.images[0] ? (
              <Swiper navigation={true}>
                {item?.images.map((image, i) => (
                  <SwiperSlide>
                    <img
                      key={`image-${i}`}
                      src={image ? image.photo : '/media/icons/duotune/ecommerce/ecm005.svg'}
                      alt=''
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <img src='/media/icons/duotune/ecommerce/ecm005.svg' alt='' />
            )}
          </div>
        </div>

        <div className='card mb-5 mb-xl-10 col-xxl-8'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h1 className='fw-bolder m-0'>{item?.name}</h1>
            </div>
          </div>
          <div className='card-body border-top'>
            <h1 className='text-danger mb-3'>${item?.price}</h1>
            {item?.tags.map(
              (tag, i) =>
                tag.tag.name !== '' && (
                  <Link
                    to={`/tag/${tag.tag.id}`}
                    className='mx-1 my-2 badge badge-light-primary'
                    key={`tag-${i}`}
                  >
                    #{tag.tag.name}
                  </Link>
                )
            )}
            {authId === userId || (
              <button className='col-auto btn btn-lg btn-danger' onClick={() => redirectToChat()}>
                聯繫賣家
              </button>
            )}
          </div>

          <div className='card-body border-top p-9'>
            <div className='row'>
              <h3 className='col-auto'>數量</h3>
              <h5 className='col-auto text-muted'>剩餘數量：{item?.quantity}個</h5>
            </div>

            <input
              type='number'
              className='form-control form-control-solid'
              value={itemCount}
              onChange={(e) => setItemCount(parseInt(e.target.value))}
            />
            <br></br>
            <button
              className='btn btn-lg btn-primary w-100 mb-5'
              onClick={() => addToCart(item?.quantity as number)}
            >
              加入購物車
            </button>
          </div>
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
                <Link to={`/user/${item?.owner.id}`}>{item?.owner.name}</Link>
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
              <Link to={`/category/${item?.category.id}`} className='fw-bolder fs-6 text-primary'>
                {item?.category.name}
              </Link>
            </div>
          </div>
          {item?.ISBN === '' || (
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>ISBN</label>
              <div className='col-lg-8'>
                <span className='fw-bolder fs-6 text-dark'>{item?.ISBN}</span>
              </div>
            </div>
          )}

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
