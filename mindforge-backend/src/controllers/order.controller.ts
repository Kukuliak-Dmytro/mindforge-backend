import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';

const orderService = new OrderService();

export class OrderController {
  /**
   * Create an order
   * @param req.body { title, description?, subjectId, categoryId, tutorId?, totalPrice, sessionsCount }
   * tutorId is now optional
   */
  async createOrder(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    try {
      const order = await orderService.createOrder(req.body, req.user.id);
      res.status(201).json(order);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }

  async updateOrder(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    try {
      const order = await orderService.updateOrder(
        req.params.id,
        req.user.id,
        req.body
      );
      res.json(order);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }

  async deleteOrder(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    try {
      await orderService.deleteOrder(req.params.id, req.user.id);
      res.json({ success: true });
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }

  async getOrders(req: Request, res: Response) {
    try {
      const filter: any = {};
      if (req.query.tutorId) filter.tutorId = req.query.tutorId as string;
      if (req.query.studentId) filter.studentId = req.query.studentId as string;
      const orders = await orderService.getOrders(filter);
      res.json(orders);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }

  async getOrderById(req: Request, res: Response) {
    try {
      const order = await orderService.getOrderById(req.params.id);
      if (!order) return res.status(404).json({ message: 'Order not found' });
      res.json(order);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }
}

export const orderController = new OrderController(); 