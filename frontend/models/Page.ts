export interface Page<T> {
    data: T[];
    total: number;
    page: number;
    hasNextPage: boolean;
}

export interface PageRequest {
    page: number;
    pageSize?: number;
}