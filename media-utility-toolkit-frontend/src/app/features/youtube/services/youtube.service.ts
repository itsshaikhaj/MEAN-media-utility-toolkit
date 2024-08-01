import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  serverUrl = environment.serverUrl;

  constructor(
    private http: HttpClient,
  ) {

  }

  // API to get video formats
  getVideoFormats(url: string) {
    console.log('url :', url);
    return this.http.post(`${this.serverUrl}/api/youtube/formats`, { url });
  }

  // API to download video
  downloadVideo(data: { url: string, formatId: string, title: string, ext: string }) {
    return this.http.post(`${this.serverUrl}/api/youtube/download`, data, {
      responseType: 'blob' as 'json'  // Set the response type to 'blob'
    });
  }


}
