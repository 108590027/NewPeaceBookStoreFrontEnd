import {Modal} from 'bootstrap'
import React, {FC, useState} from 'react'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import {RootState} from '../../../../setup'
import {KTSVG} from '../../../../_metronic/helpers'
import {PageTitle} from '../../../../_metronic/layout/core'
import getUserAPI from '../../auth/API/GetUserAPI'
import {IAuthState} from '../../auth/redux/AuthRedux'
import getResolvedReportsAPI from '../../report/API/GetResolvedReportsAPI'
import getUnresolvedReportsAPI from '../../report/API/GetUnresolvedReportsAPI'
import resolveReportAPI from '../../report/API/ResolveReportAPI'
import {ReportState} from '../../report/redux/ReportRedux'

const AdminReportsPage: FC = () => {
  const userState: IAuthState = useSelector((state: RootState) => state.auth)
  const reportState: ReportState = useSelector((state: RootState) => state.report)
  const [resolveId, setResolveId] = useState(0)
  const [resolveTime, setResolveTime] = useState(0)
  const [load, setLoad] = useState(false)
  const resolveReport = async () => {
    const data = await resolveReportAPI(resolveId, resolveTime)
    if ('id' in data) {
      console.log(reportState.reports.find((r) => resolveId === r.id))
      toast.success('回報成功')
    } else {
      toast.error(`回報失敗${data.message}`)
    }
  }
  const openResolveModal = (id: number) => {
    const report = reportState.reports.find((r) => r.id === id)
    if (report) {
      setResolveId(id)
      setResolveTime(0)
      new Modal('#resolveModal').show()
    }
  }
  const loadUsers = () => {
    reportState.reports.forEach((report) => {
      const reporter = userState.users.find((u) => u.id === report.reporter)
      const victim = userState.users.find((u) => u.id === report.victim)
      if (!reporter) {
        getUserAPI(report.reporter)
      }
      if (!victim) {
        getUserAPI(report.victim)
      }
    })
  }
  const getUser = (userId: number) => {
    return userState.users.find((u) => u.id === userId)
  }
  if (!load) {
    setLoad(true)
    ;(async () => {
      await getUnresolvedReportsAPI()
      await getResolvedReportsAPI()
      loadUsers()
    })()
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>{`舉報系統管理`}</PageTitle>

      <div className='col-12'>
        <div className={`card card-xxl-stretch mb-5 mb-xxl-8 table-responsive`}>
          <div className='table-responsive'>
            <table className='table table-hover table-rounded table-striped gy-4 gs-7 text-center align-middle'>
              <thead>
                <tr className='fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200'>
                  <th>ID</th>
                  <th>被舉報人</th>
                  <th>舉報人</th>
                  <th>類型</th>
                  <th>描述</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {reportState.reports.map((report) => (
                  <tr key={report.id}>
                    <td>{report.id}</td>
                    <td className='fw-bolder'>
                      {getUser(report.victim)?.name || `UserID:${report.victim}`}
                    </td>
                    <td className='fw-bolder'>
                      {getUser(report.reporter)?.name || `UserID:${report.reporter}`}
                    </td>
                    <td className='fw-bolder'>{report.reason}</td>
                    <td className='fw-bolder'>{report.detail}</td>
                    <td>
                      {report.status === 0 ? (
                        <>
                          <button
                            className='btn btn-primary btn-sm mx-2'
                            onClick={() => openResolveModal(report.id)}
                          >
                            <i className='bi bi-pencil-square fs-5'></i>決斷
                          </button>
                        </>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className='modal fade' tabIndex={-1} id='resolveModal'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>處理舉報</h5>
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
                  <label className='form-check-label' htmlFor={`resolveTime`}>
                    封禁天數 (0為不處罰)
                  </label>
                  <input
                    id='resolveTime'
                    value={resolveTime}
                    type='number'
                    className='form-control mt-1'
                    onChange={(e) => setResolveTime(parseInt(e.target.value))}
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
              <button type='button' className='btn btn-primary' onClick={(e) => resolveReport()}>
                確定
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminReportsPage
