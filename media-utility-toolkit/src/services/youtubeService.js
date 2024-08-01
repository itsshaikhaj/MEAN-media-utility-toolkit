// src/services/youtubeService.js
const youtubedl = require('youtube-dl-exec');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const fs = require('fs');
const path = require('path');

ffmpeg.setFfmpegPath(ffmpegPath);

const standardResolutions = ['144p', '240p', '360p', '480p', '720p', '1080p', '1440p'];
const standardAudioFormats = ['low', 'medium', 'high'];

exports.getVideoFormats = async (url) => {
    try {
        const info = await youtubedl(url, {
            dumpSingleJson: true,
        });

        const formats = info.formats.map(format => ({
            format_id: format.format_id,
            format_note: format.format_note,
            ext: format.ext,
            resolution: format.resolution,
            filesize: format.filesize
        }));

        // Filter out non-standard resolutions, audio formats, and .webm extension formats
        const filteredFormats = formats.filter(format => {
            // Check if the format is a video and has a standard resolution
            const isVideo = format.resolution && format.resolution !== 'audio only';
            const isAudio = format.resolution === 'audio only';

            return (
                (isVideo && standardResolutions.includes(format.format_note) && format.ext !== 'webm') ||
                (isAudio && standardAudioFormats.includes(format.format_note.split(',')[0]))
            );
        });

        return { title: info.title, formats: filteredFormats };
    } catch (error) {
        console.error('Failed to get video formats:', error.message);
        throw new Error('Failed to get video formats');
    }
};


exports.downloadAndMerge = async (url, formatId, outputPath) => {
    try {
        // Create paths for temporary video and audio files
        const videoPath = path.join(path.dirname(outputPath), `video_${Date.now()}.mp4`);
        const audioPath = path.join(path.dirname(outputPath), `audio_${Date.now()}.mp4`);



        // Download video and audio in parallel with increased buffer size
        await Promise.all([
            downloadMedia(url, formatId, videoPath),
            downloadMedia(url, 'bestaudio', audioPath)
        ]);

        // Merge video and audio
        await mergeMedia(videoPath, audioPath, outputPath);


    } catch (error) {
        throw new Error('Failed to download or merge video and audio');
    }
};

// Helper function to download media
function downloadMedia(url, format, outputPath) {
    return new Promise((resolve, reject) => {
        youtubedl(url, {
            format: format,
            output: outputPath,
            'buffer-size': '100M', // Increase buffer size
            // Add additional options if needed
        }).then(() => {
            resolve();
        }).catch((err) => {
            reject(err);
        });
    });
}

function mergeMedia(videoPath, audioPath, outputPath) {
    return new Promise((resolve, reject) => {
        ffmpeg()
            .input(videoPath)
            .input(audioPath)
            .outputOptions('-c:v copy')  // Copy the video stream without re-encoding
            .outputOptions('-c:a aac')  // Encode audio to AAC
            .outputOptions('-b:a 192k') // Set audio bitrate
            .outputOptions('-strict experimental')
            .outputOptions('-preset fast') // Use a faster encoding preset
            .on('end', () => {
                // Clean up temporary files
                fs.unlinkSync(videoPath);
                fs.unlinkSync(audioPath);
                resolve();
            })
            .on('error', (err) => {
                reject(err);
            })
            .output(outputPath)
            .run(); // Ensure .run() is called to start the processing
    });
}
