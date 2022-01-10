/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../system/helpers'

type Props = {
  icon: string
  title: string
  description: string
  isBase64Image?: boolean
  id: number
}

const ItemCard: FC<Props> = ({icon, title, description, isBase64Image, id}) => {
  return (
    <div className='card h-100'>
      <div className='card-body d-flex justify-content-center text-center flex-column p-8'>
        <Link to={`/item/${id}`} className='text-gray-800 text-hover-primary d-flex flex-column'>
          <div className='symbol symbol-200px mb-6'>
            <img src={isBase64Image ? `${icon}` : toAbsoluteUrl(icon)} alt='' />
          </div>
          <div className='fs-3 fw-bolder mb-2 text-primary'>{title}</div>
        </Link>
        <div className='fs-5 fw-bold text-gray-400 mt-auto'>{description}</div>
      </div>
    </div>
  )
}

export {ItemCard}
