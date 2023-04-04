import withCORS from '@/middlewares/withCORS'
import withDB from '@/middlewares/withDB'
import { NextApiRequest, NextApiResponse } from 'next'
import { MessageResponse } from '@/global'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@/lib/session'
import methodGet from '@/middlewares/methodGet'
import authenticated from '@/middlewares/authenticated'
import Wallet, { IWalletDoc } from '@/models/Wallet'

async function index(req: NextApiRequest, res: NextApiResponse<MessageResponse | IWalletDoc[]>) {
    try {
        const wallets = await Wallet.find({ userId: req.session.auth.user._id })
            .sort({ type: 1, createdAt: 1 })
            .limit(parseInt(req.query.limit as string))

        return res.json(wallets)
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message })
    }
}

export default withIronSessionApiRoute(withCORS(methodGet(authenticated(withDB(index)))), sessionOptions)
