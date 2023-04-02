import bcrypt from 'bcrypt'
import withCORS from '@/middlewares/withCORS'
import withDB from '@/middlewares/withDB'
import User, { IUserDoc } from '@/models/User'
import POST from '@/middlewares/POST'
import { ApiHandler, Auth } from '@/global'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@/lib/session'

const handler: ApiHandler<IUserDoc> = async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password
        
        if (!username || !password) {
            return res.status(400).json({
                message: 'Username and password are required',
            })
        }

        const user = await User.findOne({ username }).select('+password').exec()

        if (!user) {
            return res.status(400).json({
                message: 'User not found',
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                message: 'Password is incorrect',
            })
        }

        const auth: Auth = { isLoggedIn: true, user }

        req.session.auth = auth

        await req.session.save()

        return res.json(
            user.toObject({
                transform: (doc, ret) => {
                    delete ret.password
                    return ret
                },
            })
        )
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message })
    }
}

export default withIronSessionApiRoute(withCORS(POST(withDB(handler))), sessionOptions)
