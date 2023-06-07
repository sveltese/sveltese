import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { prisma } from '$lib/server/prisma'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export async function findUserByEmail(email: string) {
	const user = await prisma.authUser.findUnique({
		where: {
			email: email
		}
	})

	return user || false
}
