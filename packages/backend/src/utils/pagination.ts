export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationResult<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface PrismaSkipTake {
  skip: number;
  take: number;
}

/**
 * Default pagination settings
 */
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const MAX_LIMIT = 100;

/**
 * Parse and validate pagination parameters from request query
 *
 * @param params - Raw pagination parameters
 * @returns Validated pagination parameters
 *
 * @example
 * ```ts
 * const { page, limit, sortBy, sortOrder } = parsePaginationParams(req.query);
 * ```
 */
export function parsePaginationParams(params: any): Required<PaginationParams> {
  const page = Math.max(1, parseInt(params.page) || DEFAULT_PAGE);
  const limit = Math.min(
    MAX_LIMIT,
    Math.max(1, parseInt(params.limit) || DEFAULT_LIMIT)
  );
  const sortBy = params.sortBy || 'createdAt';
  const sortOrder = params.sortOrder === 'asc' ? 'asc' : 'desc';

  return { page, limit, sortBy, sortOrder };
}

/**
 * Calculate skip and take values for Prisma queries
 *
 * @param page - Current page number (1-indexed)
 * @param limit - Number of items per page
 * @returns Object with skip and take values for Prisma
 *
 * @example
 * ```ts
 * const { skip, take } = calculateSkipTake(2, 10);
 * const users = await prisma.user.findMany({ skip, take });
 * ```
 */
export function calculateSkipTake(page: number, limit: number): PrismaSkipTake {
  const skip = (page - 1) * limit;
  const take = limit;

  return { skip, take };
}

/**
 * Create a pagination result object
 *
 * @param data - Array of items for current page
 * @param total - Total number of items
 * @param page - Current page number
 * @param limit - Number of items per page
 * @returns Pagination result with data and metadata
 *
 * @example
 * ```ts
 * const total = await prisma.user.count();
 * const users = await prisma.user.findMany({ skip, take });
 * const result = createPaginationResult(users, total, page, limit);
 * ```
 */
export function createPaginationResult<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
): PaginationResult<T> {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    },
  };
}

/**
 * Helper to paginate Prisma queries
 * Automatically calculates skip/take and creates pagination result
 *
 * @param model - Prisma model to query
 * @param params - Pagination parameters
 * @param where - Prisma where clause
 * @param include - Prisma include clause
 * @param orderBy - Prisma orderBy clause
 * @returns Promise resolving to pagination result
 *
 * @example
 * ```ts
 * const result = await paginateQuery(
 *   prisma.user,
 *   { page: 1, limit: 10, sortBy: 'createdAt', sortOrder: 'desc' },
 *   { role: 'USER' },
 *   { profile: true }
 * );
 * ```
 */
export async function paginateQuery<T>(
  model: any,
  params: PaginationParams,
  where?: any,
  include?: any,
  orderBy?: any
): Promise<PaginationResult<T>> {
  const { page, limit, sortBy, sortOrder } = parsePaginationParams(params);
  const { skip, take } = calculateSkipTake(page, limit);

  // Default orderBy if not provided
  const finalOrderBy = orderBy || { [sortBy]: sortOrder };

  // Execute query and count in parallel
  const [data, total] = await Promise.all([
    model.findMany({
      where,
      include,
      orderBy: finalOrderBy,
      skip,
      take,
    }),
    model.count({ where }),
  ]);

  return createPaginationResult<T>(data, total, page, limit);
}

/**
 * Extract pagination params from Express request query
 *
 * @param query - Express request query object
 * @returns Validated pagination parameters
 *
 * @example
 * ```ts
 * const paginationParams = getPaginationFromQuery(req.query);
 * const result = await paginateQuery(prisma.user, paginationParams);
 * ```
 */
export function getPaginationFromQuery(query: any): PaginationParams {
  return {
    page: query.page ? parseInt(query.page) : undefined,
    limit: query.limit ? parseInt(query.limit) : undefined,
    sortBy: query.sortBy,
    sortOrder: query.sortOrder === 'asc' || query.sortOrder === 'desc'
      ? query.sortOrder
      : undefined,
  };
}

/**
 * Build Prisma orderBy object from sort parameters
 *
 * @param sortBy - Field to sort by
 * @param sortOrder - Sort order ('asc' or 'desc')
 * @returns Prisma orderBy object
 *
 * @example
 * ```ts
 * const orderBy = buildOrderBy('name', 'asc');
 * // { name: 'asc' }
 *
 * const orderBy = buildOrderBy('user.name', 'desc');
 * // { user: { name: 'desc' } }
 * ```
 */
export function buildOrderBy(sortBy: string, sortOrder: 'asc' | 'desc'): any {
  // Handle nested fields (e.g., 'user.name')
  const fields = sortBy.split('.');

  if (fields.length === 1) {
    return { [sortBy]: sortOrder };
  }

  // Build nested object
  let orderBy: any = {};
  let current = orderBy;

  for (let i = 0; i < fields.length - 1; i++) {
    current[fields[i]] = {};
    current = current[fields[i]];
  }

  current[fields[fields.length - 1]] = sortOrder;

  return orderBy;
}

/**
 * Calculate pagination range for UI (e.g., "Showing 1-10 of 100")
 *
 * @param page - Current page number
 * @param limit - Number of items per page
 * @param total - Total number of items
 * @returns Object with start, end, and total
 *
 * @example
 * ```ts
 * const range = getPaginationRange(2, 10, 45);
 * // { start: 11, end: 20, total: 45 }
 * console.log(`Showing ${range.start}-${range.end} of ${range.total}`);
 * ```
 */
export function getPaginationRange(
  page: number,
  limit: number,
  total: number
): { start: number; end: number; total: number } {
  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return { start, end, total };
}
