import withCORS from '@/middlewares/withCORS'
import withDB from '@/middlewares/withDB'
import { NextApiRequest, NextApiResponse } from 'next'
import { MessageResponse } from '@/global'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@/lib/session'
import methodGet from '@/middlewares/methodGet'
import authenticated from '@/middlewares/authenticated'
import Transaction, { IPopulatedTransactionDoc, ITransactionDoc } from '@/models/Transaction'
import Category from '@/models/Category'
import Wallet from '@/models/Wallet'
import { FilterQuery } from 'mongoose'

async function index(req: NextApiRequest, res: NextApiResponse<MessageResponse | IPopulatedTransactionDoc[]>) {
    try {
        const filter: FilterQuery<ITransactionDoc> = {
            user: req.session.auth.user._id,
        }

        if (req.query.walletId) {
            filter.wallet = req.query.walletId
        }

        if (req.query.startDate && req.query.endDate) {
            filter.date = {
                $gte: new Date(req.query.startDate as string).setUTCHours(0, 0, 0, 0),
                $lte: new Date(req.query.endDate as string).setUTCHours(23, 59, 59, 999),
            }
        } else if (req.query.startDate) {
            filter.date = {
                $gte: new Date(req.query.startDate as string).setUTCHours(0, 0, 0, 0),
            }
        } else if (req.query.endDate) {
            filter.date = {
                $lte: new Date(req.query.endDate as string).setUTCHours(23, 59, 59, 999),
            }
        }

        const transactions = await Transaction.find(filter)
            .sort({ date: -1 })
            .populate([
                {
                    path: 'category',
                    model: Category,
                },
                {
                    path: 'wallet',
                    model: Wallet,
                },
            ])
            .limit(parseInt(req.query.limit as string))

        return res.json(transactions as unknown as IPopulatedTransactionDoc[])
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message })
    }
}

export default withIronSessionApiRoute(withCORS(methodGet(authenticated(withDB(index)))), sessionOptions)
