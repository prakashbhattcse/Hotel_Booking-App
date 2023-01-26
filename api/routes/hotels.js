import express from "express";
import {
    createHotel, deleteHotel, getHotel, getHotels, updateHotel, countByCity,
    // countByType,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js"
const router = express.Router();


// CREATE
router.post("/", verifyAdmin, createHotel);

//UPDATE
// The findByIdAndUpdate() function is used to find a matching document, updates it according to the update arg, passing any options, and returns the found document (if any) to the callback.
router.put("/:id", verifyAdmin, updateHotel);

// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);


//GET
router.get("/find/:id", getHotel);

// GET ALL
router.get("/", getHotels);


router.get("/countByCity", countByCity);
// router.get("/countByType", countByType);
// router.get("/room/:id", getHotelRooms);


export default router;