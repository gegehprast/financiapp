import { ApiMiddleware } from '@/global'

const methodPut: ApiMiddleware = handler => async (req, res) => {
    if (req.method === 'PUT') {
        return await handler(req, res)
    }

    return res.status(405).json({ ok: false, message: 'Method not allowed.' })
}

export default methodPut
