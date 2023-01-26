import User from "../models/user.js";
import bcrypt from 'bcrypt';
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";


// export const register = async (req, res, next) => {
//     try {
//         const { username, email, password } = req.body;
//         const salt = bcrypt.genSaltSync(10);
//         const hash = bcrypt.hashSync(req.body.password, salt);
// Store hash in your password DB.

//         const newUser = new User({
//             username: username,
//             email: email,
//             password: hash
//         })

//         await newUser.save();
//         res.status(200).send("User has been created");
//     } catch (err) {
//         next(err);
//     }
// };

// export const login = async (req, res, next) => {
//   try {
//     const { username, email, password } = req.body;
//     const user = await User.findOne({ username: username })
//     if (!user) return next(createError(404, "user not found"))

//     const isPasswordCorrect = await bcrypt.compare(password, user.password);

//     if (!isPasswordCorrect) return next(createError(400, "Wrong creadentils"));

//     const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT);

//     const { isAdmin, ...otherDetails } = user._doc;

//     res.cookie("access_token", token, {
//       httpOnly: true,
//     }).status(200).json({ ...otherDetails });

//     res.status(200).json(user);
//   } catch (err) {
//     next(err);
//   }
// };


export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};



export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};