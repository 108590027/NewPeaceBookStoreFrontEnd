/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'
import {toast} from 'react-toastify'
import {PageTitle} from '../../../system/layout/core'
import {Card4} from '../../../system/partials/content/cards/Card4'
import getHotItemsAPI from '../../modules/item/API/GetHotItemsAPI'
import getNewItemsAPI from '../../modules/item/API/GetNewItemsAPI'
import {ItemModel} from '../../modules/item/redux/ItemModel'

const DashboardWrapper: FC = () => {
  const [load, setLoad] = useState(false)
  const [hotItems, setHotItems] = useState<ItemModel[]>([])
  const [newItems, setNewItems] = useState<ItemModel[]>([])
  const getHotItems = async () => {
    const result = await getHotItemsAPI()
    if ('message' in result) {
      toast.error('取得熱門商品失敗')
    } else {
      setHotItems([...result])
    }
  }
  const getNewItems = async () => {
    const result = await getNewItemsAPI()
    if ('message' in result) {
      toast.error('取得最新商品失敗')
    } else {
      setNewItems([...result])
    }
  }
  if (!load) {
    setLoad(true)
    getHotItems()
    getNewItems()
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>{`首頁`}</PageTitle>
      <div className='card mb-5 mb-xl-10'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>推薦商品</h3>
          </div>
        </div>
      </div>
      <div className='row g-6 g-xl-9 mb-6 mb-xl-9'>
        {hotItems.map((item) => (
          <div className='col-12 col-sm-6 col-lg-4 col-xl-3' key={item.id}>
            <Card4
              icon={
                item.images[0] ? item.images[0].photo : '/media/icons/duotune/ecommerce/ecm005.svg'
              }
              title={item.name}
              description={`$${item.price}`}
              isBase64Image={item.images[0]?.photo !== undefined}
              id={item.id}
            />
          </div>
        ))}
      </div>
      <div className='card mb-5 mb-xl-10'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>最新商品</h3>
          </div>
        </div>
      </div>
      <div className='row g-6 g-xl-9 mb-6 mb-xl-9'>
        {newItems.map((item) => (
          <div className='col-12 col-sm-6 col-lg-4 col-xl-3' key={item.id}>
            <Card4
              icon={
                item.images[0] ? item.images[0].photo : '/media/icons/duotune/ecommerce/ecm005.svg'
              }
              title={item.name}
              description={`$${item.price}`}
              isBase64Image={item.images[0]?.photo !== undefined}
              id={item.id}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export {DashboardWrapper}
