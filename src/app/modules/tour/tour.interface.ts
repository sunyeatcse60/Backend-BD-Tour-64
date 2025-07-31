import { Types } from 'mongoose';


export interface ITourType {
    name: string
}


export interface ITour {
    titel: string;
    slug: string;
    description?: string;
    images?: string[];
    location?: string;
    costForm?: string;
    startDate?: Date;
    endDate?: Date;
    included?: string[];
    excluded?: string[];
    aminities?: string[];
    tourPlan?: string[];
    maxGuest?: number;
    minAge?: number;
    division: Types.ObjectId;
    tourType: Types.ObjectId;


}