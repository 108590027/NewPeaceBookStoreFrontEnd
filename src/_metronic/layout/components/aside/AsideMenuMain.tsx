/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {AsideMenuItem} from './AsideMenuItem'
import {CategoryState} from '../../../../app/modules/category/redux/CategoryRedux'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../../setup'

export function AsideMenuMain() {
  const categoryState: CategoryState = useSelector<RootState>(
    ({category}) => category,
    shallowEqual
  ) as CategoryState
  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={'首頁'}
        fontIcon='bi-app-indicator'
      />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>分類</span>
        </div>
      </div>
      {categoryState.categories.map((category) => {
        if (category.is_department) {
          return (
            <AsideMenuItem
              key={`category-${category.id}`}
              to='/dashboard'
              icon='/media/icons/duotune/art/art002.svg'
              title={category.name}
              fontIcon='bi-app-indicator'
            />
          )
        }
        return <></>
      })}
    </>
  )
}
