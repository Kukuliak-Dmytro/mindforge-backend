export interface Chat {
  id: string
  orderId: string
  createdAt: Date
  updatedAt: Date
}

export interface Message {
  id: string
  chatId: string
  senderId: string
  content: string
  createdAt: Date
  isRead: boolean
} 