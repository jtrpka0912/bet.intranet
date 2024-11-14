type ResponseDTO<T> = {
    error: boolean;
    message?: string;
    data: T
}

export default ResponseDTO;