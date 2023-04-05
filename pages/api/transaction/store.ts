import withCORS from '@/middlewares/withCORS'
import withDB from '@/middlewares/withDB'
import methodPost from '@/middlewares/methodPost'
import { NextApiRequest, NextApiResponse } from 'next'
import { MessageResponse } from '@/global'
import authenticated from '@/middlewares/authenticated'
import { sessionOptions } from '@/lib/session'
import { withIronSessionApiRoute } from 'iron-session/next'
import Transaction, { ITransactionDoc } from '@/models/Transaction'
import mongoose from 'mongoose'
import Wallet from '@/models/Wallet'

async function store(req: NextApiRequest, res: NextApiResponse<MessageResponse | ITransactionDoc>) {
    try {
        const wallet = await Wallet.find({ user: req.session.auth.user._id, _id: req.body.walletId })
        const transaction = new Transaction({
            user: req.session.auth.user._id,
            category: new mongoose.Types.ObjectId(req.body.categoryId),
            wallet: new mongoose.Types.ObjectId(req.body.walletId),
            amount: req.body.amount,
            notes: req.body.notes,
            date: new Date(req.body.date),
        })

        await transaction.save()

        return res.json(transaction)
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message })
    }
}

export default withIronSessionApiRoute(withCORS(methodPost(authenticated(withDB(store)))), sessionOptions)
