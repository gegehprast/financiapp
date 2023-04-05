import withCORS from '@/middlewares/withCORS'
import withDB from '@/middlewares/withDB'
import { NextApiRequest, NextApiResponse } from 'next'
import { MessageResponse } from '@/global'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@/lib/session'
import methodGet from '@/middlewares/methodGet'
import authenticated from '@/middlewares/authenticated'
import Category, { ICategoryDoc } from '@/models/Category'

async function index(req: NextApiRequest, res: NextApiResponse<MessageResponse | ICategoryDoc[]>) {
    try {
        const categories = await Category.find({ $or: [{ user: req.session.auth.user._id }, { user: null }] }).sort({ createdAt: 1 })

        return res.json(categories)
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message })
    }
}

export default withIronSessionApiRoute(withCORS(methodGet(authenticated(withDB(index)))), sessionOptions)
