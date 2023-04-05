import withCORS from '@/middlewares/withCORS'
import withDB from '@/middlewares/withDB'
import { NextApiRequest, NextApiResponse } from 'next'
import { MessageResponse } from '@/global'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@/lib/session'
import methodGet from '@/middlewares/methodGet'
import authenticated from '@/middlewares/authenticated'
import Transaction, { IPopulatedTransactionDoc } from '@/models/Transaction'
import Category from '@/models/Category'
import Wallet from '@/models/Wallet'
import User from '@/models/User'

async function index(req: NextApiRequest, res: NextApiResponse<MessageResponse | IPopulatedTransactionDoc[]>) {
    try {
        const transactions = await Transaction.find({ user: req.session.auth.user._id })
            .sort({ date: -1 })
            .populate([
                {
                    path: 'category',
                    model: Category
                },
                {
                    path: 'wallet',
                    model: Wallet
                }
            ])
            .limit(parseInt(req.query.limit as string))

        return res.json(transactions as unknown as IPopulatedTransactionDoc[])
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message })
    }
}

export default withIronSessionApiRoute(withCORS(methodGet(authenticated(withDB(index)))), sessionOptions)
