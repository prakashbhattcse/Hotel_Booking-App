import User from "../models/user.js";


// export const updateUser = async (req, res, next) => {
//     try {
//         /*  
//             findBy...has 3 parameters 
//             filter «Object» Replace the first document that matches this filter
//             [replacement] «Object» Replace with this document
//             [options] «Object» optional see Query.prototype.setOptions()
//         */
//         const _id = req.params.id;    //// Access UserId via: req.params.userId
//         const updateUser = await User.findByIdAndUpdate(_id, { $set: req.body }, { new: true });
//         res.status(200).json(savedUser);
//     } catch (err) {
//         next(err);
//     }
// }

// export const deleteUser = async (req, res, next) => {
//     try {
//         await User.findByIdAndDelete(req.params.id);

//         res.status(200).json("User has been deleted");
//     } catch (err) {
//         next(err);
//     }
// }

// export const getUser = async (req, res, next) => {
//     try {
//         const user = await User.findById(req.params.id);

//         res.status(200).json(user);
//     } catch (err) {
//         next(err);
//     }
// }

// export const getUsers = async (req, res, next) => {
//     try {
//         const users = await User.find();

//         res.status(200).json(users);
//     } catch (err) {
//         next(err);
//     }
// }



export const updateUser = async (req,res,next)=>{
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}
export const deleteUser = async (req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}
export const getUser = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
export const getUsers = async (req,res,next)=>{
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}