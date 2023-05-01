import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { booking, postBooking } from '@/controllers/booking-controller';

const bookingRouter = Router();

bookingRouter.all('/*', authenticateToken).get('/', booking).post('/', postBooking);

export { bookingRouter };
