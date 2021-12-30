import {Modal} from 'bootstrap'
import React, {FC, useState} from 'react'
import {toast} from 'react-toastify'
import {KTSVG} from '../../../../_metronic/helpers'
import {PageTitle} from '../../../../_metronic/layout/core'
import {ErrorResponse} from '../../errors/ErrorDataTypes'
import createTagAPI from '../../tag/API/CreateTagAPI'
import deleteTagAPI from '../../tag/API/DeleteTagAPI'
import searchTagsAPI from '../../tag/API/SearchTagsAPI'
import updateTagAPI from '../../tag/API/UpdateTagAPI'
import {TagModel} from '../../tag/redux/TagModel'

const AdminTagsPage: FC = () => {
  const [tags, setTags] = useState([] as TagModel[])
  const [searchName, setSearchName] = useState('')
  const [createName, setCreateName] = useState('')
  const [updateId, setUpdateId] = useState(0)
  const [updateName, setUpdateName] = useState('')
  const openUpdateModal = (id: number) => {
    setUpdateId(id)
    const tag = tags.find((t) => t.id === id)
    if (tag) {
      setUpdateName(tag.name)
      new Modal('#updateModal').show()
    }
  }
  const updateTag = async () => {
    const tag = await updateTagAPI(updateId, updateName)
    if ('id' in tag) {
      const oriTag = tags.find((t) => t.id === tag.id)
      if (oriTag) {
        const index = tags.indexOf(oriTag)
        if (index >= 0) {
          tags[index] = {...tag}
          setTags([...tags])
        }
      }
      document.getElementById('updateModalCancel')?.click()
      toast.success('修改成功')
    } else {
      toast.error(`修改失敗：${tag.message}`)
    }
  }
  const createTag = async () => {
    if (createName === '') {
      toast.error('請輸入名稱！')
      return
    }
    const result = await createTagAPI(createName)
    if ('id' in result) {
      tags.push(result)
      setTags([...tags])
      toast.success(`新增成功！`)
      document.getElementById('createModalCancel')?.click()
      setCreateName('')
    } else {
      toast.error(`發生錯誤：${result.message}`)
    }
  }
  const removeTag = async (id: number) => {
    const status = await deleteTagAPI(id)
    if (status + '' === '1') {
      const tag = tags.find((t) => t.id === id)
      if (tag) {
        const index = tags.indexOf(tag)
        if (index >= 0) {
          tags.splice(index, 1)
          setTags([...tags])
        }
      }
      toast.success('刪除成功')
    } else {
      toast.success(`刪除失敗：${(status as ErrorResponse).message}`)
    }
  }
  const search = async () => {
    if (searchName === '') {
      toast.warn('請輸入關鍵字！')
      return
    }
    const data = await searchTagsAPI(searchName)
    if ('message' in data) {
      toast.error(`查詢失敗：${data.message}`)
    } else {
      setTags([...data])
      toast.success(`查詢成功，共${data.length}筆結果`)
    }
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>{`標籤管理`}</PageTitle>

      <div className='col-12'>
        <div className={`card card-xxl-stretch mb-5 mb-xxl-8`}>
          <div className='card-p pb-0'>
            <div className='row mb-5'>
              <div className='col-12'>
                <h5 className='form-check-label'>{'搜尋'}</h5>
                <input
                  type='text'
                  className='form-control'
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
                <button className='btn btn-primary w-100 mt-3' onClick={search}>
                  搜尋
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                      新增標籤
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tags.map((tag) => (
                  <tr key={tag.id}>
                    <td>{tag.id}</td>
                    <td className='fw-bolder'>{tag.name}</td>
                    <td>
                      <button
                        className='btn btn-primary btn-sm mx-2'
                        onClick={() => openUpdateModal(tag.id)}
                      >
                        <i className='bi bi-pencil-square fs-5'></i>修改
                      </button>
                      <button
                        className='btn btn-danger btn-sm mx-2'
                        onClick={() => removeTag(tag.id)}
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
                <h5 className='modal-title'>建立新標籤</h5>
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
                <button type='button' className='btn btn-primary' onClick={createTag}>
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
                <h5 className='modal-title'>修改標籤</h5>
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
                <button type='button' className='btn btn-primary' onClick={updateTag}>
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

export default AdminTagsPage
