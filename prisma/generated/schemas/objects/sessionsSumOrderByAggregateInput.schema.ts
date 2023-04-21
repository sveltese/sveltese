import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.sessionsSumOrderByAggregateInput> = z
	.object({
		user_id: z.lazy(() => SortOrderSchema).optional(),
		last_activity: z.lazy(() => SortOrderSchema).optional()
	})
	.strict();

export const sessionsSumOrderByAggregateInputObjectSchema = Schema;
