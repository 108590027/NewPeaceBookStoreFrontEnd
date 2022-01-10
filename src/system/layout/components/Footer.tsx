/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useLayout} from '../core'

const Footer: FC = () => {
  const {classes} = useLayout()
  return (
    <div className='footer py-4 d-flex flex-lg-column' id='kt_footer'>
      <div
        className={`${classes.footerContainer} d-flex flex-column flex-md-row align-items-center justify-content-between`}
      >
        <div className='text-dark order-2 order-md-1'>
          <span className='text-muted fw-bold me-2'>{new Date().getFullYear()} &copy;</span>
          <a href='#' className='text-gray-800 text-hover-primary'>
            資料庫專題
          </a>
        </div>
        <ul className='menu menu-gray-600 menu-hover-primary fw-bold order-1'></ul>
      </div>
    </div>
  )
}

export {Footer}
