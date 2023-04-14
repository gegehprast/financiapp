import mongoose, { Schema, Document } from 'mongoose'

export interface IRecurringPatternDoc extends Document {
    transaction: mongoose.Types.ObjectId
    separationCount?: number
    dayOfWeek?: number
    dayOfMonth?: number
    weekOfMonth?: number
    monthOfYear?: number
    maxNumOfOccurrences?: number
    until?: Date
    createdAt: Date
    updatedAt: Date
}

export const RecurringPatternSchema: Schema = new Schema(
    {
        transaction: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Transaction',
        },
        separationCount: {
            type: Number,
            required: false,
        },
        dayOfWeek: {
            type: Number,
            required: false,
        },
        dayOfMonth: {
            type: Number,
            required: false,
        },
        weekOfMonth: {
            type: Number,
            required: false,
        },
        monthOfYear: {
            type: Number,
            required: false,
        },
        maxNumOfOccurrences: {
            type: Number,
            required: false,
        },
        until: {
            type: Date,
            required: false,
        },
    },
    { timestamps: true }
)

RecurringPatternSchema.index({ transaction: 1, name: 1 }, { unique: true })

const RecurringPattern: mongoose.Model<IRecurringPatternDoc, {}, {}, {}, any> =
    mongoose.models.RecurringPattern || mongoose.model<IRecurringPatternDoc>('RecurringPattern', RecurringPatternSchema)

export default RecurringPattern
