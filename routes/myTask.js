import express from 'express';
import campaign from '../controller/campaign.js';

const router = express.Router();

router.route('/landing/:id').get(campaign.getCampaignById);
router.route('/increasingOpenCount/:id').patch(campaign.increasingOpenCount);
router.route('/increasingClickCount/:id').patch(campaign.increasingClickCount);
router.route('/getCampaignDataByProjectId/:id').get(campaign.getCampaignDataByProjectId);

export default router;