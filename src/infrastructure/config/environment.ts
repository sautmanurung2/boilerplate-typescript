import dotenv from 'dotenv'

dotenv.config()

export const environment = {
    nodeEnv: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    db: {
        host: process.env.NODE_ENV === 'production' ? process.env.DB_HOST : process.env.DB_HOST_STAGING,
        port: parseInt(process.env.NODE_ENV === 'production' ? process.env.DB_PORT! : process.env.DB_PORT_STAGING!, 10),
        username: process.env.NODE_ENV === 'production' ? process.env.DB_USERNAME : process.env.DB_USERNAME_STAGING,
        password: process.env.NODE_ENV === 'production' ? process.env.DB_PASSWORD : process.env.DB_PASSWORD_STAGING,
        database: process.env.NODE_ENV === 'production' ? process.env.DB_NAME : process.env.DB_NAME_STAGING,
    },
    server: {
        host: process.env.HOST || 'localhost',
        port: parseInt(process.env.PORT || '3000', 10),
    },
    elastic: {
        host: process.env.ELASTIC_HOST || '',
        index: process.env.ELASTIC_INDEX || '',
        username: process.env.ELASTIC_USERNAME || '',
        password: process.env.ELASTIC_PASSWORD || '',
    },
}