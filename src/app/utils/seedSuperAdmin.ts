import bcrypt from "bcryptjs";
import { envVars } from "../config/env"
import { User } from "../modules/user/user.model"
import { IAuthProvider, iUser, Role } from '../modules/user/user.interface';

export const seedSuperAdmin = async () => {
    try {
        const isSuperAdminExist = await User.findOne({email: envVars.SUPER_ADMIN_EMAIL});

        if(isSuperAdminExist){
            console.log("Super admin already exist");
            return;
        }

        console.log("Trying to create super admin");

        const hashedPassword = await bcrypt.hash(envVars.SUPER_ADMIN_PASSWORD,Number(envVars.BCRYPT_SALT_ROUND));


        const authProvider : IAuthProvider = {
            provider : "credentials",
            providerId : envVars.SUPER_ADMIN_EMAIL
        }
        

        const payload : iUser = {
            name : "Super admin",
            role : Role.Super_Admin,
            email : envVars.SUPER_ADMIN_EMAIL,
            password : hashedPassword,
            isVerified: true,
            auths : [authProvider]
        }

        const superadmin = await User.create(payload);
        console.log("Super Admin Created. \n");
        console.log(superadmin);


    } catch (error) {
        console.log(error);
    }
}
