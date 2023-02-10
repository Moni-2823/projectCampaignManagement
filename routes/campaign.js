import express from 'express';
import campaign from './../controller/campaign.js';

const router = express.Router();

router.route('/createCampaign').post(campaign.createCampaign);
router.route('/getAllCampaign').get(campaign.getAllCampaign);
router.route('/getCampaignById/:id').get(campaign.getCampaignById);
router.route('/updateCampaign').patch(campaign.updateCampaign);
router.route('/deleteCampaign/:id').post(campaign.deleteCampaign);

export default router;