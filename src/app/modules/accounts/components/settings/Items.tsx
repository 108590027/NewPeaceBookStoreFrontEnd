import React from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../../../setup'
import {Card4} from '../../../../../_metronic/partials/content/cards/Card4'
import {IAuthState} from '../../../auth/redux/AuthRedux'
import {ItemState} from '../../../item/redux/ItemRedux'

export function Items() {
  const authState: IAuthState = useSelector<RootState>(({auth}) => auth, shallowEqual) as IAuthState
  const itemState: ItemState = useSelector<RootState>(({item}) => item, shallowEqual) as ItemState
  const items = itemState.items.filter((item) => {
    return item.owner.id === authState.auth?.user?.id
  })
  if (items.length === 0) {
    // TODO: 打API
  }
  // TODO: 列出商品
  console.log(items)
  return (
    <div className='row g-6 g-xl-9 mb-6 mb-xl-9'>
      <div className='col-12 col-sm-6 col-md-4'>
        <Card4
          icon='/media/svg/files/folder-document.svg'
          title='Customers'
          description='3 files'
        />
      </div>
    </div>
  )
}
