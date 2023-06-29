const { loadEnvConfig } = require('@next/env')
const next = require('next')
const { createServer } = require('http')
loadEnvConfig('./', process.env.NODE_ENV !== 'production')
const dev = process.env.NODE_ENV !== 'production'
const hostname = '0.0.0.0'
const httpPort = process.env.PORT
const app = next({ dev, hostname, port: httpPort })
const handle = app.getRequestHandler()
app.prepare().then(() => {
    createServer(async(req, res) => {
        try {
            await handle(req, res, decodeURIComponent(req.url))
        } catch (err) {
            console.error('Error occurred handling', req.url, err)
            res.statusCode = 500
        }
    }).listen(httpPort, (err) => {
        if (err) throw err
        console.log(`Access the server with http://localhost:${httpPort}`)
    })
})
