import { Router } from 'express';
import { orderController } from '../controllers/order.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

router.post('/', (req, res) => { orderController.createOrder(req, res); });
router.patch('/:id', (req, res) => { orderController.updateOrder(req, res); });
router.delete('/:id', (req, res) => { orderController.deleteOrder(req, res); });
router.get('/', (req, res) => { orderController.getOrders(req, res); });
router.get('/:id', (req, res) => { orderController.getOrderById(req, res); });

export default router; 