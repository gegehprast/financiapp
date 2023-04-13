import withCORS from '@/middlewares/withCORS'
import withDB from '@/middlewares/withDB'
import { NextApiRequest, NextApiResponse } from 'next'
import { MessageResponse } from '@/global'
import authenticated from '@/middlewares/authenticated'
import { sessionOptions } from '@/lib/session'
import { withIronSessionApiRoute } from 'iron-session/next'
import Transaction, { ITransactionDoc } from '@/models/Transaction'
import Wallet from '@/models/Wallet'
import Category from '@/models/Category'
import methodPut from '@/middlewares/methodPut'

async function update(req: NextApiRequest, res: NextApiResponse<MessageResponse | ITransactionDoc>) {
    try {
        const transaction = await Transaction.findOne({ user: req.session.auth.user._id, _id: req.body.transactionId })

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found.' })
        }

        const oldAmount = transaction.amount
        const oldCategory = await Category.findOne({ _id: transaction.category })
        const oldWallet = await Wallet.findOne({ user: req.session.auth.user._id, _id: transaction.wallet })
        const category = await Category.findOne({ _id: req.body.categoryId })
        const wallet = await Wallet.findOne({ user: req.session.auth.user._id, _id: req.body.walletId })

        if (!oldCategory) {
            return res.status(404).json({ message: 'Old category not found.' })
        }

        if (!oldWallet) {
            return res.status(404).json({ message: 'Old wallet not found.' })
        }

        if (!category) {
            return res.status(404).json({ message: 'Category not found.' })
        }
        
        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found.' })
        }
        
        // save transaction
        transaction.amount = parseFloat(req.body.amount)
        transaction.wallet = wallet._id
        transaction.category = category._id
        transaction.notes = req.body.notes
        transaction.date = new Date(req.body.date)

        await transaction.save()

        // save wallets
        if (wallet.id === oldWallet.id) {
            oldWallet.balance += oldCategory.type === 'income' ? -oldAmount : oldAmount
            oldWallet.balance += category.type === 'income' ? transaction.amount : -transaction.amount

            await oldWallet.save()
        } else {
            oldWallet.balance += oldCategory.type === 'income' ? -oldAmount : oldAmount
            wallet.balance += category.type === 'income' ? transaction.amount : -transaction.amount

            await oldWallet.save()
            await wallet.save()
        }

        return res.json(transaction)
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message })
    }
}

export default withIronSessionApiRoute(withCORS(methodPut(authenticated(withDB(update)))), sessionOptions)
