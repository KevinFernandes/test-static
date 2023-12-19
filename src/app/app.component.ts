import { Component } from '@angular/core';

// declare global {
//   interface Window {
//     manifest: unknown;
//   }
// }

declare global {
  const manifest: unknown;
}

declare global {
  const folder: unknown;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'test-static';
  constructor() {
    this.loadManifest('assets/dashboards/manifest.js');
  }

  manifestCallback(url: string) {
    return () => {
      console.log('script loaded: ' + url);
      console.log(manifest);

      (manifest as any).dashboards = [];

      for (let script of (manifest as any).dashboard_manifests) {
        this.loadScript('assets/dashboards/' + script + '/manifest.js');
      }
    };
  }

  callback(url: string) {
    return () => {
      console.log('script loaded: ' + url);
      (manifest as any).dashboards.push(folder);
      console.log(manifest);
    };
  }

  loadManifest(url: string) {
    const s = document.createElement('script');
    s.setAttribute('src', url);
    s.onload = this.manifestCallback(url);
    document.head.appendChild(s);
  }

  loadScript(url: string) {
    const s = document.createElement('script');
    s.setAttribute('src', url);
    s.onload = this.callback(url);
    document.head.appendChild(s);
  }
}
