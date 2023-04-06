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
import Category from '@/models/Category'

async function store(req: NextApiRequest, res: NextApiResponse<MessageResponse | ITransactionDoc>) {
    try {
        const wallet = await Wallet.findOne({ user: req.session.auth.user._id, _id: req.body.walletId })
        const category = await Category.findOne({ _id: req.body.categoryId })

        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found.' })
        }

        if (!category) {
            return res.status(404).json({ message: 'Category not found.' })
        }

        // save transaction
        const transaction = new Transaction({
            user: req.session.auth.user._id,
            category: new mongoose.Types.ObjectId(req.body.categoryId),
            wallet: new mongoose.Types.ObjectId(req.body.walletId),
            amount: parseFloat(req.body.amount),
            notes: req.body.notes,
            date: new Date(req.body.date),
        })

        await transaction.save()
        
        // save wallet
        wallet.balance += category.type === 'income' ? transaction.amount : -transaction.amount
        await wallet.save()

        return res.json(transaction)
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message })
    }
}

export default withIronSessionApiRoute(withCORS(methodPost(authenticated(withDB(store)))), sessionOptions)
