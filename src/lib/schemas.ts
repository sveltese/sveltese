import { z } from 'zod'
import { findUserByEmail } from './utils'

export const forgotPasswordSchema = z.object({
	email: z
		.string()
		.email("Email doesn't look right.")
		.refine(async (email) => {
			if (!email) return true
			return await findUserByEmail(email)
		}, 'This email is not in our database')
})

export const loginSchema = z.object({
	email: z.string().email("Email doesn't look right."),
	password: z.string().min(8, 'Password must be at least 8 characters.'),
	remember: z.boolean().default(false).optional()
})

export const registerSchema = z
	.object({
		name: z.string().min(2, 'Name must be at least 2 characters long.'),
		email: z
			.string()
			.email("Email doesn't look right.")
			.refine(async (email) => {
				if (!email) return true
				const existingEmail = await prisma.authUser.findUnique({
					where: {
						email: email
					}
				})
				return existingEmail ? false : true
			}, 'This email is already in our database.'),
		password: z.string().min(8, 'Password must be at least 8 characters long.'),
		confirmPassword: z.string().min(1, 'Please confirm your password.')
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['password']
	})

export const resetPasswordSchema = z
	.object({
		token: z.string().min(1, 'There was an error.'),
		email: z
			.string()
			.email("Email doesn't look right.")
			.refine(async (e) => {
				return await findUserByEmail(e)
			}, 'This email is not in our database.'),
		password: z.string().min(8, 'Password must be at least 8 characters.'),
		confirmPassword: z.string().min(8, 'Please confirm your password')
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword']
	})
