import { fromEvent } from 'rxjs/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import store from '../../redux/store.js';

export const filterArray = [
  'cxengage/session/sqs-shut-down',
  'cxengage/twilio/device-ready',
  'cxengage/interactions/voice/silent-monitor-start',
  'cxengage/interactions/voice/silent-monitor-end',
  'cxengage/interactions/voice/unmute-acknowledged',
  'cxengage/interactions/voice/mute-acknowledged',
  'monitorCall'
];

export function messageObservable() {
  return fromEvent(window, 'message')
    .filter(
      ({ data }) =>
        data.subscription && filterArray.includes(data.subscription.topic)
    )
    .map(event =>
      store.dispatch({
        type: event.data.subscription.topic,
        response: event.data.subscription.response
      })
    );
}

let subscription;
export function subscribe() {
  subscription = messageObservable().subscribe();
}
export function unsubscribe() {
  subscription.unsubscribe();
}
