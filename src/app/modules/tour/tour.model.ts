import { model, Schema } from 'mongoose';
import { ITour, ITourType } from './tour.interface';


const tourTypeSchema = new Schema<ITourType>({
    name: { type: String, required: true, unique: true }
}, {
    timestamps: true
})

export const TourType = model<ITourType>("TourType", tourTypeSchema);


const tourSchema = new Schema<ITour>({
    titel: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    images: { type: [String], default: [] },
    location: { type: String },
    costForm: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
    included: { type: [String], default: [] },
    excluded: { type: [String], default: [] },
    aminities: { type: [String], default: [] },
    tourPlan: { type: [String], default: [] },
    maxGuest: { type: Number },
    minAge: { type: Number },
    division: {
        type: Schema.Types.ObjectId,
        ref: "Division",
        required: true
    },
    tourType: {
        type: Schema.Types.ObjectId,
        ref: "TourType",
        required: true

    }

},
    {
        timestamps: true
    })


export const Tour = model<ITour>("Tour", tourSchema)