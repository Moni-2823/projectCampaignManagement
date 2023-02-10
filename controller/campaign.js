import campaignModel from "./../models/campaign.js";
import constants from "./../config/constants.js";

// create campaign
const createCampaign = async (req, res) => {
  try {
        let campaignCount = await campaignModel.findOne({}, { id: 1 }).sort({ id: -1 });
        if (!campaignCount) {
        campaignCount = {
            id: 0   
        };
        }
        req.body["id"] = campaignCount.id + 1;
        let campaign = await new campaignModel(req.body).save();
        if (!campaign) {
        return res.status(404).send({ statuscode: 404, message: "not created" });
        }
        res
        .status(201)
        .send({
            statuscode: 201,
            message: constants.CAMPAIGN_CREATED,
            data: campaign,
        });
  } catch (err) {
    res.status(400).send({ statuscode: 400, message: err.message });
    console.log("campaign create error", err);
  }
};

// get all campaign
const getAllCampaign = async (req, res) => {
  try {
    let campaign = await campaignModel.find().populate("project_id");
    if (!campaign) {
      return res
        .status(404)
        .send({ statuscode: 404, message: constants.NO_CAMPAIGN });
    }
    return res.status(200).send({ statuscode: 200, data: campaign });
  } catch (err) {
    res.status(400).send({ statuscode: 400, message: err.message });
    console.log("get campaign error", err);
  }
};

// get campaign by id
const getCampaignById = async (req, res) => {
  try {
    let campaign = await campaignModel.findOne({ _id: req.params.id });
    if (!campaign) {
      return res
        .status(404)
        .send({ statuscode: 404, message: constants.NO_CAMPAIGN });
    }
    return res.status(200).send({ statuscode: 200, data: campaign });
  } catch (err) {
    res.status(400).send({ statuscode: 400, message: err.message });
    console.log("get campaign error", err);
  }
};

// increasing open count in subpage open
const increasingOpenCount = async (req, res) => {
  try {
    let campaignData = await campaignModel.findOne({ _id: req.params.id });
    if (!campaignData) {
      return res.status(404).send({ statuscode: 404, message: constants.NO_CAMPAIGN });
    }
    res.status(200).send({ statuscode: 200, message: constants.OPEN_INCREAMENTED});
    await campaignModel.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { opens: 1 } },
      { new: true }
    );
    return;
  } catch (err) {
    res.status(400).send({ statuscode: 400, message: err.message });
    console.log("increament open count error", err);
  }
};

// increasing click count in subpage button click
const increasingClickCount = async (req, res) => {
  try {
    let campaignData = await campaignModel.findOne({ _id: req.params.id });
    if (!campaignData) {
      return res.status(404).send({ statuscode: 404, message: constants.NO_CAMPAIGN });
    }
    res.status(200).send({statuscode: 200, message: constants.CLICK_INCREAMENTED});
    await campaignModel.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { clicks: 1 } },
      { new: true }
    );
    return;
  } catch (err) {
    res.status(400).send({ statuscode: 400, message: err.message });
    console.log("increament open count error", err);
  }
};

// get campaign data by project table id
const getCampaignDataByProjectId = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 0;
    let limit = parseInt(req.query.limit) || 5;
    let campaign = await campaignModel
      .find({ project_id: req.params.id })
      .populate('project_id')
      .skip(page * limit)
      .limit(limit);
    if (!campaign) {
      return res
        .status(404)
        .send({ statuscode: 404, message: constants.NO_CAMPAIGN });
    }
    let count = await campaignModel.find({ project_id: req.params.id }).count();
    res.status(200).send({ statuscode: 200, data: campaign, count: count });
    return;
  } catch (err) {
    res.status(400).send({ statuscode: 400, message: err.message });
    console.log("get campaign error", err);
  }
};

// update campaign
const updateCampaign = async (req, res) => {
  try {
    let campaign = await campaignModel.findOne({ _id: req.body._id });
    if (!campaign) {
      return res
        .status(404)
        .send({ statuscode: 404, message: constants.NO_CAMPAIGN_WITH_THIS_ID });
    }
    campaign = await campaignModel.findOneAndUpdate(
      { _id: req.body._id },
      { $set: req.body },
      { new: true }
    );
    if (!campaign) {
      return res
        .status(400)
        .send({ statuscode: 400, message: constants.CAMPAIGN_NOT_UPDATED });
    }
    return res
      .status(200)
      .send({
        statuscode: 200,
        message: constants.CAMPAIGN_UPDATED,
        data: campaign,
      });
  } catch (err) {
    res.status(500).send({ statuscode: 500, message: constants.SERVER_ERR });
    console.log("updated campaign error:: ", err);
  }
};

// delete campaign
const deleteCampaign = async (req, res) => {
  try {
    let campaign = await campaignModel.findOne({ _id: req.params.id });
    if (!campaign) {
      return res
        .status(404)
        .send({ statuscode: 404, message: constants.NO_CAMPAIGN_WITH_THIS_ID });
    }
    let deleteCampaign = await campaignModel.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deleteCampaign) {
      return res
        .status(400)
        .send({ statuscode: 400, message: constants.CAMPAIGN_NOT_DELETED });
    }
    return res
      .status(200)
      .send({ statuscode: 200, message: constants.CAMPAIGN_DELETED });
  } catch (err) {
    res.status(500).send({ statuscode: 500, message: constants.SERVER_ERR });
    console.log("delete campaign error:: ", err);
  }
};

export default {
  createCampaign,
  getAllCampaign,
  getCampaignById,
  increasingOpenCount,
  increasingClickCount,
  getCampaignDataByProjectId,
  updateCampaign,
  deleteCampaign,
};
