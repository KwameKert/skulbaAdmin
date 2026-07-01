export interface ApiResponse<T> {
    data: T;
    message: string;
    status: number
}

export interface IPage {
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

export interface Page<T> {
    content: T[];
    page: IPage;

}