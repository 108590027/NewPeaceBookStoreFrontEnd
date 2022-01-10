import React, {FC, useState} from 'react'
import {toast} from 'react-toastify'
import {EZSVG} from '../../../../system/helpers'
import {UserModel} from '../../auth/redux/AuthModel'
import createReportAPI from '../API/CreateReportAPI'
import {ErrorResponse} from '../../errors/ErrorDataTypes'

interface Props {
  user: UserModel | undefined
}

const reasons = ['販售違禁品', '冒充身分', '假帳號', '訂單問題']

const ReportModal: FC<Props> = ({user}) => {
  const [reason, setReason] = useState(0)
  const [detail, setDetail] = useState('')
  // 提交舉報
  const postReport = async () => {
    if (!user) {
      return
    }
    // 打API，等待結果並取出
    const data = await createReportAPI(user.id, reason, detail)
    // 成功的回傳，理論上data就會有`id`這個屬性，藉此做判斷是否成功
    if (data > 0) {
      toast.success('回報成功') // 右下角顯示提示訊息
      closeModal()
    } else {
      toast.error(`回報失敗${(data as ErrorResponse).message}`) // 右下角顯示錯誤訊息
    }
  }
  // 打開決斷的彈窗
  /*const openResolveModal = () => {
    new Modal('#reportModal').show() // 打開彈窗
  }*/
  const closeModal = () => {
    document.getElementById('ReportModalCancel')?.click()
  }

  return (
    <>
      <div className='modal fade' tabIndex={-1} id='reportModal'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>舉報用戶－ {user?.name}</h5>
              <div
                className='btn btn-icon btn-sm btn-active-light-primary ms-2'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                <EZSVG
                  path='/media/icons/duotune/arrows/arr061.svg'
                  className='svg-icon svg-icon-2x'
                />
              </div>
            </div>
            <div className='modal-body'>
              <div className='row'>
                <div className='col-12 mt-4'>
                  <label className='form-check-label' htmlFor={`detail`}>
                    類型
                  </label>
                  <select
                    className='form-select mb-5'
                    value={reason}
                    onChange={(e) => setReason(parseInt(e.target.value))}
                  >
                    {reasons.map((r, i) => (
                      <option value={i} key={i}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='row'>
                <div className='col-12 mt-4'>
                  <label className='form-check-label' htmlFor={`detail`}>
                    原因
                  </label>
                  <input
                    id='detail'
                    value={detail}
                    className='form-control mt-1'
                    onChange={(e) => setDetail(e.target.value)}
                  ></input>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                id='ReportModalCancel'
                type='button'
                className='btn btn-light'
                data-bs-dismiss='modal'
              >
                取消
              </button>
              <button type='button' className='btn btn-primary' onClick={(e) => postReport()}>
                舉報
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReportModal
