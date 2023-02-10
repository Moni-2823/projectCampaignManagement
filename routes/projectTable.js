import express from 'express';
import projectTable from './../controller/projectTable.js';

const router = express.Router();

router.route('/createProjectTable').post(projectTable.createProjectTable);
router.route('/getAllProjectTable').get(projectTable.getProjectTable);
router.route('/updateProjectTable').patch(projectTable.updateProjectTable);
router.route('/deleteProjectTable/:id').post(projectTable.deleteProjectTable);

export default router;