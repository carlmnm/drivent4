import { Booking, Room } from '@prisma/client';
import { prisma } from '@/config';

async function findBooking(userId: number): Promise<{ Room: Room; id: number }> {
  return await prisma.booking.findFirst({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      Room: true,
    },
  });
}

async function createBooking(roomId: number, userId: number) {
  return await prisma.booking.create({
    data: {
      roomId: roomId,
      userId: userId,
    },
  });
}

async function findBookingById(roomId: number) {
  return await prisma.booking.findFirst({
    where: {
      roomId: roomId,
    },
  });
}

const bookingRepository = {
  findBooking,
  findBookingById,
  createBooking,
};
export default bookingRepository;
