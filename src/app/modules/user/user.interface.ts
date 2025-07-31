// import { Types } from "mongoose";

// export enum Role {
//     Super_Admin = "Super_Admin",
//     Admin = "ADMIN",
//     User = "USER",
//     Guide = "GUIDE"
// }


// // Auth provider
// // 1. email , password 2. google authantication

// export interface IAuthProvider {
//     provider : "google" | "credintials";
//     providerId : string;
// }



// export enum IsActive {
//     Active = "Active",
//     InActive = "InActive",
//     Disable = "Disable"
// }



// export interface iUser {
//     name : string;
//     email : string;
//     password ?: string;
//     phone ?: string;
//     picture ?: string;
//     address ?: string;
//     isDeleted ?: string;
//     isActive ?: IsActive;
//     isVarified ?: string;
//     role : Role;
//     auths : IAuthProvider[];
//     bookings ?: Types.ObjectId[];
//     guides ?: Types.ObjectId[];


// }




import { Types } from "mongoose";

export enum Role {
  Super_Admin = "Super_Admin",
  Admin = "Admin",
  User = "User",
  Guide = "Guide",
}

export interface IAuthProvider {
  provider: "google" | "credentials";
  providerId: string;
}

export enum IsActive {
  Active = "Active",
  InActive = "InActive",
  Disable = "Disable",
}

export interface iUser {
  _id ?: Types.ObjectId
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  isDeleted?: boolean;
  isActive?: IsActive;
  isVerified?: boolean;
  role: Role;
  auths: IAuthProvider[];
  bookings?: Types.ObjectId[];
  guides?: Types.ObjectId[];
}
