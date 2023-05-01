import hotelRepository from '@/repositories/hotel-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import bookingRepository from '@/repositories/booking-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import { notFoundError } from '@/errors';
import { forbiddenBookingError } from '@/errors/forbidden-booking-error';

async function getBooking(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const booking = await bookingRepository.findBooking(userId);
  if (!booking) {
    throw notFoundError();
  }
  return booking;
}

async function postBooking(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (ticket.TicketType.isRemote || !ticket.TicketType.includesHotel || ticket.status === 'RESERVED') {
    throw forbiddenBookingError();
  }

  const bookingExists = await bookingRepository.findBookingById(roomId);
  if (bookingExists) throw forbiddenBookingError;

  const room = await hotelRepository.findRoomsByHotelId(roomId);
  if (!room) throw notFoundError();

  await bookingRepository.createBooking(userId, roomId);

  const brandNewBooking = await bookingRepository.findBookingById(roomId);
  return brandNewBooking;
}

export default {
  getBooking,
  postBooking,
};
