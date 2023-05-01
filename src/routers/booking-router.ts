import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { booking, postBooking, updateBooking } from '@/controllers/booking-controller';

const bookingRouter = Router();

bookingRouter.all('/*', authenticateToken).get('/', booking).post('/', postBooking).put('/:bookingId', updateBooking);

export { bookingRouter };
