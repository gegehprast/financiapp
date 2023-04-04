import bcrypt from 'bcrypt'
import withCORS from '@/middlewares/withCORS'
import withDB from '@/middlewares/withDB'
import User, { IUserDoc } from '@/models/User'
import methodPost from '@/middlewares/methodPost'
import { ApiHandler } from '@/global'

const handler: ApiHandler<IUserDoc> = async (req, res) => {
    try {
        const password = await bcrypt.hash(req.body.password as string, 10)
        const user = new User({
            name: req.body.name,
            username: req.body.username,
            password: password,
        })

        await user.save()

        return res.json(user)
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message })
    }
}

export default withCORS(methodPost(withDB(handler)))
