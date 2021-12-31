import Path from '../Path'

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
  }
}
