import withCORS from '@/middlewares/withCORS'
import withDB from '@/middlewares/withDB'
import { NextApiRequest, NextApiResponse } from 'next'
import { MessageResponse } from '@/global'
import Wallet, { IWalletDoc } from '@/models/Wallet'
import authenticated from '@/middlewares/authenticated'
import { sessionOptions } from '@/lib/session'
import { withIronSessionApiRoute } from 'iron-session/next'
import methodPut from '@/middlewares/methodPut'

async function update(req: NextApiRequest, res: NextApiResponse<MessageResponse | IWalletDoc>) {
    try {
        const wallet = await Wallet.findOne({ _id: req.body.walletId, user: req.session.auth.user._id })

        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' })
        }

        wallet.name = req.body.name
        wallet.type = req.body.type
        wallet.balance = req.body.balance

        await wallet.save()

        return res.json(wallet)
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message })
    }
}

export default withIronSessionApiRoute(withCORS(methodPut(authenticated(withDB(update)))), sessionOptions)
