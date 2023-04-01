import database from '@/lib/database'
import { ApiMiddleware } from '@/Type'

const withDB: ApiMiddleware = (handler) => async (req, res) => {
    await database()

    return await handler(req, res)
}

export default withDB
