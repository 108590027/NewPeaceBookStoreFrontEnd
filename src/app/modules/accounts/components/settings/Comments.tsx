import React from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../../../setup'
import getMerchantCommentsAPI from '../../../auth/API/GetMerchantCommentsAPI'
import {IAuthState} from '../../../auth/redux/AuthRedux'

export function Comments() {
  const authState: IAuthState = useSelector<RootState>(({auth}) => auth, shallowEqual) as IAuthState
  if (!authState.auth?.user?.comments) {
    setTimeout(async () => {
      await getMerchantCommentsAPI(authState.auth?.user?.id || 0)
    })
  }
  // TODO: 列出評論
  console.log(authState.auth?.user?.comments)
  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body border-top p-9'>
        <div className='row mb-6'>
          <label className='col-lg-4 col-form-label fw-bold fs-6'>名稱</label>

          <div className='col-lg-8'>
            <div className='row'>
              <div className='col-lg-6 fv-row'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
