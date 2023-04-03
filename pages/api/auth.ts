import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { Auth } from '@/global'
import { sessionOptions } from '@/lib/session'

export default withIronSessionApiRoute(authRoute, sessionOptions)

async function authRoute(req: NextApiRequest, res: NextApiResponse<Auth>) {
    if (req.session.auth && req.session.auth.isLoggedIn && req.session.auth.user) {
        return res.json({
            isLoggedIn: true,
            user: {
                name: req.session.auth.user.name,
                username: req.session.auth.user.username,
                createdAt: req.session.auth.user.createdAt,
                updatedAt: req.session.auth.user.updatedAt,
            },
        })
    }

    return res.json({ isLoggedIn: false, user: {} })
}
