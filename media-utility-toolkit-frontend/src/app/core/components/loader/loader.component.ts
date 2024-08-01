import { Component, Input, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  showLoader: boolean = false;
  loadingText: string = 'Loading...';
  private subscriptions: Subscription = new Subscription();

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.subscriptions.add(
      this.loaderService.showLoader$.subscribe(show => {
        this.showLoader = show;
      })
    );

    this.subscriptions.add(
      this.loaderService.loaderText$.subscribe(text => {
        this.loadingText = text;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
