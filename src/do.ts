import {DurableObject} from "cloudflare:workers";

export class Counter extends DurableObject {

    constructor(state: DurableObjectState, env: Env) {
        super(state, env);
        state.storage.put('count', 0);
    }

    async increment() {
        const count: number = (await this.ctx.storage.get("count")) || 0;
        await this.ctx.storage.put('count', count + 1);
        return count
    }
}

export default Counter