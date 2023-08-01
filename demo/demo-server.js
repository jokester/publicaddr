const http = require('node:http')
const timing = require("@jokester/ts-commonutil/lib/concurrency/timing")
const {gaussianRandom} = require("@jokester/ts-commonutil/lib/rxjs/distributions");

const processTag = `demo-server-${Math.random().toString(16).slice(2, 10)}`
let reqCounter = 0

const server = http.createServer(async (req, res) => {
    res.writeHead(200);
    // await timing.wait(0.5e3 * gaussianRandom())
    res.end(`reqCount: ${++reqCounter} from ${processTag}`)
})

async function main() {
    const port = Number(process.env.PORT || 3000)
    const gotSignal = new Promise((resolve, reject) => {
        process.on('SIGINT', resolve)
        process.on('SIGTERM', resolve)
    })
    server.listen(port, () => {
        console.info(`PID ${process.pid} / ${processTag}: listening on port ${port}`)
    })
    await gotSignal
    await new Promise(f => server.close(f))
    console.debug(`PID ${process.pid} / ${processTag}: app closing. pretend to be cleaning up...`)
    await timing.wait(1e3 * (3 + 2 * gaussianRandom()))
    console.debug(`PID ${process.pid} / ${processTag}: app closed.`)
}

setImmediate(main)
