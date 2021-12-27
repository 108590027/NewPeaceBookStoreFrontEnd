/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../helpers'

type Props = {
  icon: string
  title: string
  description: string
  isBase64Image?: boolean
}

const Card4: FC<Props> = ({icon, title, description, isBase64Image}) => {
  return (
    <div className='card h-100'>
      <div className='card-body d-flex justify-content-center text-center flex-column p-8'>
        <a href='#' className='text-gray-800 text-hover-primary d-flex flex-column'>
          <div className='symbol symbol-200px mb-6'>
            <img
              src={isBase64Image ? `data:image/jpeg;base64,${icon}` : toAbsoluteUrl(icon)}
              alt=''
            />
          </div>
          <div className='fs-3 fw-bolder mb-2 text-primary'>{title}</div>
        </a>
        <div className='fs-5 fw-bold text-gray-400 mt-auto'>{description}</div>
      </div>
    </div>
  )
}

export {Card4}
