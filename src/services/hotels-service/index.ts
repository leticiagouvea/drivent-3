import hotelRepository from "@/repositories/hotels-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError } from "@/errors";
import { paymentRequired } from "@/errors/payment-required-error";

async function findEnrollment(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if(!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket) {
    throw notFoundError();
  }

  if (ticket.status !== "PAID" || !ticket.TicketType.includesHotel || ticket.TicketType.isRemote) {
    throw paymentRequired();
  }
}

async function findHotels(userId: number) {
  await findEnrollment(userId);

  const hotels = await hotelRepository.listHotels();

  if (hotels.length === 0) {
    throw notFoundError();
  }

  return hotels;
}

async function getHotelsWithRooms(userId: number, hotelId: number) {
  await findEnrollment(userId);

  const hotelRooms = await hotelRepository.listRoomsByHotelId(hotelId);

  if (!hotelRooms || hotelRooms.Rooms.length === 0) {
    throw notFoundError();
  }

  return hotelRooms;
}

const hotelService = {
  findHotels,
  getHotelsWithRooms
};

export default hotelService;
