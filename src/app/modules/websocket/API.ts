import WebSocketHandler from './WebSocketHandler'
export default abstract class API {
  public static readonly SendDelay: number = 5000

  public form: {event: string; data: any} = {
    event: '',
    data: {},
  }
  public abstract event: string // WS event
  public abstract checkAuth: boolean
  public disable: boolean = false

  public send() {
    if (this.checkAuth) {
      if (!(window as any).isLogin) {
        return
      }
    }
    if (this.disable) {
      return
    }
    this.form.event = this.event
    WebSocketHandler.send(this.form)
  }

  public abstract recieveHandle(res: any): void // response callback

  public pushHandleFunction(): boolean {
    if (!WebSocketHandler.invokeFunctions.has(this.event)) {
      WebSocketHandler.invokeFunctions.set(this.event, (data: any) => {
        this.recieveHandle(data)
      })
    }
    return true
  }
}
