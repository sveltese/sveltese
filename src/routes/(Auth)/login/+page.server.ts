import { fail, redirect } from '@sveltejs/kit'
import { message, superValidate } from 'sveltekit-superforms/server'
import { auth } from '$lib/server/lucia'
import { loginSchema } from '$lib/schemas'
import { log } from 'node:console'

export const load = async (event) => {
	const form = await superValidate(event, loginSchema)
	return { form }
}

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, loginSchema)

		if (!form.valid) {
			log(2)
			return fail(400, { form })
		}
		log(3)
		try {
			const username = form.data.email
			const password = form.data.password
			log(username, password)
			const key = await auth.useKey('email', username, password)
			log(key)
			const session = await auth.createSession(key.userId)
			log(45, session)

			log(46)
			event.locals.auth.setSession(session)
			log(47)
		} catch (err) {
			log(5)
			return message(form, 'Login was unsuccessful.')
		}
		log(6)
		throw redirect(303, '/dashboard')
	}
}
