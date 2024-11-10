// -- ./src/tools/pagination.ts
export interface PaginationArgs {
  items: any[];
  totalCount: number;
  limit?: number;
  page?: number;
}

export interface SortBy {
  field: string;
  direction: 'ASC' | 'DESC';
}

export interface PageInfo {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
  totalCount: number;
}

export interface PaginationResult<T> {
  pageInfo: PageInfo;
  items: T[];
}

/**
 * Builds the pagination result.
 * @param items - The array of items for the current page.
 * @param totalCount - The total number of items matching the query.
 * @param limit - (Optional) The number of items per page.
 * @param page - (Optional) The current page number.
 * @returns The paginated result containing items and page information.
 */
export const applyPagination = <T>(
  args: PaginationArgs
): PaginationResult<T> => {
  const { items, totalCount, limit = 10, page = 1 } = args;

  // Calculate pagination info
  const totalPages = Math.ceil(totalCount / limit);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  // Build and return the pagination result
  return {
    pageInfo: {
      currentPage: page,
      hasNextPage,
      hasPreviousPage,
      totalPages,
      totalCount,
    },
    items,
  };
};
