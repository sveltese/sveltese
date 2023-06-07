import { z } from 'zod'
import { message, superValidate } from 'sveltekit-superforms/server'
import { prisma } from '$lib/server/prisma'
import { createHash } from 'node:crypto'
import { fail } from '@sveltejs/kit'
import { resetPasswordSchema } from '$lib/schemas'
import type { Actions, PageServerLoad } from './$types.js'

export const load: PageServerLoad = async ({ event, params, url }) => {
	const token = params.guid
	const email = url.searchParams.get('email')
	const form = await superValidate(event, resetPasswordSchema)

	form.data.token = token
	form.data.email = email

	return {
		form
	}
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, resetPasswordSchema)
		console.log('action')
		console.log(form)

		if (!form.valid) {
			return fail(400, { form })
		}

		try {
			const email = form.data.email.toLowerCase()
			const hash = createHash('sha256').update(form.data?.password).digest('hex')
			const result = await prisma.authKey.update({
				where: {
					id: 'email:' + email
				},
				data: {
					hashed_password: hash
				}
			})
			console.log(result)
			return message(form, "You're password has been reset.")
		} catch (err) {
			return message(form, 'Password reset was unsuccessful.')
		}
	}
}
