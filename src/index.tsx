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


export default app
