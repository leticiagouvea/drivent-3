import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getHotelRooms, getHotels } from "@/controllers";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("/", getHotels)
  .get("/:hotelId", getHotelRooms);

export { hotelsRouter };
