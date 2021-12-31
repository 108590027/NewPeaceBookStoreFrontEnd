import {toAbsoluteUrl} from '../../../helpers'

export function FallbackView() {
  return (
    <div className='splash-screen'>
      <img src={toAbsoluteUrl('/media/logos/logo.png')} alt='Start logo' className='h-70px' />
      <span>Loading ...</span>
    </div>
  )
}
