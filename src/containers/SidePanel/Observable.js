import { fromEvent } from 'rxjs/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { updateSidePanelWidth } from '../../redux/modules/entities';

import store from '../../redux/store.js';

export function messageObservable() {
  return fromEvent(document, 'mousedown')
    .filter(
      event =>
        event.target.id === 'SlidingResizer' ||
        event.target.id === 'SlidingResizerInnerIcon'
    )
    .mergeMap(md =>
      fromEvent(document, 'mousemove')
        .map(mm => {
          mm.preventDefault();
          const left = window.innerWidth - mm.clientX;
          if (left > 550 && left < window.innerWidth) {
            return { left: left };
          } else if (left > window.innerWidth) {
            return { left: window.innerWidth };
          } else {
            return { left: 550 };
          }
        })
        .map(mm => store.dispatch(updateSidePanelWidth(mm.left)))
        .takeUntil(fromEvent(document, 'mouseup'))
    );
}

let subscription;
export function subscribe() {
  subscription = messageObservable().subscribe();
}
export function unsubscribe() {
  subscription.unsubscribe();
}
