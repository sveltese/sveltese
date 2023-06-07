import lucia from 'lucia-auth'
import { sveltekit } from 'lucia-auth/middleware'
import prisma from '@lucia-auth/adapter-prisma'
import { prisma as prismaClient } from '$lib/server/prisma'
import { dev } from '$app/environment'

export const auth = lucia({
	adapter: prisma(prismaClient),
	env: dev ? 'DEV' : 'PROD',
	transformDatabaseUser: (databaseUser) => {
		return {
			userId: databaseUser.id,
			email: databaseUser.email,
			name: databaseUser.name
		}
	},
	middleware: sveltekit(),
	experimental: {
		debugMode: true
	}
})

export type Auth = typeof auth
