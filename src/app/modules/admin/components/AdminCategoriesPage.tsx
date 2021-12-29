import {Modal} from 'bootstrap'
import React, {FC, useState} from 'react'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import {RootState} from '../../../../setup'
import {KTSVG} from '../../../../_metronic/helpers'
import {PageTitle} from '../../../../_metronic/layout/core'
import createCategoryAPI from '../../category/API/CreateCategoryAPI'
import deleteCategoryAPI from '../../category/API/DeleteCategoryAPI'
import updateCategoryAPI from '../../category/API/UpdateCategoryAPI'
import {CategoryState} from '../../category/redux/CategoryRedux'
import {ErrorResponse} from '../../errors/ErrorDataTypes'
import getUsersAPI from '../API/GetUsersAPI'

const AdminCategoriesPage: FC = () => {
  const categoryState: CategoryState = useSelector((state: RootState) => state.category)
  const [load, setLoad] = useState(false)
  const [createName, setCreateName] = useState('')
  const [createIsDepartment, setCreateIsDepartment] = useState(false)
  const [updateId, setUpdateId] = useState(0)
  const [updateName, setUpdateName] = useState('')
  const [updateIsDepartment, setUpdateIsDepartment] = useState(false)
  const openUpdateModal = (id: number) => {
    setUpdateId(id)
    const category = categoryState.categories.find((c) => c.id === id)
    if (category) {
      setUpdateName(category.name)
      setUpdateIsDepartment(category.is_department)
      new Modal('#updateModal').show()
    }
  }
  const updateCategory = async () => {
    const category = await updateCategoryAPI(updateId, updateName, updateIsDepartment)
    if ('id' in category) {
      document.getElementById('updateModalCancel')?.click()
      toast.success('修改成功')
    } else {
      toast.success(`修改失敗：${category.message}`)
    }
  }
  const createCategory = async () => {
    if (createName === '') {
      toast.error('請輸入名稱！')
      return
    }
    const result = await createCategoryAPI(createName, createIsDepartment)
    if ('id' in result) {
      toast.success(`新增成功！`)
      document.getElementById('createModalCancel')?.click()
      setCreateName('')
    } else {
      toast.error(`發生錯誤：${result.message}`)
    }
  }
  const removeCategory = async (id: number) => {
    const status = await deleteCategoryAPI(id)
    if (status + '' === '1') {
      toast.success('刪除成功')
    } else {
      toast.success(`刪除失敗：${(status as ErrorResponse).message}`)
    }
  }
  if (!load) {
    setLoad(true)
    getUsersAPI()
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>{`會員管理`}</PageTitle>

      <div className='col-12'>
        <div className={`card card-xxl-stretch mb-5 mb-xxl-8 table-responsive`}>
          <div className='table-responsive'>
            <table className='table table-hover table-rounded table-striped gy-4 gs-7 text-center align-middle'>
              <thead>
                <tr className='fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200'>
                  <th>ID</th>
                  <th>名稱</th>
                  <th>
                    <button
                      className='btn btn-success btn-sm'
                      onClick={(e) => new Modal('#createModal').show()}
                    >
                      新增分類
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {categoryState.categories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td className='fw-bolder'>{category.name}</td>
                    <td>
                      <button
                        className='btn btn-primary btn-sm mx-2'
                        onClick={() => openUpdateModal(category.id)}
                      >
                        <i className='bi bi-pencil-square fs-5'></i>修改
                      </button>
                      <button
                        className='btn btn-danger btn-sm mx-2'
                        onClick={() => removeCategory(category.id)}
                      >
                        <i className='bi bi-trash-fill fs-5'></i>刪除
                      </button>
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
                <h5 className='modal-title'>建立新分類</h5>
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
                    <label className='form-check-label' htmlFor={`createIsDepartment`}>
                      科系分類
                    </label>
                    <input
                      id='createIsDepartment'
                      checked={createIsDepartment}
                      type='checkbox'
                      className='form-check-input mx-4'
                      onChange={(e) => setCreateIsDepartment(e.target.checked)}
                    ></input>
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
                <button type='button' className='btn btn-primary' onClick={createCategory}>
                  建立
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='modal fade' tabIndex={-1} id='updateModal'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>修改分類</h5>
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
                    <label className='form-check-label' htmlFor={`updateName`}>
                      名稱
                    </label>
                    <input
                      id='updateName'
                      value={updateName}
                      type='text'
                      className='form-control mt-1'
                      onChange={(e) => setUpdateName(e.target.value)}
                    ></input>
                  </div>
                  <div className='col-12 mt-4'>
                    <label className='form-check-label' htmlFor={`updateIsDepartment`}>
                      科系分類
                    </label>
                    <input
                      id='updateIsDepartment'
                      checked={updateIsDepartment}
                      type='checkbox'
                      className='form-check-input mx-4'
                      onChange={(e) => setUpdateIsDepartment(e.target.checked)}
                    ></input>
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  id='updateModalCancel'
                  type='button'
                  className='btn btn-light'
                  data-bs-dismiss='modal'
                >
                  取消
                </button>
                <button type='button' className='btn btn-primary' onClick={updateCategory}>
                  修改
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminCategoriesPage
