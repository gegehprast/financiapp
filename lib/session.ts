import { IronSessionOptions } from 'iron-session'

export const sessionOptions: IronSessionOptions = {
    password: process.env.SECRET_COOKIE_PASSWORD as string,
    cookieName: 'iron-session/examples/next.js',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
    },
}
