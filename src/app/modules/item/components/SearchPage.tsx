import React, {FC, useState} from 'react'
import {match} from 'react-router'
import {useLocation} from 'react-router-dom'
import {PageTitle} from '../../../../system/layout/core'
import {Card4} from '../../../../system/partials/content/cards/Card4'
import {ItemModel} from '../redux/ItemModel'
import getItemsByKeywordAPI from '../API/GetItemsByKeywordAPI'

const SearchPage: FC = () => {
  const location = useLocation()
  const [items, setItems] = useState([] as ItemModel[])
  const [load, setLoad] = useState(false)
  const [currentKeyword, setCurrentKeyword] = useState('') // 紀錄目前的Keyword
  if (location.hash !== `#${currentKeyword}`) {
    // 當route的Keyword變動時，必須進行更新
    setLoad(false)
    setCurrentKeyword(location.hash.replace('#', ''))
  }
  if (!load && currentKeyword !== '') {
    setLoad(true)
    ;(async () => {
      const searchItems = await getItemsByKeywordAPI(currentKeyword)
      if ('message' in searchItems) {
        setItems([])
      } else {
        setItems([...searchItems])
      }
    })()
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>{`搜尋${currentKeyword}`}</PageTitle>
      <div className='row g-6 g-xl-9 mb-6 mb-xl-9'>
        {items.map((item) => (
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

export default SearchPage
