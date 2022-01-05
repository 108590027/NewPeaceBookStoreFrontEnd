import {useState} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {UserModel} from '../../../../app/modules/auth/redux/AuthModel'
import LoginPath from '../../../../app/modules/websocket/Path/LoginPath'
import WebSocketHandler from '../../../../app/modules/websocket/WebSocketHandler'
import {RootState} from '../../../../setup'

export function MenuInner() {
  const [load, setLoad] = useState(false)
  const user: UserModel = useSelector<RootState>(
    ({auth}) => auth.auth?.user,
    shallowEqual
  ) as UserModel
  if (!load) {
    setLoad(true)
    WebSocketHandler.connect(false, () => {
      new LoginPath().send()
    })
  }
  return (
    <>
      <div style={{width: '100%'}}>
        <input type='text' className='form-control align-middle mt-3' placeholder='請輸入關鍵字' />
      </div>
    </>
  )
}
