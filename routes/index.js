import express from 'express';

import projectTable from "./projectTable.js";
import campaign from "./campaign.js";
import myTask from "./myTask.js";

const router = express.Router();
router.use('/projectTable', projectTable);
router.use('/campaign', campaign);
router.use('/myTask', myTask);

export default router;