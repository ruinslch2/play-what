import ReconnectingWebSocket from 'reconnecting-websocket';

// https://www.piesocket.com/websocket-tester#  for test websocket

class WebSocketService {
    ws: ReconnectingWebSocket;
    constructor() {
        this.ws = new ReconnectingWebSocket('wss://free.blr2.piesocket.com/v3/1?api_key=4hwDvtdmK4EzMx194FRf99WPsr1qHsqVcb3vtiIj&notify_self=1');
    }

    init = () => {

        // this.ws = new ReconnectingWebSocket(`123`);
        this.ws.onopen = () => {
            this.ws.send('hi')
        }

        this.ws.onmessage = this.onReceive;

        this.ws.onerror = (event) => {
        }
    }

    onReceive = (e: MessageEvent) => {
        console.log('e: ',e)

    }


    close = () => {
        this.ws.close();
    }
}

const websocketService = new WebSocketService();

export default websocketService;
