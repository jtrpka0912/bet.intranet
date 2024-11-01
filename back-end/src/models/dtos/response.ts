type ResponseDTO<T> = {
    error: boolean,
    message?: string,
    data?: T | null
};

export default ResponseDTO;