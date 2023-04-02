import type { NextApiRequest, NextApiResponse } from 'next'
import { IUserDoc } from './models/User'

export type MessageResponse = { message?: string }

export type ApiHandler<ResponseData = any> = (req: NextApiRequest, res: NextApiResponse<MessageResponse | ResponseData>) => Promise<void>

export type ApiMiddleware = (handler: ApiHandler) => ApiHandler

export interface Auth {
    isLoggedIn: boolean
    user?: Partial<Omit<IUserDoc, 'password'>>
}

declare module 'iron-session' {
    interface IronSessionData {
        auth?: Auth
    }
}
