import React, {FC, useState} from 'react'
import {toast} from 'react-toastify'
import {BanRecordModel, UserModel} from '../../auth/redux/AuthModel'
import {ErrorResponse} from '../../errors/ErrorDataTypes'
import deleteBanRecordAPI from '../API/DeleteBanRecordAPI'
import getUserBanRecordsAPI from '../API/GetUserBanRecordsAPI'

interface Props {
  user?: UserModel
}

const AdminUserBanRecords: FC<Props> = ({user}) => {
  const [records, setRecords] = useState([] as BanRecordModel[])
  const [init, setInit] = useState(false)
  const removeRecord = async (id: number) => {
    const data = await deleteBanRecordAPI(id)
    if ('message' in (data as any)) {
      toast.error(`刪除失敗：${(data as ErrorResponse).message}`)
    } else {
      const record = records.find((r) => r.id === data)
      if (record) {
        records.splice(records.indexOf(record), 1)
        setRecords([...records])
        toast.success('刪除成功！')
      }
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    <td>{record.duration}</td>
                    <td className='fw-bolder'>{record.reason}</td>
                    <td>
                      <button
                        className='btn btn-danger btn-sm'
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
    </>
  )
}

export default AdminUserBanRecords
