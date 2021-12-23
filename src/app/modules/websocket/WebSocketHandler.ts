export default class WebSocketHandler {
  public static instance: WebSocket
  public static onConnect: boolean = false
  public static invokeFunctions: Map<string, any> = new Map()

  public static connect(reConnect: boolean = false, callback: any = null) {
    if (WebSocketHandler.instance && !reConnect) {
      if (WebSocketHandler.instance.readyState === WebSocket.OPEN) {
        WebSocketHandler.onConnect = true
        return
      }
    }
    const host = `ws://${import.meta.env.VITE_CHAT_SERVER}` //chat.dnworks.net
    const port = import.meta.env.VITE_CHAT_PORT
    if (WebSocketHandler.instance) {
      WebSocketHandler.instance.close()
    }
    WebSocketHandler.instance = new WebSocket(`${host}:${port}`)
    WebSocketHandler.instance.onopen = (event) => {
      console.log('[WS] onopen')
      //window.func('[WS] onopen')
      WebSocketHandler.onConnect = true
      if (callback) {
        callback()
      }
    }
    WebSocketHandler.instance.onmessage = (event) => {
      console.log('[WS] onmessage')
      const data = JSON.parse(event.data)
      if (data.event === 'server.authorization') {
        document.location.href = '/logout'
      } else if (data.event === 'server.logout.set') {
        document.location.href = '/logout'
      }
      WebSocketHandler.recieveHandler(data)
    }
    WebSocketHandler.instance.onerror = (event) => {
      console.log('[WS] onerror')
      console.log(event)
    }
    WebSocketHandler.instance.onclose = (event) => {
      console.log('[WS] onclose')
      if (
        !document.location.href.includes('auth/login') &&
        !document.location.href.includes('logout')
      ) {
        document.location.href = '/logout'
      }
    }
  }

  public static close() {
    if (WebSocketHandler.instance) {
      WebSocketHandler.instance.close()
      WebSocketHandler.onConnect = false
    }
  }

  public static send(data: any, retry: boolean = true): boolean {
    if (WebSocketHandler.onConnect && WebSocketHandler.instance) {
      if (WebSocketHandler.instance.readyState === WebSocket.OPEN) {
        WebSocketHandler.instance.send(JSON.stringify(data))
        return true
      }
    }
    return false
  }

  public static recieveHandler(data: any) {
    if (WebSocketHandler.invokeFunctions.has(data.event)) {
      WebSocketHandler.invokeFunctions.get(data.event)(data)
    }
  }
}
