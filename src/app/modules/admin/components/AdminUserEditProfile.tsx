import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import {RootState} from '../../../../setup'
import {UserModel} from '../../auth/redux/AuthModel'
import {CategoryState} from '../../category/redux/CategoryRedux'
import updateUserAPI from '../API/UpdateUserAPI'

interface Props {
  user?: UserModel
}

const AdminUserEditProfile: React.FC<Props> = ({user}) => {
  const categoryState: CategoryState = useSelector((state: RootState) => state.category)
  const [name, setName] = useState(user?.name || '')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState(user?.role || 0)
  const [major, setMajor] = useState(user?.major || 1)

  const [loading, setLoading] = useState(false)

  const submit = () => {
    setLoading(true)
    setTimeout(async () => {
      setLoading(false)
      const data: any = {
        name,
        role,
        major,
      }
      if (password !== '') {
        data.password = password
      }
      const result = await updateUserAPI(user?.id || 0, data)
      if ('id' in result) {
        toast.success('修改成功！')
      } else {
        toast.error(`修改失敗：${result.message}`)
      }
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
          <h3 className='fw-bolder m-0'>修改資料</h3>
        </div>
      </div>

      <div id='kt_phone_verify' className='collapse show'>
        <div className='card-body border-top p-9'>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label fw-bold fs-6'>名稱</label>

            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-6 fv-row'>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                    placeholder='名稱'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label fw-bold fs-6'>密碼</label>

            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-6 fv-row'>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                    placeholder='密碼'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label fw-bold fs-6'>權限</label>

            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-6 fv-row'>
                  <select
                    id='createMajor'
                    className='form-select mb-5'
                    value={role}
                    onChange={(e) => setRole(parseInt(e.target.value))}
                  >
                    <option value={0}>一般會員</option>
                    <option value={1}>管理員</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label fw-bold fs-6'>科系</label>

            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-6 fv-row'>
                  <select
                    id='createMajor'
                    className='form-select mb-5'
                    value={major}
                    onChange={(e) => setMajor(parseInt(e.target.value))}
                  >
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='card-footer d-flex justify-content-end py-6 px-9'>
          <button type='submit' className='btn btn-primary' disabled={loading} onClick={submit}>
            {!loading && '修改'}
            {loading && (
              <span className='indicator-progress' style={{display: 'block'}}>
                請稍候...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export {AdminUserEditProfile}
