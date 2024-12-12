import express, { Application } from 'express'
import { AppDataSource } from '../database/database'
import { serverConfig } from '../config/config'
import exampleRoutes from './routes/ExampleRoutes'

const app: Application = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Server is running, authors: Saut Manurung')
})

app.use('/examples', exampleRoutes)

AppDataSource.initialize().then(() => {
    console.log('Database connected!')

    app.listen(serverConfig.port, serverConfig.host, () => {
        console.log(`Server is running on ${serverConfig.host}:${serverConfig.port}`)
    })
}).catch((error) => {
    console.error('Database connection failed: ', error)
})