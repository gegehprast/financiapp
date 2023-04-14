import mongoose, { Schema, Document } from 'mongoose'

export interface IBudgetDoc extends Document {
    user: mongoose.Types.ObjectId
    category: mongoose.Types.ObjectId
    wallet: mongoose.Types.ObjectId
    reference?: mongoose.Types.ObjectId
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
        reference: {
            type: mongoose.Types.ObjectId,
            required: false,
            ref: 'Budget',
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

BudgetSchema.index({ user: 1, name: 1 }, { unique: true })

const Budget: mongoose.Model<IBudgetDoc, {}, {}, {}, any> = mongoose.models.Budget || mongoose.model<IBudgetDoc>('Budget', BudgetSchema)

export default Budget
