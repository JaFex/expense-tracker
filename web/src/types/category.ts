import { z } from "zod"
import { FlowType } from "./enums"

export const CategorySchema = z.object({
    name: z.string().min(3).max(100),
    description: z.string().min(3).max(255).optional().or(z.literal('')).transform((e) => e?.trim() === '' ? undefined : e),
    type: z.nativeEnum(FlowType)
})

export type Category = z.infer<typeof CategorySchema>