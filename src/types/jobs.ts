import { z } from 'zod';

export interface Job {
  id: string;

  hirer: {
    id: string;
  };
}

export type JobInput = z.infer<typeof JobInputSchema>;

export const JobInputSchema = z.strictObject({
  hirer: z.strictObject({
    id: z.string(),
  }),
});
