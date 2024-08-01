import { Component } from '@angular/core';
import { YoutubeService } from './services/youtube.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent {

  videoUrl!: string;
  videoTitle!: string;
  downloadProgress: number = 0;
  estimatedTimeLeft: string = '';

  videoQualities: any[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  submitted = false;

  constructor(
    private youtubeService: YoutubeService,
    private loaderService: LoaderService
  ) { }

  // Call this method to get video formats
  getVideoFormats() {
    this.submitted = true;
    if (!this.isValidYouTubeUrl(this.videoUrl)) {
      return
    }
    this.loaderService.show('Fetching ...');
    this.youtubeService.getVideoFormats(this.videoUrl).subscribe({
      next: (response: any) => {
        this.submitted = false;
        this.videoQualities = response.formats;
        this.videoTitle = response.title;
        this.errorMessage = null;
        this.loaderService.hide();
      },
      error: (error) => {
        this.submitted = false;
        this.loaderService.hide();
        this.errorMessage = 'Failed to load video formats. Please try again.';
        console.error(error);
      }
    });
  }

  // Call this method to download video
  downloadVideo(quality: any) {
    this.loaderService.show('Downloading ...');
    const MAX_FILE_NAME_LENGTH = 30; // Maximum length for the file name (including extension)
    const TRUNCATE_LENGTH = MAX_FILE_NAME_LENGTH - (quality.ext.length + 1); // Length of title part

    // Truncate the title if it's too long
    let truncatedTitle = this.videoTitle;
    if (truncatedTitle.length > TRUNCATE_LENGTH) {
      truncatedTitle = truncatedTitle.substring(0, TRUNCATE_LENGTH) + '...';
    }

    const data = {
      url: this.videoUrl,
      formatId: quality.format_id,
      title: truncatedTitle, // Use the truncated title
      ext: quality.ext
    };

    this.youtubeService.downloadVideo(data).subscribe(
      (blob: any) => { // Cast blob to any
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${truncatedTitle}.${data.ext}`; // Set file name and extension
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        this.loaderService.hide();
      },
      error => {
        this.loaderService.hide();
        console.error('Error downloading video', error);
      }
    );
  }

  isValidYouTubeUrl(url: string): boolean {
    const youtubePattern = /https:\/\/(www\.)?youtube\.com\/.*|https:\/\/(www\.)?youtu\.be\/.*/;
    return youtubePattern.test(url);
  }


}
