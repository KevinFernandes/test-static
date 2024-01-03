import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class StaticHttpClientService {

  /** */
  public get(staticUrl: string): Observable<unknown> {
    //  create the script element on the document
    const s = document.createElement('script');

    //  set the src attribute of the script element
    s.setAttribute('src', staticUrl);

    //  we use a Subject so we can call next, error and complete on the observable
    const subj: Subject<unknown> = new Subject<unknown>();
    //  set the onload and onerror handlers to use the subject call back and pass the element as well
    s.onload = this.callback(subj, s);
    s.onerror = this.errorCallback(subj, s);

    //  append the script element to the head of the document (could also be the body)
    document.head.appendChild(s);

    //  return the observable
    return subj.asObservable();
  }

  /** */
  private callback(
    obs: Subject<unknown>,
    el: HTMLScriptElement
  ): (this: GlobalEventHandlers, ev: Event) => any {
    return () => {
      //  when the load is complete pass the "known" variable containing the data through the observable
      obs.next(manifest);
      //  complete the observable
      obs.complete();
      //  remmove the script tag after it has loaded - the variable still seems accessible though
      document.head.removeChild(el);
    };
  }

  /** */
  private errorCallback(
    obs: Subject<unknown>,
    el: HTMLScriptElement
  ): OnErrorEventHandler {
    return (val: unknown) => {
      //  send an error alog the observable
      obs.error(null);
      //  complete the observable
      obs.complete();
      //  remmove the script tag after it has loaded - the variable still seems accessible though
      document.head.removeChild(el);
    };
  }
}
