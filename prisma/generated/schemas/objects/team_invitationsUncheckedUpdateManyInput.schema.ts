import { z } from 'zod'
import { BigIntFieldUpdateOperationsInputObjectSchema } from './BigIntFieldUpdateOperationsInput.schema'
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema'
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.team_invitationsUncheckedUpdateManyInput> = z
	.object({
		id: z
			.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInputObjectSchema)])
			.optional(),
		team_id: z
			.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInputObjectSchema)])
			.optional(),
		email: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)])
			.optional(),
		role: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
			.optional()
			.nullable(),
		created_at: z
			.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)])
			.optional()
			.nullable(),
		updated_at: z
			.union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)])
			.optional()
			.nullable()
	})
	.strict()

export const team_invitationsUncheckedUpdateManyInputObjectSchema = Schema
