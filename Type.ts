import type { NextApiRequest, NextApiResponse } from 'next'

export type SuccessResponse<Data = any> = {
    ok: true
    data?: Data
}

export type ErrorResponse = {
    ok: false
    message: string
}

export type ApiResponse<Data = any> = SuccessResponse<Data> | ErrorResponse

export type ApiHandler<ResponseData = any> = (req: NextApiRequest, res: NextApiResponse<ApiResponse<ResponseData> | ResponseData>) => Promise<void>

export type ApiMiddleware = (handler: ApiHandler) => ApiHandler
