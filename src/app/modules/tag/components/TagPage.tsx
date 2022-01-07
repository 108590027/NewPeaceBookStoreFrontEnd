import React, {FC, useState} from 'react'
import {useSelector} from 'react-redux'
import {match} from 'react-router'
import {RootState} from '../../../../setup'
import {PageTitle} from '../../../../system/layout/core'
import {Card4} from '../../../../system/partials/content/cards/Card4'
import {ItemState} from '../../item/redux/ItemRedux'
import {TagState} from '../redux/TagRedux'
import getItemsByTagAPI from '../../item/API/GetItemsByTagAPI'

interface Props {
  match: match<{id: string}>
}

const TagPage: FC<Props> = (props) => {
  const tagState: TagState = useSelector((state: RootState) => state.tag)
  const itemState: ItemState = useSelector((state: RootState) => state.item)
  const [load, setLoad] = useState(false)
  const [currentId, setCurrentId] = useState(0) // 紀錄目前的分類ID
  if (parseInt(props.match.params.id) !== currentId) {
    // 當route的分類ID變動時，必須進行更新
    setLoad(false)
    setCurrentId(parseInt(props.match.params.id))
  }
  const tag = tagState.tags.find((t) => t.id === currentId)
  const items = itemState.items.filter(
    (item) => item.tags.some((tag) => tag.id === currentId) && item.quantity > 0
  )
  if (!load && currentId !== 0) {
    setLoad(true)
    getItemsByTagAPI(currentId)
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>{`${tag?.name}`}</PageTitle>
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

export default TagPage
