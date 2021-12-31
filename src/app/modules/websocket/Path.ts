import WebSocketHandler from './WebSocketHandler'
export default abstract class Path {
  public static readonly SendDelay: number = 5000

  public form: any = {
    type: '',
  }
  public abstract type: string // WS event
  public disable: boolean = false

  public send() {
    if (this.disable) {
      return
    }
    this.form.type = this.type
    WebSocketHandler.send(this.form)
  }

  public abstract recieveHandle(res: any): void // response callback

  public pushHandleFunction(): boolean {
    if (!WebSocketHandler.invokeFunctions.has(this.type)) {
      WebSocketHandler.invokeFunctions.set(this.type, (data: any) => {
        this.recieveHandle(data)
      })
    }
    return true
  }
}
