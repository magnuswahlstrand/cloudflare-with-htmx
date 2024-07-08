import Count from "./count";

type MainProps = {
    count: number
}

const Main = (props: MainProps) => {
    return (
        <html lang="en">
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <script src="https://unpkg.com/htmx.org@1.9.12/dist/htmx.js"
                    integrity="sha384-qbtR4rS9RrUMECUWDWM2+YGgN3U4V4ZncZ0BvUcg9FGct0jqXz3PUdVpU1p0yrXS"
                    crossorigin="anonymous"></script>
            <script src="https://unpkg.com/htmx.org@1.9.12/dist/ext/ws.js"></script>
            <title>Shop</title>
        </head>
        <body hx-ext="ws" ws-connect="/ws">
        <h1>Shop</h1>
        <div id="count">
            <Count count={props.count}/>
        </div>
        <button hx-post="/increment" hx-target="#count">Incr!</button>
        </body>
        </html>
    )
}

export default Main;