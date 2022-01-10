/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../../setup'
import {BanRecordModel, UserModel} from '../../auth/redux/AuthModel'
import * as AuthRedux from '../../auth/redux/AuthRedux'
import getAuthBanRecordsAPI from '../API/GetAuthBanRecordsAPI'

export function Overview() {
  const authState: AuthRedux.IAuthState = useSelector<RootState>(
    ({auth}) => auth,
    shallowEqual
  ) as AuthRedux.IAuthState
  const user: UserModel = authState.auth?.user as UserModel
  const [load, setLoad] = useState(false)
  const [banRecords, setBanRecords] = useState([] as BanRecordModel[])
  if (!load) {
    setLoad(true)
    ;(async() => {
      const result = await getAuthBanRecordsAPI()
      if ('message' in result) {
        setBanRecords([])
      } else {
        setBanRecords([...result])
      }
    })()
  }
  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>詳細資訊</h3>
          </div>
        </div>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>名稱</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{user.name}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>連絡電話</label>

            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'>{user.phone}</span>
              {user.phone_verify?.status === 1 ? (
                <span className='badge badge-success'>已驗證</span>
              ) : (
                <span className='badge badge-danger'>未驗證</span>
              )}
            </div>
          </div>
          
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>身分</label>

            <div key={user.role} className='col-lg-8 d-flex align-items-center'>
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
            </div>
          </div>
        </div>
      </div>

      {banRecords.length > 0 &&
      <div className='card mb-5 mb-xl-10'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>封鎖紀錄</h3>
          </div>
        </div>

        <div className='card-body p-9'>
          <div className='col-12'>
            <div className={`card card-xxl-stretch mb-5 mb-xxl-8 table-responsive`}>
              <div className='table-responsive'>
                <table className='table table-hover table-rounded table-striped gy-4 gs-7 text-center align-middle'>
                  <thead>
                    <tr className='fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200'>
                      <th>理由</th>
                      <th>解鎖時間</th>
                    </tr>
                  </thead>
                  <tbody>
                    {banRecords.map((banRecord) => (
                      <tr key={banRecord.id}>
                        <td>{banRecord.reason}</td>
                        <td>{banRecord.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}
