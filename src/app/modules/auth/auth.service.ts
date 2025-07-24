// import { StatusCodes } from "http-status-codes";
// import AppError from "../../ErrorHelper/Apperror";
// import { iUser } from "../user/user.interface";
// import { User } from "../user/user.model";
// import bcrypt from "bcryptjs";
// import { generateToken } from "../../utils/jwt";
// import { envVars } from "../../config/env";




// const credentialsLogin = async (payload: Partial<iUser>) => {
//   const { email, password } = payload;

//   // const isUserExist = await User.findOne({ email });
//    const isUserExist = await User.findOne({ email }).select("+password");

//   if (!isUserExist) {
//     throw new AppError(StatusCodes.BAD_REQUEST, "Email does not exist", '');
//   }

//   const isPasswordMatched = await bcrypt.compare(
//     password as string,
//     isUserExist.password as string
//   );

//   if (!isPasswordMatched) {
//     throw new AppError(StatusCodes.BAD_REQUEST, "Incorrect password", '');
//   }



//   // JWT token generation

//   const jwtPayload = {
//     userId : isUserExist.id,
//     email : isUserExist.email,
//     role : isUserExist.role
//   }



  
//   const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECREAT,envVars.JWT_ACCESS_EXPIRE)
//   // const accessToken = jwt.sign( jwtPayload, "secret", 
//   //   {
//   //     expiresIn : "5m"
//   //   } )


//   return {
//     accessToken
//   };
// };



// export const AuthServices = { credentialsLogin };









import { StatusCodes } from "http-status-codes";
import { User } from "../user/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import AppError from "../../ErrorHelper/Apperror";

const credentialsLogin = async (payload: { email?: string; password?: string }) => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email }).select("+password");

  if (!isUserExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Email does not exist", "");
  }

  const isPasswordMatched = await bcrypt.compare(password as string, isUserExist.password as string);

  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Incorrect password", "");
  }

  const jwtPayload = {
    userId: isUserExist.id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRE);

  return {
    accessToken,
  };
};

export const AuthServices = { credentialsLogin };
 