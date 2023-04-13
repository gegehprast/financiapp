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
import methodDelete from '@/middlewares/methodDelete'

async function destroy(req: NextApiRequest, res: NextApiResponse<MessageResponse | ITransactionDoc>) {
    try {
        const transaction = await Transaction.findOne({ user: req.session.auth.user._id, _id: req.query.transactionId })

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found.' })
        }

        const oldCategory = await Category.findOne({ _id: transaction.category })
        const oldWallet = await Wallet.findOne({ user: req.session.auth.user._id, _id: transaction.wallet })

        if (!oldCategory) {
            return res.status(404).json({ message: 'Old category not found.' })
        }

        if (!oldWallet) {
            return res.status(404).json({ message: 'Old wallet not found.' })
        }

        // save wallets
        oldWallet.balance += oldCategory.type === 'income' ? -transaction.amount : transaction.amount

        await oldWallet.save()

        await transaction.remove()

        return res.json(transaction)
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message })
    }
}

export default withIronSessionApiRoute(withCORS(methodDelete(authenticated(withDB(destroy)))), sessionOptions)
