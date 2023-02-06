import { prisma } from "@/config";

async function listHotels() {
  return prisma.hotel.findMany();
}

async function listRoomsByHotelId(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId
    },
    include: {
      Rooms: true
    }
  });
}

const hotelRepository = {
  listHotels,
  listRoomsByHotelId
};

export default hotelRepository;
