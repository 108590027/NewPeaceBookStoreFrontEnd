import {useState} from 'react'
import ChatPath from '../../../../app/modules/websocket/Path/ChatPath'
import LoginPath from '../../../../app/modules/websocket/Path/LoginPath'
import WebSocketHandler from '../../../../app/modules/websocket/WebSocketHandler'

export function MenuInner() {
  const [load, setLoad] = useState(false)
  if (!load) {
    setLoad(true)
    WebSocketHandler.connect(false, () => {
      new ChatPath(0, '')
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
