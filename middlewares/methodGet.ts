import { ApiMiddleware } from '@/global'

const methodGet: ApiMiddleware = handler => async (req, res) => {
    if (req.method === 'GET') {
        return await handler(req, res)
    }

    return res.status(405).json({ ok: false, message: 'Method not allowed.' })
}

export default methodGet
