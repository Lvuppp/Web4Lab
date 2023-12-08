import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface ApiResponse<T> {
    data: T;
    status: number;
    statusText: string;
}

class ApiClient {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL: baseURL,
            withCredentials: true,
        });

        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response) {
                    throw {
                        status: error.response.status,
                        message: error.response.data.message || 'Unknown Error',
                    };
                } else {
                    throw {
                        status: 500,
                        message: 'Internal Server Error',
                    };
                }
            }
        );
    }

    async get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
        const queryString = params
            ? `?${Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&')}`
            : '';

        const response = await this.axiosInstance.get<T>(`${url}${queryString}`);
        return this.handleResponse<T>(response);
    }

    async post<T>(url: string, data: any): Promise<ApiResponse<T>> {
        const response = await this.axiosInstance.post<T>(url, data);
        return this.handleResponse<T>(response);
    }


    private handleResponse<T>(response: AxiosResponse<T>): ApiResponse<T> {
        return {
            data: response.data,
            status: response.status,
            statusText: response.statusText,
        };
    }

    async put<T>(url: string, data: any) {
        const response = await this.axiosInstance.put<T>(url, data);
        return this.handleResponse<T>(response);
    }
    async delete<T>(url: string) {
        const response = await this.axiosInstance.delete<T>(url);
        return this.handleResponse<T>(response);
    }
}

export const apiClient = new ApiClient('http://localhost:3000/api');
