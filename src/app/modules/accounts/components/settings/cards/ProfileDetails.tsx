import React, {useState} from 'react'
import {profileDetailsInitValues as initialValues} from '../SettingsModel'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {UserModel} from '../../../../auth/redux/AuthModel'
import * as AuthRedux from '../../../../auth/redux/AuthRedux'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../../../../setup'
import editProfileAPI from '../../../../auth/API/EditProfileAPI'
import {dispatch} from '../../../../../../setup/redux/Store'
import {toast} from 'react-toastify'
import {ErrorResponse} from '../../../../errors/ErrorDataTypes'

const profileDetailsSchema = Yup.object().shape({})

const ProfileDetails: React.FC = () => {
  const authState: AuthRedux.IAuthState = useSelector<RootState>(
    ({auth}) => auth,
    shallowEqual
  ) as AuthRedux.IAuthState
  const user: UserModel = authState.auth?.user as UserModel
  const [data, setData] = useState<UserModel>(user)

  const [loading, setLoading] = useState(false)
  const formik = useFormik<UserModel>({
    initialValues,
    validationSchema: profileDetailsSchema,
    onSubmit: (values) => {
      setLoading(true)
      setTimeout(async () => {
        const res = await editProfileAPI({name: values.name})
        if (res === 1) {
          const request: any = {}
          if (values.name !== '') {
            request.name = values.name
          }
          data.name = values.name
          setData({...data})
          dispatch(AuthRedux.actions.setUser({...request}))
          toast.success('修改成功')
        } else {
          toast.error(`修改失敗: ${(res as ErrorResponse).message}`)
        }
        setLoading(false)
      }, 1000)
    },
  })

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>個人資訊</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-9'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>名稱</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='名稱'
                      {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.name}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button type='submit' className='btn btn-primary' disabled={loading}>
              {!loading && '修改變更'}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  請稍候...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export {ProfileDetails}
