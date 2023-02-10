import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    project_id: {
        type: mongoose.Schema.ObjectId, 
        ref: "ProjectTable"
    },
    campaignName: {
        type: String
    },

    opens: {
        type: Number,
        default: 0
    },
    clicks: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: true
    },
},
    {
        timestamps: true
    })

const Campaign = mongoose.model("Campaign", campaignSchema);

export default Campaign;