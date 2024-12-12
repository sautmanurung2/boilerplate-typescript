import dotenv from 'dotenv'

dotenv.config()

interface DBConfig {
    host: string
    port: number
    username: string
    password: string
    database: string
}

interface ElasticConfig {
    host: string
    index: string
    username: string
    password: string
}

const environment = process.env.NODE_ENV || 'development'

const isProduction = environment === 'production'

const dbConfig: DBConfig = isProduction
    ? {
        host: process.env.DB_HOST!,
        port: Number(process.env.DB_PORT!),
        username: process.env.DB_USERNAME!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_NAME!,
    }
    : {
        host: process.env.DB_HOST_STAGING!,
        port: Number(process.env.DB_PORT_STAGING!),
        username: process.env.DB_USERNAME_STAGING!,
        password: process.env.DB_PASSWORD_STAGING!,
        database: process.env.DB_NAME_STAGING!,
    }

const elasticConfig: ElasticConfig = {
    host: process.env.ELASTIC_HOST!,
    index: process.env.ELASTIC_INDEX || '',
    username: process.env.ELASTIC_USERNAME!,
    password: process.env.ELASTIC_PASSWORD!,
}

const serverConfig = {
    host: process.env.HOST || 'localhost',
    port: Number(process.env.PORT || '3000'),
}


export {
    dbConfig,
    elasticConfig,
    serverConfig,
}