import mongoose, { Schema, model } from 'mongoose'

interface IUser {
	name: string
	email: string
	password: string
}

export interface IUserDocument extends IUser, Document {
	createdAt: Date
	updatedAt: Date
}

const UserSchema = new Schema<IUserDocument>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ timestamps: true },
)

export const User = mongoose.models.User || model('User', UserSchema)
