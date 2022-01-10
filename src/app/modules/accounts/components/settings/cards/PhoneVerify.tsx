import React, {useState} from 'react'
import {UserModel} from '../../../../auth/redux/AuthModel'
import * as AuthRedux from '../../../../auth/redux/AuthRedux'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../../../../setup'
import {toast} from 'react-toastify'
import {ErrorResponse} from '../../../../errors/ErrorDataTypes'
import bindPhoneAPI from '../../../../auth/API/BindPhoneAPI'
import getAuthAPI from '../../../../auth/API/GetAuthAPI'
import verifyPhoneAPI from '../../../../auth/API/VerifyPhoneAPI'

const PhoneVerify: React.FC = () => {
  const authState: AuthRedux.IAuthState = useSelector<RootState>(
    ({auth}) => auth,
    shallowEqual
  ) as AuthRedux.IAuthState
  const user: UserModel = authState.auth?.user as UserModel
  const [phone, setPhone] = useState(user.phone || '')
  const [code, setCode] = useState('')

  const [loading, setLoading] = useState(false)

  const submit = () => {
    setLoading(true)
    setTimeout(async () => {
      if (user.phone_verify?.status === 0) {
        // 已綁定, 待驗證
        const res = await verifyPhoneAPI(code)
        if (res === 1) {
          await getAuthAPI()
          toast.success('認證成功')
        } else {
          toast.error(`認證成功: ${(res as ErrorResponse).message}`)
        }
      } else if (user.phone === '' || !user.phone) {
        // 未綁定
        const res = await bindPhoneAPI(phone)
        if (res === 1) {
          user.phone = phone
          await getAuthAPI()
          toast.success('綁定成功')
        } else {
          toast.error(`綁定失敗: ${(res as ErrorResponse).message}`)
        }
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_phone_verify'
        aria-expanded='true'
        aria-controls='kt_phone_verify'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>聯絡方式</h3>
        </div>
      </div>

      <div id='kt_phone_verify' className='collapse show'>
        <div className='card-body border-top p-9'>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label fw-bold fs-6'>手機</label>

            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-6 fv-row'>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                    placeholder='手機'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    readOnly={user.phone !== null}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {user.phone_verify?.status === 0 ? (
          <div className='card-body border-top p-9'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>驗證碼</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='驗證碼'
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {user.phone_verify?.status === 1 ? (
          <></>
        ) : (
          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button type='submit' className='btn btn-primary' disabled={loading} onClick={submit}>
              {!loading && (user.phone_verify ? '驗證' : '綁定手機')}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  請稍候...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export {PhoneVerify}
