import {toast} from 'react-toastify'
import store, {dispatch} from '../../../../setup/redux/Store'
import getUserAPI from '../../auth/API/GetUserAPI'
import Path from '../Path'
import * as ChatRedux from '../../chat/redux/ChatRedux'

type Response = {
  type: string
  userId: number
  fromId: number
  message: string
}

// Send Chat => 發送訊息 , Recieve Chat => 接收訊息
export default class ChatPath extends Path {
  private static readonly instance = new ChatPath(0, '')
  type: string = 'chat'

  constructor(userId: number, message: string) {
    super()
    if (userId === 0) {
      this.pushHandleFunction()
      return
    }
    this.form.userId = userId
    this.form.message = message
    dispatch(
      ChatRedux.actions.updateChat(userId, store.getState().auth.auth?.user?.id as number, message)
    )
    this.pushHandleFunction()
  }

  // TODO: Handle
  /**
   * {
   *    type: "chat",
   *    userId: 3,
   *    fromId: 4,
   *    message: "aaaaaaaa"
   * }
   */
  public recieveHandle(res: Response) {
    console.log(res)
    const {auth} = store.getState()
    const user = auth.users.find((u) => u.id === res.fromId)
    dispatch(ChatRedux.actions.updateChat(res.fromId, res.fromId, res.message))
    if (user) {
      toast.info(`${user.name}: ${res.message}`)
    } else {
      ;(async () => {
        const user = await getUserAPI(res.fromId)
        if ('id' in user) {
          toast.info(`${user.name}: ${res.message}`)
        } else {
          toast.info(`User[${res.fromId}]: ${res.message}`)
        }
      })()
    }
  }
}
