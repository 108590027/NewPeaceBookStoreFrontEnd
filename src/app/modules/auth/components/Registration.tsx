/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import registerAPI from '../API/RegisterAPI'
import {ErrorResponse} from '../../errors/ErrorDataTypes'
import getCategoriesAPI from '../../category/API/GetCategoriesAPI'
import {RootState} from '../../../../setup'
import {CategoryState} from '../../category/redux/CategoryRedux'

const initialValues = {
  name: '',
  email: '',
  password: '',
  changepassword: '',
  acceptTerms: false,
  sid: '',
  major: 1,
}

const registrationSchema = Yup.object().shape({
  name: Yup.string().min(3, '最少要 3 個字').max(50, '最多不超過 50 個字').required('請輸入名字'),
  email: Yup.string()
    .email('格式不符合。請確認後重新輸入。')
    .min(3, '最少要 3 個字')
    .max(50, '最多不超過 50 個字')
    .required('請輸入信箱'),
  password: Yup.string()
    .min(3, '最少要 3 個字')
    .max(50, '最多不超過 50 個字')
    .required('請輸入密碼'),
  changepassword: Yup.string()
    .required('請輸入密碼確認')
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
    }),
  sid: Yup.string().required('請輸入學號'),
  major: Yup.number().required('請選擇系別'),
  acceptTerms: Yup.bool().required('You must accept the terms and conditions'),
})

export function Registration() {
  const categoryState: CategoryState = useSelector<RootState>(
    ({category}) => category,
    shallowEqual
  ) as CategoryState
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setTimeout(async () => {
        const result = await registerAPI(
          values.email,
          values.password,
          values.name,
          values.sid,
          values.major
        )
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

  if (categoryState.lastUpdate < Date.now() - 30000) {
    getCategoriesAPI()
  }

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_signup_form'
      onSubmit={formik.handleSubmit}
    >
      <div className='mb-10 text-center'>
        <h1 className='text-dark mb-3'>會員註冊</h1>
        <div className='text-gray-400 fw-bold fs-4'>
          <Link to='/auth/login' className='link-primary fw-bolder' style={{marginLeft: '5px'}}>
            有帳號了嗎?
          </Link>
        </div>
      </div>

      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}
      <div className='row fv-row mb-7'>
        <div className='col-xl-12'>
          <div className='fv-row mb-5'>
            <label className='form-label fw-bolder text-dark fs-6'>名稱</label>
            <input
              placeholder='名稱'
              type='text'
              autoComplete='off'
              {...formik.getFieldProps('name')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.name && formik.errors.name,
                },
                {
                  'is-valid': formik.touched.name && !formik.errors.name,
                }
              )}
            />
            {formik.touched.name && formik.errors.name && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.name}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='fv-row mb-7'>
        <label className='form-label fw-bolder text-dark fs-6'>北科信箱</label>
        <input
          placeholder='Email'
          type='email'
          autoComplete='off'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div>
      <div className='mb-10 fv-row' data-kt-password-meter='true'>
        <div className='mb-1'>
          <label className='form-label fw-bolder text-dark fs-6'>密碼</label>
          <div className='position-relative mb-3'>
            <input
              type='password'
              placeholder='密碼'
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
        </div>
      </div>
      <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-dark fs-6'>確認密碼</label>
        <input
          type='password'
          placeholder='再次輸入密碼'
          autoComplete='off'
          {...formik.getFieldProps('changepassword')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik.touched.changepassword && formik.errors.changepassword,
            },
            {
              'is-valid': formik.touched.changepassword && !formik.errors.changepassword,
            }
          )}
        />
        {formik.touched.changepassword && formik.errors.changepassword && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.changepassword}</span>
            </div>
          </div>
        )}
      </div>
      <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-dark fs-6'>學號</label>
        <input
          placeholder='請輸入學號'
          type='text'
          {...formik.getFieldProps('sid')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik.touched.sid && formik.errors.sid,
            },
            {
              'is-valid': formik.touched.sid && !formik.errors.sid,
            }
          )}
        />
        {formik.touched.sid && formik.errors.sid && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.sid}</span>
            </div>
          </div>
        )}
      </div>
      <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-dark fs-6'>系別</label>
        <select id='createMajor' className='form-select mb-5' {...formik.getFieldProps('major')}>
          {categoryState.categories.map((category) =>
            category.is_department ? (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ) : (
              <></>
            )
          )}
        </select>

        {formik.touched.major && formik.errors.major && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.major}</span>
            </div>
          </div>
        )}
      </div>
      <div className='fv-row mb-10'>
        <div className='form-check form-check-custom form-check-solid'>
          <input
            className='form-check-input'
            type='checkbox'
            id='kt_login_toc_agree'
            {...formik.getFieldProps('acceptTerms')}
          />
          <label
            className='form-check-label fw-bold text-gray-700 fs-6'
            htmlFor='kt_login_toc_agree'
          >
            我同意遵守{' '}
            <Link to='/auth/terms' className='ms-1 link-primary fw-bolder'>
              使用條約
            </Link>
          </label>
          {formik.touched.acceptTerms && formik.errors.acceptTerms && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.acceptTerms}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_up_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid || !formik.values.acceptTerms}
        >
          {!loading && <span className='indicator-label'>註冊</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_signup_form_cancel_button'
            className='btn btn-lg btn-light-primary w-100 mb-5'
          >
            回到登入頁面
          </button>
        </Link>
      </div>
    </form>
  )
}
