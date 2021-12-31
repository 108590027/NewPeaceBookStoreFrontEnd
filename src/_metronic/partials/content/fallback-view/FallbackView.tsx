import {toAbsoluteUrl} from '../../../helpers'

export function FallbackView() {
  return (
    <div className='splash-screen' style={{position: 'relative'}}>
      <img
        src={toAbsoluteUrl('/media/logos/logo.png')}
        alt='Start logo'
        className='h-70px'
        style={{marginLeft: '0px'}}
      />
      <span>載入中 ...</span>
    </div>
  )
}
