import { ApiMiddleware } from '@/global'

const methodPost: ApiMiddleware = handler => async (req, res) => {
    if (req.method === 'POST') {
        return await handler(req, res)
    }

    return res.status(405).json({ ok: false, message: 'Method not allowed.' })
}

export default methodPost
