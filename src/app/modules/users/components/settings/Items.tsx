import React, {FC, useState} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../../../setup'
import {ItemCard} from '../../../item/components/ItemCard'
import {UserModel} from '../../../auth/redux/AuthModel'
import getUserItemsAPI from '../../../item/API/GetUserItemsAPI'
import {ItemState} from '../../../item/redux/ItemRedux'

interface Props {
  user: UserModel | undefined
}
export const Items: FC<Props> = ({user}) => {
  const itemState: ItemState = useSelector<RootState>(({item}) => item, shallowEqual) as ItemState
  const [loadState, setLoadState] = useState(false)
  const items = itemState.items.filter((item) => {
    return item.owner.id === user?.id
  })
  if (user) {
    if (items.length === 0 && !loadState) {
      setLoadState(true)
      getUserItemsAPI(user.id)
    }
  }
  return (
    <div className='row g-6 g-xl-9 mb-6 mb-xl-9'>
      {items.map((item) => (
        <div className='col-12 col-sm-6 col-lg-4 col-xl-3' key={item.id}>
          <ItemCard
            id={item.id}
            icon={
              item.images[0] ? item.images[0].photo : '/media/icons/duotune/ecommerce/ecm005.svg'
            }
            title={item.name}
            description={`$${item.price}`}
            isBase64Image={item.images[0]?.photo !== undefined}
          />
        </div>
      ))}
    </div>
  )
}
