import http from '@/utils/http'
import type { BaseResponse } from '@/types/tutor-types'
import type { CreateOrderRequest, Order } from '@/types/order'

export interface Subject {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  isRecurring: boolean;
}

export async function getSubjects(): Promise<BaseResponse<Subject[]>> {
  try {
    const { data } = await http.get<BaseResponse<Subject[]>>('/public/subjects')
    console.log(data)
    return data
  } catch (error: any) {
    console.error('Error fetching subjects:', {
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    })
    throw error
  }
}

export async function getCategories(): Promise<BaseResponse<Category[]>> {
  try {
    const { data } = await http.get<BaseResponse<Category[]>>('/public/categories')
    console.log(data)
    return data
  } catch (error: any) {
    console.error('Error fetching categories:', {
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    })
    throw error
  }
}

export async function createOrder(order: CreateOrderRequest): Promise<Order> {
  const { data } = await http.post<BaseResponse<Order>>('/orders', order)
  return data.data
}

export async function fetchOrders(filters: Record<string, string> = {}): Promise<Order[]> {
  const params = new URLSearchParams(filters).toString();
  try {
    const { data } = await http.get<Order[]>(`/orders?${params}`);
    return data;
  } catch (error: any) {
    console.error('Error fetching orders:', error.response?.data || error.message);
    throw error;
  }
} 