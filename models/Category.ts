import mongoose, { Schema, Document } from 'mongoose'

export interface ICategoryDoc extends Document {
    userId?: mongoose.Types.ObjectId
    categoryId?: mongoose.Types.ObjectId
    name: string
    isIncome: boolean
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
        isIncome: {
            type: Boolean,
            required: false,
            default: false
        },
    },
    { timestamps: true }
)

CategorySchema.index({ userId: 1, name: 1 }, { unique: true })

const Category: mongoose.Model<ICategoryDoc, {}, {}, {}, any> = mongoose.models.Category || mongoose.model<ICategoryDoc>('Category', CategorySchema)

export default Category
