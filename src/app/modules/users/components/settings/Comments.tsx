import React, {FC, useState} from 'react'
import {RootState} from '../../../../../setup'
import {shallowEqual, useSelector} from 'react-redux'
import getMerchantCommentsAPI from '../../../auth/API/GetMerchantCommentsAPI'
import getUserAPI from '../../../auth/API/GetUserAPI'
import {CommentModel, UserModel} from '../../../auth/redux/AuthModel'
import {toDateString} from '../../../../../system/helpers/DateUtil'
import {IAuthState} from '../../../auth/redux/AuthRedux'
import {Link} from 'react-router-dom'
import {EZSVG} from '../../../../../system/helpers'

interface Props {
  user: UserModel | undefined
}

export const Comments: FC<Props> = ({user}) => {
  const [comments, setComments] = useState<CommentModel[]>([])
  const authState: IAuthState = useSelector<RootState>(({auth}) => auth, shallowEqual) as IAuthState
  if (!authState.auth?.user?.comments) {
    ;(async () => {
      const result = await getMerchantCommentsAPI(user?.id || 0)
      if (!('message' in result)) {
        setComments([...result])
        result.forEach((comment) => {
          getUserAPI(comment.user_id)
        }) 
      }
    })()
  }
  const users = authState.users

  return (
    <div className='col-12'>
      <div className={`card card-xxl-stretch mb-5 mb-xxl-8 table-responsive`}>
        <div className='table-responsive'>
          <table className='table table-hover table-rounded table-striped gy-4 gs-7 text-center align-middle'>
            <thead>
              <tr className='fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200'>
                <th>時間</th>
                <th>顧客</th>
                <th>評論</th>
                <th>評分</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr key={comment.id}>
                  <td>{toDateString(new Date(comment.created_at))}</td>
                  <td key={comment.user_id}>
                    <Link to={`/user/${comment.user_id}`}>
                      {users.find((user) => user.id === comment.user_id)?.name}
                    </Link>
                  </td>
                  <td>{comment.message}</td>
                  <td className='rating justify-content-center'>
                    {[1, 2, 3, 4, 5].map((rate) => (
                      <div
                        className={`rating-label ${
                          comment.rate >= rate ? 'checked' : ''
                        }`}
                      >
                        <span className='svg-icon svg-icon-2 me-2'>
                          <EZSVG
                            path='/media/icons/duotune/general/gen029.svg'
                            className='svg-icon-1 me-1'
                          />
                        </span>
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
