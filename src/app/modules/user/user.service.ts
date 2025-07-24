import { httpStatus } from 'http-status-codes';
// import { StatusCodes } from 'http-status-codes';
// import { User } from './user.model';
// import { IAuthProvider, iUser } from "./user.interface"
// import AppError from '../../ErrorHelper/Apperror';
// import bcryptjs from "bcryptjs"




// // const createUserService = async (payload : Partial<iUser>) => {

// //     const {name , email, password} = payload;
// //     const user = await User.create({
// //         name, email, password
// //     })

// //     return user
// // }

// const createUserService = async (payload : Partial<iUser>) => {

//     const {email, password ,...rest} = payload;

//     const isUserExist = await User.findOne({email});

//     if(isUserExist){
//         throw new AppError(StatusCodes.BAD_REQUEST, "User already exist", '');
//     }
    

// // passwoed hashing 

//     const hashedPassword = await bcryptjs.hash(password as string, 10);
//     const isPasswordMatch = await bcryptjs.compare(password as string, hashedPassword);

//     console.log(isPasswordMatch);
//     console.log(password, hashedPassword);



//     const authProvider : IAuthProvider = {provider : "credintials", providerId : email as string}

//     const user = await User.create({
//         email, auths : [authProvider], ...rest
//     })

//     return user
// }



// const getAllUsers = async () => {
//     const users = await User.find({})

//     const totalUsers = await User.countDocuments()

//     return {
//         data : users,
//         meta : {
//             total : totalUsers
//         }
//     }
// }

// export const UserServices = {createUserService, getAllUsers}


import { StatusCodes } from "http-status-codes";
import { User } from "./user.model";
import { IAuthProvider, iUser, Role } from "./user.interface";
import bcryptjs from "bcryptjs";
import AppError from "../../ErrorHelper/Apperror";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

const createUserService = async (payload: Partial<iUser>) => {
  const { email, password, ...rest } = payload;

  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User already exists", "");
  }

  const hashedPassword = await bcryptjs.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND));

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };

  const user = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });

  return user;
};


//  Update user.. password rehashing

const updateUser = async (userId: string, payload : Partial<iUser>, decodedToken : JwtPayload) => {

  const isUserExist = await User.findById(userId);
  if(!isUserExist){
    throw new AppError(httpStatus.NOT_FOUND,"user not found");
  }

  /**
   * email - can not update
   * name , phone, password address
   * password - rehashing
   * only admin superadmin - role, isDeleted
   */

  if(payload.role){
    if(decodedToken.role === Role.User || decodedToken.role === Role.Guide){
      throw new AppError(httpStatus.FORBIDDEN,"You are not authorised")
    }
    if(payload.role === Role.Super_Admin || decodedToken.role === Role.Admin){
      throw new AppError(httpStatus.FORBIDDEN,"You are not authorised")
    }
  }


  // Role user/guid hole update korte parbo na

  if(payload.isActive || payload.isDeleted || payload.isVerified){
    if(decodedToken.role === Role.User || decodedToken.role === Role.Guide){
      throw new AppError(httpStatus.FORBIDDEN,"You are not authorised")
    }
  }

  // password rehashing

  if(payload.password){
    payload.password = await bcryptjs.hash(payload.password,envVars.BCRYPT_SALT_ROUND)
  }

  // new update user

  const newUpdateUser = await User.findByIdAndUpdate(userId, payload, { new : true, runValidators: true})


}



const getAllUsers = async () => {
  const users = await User.find({});

  const totalUsers = await User.countDocuments();

  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  };
};

export const UserServices = { createUserService, getAllUsers };
