const express = require('express');
const youtubeController = require('../controllers/youtubeController');

const router = express.Router();

router.post('/formats', youtubeController.getVideoFormats);
router.post('/download', youtubeController.downloadVideo);

module.exports = router;
