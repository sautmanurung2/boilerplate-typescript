import express, { Application } from 'express'
import { AppDataSource } from '../database/database'
import { serverConfig } from '../config/config'

const app: Application = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Server is running, authors: Saut Manurung')
})

AppDataSource.initialize().then(() => {
    console.log('Database connected!')

    app.listen(serverConfig.port, serverConfig.host, () => {
        console.log(`Server is running on ${serverConfig.host}:${serverConfig.port}`)
    })
}).catch((error) => {
    console.error('Database connection failed: ', error)
})