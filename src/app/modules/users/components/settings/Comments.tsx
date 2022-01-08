import React, {FC, useState} from 'react'
import getMerchantCommentsAPI from '../../../auth/API/GetMerchantCommentsAPI'
import {CommentModel, UserModel} from '../../../auth/redux/AuthModel'

interface Props {
  user: UserModel | undefined
}
export const Comments: FC<Props> = ({user}) => {
  const [comments, setComments] = useState<CommentModel[]>([])
  if (!user?.comments) {
    setTimeout(async () => {
      const result = await getMerchantCommentsAPI(user?.id || 0)
      if (!('message' in result)) {
        setComments([...result])
      }
    })
  }
  console.log(comments)
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
