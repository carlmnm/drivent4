import httpStatus from 'http-status';
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';
import { forbiddenBookingError } from '@/errors/forbidden-booking-error';

export async function booking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  try {
    const bookings = await bookingService.getBooking(userId);
    return res.status(httpStatus.OK).send(bookings);
  } catch (error) {
    next(error);
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const { roomId } = req.body;

  try {
    const newBooking = await bookingService.postBooking(userId, roomId);
    return res.status(httpStatus.OK).send({ bookingId: newBooking.id });
  } catch (error) {
    if (error.name === 'forbiddenBookingError') {
      return res.status(httpStatus.FORBIDDEN).send(error.message);
    }
    next(error);
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const { roomId } = req.body;
  const { bookingId } = req.params;

  try {
    const newBooking = await bookingService.updateBooking(userId, roomId, +bookingId);
    return res.status(httpStatus.OK).send({ bookingId: newBooking.id });
  } catch (error) {
    if (error.name === 'forbiddenBookingError') {
      return res.status(httpStatus.FORBIDDEN).send(error.message);
    }
    next(error);
  }
}
