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

const bookingRepository = {
  findBooking,
};
export default bookingRepository;
