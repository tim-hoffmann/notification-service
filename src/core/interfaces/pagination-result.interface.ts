export interface PaginationResult<T> {
  items: T[];
  prevCursor?: string;
  nextCursor?: string;
  hasNext?: boolean;
  hasPrevious?: boolean;
}
