import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private showLoaderSubject = new BehaviorSubject<boolean>(false);
  private loaderTextSubject = new BehaviorSubject<string>('Loading...');

  show(text: string = 'Loading...') {
    this.loaderTextSubject.next(text);
    this.showLoaderSubject.next(true);
  }

  hide() {
    this.showLoaderSubject.next(false);
  }

  get showLoader$() {
    return this.showLoaderSubject.asObservable();
  }

  get loaderText$() {
    return this.loaderTextSubject.asObservable();
  }
}
