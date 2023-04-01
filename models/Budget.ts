import mongoose, { Schema, Document } from 'mongoose'

export interface IBudgetDoc extends Document {
    userId: mongoose.Types.ObjectId
    categoryId: mongoose.Types.ObjectId
    walletId: mongoose.Types.ObjectId
    name: string
    value: number
    isRepeating: boolean
    repeatType?: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'semestrial' | 'annually'
    startDate?: Date
    endDate?: Date
    createdAt: Date
    updatedAt: Date
}

export const BudgetSchema: Schema = new Schema(
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
        name: {
            type: String,
            required: true,
        },
        value: {
            type: Number,
            required: true,
        },
        isRepeating: {
            type: Boolean,
            required: false,
            default: false,
        },
        repeatType: {
            type: String,
            required: false,
            enum: ['daily', 'weekly', 'monthly', 'quarterly', 'semestrial', 'annually'],
        },
        startDate: {
            type: Date,
            required: false,
        },
        endDate: {
            type: Date,
            required: false,
        },
    },
    { timestamps: true }
)

BudgetSchema.index({ userId: 1, name: 1 }, { unique: true })

const Budget: mongoose.Model<IBudgetDoc, {}, {}, {}, any> = mongoose.models.Budget || mongoose.model<IBudgetDoc>('Budget', BudgetSchema)

export default Budget
