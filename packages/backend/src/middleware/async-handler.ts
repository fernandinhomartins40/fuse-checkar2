import { Request, Response, NextFunction } from 'express';

/**
 * Type for async route handlers
 */
export type AsyncRouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

/**
 * Wrapper for async route handlers to catch errors automatically
 * Eliminates the need for try-catch blocks in every route
 *
 * @param fn - Async route handler function
 * @returns Express middleware function
 *
 * @example
 * ```ts
 * router.get('/users', asyncHandler(async (req, res) => {
 *   const users = await prisma.user.findMany();
 *   res.json({ users });
 * }));
 * ```
 */
export function asyncHandler(fn: AsyncRouteHandler) {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Alternative syntax using method chaining
 *
 * @example
 * ```ts
 * router.get('/users', async(req, res) => {
 *   const users = await prisma.user.findMany();
 *   res.json({ users });
 * });
 * ```
 */
export const async = asyncHandler;

/**
 * Wrap multiple async middleware functions
 *
 * @param middlewares - Array of async middleware functions
 * @returns Array of wrapped middleware functions
 *
 * @example
 * ```ts
 * router.post('/users',
 *   ...wrapAsync([
 *     validateRequest,
 *     checkUserExists,
 *     createUser
 *   ])
 * );
 * ```
 */
export function wrapAsync(middlewares: AsyncRouteHandler[]): any[] {
  return middlewares.map(middleware => asyncHandler(middleware));
}

/**
 * Create an async-safe version of a controller/service class
 * All methods will be automatically wrapped with asyncHandler
 *
 * @param instance - Instance of a controller/service class
 * @returns Wrapped instance with async-safe methods
 *
 * @example
 * ```ts
 * class UserController {
 *   async getAll(req: Request, res: Response) {
 *     const users = await prisma.user.findMany();
 *     res.json({ users });
 *   }
 *
 *   async getById(req: Request, res: Response) {
 *     const user = await prisma.user.findUnique({ where: { id: req.params.id } });
 *     res.json({ user });
 *   }
 * }
 *
 * const userController = wrapController(new UserController());
 *
 * router.get('/users', userController.getAll);
 * router.get('/users/:id', userController.getById);
 * ```
 */
export function wrapController<T extends object>(instance: T): T {
  const wrapped: any = {};

  for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(instance))) {
    const value = (instance as any)[key];

    // Skip constructor and non-function properties
    if (key === 'constructor' || typeof value !== 'function') {
      continue;
    }

    // Wrap async functions
    wrapped[key] = asyncHandler(value.bind(instance));
  }

  return wrapped as T;
}

/**
 * Decorator for async methods (TypeScript experimental decorators)
 * Requires "experimentalDecorators": true in tsconfig.json
 *
 * @example
 * ```ts
 * class UserController {
 *   @AsyncMethod()
 *   async getAll(req: Request, res: Response) {
 *     const users = await prisma.user.findMany();
 *     res.json({ users });
 *   }
 * }
 * ```
 */
export function AsyncMethod() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const result = originalMethod.apply(this, args);

      if (result instanceof Promise) {
        const next = args[2]; // NextFunction is the third parameter
        if (typeof next === 'function') {
          result.catch(next);
        }
      }

      return result;
    };

    return descriptor;
  };
}

/**
 * Create a safe async function that catches errors and calls next()
 * Useful for middleware that doesn't use the standard (req, res, next) signature
 *
 * @param fn - Async function to wrap
 * @returns Wrapped function that catches errors
 *
 * @example
 * ```ts
 * const safeOperation = catchAsync(async () => {
 *   await someAsyncOperation();
 * });
 *
 * router.get('/test', (req, res, next) => {
 *   safeOperation(next);
 * });
 * ```
 */
export function catchAsync<T extends (...args: any[]) => Promise<any>>(fn: T) {
  return (...args: any[]): Promise<any> => {
    return Promise.resolve(fn(...args)).catch((error) => {
      const next = args[args.length - 1];
      if (typeof next === 'function') {
        next(error);
      }
      throw error;
    });
  };
}

/**
 * Retry an async operation with exponential backoff
 *
 * @param fn - Async function to retry
 * @param maxRetries - Maximum number of retries (default: 3)
 * @param delay - Initial delay in ms (default: 1000)
 * @returns Result of the async function
 *
 * @example
 * ```ts
 * router.get('/data', asyncHandler(async (req, res) => {
 *   const data = await retry(async () => {
 *     return await fetchDataFromAPI();
 *   }, 3, 1000);
 *   res.json({ data });
 * }));
 * ```
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error | undefined;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      // Don't retry on last attempt
      if (i < maxRetries - 1) {
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }

  throw lastError;
}

/**
 * Execute async operations with a timeout
 *
 * @param fn - Async function to execute
 * @param timeoutMs - Timeout in milliseconds
 * @param timeoutMessage - Error message for timeout
 * @returns Result of the async function
 * @throws Error if operation times out
 *
 * @example
 * ```ts
 * router.get('/slow-operation', asyncHandler(async (req, res) => {
 *   const result = await withTimeout(
 *     async () => await slowDatabaseQuery(),
 *     5000,
 *     'Database query timed out'
 *   );
 *   res.json({ result });
 * }));
 * ```
 */
export async function withTimeout<T>(
  fn: () => Promise<T>,
  timeoutMs: number,
  timeoutMessage: string = 'Operation timed out'
): Promise<T> {
  return Promise.race([
    fn(),
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs)
    ),
  ]);
}
