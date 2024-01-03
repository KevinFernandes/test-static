import { Component } from '@angular/core';
import { StaticHttpClientService } from './services/static-http-client/static-http-client.service';

import { first } from 'rxjs/operators';

declare global {
  const manifest: unknown;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StaticHttpClientService],
})
export class AppComponent {
  title = 'test-static';
  constructor(private httpClient: StaticHttpClientService) {
    this.loadManifest('assets/dashboards/manifest.js');
  }

  loadManifest(url: string) {
    this.httpClient
      .get(url)
      .pipe(first())
      .subscribe(
        (result: unknown) => {
          console.log('script loaded: ' + url);
          console.log(result);

          (result as any).dashboards = [];

          for (let script of (result as any).dashboard_manifests) {
            this.loadScript(
              'assets/dashboards/' + script + '/manifest.js',
              result
            );
          }
        },
        () => {
          console.log(`failed to load data at ${url}`);
        }
      );
  }

  loadScript(url: string, manifest: any) {
    this.httpClient
      .get(url)
      .pipe(first())
      .subscribe(
        (result: unknown) => {
          console.log('script loaded: ' + url);
          console.log(result);

          manifest.dashboards.push(result);

          console.log(manifest);
        },
        () => {
          console.log(`failed to load data at ${url}`);
        }
      );
  }
}
