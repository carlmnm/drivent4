import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { booking } from '@/controllers/booking-controller';

const bookingRouter = Router();

bookingRouter.all('/*', authenticateToken).get('/', booking);

export { bookingRouter };
