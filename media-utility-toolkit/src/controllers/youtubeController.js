// src/controllers/youtubeController.js
const youtubeService = require('../services/youtubeService');
const path = require('path');
const fs = require('fs');

exports.getVideoFormats = async (req, res) => {
    try {
        const { url } = req.body;
        const { title, formats } = await youtubeService.getVideoFormats(url);
        res.status(200).json({ title, formats });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// exports.downloadVideo = async (req, res, next) => {
//     try {
//         const { url, formatId, title, ext } = req.body;
//         const outputPath = path.join(__dirname, '..', 'temp', `${Date.now()}.${ext}`);
//         await youtubeService.downloadAndMerge(url, formatId, outputPath);
//         const safeTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase(); // Sanitize file name
//         res.download(outputPath, `${safeTitle}.${ext}`, (err) => {
//             if (err) {
//                 return next(err);
//             }
//             fs.unlinkSync(outputPath); // Clean up temp file
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


exports.downloadVideo = async (req, res, next) => {
    try {
        const { url, formatId, title, ext } = req.body;
        const outputPath = path.join(__dirname, '..', 'temp', `${Date.now()}.${ext}`);
        await youtubeService.downloadAndMerge(url, formatId, outputPath);

        const safeTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase().slice(0, 20); // Sanitize and trim file name

        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename="${safeTitle}.${ext}"`);

        const readStream = fs.createReadStream(outputPath);

        readStream.on('data', (chunk) => {
            res.write(chunk);
        });

        readStream.on('end', () => {
            res.end();
            fs.unlinkSync(outputPath); // Clean up temp file
        });

        readStream.on('error', (err) => {
            next(err);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};