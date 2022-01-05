import React, {FC, useState} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {RootState} from '../../../../setup'
import {toDateString} from '../../../utils/DateUtil'
import {IAuthState} from '../../auth/redux/AuthRedux'
import getAuthOrdersAPI from '../../order/API/GetAuthOrdersAPI'
import {OrderState} from '../../order/redux/OrderRedux'

const ShoppingCartPage: FC = () => {
  return (
    <>
      <h1>hoooo</h1>
    </>
  )
}

export default ShoppingCartPage
