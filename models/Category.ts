import { IconMap } from '@/components/Icon'
import mongoose, { Schema, Document } from 'mongoose'

export interface ICategoryDoc extends Document {
    userId?: mongoose.Types.ObjectId
    categoryId?: mongoose.Types.ObjectId
    name: string
    type: 'expense' | 'income' | 'debt'
    icon: keyof typeof IconMap
    createdAt: Date
    updatedAt: Date
}

export const CategorySchema: Schema = new Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: false,
            ref: 'User',
        },
        categoryId: {
            type: mongoose.Types.ObjectId,
            required: false,
            ref: 'Category',
        },
        name: {
            type: String,
            required: true,
        },
        type: {
            type: Number,
            required: false,
            default: 'expense',
            enum: ['expense', 'income', 'debt'],
        },
        icon: {
            type: String,
            required: true,
            enum: Object.keys(IconMap),
        },
    },
    { timestamps: true }
)

CategorySchema.index({ userId: 1, name: 1 }, { unique: true })

const Category: mongoose.Model<ICategoryDoc, {}, {}, {}, any> = mongoose.models.Category || mongoose.model<ICategoryDoc>('Category', CategorySchema)

export default Category
