import type { Subject, Category } from './subject';

export interface Order {
  id: string
  studentId: string
  tutorId: string
  subjectId?: string // optional, prefer subject object
  categoryId?: string // optional, prefer category object
  subject: Subject
  category: Category
  title: string
  description?: string
  createdAt: Date
  status: OrderStatus
  totalPrice: number
  sessionsCount: number
  sessionsCompleted: number
}

export interface Session {
  id: string
  orderId: string
  scheduledStart: Date
  scheduledEnd: Date
  actualStart?: Date
  actualEnd?: Date
  status: SessionStatus
  meetingLink?: string
}

export interface Review {
  id: string
  orderId: string
  studentId: string
  tutorId: string
  rating: number
  comment?: string
  createdAt: Date
}

export type OrderStatus = 
  | 'PENDING'
  | 'ACCEPTED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'

export type SessionStatus = 
  | 'SCHEDULED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'

export interface CreateOrderRequest {
  title: string;
  description?: string;
  subjectId: string;
  categoryId: string;
  tutorId?: string;
  totalPrice: number;
  sessionsCount?: number; // Only for recurring categories
} 