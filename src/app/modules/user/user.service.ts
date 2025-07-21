import { StatusCodes } from 'http-status-codes';
import { User } from './user.model';
import { IAuthProvider, iUser } from "./user.interface"
import AppError from '../../ErrorHelper/Apperror';
import bcryptjs from "bcryptjs"




// const createUserService = async (payload : Partial<iUser>) => {

//     const {name , email, password} = payload;
//     const user = await User.create({
//         name, email, password
//     })

//     return user
// }

const createUserService = async (payload : Partial<iUser>) => {

    const {email, password ,...rest} = payload;

    const isUserExist = await User.findOne({email});

    if(isUserExist){
        throw new AppError(StatusCodes.BAD_REQUEST, "User already exist", '');
    }
    

// passwoed hashing 

    const hashedPassword = await bcryptjs.hash(password as string, 10);
    const isPasswordMatch = await bcryptjs.compare(password as string, hashedPassword);

    console.log(isPasswordMatch);
    console.log(password, hashedPassword);





    const authProvider : IAuthProvider = {provider : "credintials", providerId : email as string}

    const user = await User.create({
        email, auths : [authProvider], ...rest
    })

    return user
}



const getAllUsers = async () => {
    const users = await User.find({})

    return users;
}

export const UserServices = {createUserService, getAllUsers}