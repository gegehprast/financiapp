import { ApiMiddleware } from '@/global'

const authenticated: ApiMiddleware = (handler) => async (req, res) => {
    if (!req.session.auth || !req.session.auth.isLoggedIn) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    
    return await handler(req, res)
}

export default authenticated
