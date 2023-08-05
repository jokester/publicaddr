const http = require('node:http')
const timing = require("@jokester/ts-commonutil/lib/concurrency/timing")
const { gaussianRandom } = require("@jokester/ts-commonutil/lib/rxjs/distributions");

const processTag = `demo-server-${Math.random().toString(16).slice(2, 10)}`
let reqCount = 0

const server = http.createServer(async (req, res) => {
    res.writeHead(200);
    // await timing.wait(0.5e3 * gaussianRandom())
    res.end(`reqCount: ${++reqCount} from ${processTag}`)
})

function startReportCount() {
    let lastReqCountReported = 0
    const interval = 10 // s
    const timer = setInterval(() => {
        const delta = reqCount - lastReqCountReported
        lastReqCountReported = reqCount
        console.info(`PID ${process.pid} / ${processTag}: reqCount: ${reqCount} / delta: ${delta} in last ${interval}s`)
    }, interval * 1e3)
    return () => clearInterval(timer)
}

async function main() {
    const port = Number(process.env.PORT || 3000)
    const gotSignal = new Promise((resolve, reject) => {
        process.on('SIGINT', resolve)
        process.on('SIGTERM', resolve)
    })
    const stopReportCount = startReportCount()

    server.listen(port, () => {
        console.info(`PID ${process.pid} / ${processTag}: listening on port ${port}`)
    })
    await gotSignal
    await new Promise(f => server.close(f))
    stopReportCount()
    console.info(`PID ${process.pid} / ${processTag}: app closing. pretend to be cleaning up...`)
    await timing.wait(1e3 * (3 + 2 * gaussianRandom()))
    console.info(`PID ${process.pid} / ${processTag}: app closed.`)
}

setImmediate(main)
