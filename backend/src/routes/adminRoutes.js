const express = require("express");
const { getEnquiries } = require("../controllers/enquiryController");
const { requireAdminAuth } = require("../middleware/authMiddleware");

const router = express.Router();

// Every route in this file is protected.
router.use(requireAdminAuth);

router.get("/enquiries", getEnquiries);

module.exports = router;
