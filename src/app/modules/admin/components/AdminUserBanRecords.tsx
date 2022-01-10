import {Modal} from 'bootstrap'
import React, {FC, useState} from 'react'
import {toast} from 'react-toastify'
import {EZSVG} from '../../../../system/helpers'
import {toInputDate} from '../../../../system/helpers/DateUtil'
import {BanRecordModel, UserModel} from '../../auth/redux/AuthModel'
import {ErrorResponse} from '../../errors/ErrorDataTypes'
import createBanRecordAPI from '../API/CreateBanRecordAPI'
import deleteBanRecordAPI from '../API/DeleteBanRecordAPI'
import getUserBanRecordsAPI from '../API/GetUserBanRecordsAPI'
import updateBanRecordAPI from '../API/UpdateBanRecordAPI'

interface Props {
  user?: UserModel
}

const AdminUserBanRecords: FC<Props> = ({user}) => {
  const [records, setRecords] = useState([] as BanRecordModel[])
  const [init, setInit] = useState(false)
  const [createReason, setCreateReason] = useState('違反會員規定')
  const [createDuration, setCreateDuration] = useState(toInputDate(Date.now()))
  const [updateId, setUpdateId] = useState(0)
  const [updateReason, setUpdateReason] = useState('違反會員規定')
  const [updateDuration, setUpdateDuration] = useState(toInputDate(Date.now()))
  const removeRecord = async (id: number) => {
    const data = await deleteBanRecordAPI(id)
    if (`${data}` === `${id}`) {
      const record = records.find((r) => `${r.id}` === `${data}`)
      if (record) {
        records.splice(records.indexOf(record), 1)
        setRecords([...records])
        toast.success('刪除成功！')
      }
    } else {
      toast.error(`刪除失敗：${(data as ErrorResponse).message}`)
    }
  }
  const ban = async () => {
    if (user) {
      const data = await createBanRecordAPI(
        user.id,
        createReason,
        Math.trunc(new Date(createDuration).getTime() / 1000)
      )
      if ('id' in data) {
        setRecords([data, ...records])
        document.getElementById('createModalCancel')?.click()
        toast.success('建立成功。')
      } else {
        toast.error(`建立失敗：${data.message}`)
      }
    }
  }
  const openUpdateModal = (id: number) => {
    setUpdateId(id)
    const record = records.find((r) => r.id === id)
    if (record) {
      setUpdateReason(record.reason)
      setUpdateDuration(toInputDate(new Date(record.duration).getTime()))
      new Modal('#updateModal').show()
    }
  }
  const updateRecord = async () => {
    const data = await updateBanRecordAPI(
      updateId,
      updateReason,
      Math.trunc(new Date(updateDuration).getTime() / 1000)
    )
    if ('id' in data) {
      const record = records.find((r) => r.id === data.id)
      if (record) {
        records[records.indexOf(record)] = {...data}
      } else {
        records.push(data)
      }
      setRecords([...records])
      document.getElementById('updateModalCancel')?.click()
      toast.success('修改成功')
    } else {
      toast.error(`修改失敗：${data.message}`)
    }
  }

  if (!init) {
    if (user) {
      ;(async () => {
        setInit(true)
        const data = await getUserBanRecordsAPI(user.id)
        if ('message' in data) {
          toast.error('數據加載失敗！')
        } else {
          setRecords([...data])
        }
      })()
    }
  }

  return (
    <>
      <div className='col-12'>
        <div className={`card card-xxl-stretch mb-5 mb-xxl-8 table-responsive`}>
          <div className='table-responsive'>
            <table className='table table-hover table-rounded table-striped gy-4 gs-7 text-center align-middle'>
              <thead>
                <tr className='fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200'>
                  <th>禁止時間</th>
                  <th>理由</th>
                  <th>
                    <button
                      className='btn btn-success btn-sm'
                      onClick={(e) => new Modal('#createModal').show()}
                    >
                      建立紀錄
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    <td>{record.duration}</td>
                    <td className='fw-bolder'>{record.reason}</td>
                    <td>
                      <button
                        className='btn btn-primary btn-sm mx-2'
                        onClick={() => openUpdateModal(record.id)}
                      >
                        <i className='bi bi-pencil-square fs-5'></i>修改
                      </button>
                      <button
                        className='btn btn-danger btn-sm mx-2'
                        onClick={() => removeRecord(record.id)}
                      >
                        <i className='bi bi-trash-fill fs-5'></i>撤銷
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className='modal fade' tabIndex={-1} id='createModal'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>封禁會員</h5>
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
                  <label className='form-check-label' htmlFor={`createReason`}>
                    原因
                  </label>
                  <input
                    id='createReason'
                    value={createReason}
                    className='form-control mt-1'
                    onChange={(e) => setCreateReason(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className='row'>
                <div className='col-12 mt-4'>
                  <label className='form-check-label' htmlFor={`createDuration`}>
                    到期時間
                  </label>
                  <input
                    id='createDuration'
                    value={createDuration}
                    type='datetime-local'
                    className='form-control mt-1'
                    onChange={(e) => setCreateDuration(e.target.value)}
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
              <button type='button' className='btn btn-primary' onClick={ban}>
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
              <h5 className='modal-title'>封禁會員</h5>
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
                  <label className='form-check-label' htmlFor={`updateReason`}>
                    原因
                  </label>
                  <input
                    id='updateReason'
                    value={updateReason}
                    className='form-control mt-1'
                    onChange={(e) => setUpdateReason(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className='row'>
                <div className='col-12 mt-4'>
                  <label className='form-check-label' htmlFor={`updateDuration`}>
                    到期時間
                  </label>
                  <input
                    id='updateDuration'
                    value={updateDuration}
                    type='datetime-local'
                    className='form-control mt-1'
                    onChange={(e) => setUpdateDuration(e.target.value)}
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
              <button type='button' className='btn btn-primary' onClick={updateRecord}>
                建立
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminUserBanRecords
