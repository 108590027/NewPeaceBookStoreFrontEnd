/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import loginAPI from '../API/LoginAPI'
import {ErrorResponse} from '../../errors/ErrorDataTypes'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('錯誤的信箱格式')
    .min(5, '長度過短，請輸入5字以上')
    .max(50, '長度過長')
    .required('請輸入信箱'),
  password: Yup.string()
    .min(3, '長度過短，請輸入3字以上')
    .max(50, '長度過長')
    .required('請輸入密碼'),
})

const initialValues = {
  email: 'aaa@aaa.aa',
  password: 'aaa',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setTimeout(async () => {
        const result = await loginAPI(values.email, values.password)
        setLoading(false)
        setSubmitting(false)
        if ('user' in result) {
          setStatus(`登入成功`)
        } else {
          setStatus(`${(result as ErrorResponse).message}`)
        }
      }, 1000)
    },
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-10'>
        <h1 className='text-dark mb-3'>登入會員</h1>
        <div className='text-gray-400 fw-bold fs-4'>
          還沒註冊?{' '}
          <Link to='/auth/registration' className='link-primary fw-bolder'>
            建立新帳號
          </Link>
        </div>
      </div>
      {/* begin::Heading */}

      {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : (
        <div className='mb-10 bg-light-info p-8 rounded'>
          <div className='text-info'>登入系統以使用所有功能！</div>
        </div>
      )}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <label className='form-label fs-6 fw-bolder text-dark'>信箱</label>
        <input
          placeholder='Email'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
          type='email'
          name='email'
          autoComplete='off'
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.email}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <div className='d-flex justify-content-between mt-n5'>
          <div className='d-flex flex-stack mb-2'>
            <label className='form-label fw-bolder text-dark fs-6 mb-0'>密碼</label>
          </div>
        </div>
        <input
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Action */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>登入</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              請稍候...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Action */}
      {/* begin::Separator */}
      <div className='text-center text-muted text-uppercase fw-bolder mb-5'>or</div>
      {/* end::Separator */}

      {/* begin::Google link */}
      <Link
        to='/auth/registration'
        className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'
      >
        註冊新帳號
      </Link>
    </form>
  )
}
