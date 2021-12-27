import React, {FC} from 'react'
import {useSelector} from 'react-redux'
import {match} from 'react-router'
import {RootState} from '../../../../setup'
import {PageTitle} from '../../../../_metronic/layout/core'
import {Card4} from '../../../../_metronic/partials/content/cards/Card4'
import {ItemState} from '../../item/redux/ItemRedux'
import {CategoryState} from '../redux/CategoryRedux'

interface Props {
  match: match<{id: string}>
}

const CategoryPage: FC<Props> = (props) => {
  const categoryState: CategoryState = useSelector((state: RootState) => state.category)
  const itemState: ItemState = useSelector((state: RootState) => state.item)
  const category = categoryState.categories.find((c) => c.id === parseInt(props.match.params.id))
  const items = itemState.items.filter(
    (item) => item.category.id === parseInt(props.match.params.id) && item.quantity > 0
  )

  return (
    <>
      <PageTitle breadcrumbs={[]}>{`${category?.name}`}</PageTitle>
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
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default CategoryPage
