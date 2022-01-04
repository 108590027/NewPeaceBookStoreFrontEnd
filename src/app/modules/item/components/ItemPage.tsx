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
  if (parseInt(props.match.params.id) !== currentId) {
    // 當route的分類ID變動時，必須進行更新
    setLoad(false)
    setCurrentId(parseInt(props.match.params.id))
  }
  if (!load && currentId !== 0) {
    setLoad(true)
    getItemAPI(currentId)
  }
  return (
    <>
      <PageTitle breadcrumbs={[]}>{`${item?.name}`}</PageTitle>
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>
          <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
            <div className='me-7 mb-4'>
              <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                <span
                  className='symbol-label bg-light-danger text-danger fw-bolder'
                  style={{fontSize: '3rem'}}
                >
                  {item?.name[0]}
                </span>
              </div>
            </div>

            <div className='flex-grow-1'>
              <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                <div className='d-flex flex-column'>
                  <div className='d-flex align-items-center mb-2'>
                    <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                      {item?.name}
                    </a>
                  </div>
                </div>
              </div>

              <div className='d-flex flex-wrap flex-stack'>
                <div className='d-flex flex-column flex-grow-1 pe-8'>
                  <div className='d-flex flex-wrap'>
                    <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                      <div className='d-flex align-items-center'>
                        <div className='fs-2 fw-bolder'>{item?.quantity || 0}個</div>
                      </div>

                      <div className='fw-bold fs-6 text-gray-400'>數量</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
