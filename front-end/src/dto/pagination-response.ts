type PaginationResponseDTO<T> = {
    count: number;
    limit: number;
    page: number;
    pages: number;
    items: T[]
}

export default PaginationResponseDTO;