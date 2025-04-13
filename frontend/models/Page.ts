export interface Page<T> {
    data: T[];
    total: number;
    page: number;
}

export interface PageRequest {
    page: number;
    pageSize?: number;
}