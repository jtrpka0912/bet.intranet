type BetPaginationResponseDTO<T> = {
    count: number, // Total number of items
    limit: number, // Current set limit
    page: number, // Current page
    pages: number, // Total number of pages based on count and limit
    items: T[]
}

export default BetPaginationResponseDTO;