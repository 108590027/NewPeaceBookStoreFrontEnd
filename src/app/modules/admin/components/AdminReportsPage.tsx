import {Modal} from 'bootstrap'
import React, {FC, useState} from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import {RootState} from '../../../../setup'
import {KTSVG} from '../../../../system/helpers'
import {PageLink, PageTitle} from '../../../../system/layout/core'
import getUserAPI from '../../auth/API/GetUserAPI'
import {IAuthState} from '../../auth/redux/AuthRedux'
import getResolvedReportsAPI from '../../report/API/GetResolvedReportsAPI'
import getUnresolvedReportsAPI from '../../report/API/GetUnresolvedReportsAPI'
import resolveReportAPI from '../../report/API/ResolveReportAPI'
import {ReportState} from '../../report/redux/ReportRedux'

// 麵包屑導航
const BreadCrumbs: Array<PageLink> = [
  {
    title: '舉報系統管理',
    path: '/admin/reports',
    isSeparator: false,
    isActive: false,
  },
]

const AdminReportsPage: FC = () => {
  // 取得 Redux 的 AuthState
  const userState: IAuthState = useSelector((state: RootState) => state.auth)
  // 取得 Redux 的 ReportState
  const reportState: ReportState = useSelector((state: RootState) => state.report)
  // 儲存決斷的ID用
  const [resolveId, setResolveId] = useState(0)
  // 儲存決斷的封禁天數用
  const [resolveTime, setResolveTime] = useState(0)
  // 判斷初始化使用，避免因re-render而重複發送API打資料
  const [load, setLoad] = useState(false)
  // 確定決斷
  const resolveReport = async () => {
    // 打API，等待結果並取出
    const data = await resolveReportAPI(resolveId, resolveTime)
    // 成功的回傳，理論上data就會有`id`這個屬性，藉此做判斷是否成功
    if ('id' in data) {
      toast.success('回報成功') // 右下角顯示提示訊息
    } else {
      toast.error(`回報失敗${data.message}`) // 右下角顯示錯誤訊息
    }
  }
  // 打開決斷的彈窗
  const openResolveModal = (id: number) => {
    // 先找出舉報的資料
    const report = reportState.reports.find((r) => r.id === id)
    if (report?.status === 0) {
      // 若舉報的資料存在，且尚未處理
      setResolveId(id) // 設定目前選擇的舉報ID
      setResolveTime(0) // 將彈窗中的封禁日期輸入欄歸0
      new Modal('#resolveModal').show() // 打開彈窗
    }
  }
  // 預初始化所有舉報中，檢舉人/被檢舉人的資訊 (僅打API取得目前尚未拿到的會員)
  const loadUsers = () => {
    reportState.reports.forEach((report) => {
      // 從userState中撈出 檢舉人/被檢舉人的資訊
      const reporter = userState.users.find((u) => u.id === report.reporter)
      const victim = userState.users.find((u) => u.id === report.victim)
      // 若沒撈到，則打API向後端請求資訊
      if (!reporter) {
        getUserAPI(report.reporter)
      }
      if (!victim) {
        getUserAPI(report.victim)
      }
    })
  }
  // 依照UserID，從userState中取資料
  const getUser = (userId: number) => {
    return userState.users.find((u) => u.id === userId)
  }
  // 進行初始化判斷
  if (!load) {
    setLoad(true) // 初始化只會執行一次
    ;(async () => {
      await getUnresolvedReportsAPI() // 打未處理的舉報資料
      await getResolvedReportsAPI() // 打已處理的舉報資料
      loadUsers() // 抓取使用者資訊
    })()
  }

  return (
    <>
      <PageTitle breadcrumbs={BreadCrumbs}>{`所有舉報`}</PageTitle>

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
                {/* 陣列使用`map`方法，將每個元素轉換成指定的格式輸出 */}
                {reportState.reports.map((report) => (
                  <tr key={report.id}>
                    {/* 若是使用迴圈印HTML，則最外層的標籤須加上唯一屬性`key` 否則會跳錯誤 如上方 <tr key=id> */}
                    <td>{report.id}</td>
                    <td className='fw-bolder'>
                      {/* Link是超連結，可以導向到to的連結去 */}
                      <Link to={`/admin/user/${report.victim}`}>
                        {/* 使用||運算子：有撈到使用者資訊的話顯示名稱，沒有則直接顯示ID */}
                        {getUser(report.victim)?.name || `UserID:${report.victim}`}
                      </Link>
                    </td>
                    <td className='fw-bolder'>
                      <Link to={`/admin/user/${report.reporter}`}>
                        {getUser(report.reporter)?.name || `UserID:${report.reporter}`}
                      </Link>
                    </td>
                    <td className='fw-bolder'>{report.reason}</td>
                    <td className='fw-bolder'>{report.detail}</td>
                    <td>
                      {/* 當舉報為未處理的狀態(status為0)，則可以進行決斷 => 顯示按鈕 */}
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
