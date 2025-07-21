import { IsActive, Role } from './user.interface';
 import z, { boolean} from "zod"
 
 export const createUserZotSchema = z.object({
        name: z.string({ invalid_type_error: "Name must be string" }).min(4, { message: "At least 4 character" }).max(50, { message: "Name too long." }),
        email: z.string().email(),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" })
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
                message: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
            }),
        phone: z
            .string()
            .regex(/^(?:\+88|88)?01[3-9]\d{8}$/, {
                message: "Invalid Bangladeshi phone number format",
            })
            .optional(),

        address: z.string().max(200).optional()
    })


export const updateUserZotSchema = z.object({
        name: z.string({ invalid_type_error: "Name must be string" }).min(4, { message: "At least 4 character" }).max(50, { message: "Name too long." }).optional(),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" })
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
                message: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
            }),
        phone: z
            .string()
            .regex(/^(?:\+88|88)?01[3-9]\d{8}$/, {
                message: "Invalid Bangladeshi phone number format",
            })
            .optional(),

        role : z.enum(Object.values(Role)as [string]).optional() ,
        IsActive : z.enum(Object.values (IsActive) as [string]).optional(),
        isDelete : boolean().optional(),
        isVarified: z.boolean().optional(),
        address: z.string().max(200).optional()
    })