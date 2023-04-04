import withCORS from '@/middlewares/withCORS'
import withDB from '@/middlewares/withDB'
import POST from '@/middlewares/POST'
import { NextApiRequest, NextApiResponse } from 'next'
import Category, { ICategoryDoc } from '@/models/Category'
import { MessageResponse } from '@/global'

async function store(req: NextApiRequest, res: NextApiResponse<MessageResponse | ICategoryDoc>) {
    try {
        const category = new Category({
            name: req.body.name,
            type: req.body.type,
            icon: req.body.icon,
        })

        await category.save()

        return res.json(category)
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message })
    }
}

export default withCORS(POST(withDB(store)))
