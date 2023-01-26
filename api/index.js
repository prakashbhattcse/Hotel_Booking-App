import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from './routes/auth.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import usersRoute from './routes/users.js'
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();


// mongoose.connect(process.env.MONGO)
//   .then(() => console.log("Database connected!"))
//   .catch(err => console.log(err));

// INITIAL CONNECTION SETUP
const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO);
    console.log('connected to mongodb')
  } catch (error) {
    throw error;
  }
};


// IF there is any problem in mongo db 
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected !")
});

// if its disconnected it will try to connect again
mongoose.connection.on(" connected", () => {
  console.log("MmongoDB connected!")
});


app.use(cookieParser());
// to send json request if not used json request will throw error
app.use(express.json());

// middleware that is specific to this router 
app.use('/auth', authRoute);
app.use('/rooms', roomsRoute);
app.use('/hotels', hotelsRoute);
app.use('/users', usersRoute);


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(3000, () => {
  connect();
  console.log('connected to backend')
});