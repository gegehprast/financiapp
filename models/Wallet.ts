import mongoose, { Schema, Document } from 'mongoose'

export interface IWalletDoc extends Document {
    user: mongoose.Types.ObjectId
    name: string
    type: 'cash' | 'virtual'
    balance: number
    currency: string
    createdAt: Date
    updatedAt: Date
}

export const WalletSchema: Schema = new Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ['cash', 'virtual'],
            default: 'virtual',
        },
        balance: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true,
            default: 'IDR',
        },
    },
    { timestamps: true }
)

WalletSchema.index({ userId: 1, name: 1 }, { unique: true })
WalletSchema.index({ type: 1, createdAt: 1 }, { unique: false })

const Wallet: mongoose.Model<IWalletDoc, {}, {}, {}, any> = mongoose.models.Wallet || mongoose.model<IWalletDoc>('Wallet', WalletSchema)

export default Wallet
