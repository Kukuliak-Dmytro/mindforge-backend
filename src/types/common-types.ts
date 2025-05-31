// Common types used across the application
export type UUID = string; // Format: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
export type ISODateString = string; // Format: "YYYY-MM-DDTHH:mm:ss.sssZ"

export interface BaseResponse<T> {
  message: string;
  data: T;
}

export interface ErrorResponse {
  message: string;
  errors?: Array<{
    path: string[];
    message: string;
  }>;
} 