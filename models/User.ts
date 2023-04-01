import mongoose, { Schema, Document } from 'mongoose'

export interface IUserDoc extends Document {
    username: string
    password: string
    name: string
    createdAt: Date
    updatedAt: Date
}

export const UserSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
    },
    { timestamps: true }
)

UserSchema.index({ username: 1 }, { unique: true })

const User: mongoose.Model<IUserDoc, {}, {}, {}, any> = mongoose.models.User || mongoose.model<IUserDoc>('User', UserSchema)

export default User
