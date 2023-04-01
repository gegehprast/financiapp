import mongoose, { Schema, Document } from 'mongoose'

export interface IWalletDoc extends Document {
    userId: mongoose.Types.ObjectId
    name: string
    balance: number
    currency: string
    createdAt: Date
    updatedAt: Date
}

export const WalletSchema: Schema = new Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: true,
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

const Wallet: mongoose.Model<IWalletDoc, {}, {}, {}, any> = mongoose.models.Wallet || mongoose.model<IWalletDoc>('Wallet', WalletSchema)

export default Wallet
