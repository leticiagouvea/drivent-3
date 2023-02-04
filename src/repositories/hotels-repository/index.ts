import { prisma } from "@/config";

async function listHotels() {
  return prisma.hotel.findMany();
}

const hotelRepository = {
  listHotels
};

export default hotelRepository;
