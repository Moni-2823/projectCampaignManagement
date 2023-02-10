import mongoose from 'mongoose';

const projectTableSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    projectName: {
        type: String
    },
    openCost: {
        type: Number,
        default: 5
    },
    targetOpens: {
        type: Number,
        default: 100
    },
    clickCost: {
        type: Number,
        default: 10
    },
    targetClicks: {
        type: Number,
        default: 50
    },
    status: {
        type: Boolean,
        default: true
    },
},
    {
        timestamps: true
    })

const ProjectTable = mongoose.model("ProjectTable", projectTableSchema);

export default ProjectTable;