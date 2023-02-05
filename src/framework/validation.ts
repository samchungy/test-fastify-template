import { FastifyRequest } from 'fastify';
import { z } from 'zod';

import { JsonResponse } from './error';

/**
 * Converts a `ZodError` into an `invalidFields` object
 *
 * For example, the `ZodError`:
 *
 * ```json
 * {
 *   "issues": [
 *     {
 *       "code": "invalid_type",
 *       "expected": "string",
 *       "received": "undefined",
 *       "path": ["advertiserId"],
 *       "message": "advertiserId is required in the URL"
 *     }
 *   ],
 *   "name": "ZodError"
 * }
 * ```
 *
 * Returns:
 *
 * ```json
 * { "/advertiserId": "advertiserId is required in the URL" }
 * ```
 */
const parseInvalidFieldsFromError = ({
  errors,
}: z.ZodError): Record<string, string> =>
  Object.fromEntries(
    errors.map((err) => [`/${err.path.join('/')}`, err.message]),
  );

export const validate = <
  Output,
  Def extends z.ZodTypeDef = z.ZodTypeDef,
  Input = Output,
>({
  input,
  schema,
}: {
  input: unknown;
  schema: z.ZodSchema<Output, Def, Input>;
}): Output => {
  const parseResult = schema.safeParse(input);
  if (parseResult.success === false) {
    throw new JsonResponse(422, 'Input validation failed', {
      invalidFields: parseInvalidFieldsFromError(parseResult.error),
    });
  }
  return parseResult.data;
};

export const validateRequestBody = <
  Output,
  Def extends z.ZodTypeDef = z.ZodTypeDef,
  Input = Output,
>(
  req: FastifyRequest,
  schema: z.ZodSchema<Output, Def, Input>,
): Output =>
  validate<Output, Def, Input>({
    input: req.body,
    schema,
  });
