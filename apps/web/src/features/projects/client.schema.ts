import { CreateProjectInput } from "@supavolt/types";
import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name most be at most 50 characters"),
}) satisfies z.ZodType<CreateProjectInput>;
