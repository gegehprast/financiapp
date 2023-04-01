import { ApiMiddleware } from '@/Type'

const DELETE: ApiMiddleware = handler => async (req, res) => {
    if (req.method === 'DELETE') {
        return await handler(req, res)
    }

    return res.status(405).json({ ok: false, message: 'Method not allowed.' })
}

export default DELETE
