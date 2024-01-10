import http from 'node:http';
const wait = timeout => new Promise(f => setTimeout(f, timeout))
const waitRandom = (min, max) => wait(min + Math.random() * (max - min))

const processTag = `demo-server-version-${process.env.VERSION ?? '?'}-${Math.random().toString(16).slice(2, 10)}`

let reqCount = 0
let onFlight = 0

const server = http.createServer(async (req, res) => {
    ++onFlight;
    res.writeHead(200, undefined,
        // { connection: 'Close' }
    );
    await waitRandom(20, 100);
    res.end(`reqCount: ${++reqCount} from ${processTag}`)
    --onFlight;
})

function log(...args) {
    console.info(`${Date.now().toFixed(2)} ${processTag}:`, ...args)
}

async function waitRequestsEnd() {
    while (onFlight > 0) {
        await wait(1e3)
    }
}

function startReportCount() {
    let lastReqCountReported = 0
    const interval = 10 // s
    const timer = setInterval(() => {
        const delta = reqCount - lastReqCountReported
        lastReqCountReported = reqCount
        log(`reqCount: ${reqCount}`);
        log(`mean RPS: ${(delta / interval).toFixed(2)}`);
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
        log(`listening on port ${port}`)
    })
    await gotSignal
    const error = await new Promise(f => server.close(f))
    if (error) {
        console.error('server close error:', error)
    }
    stopReportCount()
    log(`app closing.`)
}

await main();
