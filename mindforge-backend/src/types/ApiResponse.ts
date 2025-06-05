export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
}

export class ResponseBuilder {
  static success<T>(data?: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      message,
      data
    };
  }

  static error(message: string, code?: string): ApiResponse {
    return {
      success: false,
      error: {
        message,
        code
      }
    };
  }
} 