import { fail, redirect } from '@sveltejs/kit'
import { z } from 'zod'
import { message, superValidate } from 'sveltekit-superforms/server'
import { auth } from '$lib/server/lucia'
import { prisma } from '$lib/server/prisma'
import { emailClient } from '$lib/server/email'
import { createHash, randomBytes } from 'node:crypto'
import { registerSchema } from '$lib/schemas'

export const load = async (event) => {
	const form = await superValidate(event, registerSchema)
	return { form }
}

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, registerSchema)

		if (!form.valid) {
			return fail(400, { form })
		}

		// encrypt password
		const hash = await createHash('sha256').update(form.data?.password).digest('hex')
		try {
			await auth.createUser({
				primaryKey: {
					providerId: 'email',
					providerUserId: form.data.email,
					password: hash
				},
				attributes: {
					email: form.data.email,
					name: form.data.name
				}
			})
		} catch (error) {
			console.log('error', error)
			return message(form, 'There was an error creating your account.')
		}
		throw redirect(303, '/login')
	}
}
