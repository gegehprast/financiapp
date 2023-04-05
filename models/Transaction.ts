import mongoose, { Schema, Document } from 'mongoose'
import { ICategoryDoc } from './Category'
import { IWalletDoc } from './Wallet'
import { IUserDoc } from './User'

export interface ITransactionDoc extends Document {
    user: mongoose.Types.ObjectId
    category: mongoose.Types.ObjectId
    wallet: mongoose.Types.ObjectId
    amount: number
    notes?: string
    date: Date
    isRecurring: boolean
    totalNumOfOccurrences?: number
    nextOccurrence?: number
    createdAt: Date
    updatedAt: Date
}

export interface IPopulatedTransactionDoc {
    _id: string
    user: IUserDoc
    category: ICategoryDoc
    wallet: IWalletDoc
    amount: number
    notes?: string
    date: Date
    isRecurring: boolean
    totalNumOfOccurrences?: number
    nextOccurrence?: number
    createdAt: Date
    updatedAt: Date
}

export const TransactionSchema: Schema = new Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        category: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Category',
        },
        wallet: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Wallet',
        },
        amount: {
            type: Number,
            required: true,
        },
        notes: {
            type: String,
            required: false,
        },
        date: {
            type: Date,
            required: true,
        },
        isRecurring: {
            type: Boolean,
            required: false,
            default: false,
        },
        totalNumOfOccurrences: {
            type: Number,
            required: false,
        },
        nextOccurrence: {
            type: Date,
            required: false,
        },
    },
    { timestamps: true }
)

TransactionSchema.index({ user: 1, date: -1 }, { unique: false })

const Transaction: mongoose.Model<ITransactionDoc, {}, {}, {}, any> = mongoose.models.Transaction || mongoose.model<ITransactionDoc>('Transaction', TransactionSchema)

export default Transaction
