import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ValidationError } from '../utils/errors';

/**
 * Source of data to validate
 */
export type ValidateSource = 'body' | 'query' | 'params';

/**
 * Validation middleware factory using Zod schemas
 *
 * @param schema - Zod schema to validate against
 * @param source - Source of data to validate (body, query, or params)
 * @returns Express middleware function
 *
 * @example
 * ```ts
 * import { z } from 'zod';
 *
 * const createUserSchema = z.object({
 *   name: z.string().min(3),
 *   email: z.string().email(),
 *   password: z.string().min(8)
 * });
 *
 * router.post('/users', validate(createUserSchema), createUser);
 * ```
 */
export function validate(schema: ZodSchema, source: ValidateSource = 'body') {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Get data from specified source
      const data = req[source];

      // Validate data against schema
      const validated = await schema.parseAsync(data);

      // Replace request data with validated data (with defaults applied)
      req[source] = validated;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Format Zod errors
        const formattedErrors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code,
        }));

        next(new ValidationError('Erro de validação', formattedErrors));
      } else {
        next(error);
      }
    }
  };
}

/**
 * Validate request body
 *
 * @param schema - Zod schema to validate against
 * @returns Express middleware function
 *
 * @example
 * ```ts
 * router.post('/users', validateBody(createUserSchema), createUser);
 * ```
 */
export function validateBody(schema: ZodSchema) {
  return validate(schema, 'body');
}

/**
 * Validate request query parameters
 *
 * @param schema - Zod schema to validate against
 * @returns Express middleware function
 *
 * @example
 * ```ts
 * const paginationSchema = z.object({
 *   page: z.string().regex(/^\d+$/).transform(Number).optional(),
 *   limit: z.string().regex(/^\d+$/).transform(Number).optional()
 * });
 *
 * router.get('/users', validateQuery(paginationSchema), getUsers);
 * ```
 */
export function validateQuery(schema: ZodSchema) {
  return validate(schema, 'query');
}

/**
 * Validate request URL parameters
 *
 * @param schema - Zod schema to validate against
 * @returns Express middleware function
 *
 * @example
 * ```ts
 * const userIdSchema = z.object({
 *   id: z.string().uuid()
 * });
 *
 * router.get('/users/:id', validateParams(userIdSchema), getUser);
 * ```
 */
export function validateParams(schema: ZodSchema) {
  return validate(schema, 'params');
}

/**
 * Validate multiple sources at once
 *
 * @param schemas - Object with schemas for different sources
 * @returns Express middleware function
 *
 * @example
 * ```ts
 * router.put('/users/:id', validateMultiple({
 *   params: z.object({ id: z.string().uuid() }),
 *   body: z.object({ name: z.string(), email: z.string().email() })
 * }), updateUser);
 * ```
 */
export function validateMultiple(schemas: Partial<Record<ValidateSource, ZodSchema>>) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const errors: any[] = [];

      // Validate each source
      for (const [source, schema] of Object.entries(schemas)) {
        try {
          const data = req[source as ValidateSource];
          const validated = await schema.parseAsync(data);
          req[source as ValidateSource] = validated;
        } catch (error) {
          if (error instanceof ZodError) {
            error.errors.forEach(err => {
              errors.push({
                source,
                field: err.path.join('.'),
                message: err.message,
                code: err.code,
              });
            });
          }
        }
      }

      // If there are validation errors, throw ValidationError
      if (errors.length > 0) {
        throw new ValidationError('Erro de validação', errors);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

/**
 * Custom validation middleware using a validation function
 *
 * @param validationFn - Custom validation function
 * @param source - Source of data to validate
 * @returns Express middleware function
 *
 * @example
 * ```ts
 * router.post('/users', validateCustom(async (data) => {
 *   if (await userExists(data.email)) {
 *     throw new Error('Email já cadastrado');
 *   }
 *   return true;
 * }), createUser);
 * ```
 */
export function validateCustom(
  validationFn: (data: any, req: Request) => Promise<boolean> | boolean,
  source: ValidateSource = 'body'
) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req[source];
      await validationFn(data, req);
      next();
    } catch (error) {
      if (error instanceof Error) {
        next(new ValidationError(error.message));
      } else {
        next(new ValidationError('Erro de validação'));
      }
    }
  };
}

/**
 * Optional validation - only validates if data is present
 *
 * @param schema - Zod schema to validate against
 * @param source - Source of data to validate
 * @returns Express middleware function
 *
 * @example
 * ```ts
 * // Only validates if body is present
 * router.patch('/users/:id', optionalValidate(updateUserSchema), updateUser);
 * ```
 */
export function optionalValidate(schema: ZodSchema, source: ValidateSource = 'body') {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req[source];

      // Skip validation if data is empty
      if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
        return next();
      }

      // Validate data
      const validated = await schema.parseAsync(data);
      req[source] = validated;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code,
        }));

        next(new ValidationError('Erro de validação', formattedErrors));
      } else {
        next(error);
      }
    }
  };
}

/**
 * Sanitize request data by removing extra fields not in schema
 *
 * @param schema - Zod schema with allowed fields
 * @param source - Source of data to sanitize
 * @returns Express middleware function
 *
 * @example
 * ```ts
 * // Only allows fields defined in schema, removes others
 * router.post('/users', sanitize(createUserSchema), createUser);
 * ```
 */
export function sanitize(schema: ZodSchema, source: ValidateSource = 'body') {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req[source];

      // Parse with strict mode to remove extra fields
      const validated = await schema.parseAsync(data);

      // Replace with sanitized data
      req[source] = validated;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code,
        }));

        next(new ValidationError('Erro de validação', formattedErrors));
      } else {
        next(error);
      }
    }
  };
}
