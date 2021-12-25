/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {IUpdatePassword, updatePassword} from '../SettingsModel'
import editProfileAPI from '../../../../auth/API/EditProfileAPI'
import {toast} from 'react-toastify'
import {ErrorResponse} from '../../../../errors/ErrorDataTypes'

const passwordFormValidationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(3, '最少要3個字')
    .max(50, '不可超過50字')
    .required('請輸入密碼'),
  newPassword: Yup.string().min(3, '最少要3個字').max(50, '不可超過50字').required('請輸入新密碼'),
  passwordConfirmation: Yup.string()
    .min(3, '最少要3個字')
    .max(50, '不可超過50字')
    .required('請輸入新密碼')
    .oneOf([Yup.ref('newPassword'), null], '兩次輸入的新密碼不同'),
})

const SignInMethod: React.FC = () => {
  const [passwordUpdateData, setPasswordUpdateData] = useState<IUpdatePassword>(updatePassword)
  const [showPasswordForm, setPasswordForm] = useState<boolean>(false)
  const [loading2, setLoading2] = useState(false)

  const formik2 = useFormik<IUpdatePassword>({
    initialValues: {
      ...passwordUpdateData,
    },
    validationSchema: passwordFormValidationSchema,
    onSubmit: (values) => {
      setLoading2(true)
      setTimeout(async () => {
        const res = await editProfileAPI({
          oldPassword: values.currentPassword,
          password: values.newPassword,
        })
        if (res === 1) {
          toast.success(`修改成功！`)
        } else {
          toast.error(`修改失敗：${(res as ErrorResponse).message}`)
        }
        setPasswordUpdateData(values)
        setLoading2(false)
        setPasswordForm(false)
      }, 1000)
    },
  })

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_signin_method'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>登入資訊</h3>
        </div>
      </div>
      <div id='kt_account_signin_method' className='collapse show'>
        <div className='card-body border-top p-9'>
          <div className='d-flex flex-wrap align-items-center mb-10'>
            <div id='kt_signin_password' className={' ' + (showPasswordForm && 'd-none')}>
              <div className='fs-6 fw-bolder mb-1'>密碼</div>
              <div className='fw-bold text-gray-600'>************</div>
            </div>
            <div
              id='kt_signin_password_edit'
              className={'flex-row-fluid ' + (!showPasswordForm && 'd-none')}
            >
              <form
                onSubmit={formik2.handleSubmit}
                id='kt_signin_change_password'
                className='form'
                noValidate
              >
                <div className='row mb-1'>
                  <div className='col-lg-4'>
                    <div className='fv-row mb-0'>
                      <label htmlFor='currentpassword' className='form-label fs-6 fw-bolder mb-3'>
                        目前密碼
                      </label>
                      <input
                        type='password'
                        className='form-control form-control-lg form-control-solid '
                        id='currentpassword'
                        {...formik2.getFieldProps('currentPassword')}
                      />
                      {formik2.touched.currentPassword && formik2.errors.currentPassword && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik2.errors.currentPassword}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='col-lg-4'>
                    <div className='fv-row mb-0'>
                      <label htmlFor='newpassword' className='form-label fs-6 fw-bolder mb-3'>
                        新密碼
                      </label>
                      <input
                        type='password'
                        className='form-control form-control-lg form-control-solid '
                        id='newpassword'
                        {...formik2.getFieldProps('newPassword')}
                      />
                      {formik2.touched.newPassword && formik2.errors.newPassword && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik2.errors.newPassword}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='col-lg-4'>
                    <div className='fv-row mb-0'>
                      <label htmlFor='confirmpassword' className='form-label fs-6 fw-bolder mb-3'>
                        確認新密碼
                      </label>
                      <input
                        type='password'
                        className='form-control form-control-lg form-control-solid '
                        id='confirmpassword'
                        {...formik2.getFieldProps('passwordConfirmation')}
                      />
                      {formik2.touched.passwordConfirmation && formik2.errors.passwordConfirmation && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik2.errors.passwordConfirmation}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className='form-text mb-5'>密碼至少需要3個字</div>

                <div className='d-flex'>
                  <button
                    id='kt_password_submit'
                    type='submit'
                    className='btn btn-primary me-2 px-6'
                  >
                    {!loading2 && '修改密碼'}
                    {loading2 && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        請稍候...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setPasswordForm(false)
                    }}
                    id='kt_password_cancel'
                    type='button'
                    className='btn btn-color-gray-400 btn-active-light-primary px-6'
                  >
                    關閉
                  </button>
                </div>
              </form>
            </div>

            <div
              id='kt_signin_password_button'
              className={'ms-auto ' + (showPasswordForm && 'd-none')}
            >
              <button
                onClick={() => {
                  setPasswordForm(true)
                }}
                className='btn btn-light btn-active-light-primary'
              >
                重設密碼
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {SignInMethod}
