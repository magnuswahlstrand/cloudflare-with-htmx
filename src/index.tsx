import {Hono} from 'hono'
import Main from "./components/main";
import {Counter} from "./do";
import Count from "./components/count";

export {Counter}


type Bindings = {
    COUNTER: DurableObjectNamespace<Counter>
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', async (c) => {
    let id = c.env.COUNTER.idFromName('main');
    const counter = c.env.COUNTER.get(id);
    const count = await counter.increment()

    return c.html(<Main count={count}/>)
})

app.post('/increment', async (c) => {
    let id = c.env.COUNTER.idFromName('main');
    const counter = c.env.COUNTER.get(id);
    const count = await counter.increment()

    return c.html(<Count count={count}/>)
})

app.get('/ws', async (c) => {
        const upgradeHeader = c.req.header('Upgrade');
        if (!upgradeHeader || upgradeHeader !== 'websocket') {
            return new Response('Durable Object expected Upgrade: websocket', {status: 426});
        }

        let id = c.env.COUNTER.idFromName('main');
        const counter = c.env.COUNTER.get(id);
        return counter.fetch(c.req.raw)
    }
)

export default app
