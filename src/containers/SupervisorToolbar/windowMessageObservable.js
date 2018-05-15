import { fromEvent } from 'rxjs/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';

import { requestingMonitorCall } from '../../redux/modules/supervisorToolbar';

import store from '../../redux/store.js';

export const filterArray = [
  'cxengage/session/sqs-shut-down',
  'cxengage/twilio/device-ready',
  'cxengage/interactions/voice/silent-monitor-start',
  'cxengage/interactions/voice/silent-monitor-end',
  'cxengage/interactions/voice/unmute-acknowledged',
  'cxengage/interactions/voice/mute-acknowledged',
  'cxengage/session/started',
  'monitorCall'
];

export function messageObservable() {
  return fromEvent(window, 'message')
    .filter(
      ({ data }) =>
        data.subscription && filterArray.includes(data.subscription.topic)
    )
    .do(({ data }) => {
      data.subscription.topic !== 'monitorCall' &&
        localStorage.setItem(
          'SupervisorToolbar',
          JSON.stringify(
            store
              .getState()
              .get('SupervisorToolbar')
              .toJS()
          )
        );
    })
    .map(event => {
      if (event.data.subscription.topic === 'monitorCall') {
        return store.dispatch(
          requestingMonitorCall(
            event.data.subscription.response.interactionId,
            event.data.subscription.response.defaultExtensionProvider
          )
        );
      } else {
        return store.dispatch({
          type: event.data.subscription.topic,
          response: event.data.subscription.response
        });
      }
    });
}

let subscription;
export function messageSubscribe() {
  subscription = messageObservable().subscribe();
}
export function messageUnsubscribe() {
  subscription.unsubscribe();
}
