import React, {FC, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {match} from 'react-router'
import {RootState} from '../../../../setup'
import {PageTitle} from '../../../../system/layout/core'
import {Card4} from '../../../../system/partials/content/cards/Card4'
import {ItemState} from '../../item/redux/ItemRedux'
import {TagModel} from '../redux/TagModel'
import getTagAPI from '../API/GetTagAPI'
import getItemsByTagAPI from '../../item/API/GetItemsByTagAPI'
import {toast} from 'react-toastify'

interface Props {
  match: match<{id: string}>
}

const TagPage: FC<Props> = (props) => {
  const history = useHistory()
  const itemState: ItemState = useSelector((state: RootState) => state.item)
  const [tag, setTag] = useState<TagModel>()
  const [load, setLoad] = useState(false)
  const [currentId, setCurrentId] = useState(0) // 紀錄目前的分類ID
  if (parseInt(props.match.params.id) !== currentId) {
    // 當route的分類ID變動時，必須進行更新
    setLoad(false)
    setCurrentId(parseInt(props.match.params.id))
  }
  const items = itemState.items.filter(
    (item) => item.tags.some((tag) => tag.tag.id === currentId) && item.quantity > 0
  )
  if (!load && currentId !== 0) {
    setLoad(true)
    ;(async () => {
      const search = await getTagAPI(currentId)
      if ('message' in search) {
        toast.error('此頁面不存在')
        history.goBack()
      } else {
        setTag(search)
      }
    })()
    getItemsByTagAPI(currentId)
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>{`${tag ? tag.name : ''}`}</PageTitle>
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
