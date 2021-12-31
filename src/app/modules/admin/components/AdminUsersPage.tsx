import {Modal} from 'bootstrap'
import React, {FC, useState} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import {RootState} from '../../../../setup'
import {KTSVG} from '../../../../_metronic/helpers'
import {PageTitle} from '../../../../_metronic/layout/core'
import {IAuthState} from '../../auth/redux/AuthRedux'
import {CategoryState} from '../../category/redux/CategoryRedux'
import createUserAPI from '../API/CreateUserAPI'
import getUsersAPI from '../API/GetUsersAPI'

const AdminUsersPage: FC = () => {
  const userState: IAuthState = useSelector((state: RootState) => state.auth)
  const categoryState: CategoryState = useSelector((state: RootState) => state.category)
  const [load, setLoad] = useState(false)
  const [createEmail, setCreateEmail] = useState('')
  const [createName, setCreateName] = useState('')
  const [createPassword, setCreatePassword] = useState('')
  const [createSid, setCreateSid] = useState('')
  const [createMajor, setCreateMajor] = useState(categoryState.categories[0].id || 1)
  const createUser = async () => {
    if (createEmail === '' || createName === '' || createPassword === '' || createSid === '') {
      toast.error('請輸入資訊！')
      return
    }
    const result = await createUserAPI(
      createEmail,
      createName,
      createPassword,
      createSid,
      createMajor
    )
    if ('id' in result) {
      toast.success(`新增成功！`)
      document.getElementById('createModalCancel')?.click()
      setCreateEmail('')
      setCreateName('')
      setCreatePassword('')
      setCreateSid('')
    } else {
      toast.error(`發生錯誤：${result.message}`)
    }
  }
  if (!load) {
    setLoad(true)
    getUsersAPI()
  }
  const users = userState.users

  return (
    <>
      <PageTitle breadcrumbs={[]}>{`會員列表`}</PageTitle>

      <div className='col-12'>
        <div className={`card card-xxl-stretch mb-5 mb-xxl-8 table-responsive`}>
          <div className='table-responsive'>
            <table className='table table-hover table-rounded table-striped gy-4 gs-7 text-center align-middle'>
              <thead>
                <tr className='fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200'>
                  <th>ID</th>
                  <th>名稱</th>
                  <th>科系</th>
                  <th>身分</th>
                  <th>
                    <button
                      className='btn btn-success btn-sm'
                      onClick={(e) => new Modal('#createModal').show()}
                    >
                      新增使用者
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td className='fw-bolder'>{user.name}</td>
                    <td>{categoryState.categories.find((c) => c.id === user.major)?.name}</td>
                    <td>
                      {user.role === 1 ? (
                        <span className='badge badge-light-info fw-bolder fs-6 px-2 py-1 ms-2'>
                          管理員
                        </span>
                      ) : user.role === -1 ? (
                        <span className='badge badge-light-danger fw-bolder fs-6 px-2 py-1 ms-2'>
                          封鎖用戶
                        </span>
                      ) : (
                        <span className='badge badge-light-success fw-bolder fs-6 px-2 py-1 ms-2'>
                          會員
                        </span>
                      )}
                    </td>
                    <td>
                      <Link className='btn btn-primary btn-sm' to={`/admin/user/${user.id}`}>
                        <i className='bi bi-file-text fs-5'></i>詳細
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='modal fade' tabIndex={-1} id='createModal'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>建立新使用者</h5>
                <div
                  className='btn btn-icon btn-sm btn-active-light-primary ms-2'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                >
                  <KTSVG
                    path='/media/icons/duotune/arrows/arr061.svg'
                    className='svg-icon svg-icon-2x'
                  />
                </div>
              </div>
              <div className='modal-body'>
                <div className='row'>
                  <div className='col-12 mt-4'>
                    <label className='form-check-label' htmlFor={`createEmail`}>
                      信箱
                    </label>
                    <input
                      id='createEmail'
                      value={createEmail}
                      type='email'
                      className='form-control mt-1'
                      onChange={(e) => setCreateEmail(e.target.value)}
                    ></input>
                  </div>
                  <div className='col-12 mt-4'>
                    <label className='form-check-label' htmlFor={`createName`}>
                      名稱
                    </label>
                    <input
                      id='createName'
                      value={createName}
                      type='text'
                      className='form-control mt-1'
                      onChange={(e) => setCreateName(e.target.value)}
                    ></input>
                  </div>
                  <div className='col-12 mt-4'>
                    <label className='form-check-label' htmlFor={`createPassword`}>
                      密碼
                    </label>
                    <input
                      id='createPassword'
                      value={createPassword}
                      type='text'
                      className='form-control mt-1'
                      onChange={(e) => setCreatePassword(e.target.value)}
                    ></input>
                  </div>
                  <div className='col-12 mt-4'>
                    <label className='form-check-label' htmlFor={`createSid`}>
                      學號
                    </label>
                    <input
                      id='createSid'
                      value={createSid}
                      type='text'
                      className='form-control mt-1'
                      onChange={(e) => setCreateSid(e.target.value)}
                    ></input>
                  </div>
                  <div className='col-12 mt-4'>
                    <label className='form-check-label' htmlFor={`createEmail`}>
                      科系
                    </label>
                    <select
                      id='createMajor'
                      className='form-select mb-5'
                      value={createMajor}
                      onChange={(e) => setCreateMajor(parseInt(e.target.value))}
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
              <div className='modal-footer'>
                <button
                  id='createModalCancel'
                  type='button'
                  className='btn btn-light'
                  data-bs-dismiss='modal'
                >
                  取消
                </button>
                <button type='button' className='btn btn-primary' onClick={createUser}>
                  建立
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminUsersPage
