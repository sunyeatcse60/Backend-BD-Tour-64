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
import AppError from "../../ErrorHelper/Apperror";
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utils/userToken";
import { JwtPayload } from 'jsonwebtoken';
import { envVars } from '../../config/env';





const credentialsLogin = async (payload: { email?: string; password?: string }) => {
  const { email, password } = payload;

  if (!email) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Email is required", "");
  }

  const isUserExist = await User.findOne({ email }).select("+password");

  if (!isUserExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Email does not exist", "");
  }

  if (!password || !isUserExist.password) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Password is missing", "");
  }

  const isPasswordMatched = await bcrypt.compare(password, isUserExist.password);

  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Incorrect password", "");
  }

  //   const jwtPayload = {
  //     userId: isUserExist.id,
  //     email: isUserExist.email,
  //     role: isUserExist.role,
  //   };

  //   const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRE);

  // //  refresh token ar kaj   

  //  const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES)

  const userTokens = createUserTokens(isUserExist)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: pass, ...rest } = isUserExist.toObject()


  return {
    accessToken: userTokens.accessToken,
    refreshToken: userTokens.refreshToken,
    user: rest
  };
};



// new access token
const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)
  return {
    newAccessToken
  };
};


// resetpassword
const resetPassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {

  const user = await User.findById(decodedToken.userId);

  
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found", "");
  }

  const isOldPasswordMatch = await bcrypt.compare(oldPassword, user.password as string);

  if (!isOldPasswordMatch) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "old password does not match");
  }

  user.password = await bcrypt.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND));
  await user.save();

}



export const AuthServices = { credentialsLogin, getNewAccessToken, resetPassword };
