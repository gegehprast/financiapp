import withCORS from '@/middlewares/withCORS'
import withDB from '@/middlewares/withDB'
import methodPost from '@/middlewares/methodPost'
import { NextApiRequest, NextApiResponse } from 'next'
import { MessageResponse } from '@/global'
import Wallet, { IWalletDoc } from '@/models/Wallet'
import authenticated from '@/middlewares/authenticated'
import { sessionOptions } from '@/lib/session'
import { withIronSessionApiRoute } from 'iron-session/next'

async function store(req: NextApiRequest, res: NextApiResponse<MessageResponse | IWalletDoc>) {
    try {
        const wallet = new Wallet({
            user: req.session.auth.user._id,
            name: req.body.name,
            type: req.body.type,
            balance: req.body.balance,
            currency: req.body.currency,
        })

        await wallet.save()

        return res.json(wallet)
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message })
    }
}

export default withIronSessionApiRoute(withCORS(methodPost(authenticated(withDB(store)))), sessionOptions)
