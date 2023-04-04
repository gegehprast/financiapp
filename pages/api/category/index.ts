import withCORS from '@/middlewares/withCORS'
import withDB from '@/middlewares/withDB'
import { NextApiRequest, NextApiResponse } from 'next'
import Category, { ICategoryDoc } from '@/models/Category'
import { MessageResponse } from '@/global'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@/lib/session'
import GET from '@/middlewares/GET'
import authenticated from '@/middlewares/authenticated'

async function index(req: NextApiRequest, res: NextApiResponse<MessageResponse | ICategoryDoc[]>) {
    try {
        const categories = await Category.find({ $or: [{ userId: req.session.auth.user._id }, { userId: null }] }).sort({ createdAt: 1 })

        return res.json(categories)
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message })
    }
}

export default withIronSessionApiRoute(withCORS(GET(authenticated(withDB(index)))), sessionOptions)
