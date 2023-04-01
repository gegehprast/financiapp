import { ApiMiddleware } from '@/Type'

const withCORS: ApiMiddleware = (handler) => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true')

    if (req.headers.origin === 'http://localhost:3000') {
        res.setHeader('Access-Control-Allow-Origin', '*')
    } else {
        res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ALLOWED_ORIGINS as string)
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')

    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    if (req.method === 'OPTIONS') {
        res.status(200).end()

        return
    }

    return await handler(req, res)
}

export default withCORS
