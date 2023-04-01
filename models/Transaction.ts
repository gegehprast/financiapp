import mongoose, { Schema, Document } from 'mongoose'

export interface ITransactionDoc extends Document {
    userId: mongoose.Types.ObjectId
    categoryId: mongoose.Types.ObjectId
    walletId: mongoose.Types.ObjectId
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
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        categoryId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Category',
        },
        walletId: {
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

TransactionSchema.index({ userId: 1, startDate: 1 }, { unique: false })

const Transaction: mongoose.Model<ITransactionDoc, {}, {}, {}, any> = mongoose.models.Transaction || mongoose.model<ITransactionDoc>('Transaction', TransactionSchema)

export default Transaction
