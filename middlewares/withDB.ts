import database from '@/lib/database'
import { ApiMiddleware } from '@/global'

const withDB: ApiMiddleware = (handler) => async (req, res) => {
    await database()

    return await handler(req, res)
}

export default withDB
