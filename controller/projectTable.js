import projectTableModel from './../models/projectTable.js';
import constants from './../config/constants.js';

// create project table
const createProjectTable = async (req, res) => {
    try {
        let projectTableCount =  await projectTableModel.findOne({}, {id: 1}).sort({id: -1}) 
        if(!projectTableCount) {
            projectTableCount = {
                id: 0   
            };
        }
        req.body['id'] = projectTableCount.id + 1;
        let projectTable = await new projectTableModel(req.body).save();
        if(!projectTable) {
            return res.status(404).send({statuscode: 404, message: 'not created'})
        }
        res.status(201).send({statuscode: 201,message: constants.PROJECT_TABLE_CREATED,data: projectTable});
    } catch(err) {
        res.status(400).send({statuscode: 400,message: err.message});
        console.log('project table create error',err);
    }
}

// get all project table
const getProjectTable = async (req, res) => {
    try {
        let projectTable = await projectTableModel.find();
        if(!projectTable) {
            return res.status(404).send({statuscode: 404, message: constants.NO_PROJECT_TABLE});
        }
        return res.status(200).send({statuscode: 200, data: projectTable});
    } catch(err) {
        res.status(400).send({statuscode: 400,message: err.message});
        console.log('get project table error',err);
    }
}

// update project table
const updateProjectTable = async (req, res) => {
    try { 
        let projectTable = await projectTableModel.findOne({_id: req.body._id});
        if(!projectTable) {
            return res.status(404).send({statuscode: 404, message: constants.NO_PROJECT_TABLE_WITH_THIS_ID});
        }
        projectTable = await projectTableModel.findOneAndUpdate({ _id: req.body._id },{ $set: req.body },{ new: true });
        if(!projectTable) {
            return res.status(400).send({statuscode: 400, message: constants.PROJECT_TABLE_NOT_UPDATED});
        }
        return res.status(200).send({statuscode: 200, message: constants.PROJECT_TABLE_UPDATED,data: projectTable});
    } catch(err) {
        res.status(500).send({statuscode: 500, message: constants.SERVER_ERR});
        console.log('updated project table error:: ',err);
    }
}

// delete project table
const deleteProjectTable = async (req, res) => {
    try { 
        let projectTable = await projectTableModel.findOne({_id: req.params.id});
        if(!projectTable) {
            return res.status(404).send({statuscode: 404, message: constants.NO_PROJECT_TABLE_WITH_THIS_ID});
        }
        let deleteProjectTable = await projectTableModel.findOneAndDelete({ _id: req.params.id });
        if(!deleteProjectTable) {
        return res.status(400).send({statuscode: 400, message: constants.PROJECT_TABLE_NOT_DELETED});
        }
        return res.status(200).send({statuscode: 200, message: constants.PROJECT_TABLE_DELETED});
    } catch(err) {
        res.status(500).send({statuscode: 500, message: constants.SERVER_ERR});
        console.log('delete project table error:: ',err);
    }
}

export default {createProjectTable  , getProjectTable , updateProjectTable , deleteProjectTable};