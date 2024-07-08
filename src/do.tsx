import {DurableObject} from "cloudflare:workers";
import Count from "./components/count";

export class Counter extends DurableObject {

    constructor(state: DurableObjectState, env: Env) {
        super(state, env);
        console.log('Counter created', this.ctx.storage.get("count"))
    }

    async increment() {
        const prevCount: number = (await this.ctx.storage.get("count")) || 0 + 1;
        const newCount = prevCount + 1;
        console.log('Incrementing previous', newCount)
        await this.ctx.storage.put('count', newCount);

        const countComponent = <div id="count" hx-swap-oob="true">
            <Count count={newCount}/>
        </div>

        this.ctx.getWebSockets().forEach(ws => ws.send(
            countComponent.toString()
        ));

        return newCount
    }

    async fetch(request: Request): Promise<Response> {
        // Creates two ends of a WebSocket connection.
        const webSocketPair = new WebSocketPair();
        const [client, server] = Object.values(webSocketPair);
        this.ctx.acceptWebSocket(server);

        return new Response(null, {
            status: 101,
            webSocket: client,
        });
    }
}

export default Counter