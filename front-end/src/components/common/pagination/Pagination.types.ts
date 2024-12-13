export type PaginationProps = {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  numbers?: boolean;
  onPaginate: (page: number) => void
}