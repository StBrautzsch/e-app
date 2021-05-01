import {Observer} from 'rxjs';

export function observerNextAndComplete(observer: Observer<any>, data: any): void {
  observer.next(data);
  observer.complete();
}
