import http from 'node:http';
const wait = timeout => new Promise(f => setTimeout(f, timeout))
const waitRandom = (min, max) => wait(min + Math.random() * (max - min))

const processTag = `demo-server-version-${process.env.VERSION ?? '?'}-${Math.random().toString(16).slice(2, 10)}`

let reqCount = 0

const server = http.createServer(async (req, res) => {
    res.writeHead(200);
    await waitRandom(20, 100);
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
    await wait(10e3);
    console.info(`PID ${process.pid} / ${processTag}: app closed.`)
}

await main();
