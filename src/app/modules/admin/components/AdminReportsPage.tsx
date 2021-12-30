import {Modal} from 'bootstrap'
import React, {FC, useState} from 'react'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import {RootState} from '../../../../setup'
import {PageTitle} from '../../../../_metronic/layout/core'
import deleteCategoryAPI from '../../category/API/DeleteCategoryAPI'
import {ErrorResponse} from '../../errors/ErrorDataTypes'
import getResolvedReportsAPI from '../../report/API/GetResolvedReportsAPI'
import getUnresolvedReportsAPI from '../../report/API/GetUnresolvedReportsAPI'
import {ReportState} from '../../report/redux/ReportRedux'

const AdminReportsPage: FC = () => {
  const reportState: ReportState = useSelector((state: RootState) => state.report)
  const [load, setLoad] = useState(false)
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
    getUnresolvedReportsAPI()
    getResolvedReportsAPI()
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
                  <th>類型</th>
                  <th>描述</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {reportState.reports.map((report) => (
                  <tr key={report.id}>
                    <td>{report.id}</td>
                    <td className='fw-bolder'>{report.victim}</td>
                    <td className='fw-bolder'>{report.reason}</td>
                    <td className='fw-bolder'>{report.detail}</td>
                    <td>
                      <button
                        className='btn btn-primary btn-sm mx-2'
                        onClick={() => console.log(report.id)}
                      >
                        <i className='bi bi-pencil-square fs-5'></i>修改
                      </button>
                      <button
                        className='btn btn-danger btn-sm mx-2'
                        onClick={() => console.log(report.id)}
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
      </div>
    </>
  )
}

export default AdminReportsPage
